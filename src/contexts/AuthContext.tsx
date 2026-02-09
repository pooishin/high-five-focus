"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInAnonymously,
    signOut,
    User
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

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

    // Firebase Auth 상태 감시
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            async (firebaseUser) => {
                if (firebaseUser) {
                    const userData: SimpleUser = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName || '사용자',
                        photoURL: firebaseUser.photoURL,
                        isAnonymous: firebaseUser.isAnonymous
                    };

                    setUser(userData);

                    // Firestore에 사용자 데이터 저장/업데이트
                    await syncUserWithFirestore(firebaseUser);
                } else {
                    setUser(null);
                }
                setLoading(false);
            },
            (error) => {
                console.error('Auth state change error:', error);
                setLoading(false); // 에러 발생 시에도 로딩 해제하여 UI 렌더링 허용
            }
        );

        return () => unsubscribe();
    }, []);

    const syncUserWithFirestore = async (firebaseUser: User) => {
        try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // 신규 사용자 등록
                await setDoc(userDocRef, {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || '사용자',
                    photoURL: firebaseUser.photoURL,
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                    isAnonymous: firebaseUser.isAnonymous,
                    level: 1,
                    exp: 0,
                    coins: 0
                });
            } else {
                // 기존 사용자 로그인 시간 업데이트
                await setDoc(userDocRef, {
                    lastLogin: serverTimestamp()
                }, { merge: true });
            }
        } catch (error) {
            console.error('Firestore sync error:', error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push('/');
        } catch (error: any) {
            console.error('Google sign in error:', error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error: any) {
            console.error('Email sign in error:', error);
            throw error;
        }
    };

    const signUpWithEmail = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error: any) {
            console.error('Sign up error:', error);
            throw error;
        }
    };

    const signInAsGuest = async () => {
        try {
            await signInAnonymously(auth);
            router.push('/');
        } catch (error: any) {
            console.error('Guest sign in error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const migrateLocalData = async () => {
        // 추후 localStorage의 데이터를 Firestore로 옮기는 로직 구현 가능
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
        migrateLocalData
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
