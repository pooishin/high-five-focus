'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { error } = await supabase.auth.getSession();
            if (!error) {
                router.push('/');
            } else {
                console.error('Error during auth callback:', error);
                router.push('/login');
            }
        };

        handleAuthCallback();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white font-medium">로그인 중입니다...</p>
            </div>
        </div>
    );
}
