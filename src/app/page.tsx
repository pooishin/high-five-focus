"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const checkRedirect = async () => {
      if (!user) {
        router.replace('/login');
        return;
      }

      if (!user.onboardingCompleted) {
        router.replace('/onboarding');
        return;
      }

      // Check if user has tasks for today
      const { data: tasks } = await supabase
        .from('tasks')
        .select('id')
        .eq('user_id', user.uid)
        .limit(1);

      if (tasks && tasks.length > 0) {
        router.replace('/home');
      } else {
        router.replace('/plan');
      }
    };

    checkRedirect();
  }, [user, loading, router]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background)',
      color: 'var(--primary)'
    }}>
      <div className="animate-pulse" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
        LOADING FOCUS...
      </div>
    </div>
  );
}
