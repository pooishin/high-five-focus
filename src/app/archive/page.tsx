"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface TaskHistory {
    id: string;
    title: string;
    total_seconds: number;
    remaining_seconds: number;
    status: string;
    created_at: string;
}

export default function ArchivePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [history, setHistory] = useState<Record<string, TaskHistory[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchHistory = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user.uid)
                .eq('status', 'completed')
                .order('created_at', { ascending: false });

            if (data) {
                // 날짜별 그룹화
                const grouped = data.reduce((acc: Record<string, TaskHistory[]>, task: TaskHistory) => {
                    const date = new Date(task.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'short'
                    });
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(task);
                    return acc;
                }, {});
                setHistory(grouped);
            }
            setLoading(false);
        };

        fetchHistory();
    }, [user]);

    const formatSeconds = (secs: number) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
    };

    return (
        <main className="home-container" style={{ minHeight: '100vh', padding: '1.5rem', paddingBottom: '3rem' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Link
                    href="/home"
                    style={{
                        background: 'var(--surface-alt)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        fontSize: '1.2rem',
                        color: 'var(--primary)'
                    }}
                >
                    ←
                </Link>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900 }}>기록 보관소</h1>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>기록을 불러오는 중...</div>
            ) : Object.keys(history).length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                    <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>아직 완료된 기록이 없습니다.<br />오늘의 첫 번째 하이파이브를 완성해보세요!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {Object.entries(history).map(([date, tasks]) => (
                        <section key={date}>
                            <h2 style={{ fontSize: '0.9rem', fontWeight: 800, opacity: 0.4, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)' }}></span>
                                {date}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        style={{
                                            background: 'var(--surface)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '16px',
                                            padding: '1.25rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}
                                    >
                                        <div style={{ fontSize: '1.2rem' }}>✅</div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '2px' }}>{task.title}</h3>
                                            <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>소요 시간: {formatSeconds(task.total_seconds)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}

            <footer style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.3, fontSize: '0.7rem' }}>
                당신의 모든 몰입은 기록되고 있습니다. ✋
            </footer>
        </main>
    );
}
