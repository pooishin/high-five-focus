"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 간단한 User 인터페이스 (Firebase User 대체)
interface SimpleUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    isAnonymous: boolean;
}

interface AuthContextType {
    user: SimpleUser | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    signInAsGuest: () => Promise<void>;
    logout: () => Promise<void>;
    migrateLocalData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<SimpleUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 컴포넌트 마운트 시 localStorage에서 사용자 정보 로드
    useEffect(() => {
        const loadUser = () => {
            try {
                const savedUser = localStorage.getItem('currentUser');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error('Failed to load user:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    // 사용자 정보를 localStorage에 저장
    const saveUser = (userData: SimpleUser) => {
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setUser(userData);
    };

    const signInWithGoogle = async () => {
        // 임시로 Google 로그인 비활성화 (Firebase 필요)
        throw new Error('Google 로그인은 Firebase 설정이 필요합니다. 게스트 모드를 사용해주세요.');
    };

    const signInWithEmail = async (email: string, password: string) => {
        // 임시로 이메일 로그인 비활성화 (Firebase 필요)
        throw new Error('이메일 로그인은 Firebase 설정이 필요합니다. 게스트 모드를 사용해주세요.');
    };

    const signUpWithEmail = async (email: string, password: string) => {
        // 임시로 회원가입 비활성화 (Firebase 필요)
        throw new Error('회원가입은 Firebase 설정이 필요합니다. 게스트 모드를 사용해주세요.');
    };

    const signInAsGuest = async () => {
        try {
            // 게스트 사용자 생성
            const guestUser: SimpleUser = {
                uid: `guest_${Date.now()}`,
                email: null,
                displayName: '게스트',
                photoURL: null,
                isAnonymous: true
            };

            saveUser(guestUser);
            console.log('게스트 모드로 로그인되었습니다.');
        } catch (error) {
            console.error('Guest sign in error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('currentUser');
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const migrateLocalData = async () => {
        // localStorage 기반이므로 마이그레이션 불필요
        console.log('LocalStorage 모드에서는 데이터 마이그레이션이 필요하지 않습니다.');
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInAsGuest,
        logout,
        migrateLocalData
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
