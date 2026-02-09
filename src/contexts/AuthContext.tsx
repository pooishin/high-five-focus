"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface SimpleUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    isAnonymous: boolean;
    onboardingCompleted: boolean;
}

interface AuthContextType {
    user: SimpleUser | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    signInAsGuest: () => Promise<void>;
    logout: () => Promise<void>;
    completeOnboarding: () => Promise<void>;
    migrateLocalData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<SimpleUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // 현재 세션 확인
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                handleUser(session.user);
            } else {
                setLoading(false);
            }
        };

        checkUser();

        // 인증 상태 감시
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                handleUser(session.user);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleUser = async (supabaseUser: User) => {
        // DB에서 프로필 정보를 먼저 가져옴
        const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', supabaseUser.id)
            .single();

        const userData: SimpleUser = {
            uid: supabaseUser.id,
            email: supabaseUser.email || null,
            displayName: supabaseUser.user_metadata?.full_name || '사용자',
            photoURL: supabaseUser.user_metadata?.avatar_url || null,
            isAnonymous: supabaseUser.is_anonymous || false,
            onboardingCompleted: profile?.onboarding_completed || false
        };

        setUser(userData);
        await syncUserWithSupabase(supabaseUser);
        setLoading(false);
    };

    const syncUserWithSupabase = async (supabaseUser: User) => {
        try {
            // profiles 테이블에서 유저 확인
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', supabaseUser.id)
                .single();

            if (error && error.code === 'PGRST116') {
                // 신규 사용자 등록 (PostgreSQL profiles 테이블)
                const { error: insertError } = await supabase
                    .from('profiles')
                    .insert([{
                        id: supabaseUser.id,
                        email: supabaseUser.email,
                        display_name: supabaseUser.user_metadata?.full_name || '사용자',
                        photo_url: supabaseUser.user_metadata?.avatar_url || null,
                        is_anonymous: supabaseUser.is_anonymous || false,
                        onboarding_completed: false,
                        level: 1,
                        exp: 0,
                        coins: 0,
                        created_at: new Date().toISOString(),
                        last_login: new Date().toISOString()
                    }]);

                if (insertError) console.error('Supabase profile creation error:', insertError);
            } else if (profile) {
                // 기존 사용자 마지막 로그인 시간 업데이트
                await supabase
                    .from('profiles')
                    .update({ last_login: new Date().toISOString() })
                    .eq('id', supabaseUser.id);
            }
        } catch (error) {
            console.error('Supabase sync error:', error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                }
            });
            if (error) throw error;
        } catch (error: any) {
            console.error('Google sign in error:', error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            router.push('/');
        } catch (error: any) {
            console.error('Email sign in error:', error);
            throw error;
        }
    };

    const signUpWithEmail = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            router.push('/');
        } catch (error: any) {
            console.error('Sign up error:', error);
            throw error;
        }
    };

    const signInAsGuest = async () => {
        try {
            const { error } = await supabase.auth.signInAnonymously();
            if (error) throw error;
            router.push('/');
        } catch (error: any) {
            console.error('Guest sign in error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const completeOnboarding = async () => {
        if (!user) return;

        try {
            // update 대신 upsert를 사용하여 레코드가 없더라도 생성하며 업데이트하도록 강화
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.uid,
                    onboarding_completed: true,
                    last_login: new Date().toISOString()
                });

            if (error) {
                console.error('Supabase Onboarding Update Error:', error.message, error.details, error.hint);
                throw error;
            }

            // 로컬 상태 업데이트
            setUser(prev => prev ? { ...prev, onboardingCompleted: true } : null);
            localStorage.setItem('onboardingCompleted', 'true');
        } catch (error: any) {
            console.error('Error completing onboarding:', error);
            throw error;
        }
    };

    const migrateLocalData = async () => {
        console.log('Migrating local data to cloud...');
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInAsGuest,
        logout,
        completeOnboarding,
        migrateLocalData
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
