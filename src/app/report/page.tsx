"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ChartData {
    label: string;
    value: number;
    time: string;
}

interface DailyRecord {
    date: string;
    focusMinutes: number;
    tasksCompleted: number;
    coinsEarned: number;
}

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface UserStats {
    exp: number;
    level: number;
    coins: number;
    monthlyCoins: number;
}

export default function Report() {
    const { user } = useAuth();
    const router = useRouter();
    const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");
    const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([]);
    const [userStats, setUserStats] = useState<UserStats>({ exp: 0, level: 1, coins: 0, monthlyCoins: 0 });
    const [toast, setToast] = useState<string | null>(null);

    // Swipe Navigation
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    };

    const handleTouchEnd = () => {
        if (!touchStart.x || !touchEnd.x) return;

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;
        const minSwipeDistance = 50;

        // 오른쪽으로 스와이프 (← 방향의 터치 이동, distanceX < 0) -> Home 이동
        if (Math.abs(distanceX) > Math.abs(distanceY) * 2 && distanceX < -minSwipeDistance) {
            router.push('/');
        }

        setTouchStart({ x: 0, y: 0 });
        setTouchEnd({ x: 0, y: 0 });
    };

    useEffect(() => {
        if (!user) return;

        const loadReportData = async () => {
            // Load Stats from profiles
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.uid)
                .single();

            if (profile) {
                setUserStats({
                    exp: profile.exp,
                    level: profile.level,
                    coins: profile.coins,
                    monthlyCoins: profile.coins // Show total as monthly for now or sum logs
                });
            }

            // Load Logs from focus_logs
            const { data: logs } = await supabase
                .from('focus_logs')
                .select('*')
                .eq('user_id', user.uid)
                .order('date', { ascending: false });

            if (logs) {
                setDailyRecords(logs.map(l => ({
                    date: l.date,
                    focusMinutes: l.focus_minutes,
                    tasksCompleted: l.tasks_completed,
                    coinsEarned: l.coins_earned
                })));
            }
        };

        loadReportData();
    }, [user]);

    const getDailyData = (): ChartData[] => {
        // Daily View: Show hypothetical hourly breakdown for 'Today'
        const todayStr = new Date().toISOString().split('T')[0];
        const todayRecord = dailyRecords.find(r => r.date === todayStr);
        const totalMinutes = todayRecord?.focusMinutes || 0;

        // 차트에 최근 6시간 분량을 렌더링하도록 동적 구성
        const currentHour = new Date().getHours();
        const startHour = Math.max(0, currentHour - 5);
        const workingHours = Array.from({ length: 6 }, (_, i) => startHour + i);

        const data: ChartData[] = [];

        workingHours.forEach(hour => {
            // 현재는 focus_logs 에 시간별 세션 데이터가 없으므로, 
            // 당일 얻어낸 모든 총 집중 시간을 '현재 시간(currentHour)' 슬롯에 표시하여 즉각적인 달성감을 줌.
            let minutes = 0;
            if (hour === currentHour) {
                minutes = totalMinutes;
            }

            data.push({
                label: `${hour}h`,
                value: Math.min(100, (minutes / 60) * 100),
                time: `${minutes}m`
            });
        });

        return data;
    };

    const getWeeklyData = (): ChartData[] => {
        const today = new Date();
        const weekData: ChartData[] = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const displayLabel = dateStr.slice(5); // MM-DD

            const record = dailyRecords.find(r => r.date === dateStr);
            const minutes = record?.focusMinutes || 0;
            const hours = Math.floor(minutes / 60);
            const mins = Math.floor(minutes % 60);

            weekData.push({
                label: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
                value: Math.min(100, (minutes / 480) * 100), // Assuming 8h max
                time: hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
            });
        }

        return weekData;
    };

    const getMonthlyData = (): ChartData[] => {
        const today = new Date();
        const monthData: ChartData[] = [];

        // Last 4 weeks
        for (let week = 3; week >= 0; week--) {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - (week * 7 + 6));
            const weekEnd = new Date(today);
            weekEnd.setDate(today.getDate() - (week * 7));

            let totalMinutes = 0;
            for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                const record = dailyRecords.find(r => r.date === dateStr);
                totalMinutes += record?.focusMinutes || 0;
            }

            const hours = Math.floor(totalMinutes / 60);
            monthData.push({
                label: `${4 - week}주전`,
                value: Math.min(100, (totalMinutes / (480 * 5)) * 100), // Assuming 5 days * 8h
                time: `${hours}h`
            });
        }

        return monthData;
    };

    const getData = () => {
        switch (period) {
            case "daily": return getDailyData();
            case "weekly": return getWeeklyData();
            case "monthly": return getMonthlyData();
            default: return getWeeklyData();
        }
    };

    const getStats = () => {
        let totalMinutes = 0;
        let targetMinutes = 60; // 일간 목표 60분 (1시간 기준)
        const todayStr = new Date().toISOString().split('T')[0];

        if (period === 'daily') {
            totalMinutes = dailyRecords.find(r => r.date === todayStr)?.focusMinutes || 0;
            targetMinutes = 60;
        } else if (period === 'weekly') {
            const today = new Date();
            for (let i = 6; i >= 0; i--) {
                let d = new Date(today);
                d.setDate(d.getDate() - i);
                let dateStr = d.toISOString().split('T')[0];
                totalMinutes += dailyRecords.find(r => r.date === dateStr)?.focusMinutes || 0;
            }
            targetMinutes = 60 * 7;
        } else { // monthly
            const today = new Date();
            for (let i = 29; i >= 0; i--) {
                let d = new Date(today);
                d.setDate(d.getDate() - i);
                let dateStr = d.toISOString().split('T')[0];
                totalMinutes += dailyRecords.find(r => r.date === dateStr)?.focusMinutes || 0;
            }
            targetMinutes = 60 * 30;
        }

        const hours = Math.floor(totalMinutes / 60);
        const mins = Math.floor(totalMinutes % 60);

        // 목표 달성률 계산 (최대 100%)
        const avgRate = Math.min(100, Math.round((totalMinutes / targetMinutes) * 100));
        const activeDays = dailyRecords.length; // 향후 연속 출석일수로 고도화 가능

        return {
            totalTime: hours > 0 ? `${hours}h ${mins}m` : `${mins}m`,
            avgRate,
            streak: `${activeDays}일`,
            monthlyCoins: userStats.monthlyCoins
        };
    };

    const stats = getStats();
    const currentData = getData();

    // Dynamic Advice Logic
    const getAdvice = () => {
        const msgs = [];

        // Level based
        if (userStats.level <= 3) msgs.push("아직은 새끼 고양이 단계네요! 매일 30분씩 꾸준히 달리면 금방 성장할 거예요.");
        else if (userStats.level <= 7) msgs.push("치타처럼 빠른 속도로 성장하고 계시군요! 훌륭합니다.");
        else msgs.push("당신은 진정한 정글의 왕 사자입니다! 이제 집중은 당신의 본능이 되었군요.");

        // Data based
        const avg = stats.avgRate;
        if (avg < 30) msgs.push("시작이 반입니다. 하루 딱 1시간만 스마트폰을 멀리하고 타이머를 켜보세요.");
        else if (avg > 80) msgs.push("놀라운 몰입도입니다! 하지만 번아웃이 오지 않도록 50분 집중 후 10분 휴식은 필수입니다.");
        else msgs.push("안정적인 페이스를 유지하고 있어요. 가장 중요한 테스크 하나를 오전에 끝내면 하루가 가벼워집니다.");

        // Random pick
        return msgs[Math.floor(Math.random() * msgs.length)];
    };

    // Advice is memoized ideally, but for now simple function call (re-renders on state change is fine)
    const currentAdvice = getAdvice();

    const handleShare = async (type: 'link' | 'sns') => {
        const shareText = `[Hi-Five Focus] ${period === 'daily' ? '오늘' : '이번 주'} 나의 집중 기록! 🦁\n성취율: ${stats.avgRate}%\n총 집중 시간: ${stats.totalTime}\n함께 몰입해요! 🔥`;
        const shareUrl = window.location.href;

        if (type === 'sns' && navigator.share) {
            try {
                await navigator.share({
                    title: 'Hi-Five Focus Report',
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                console.log('Share failed', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
                setToast("✅ 리포트가 클립보드에 복사되었습니다!");
                setTimeout(() => setToast(null), 3000);
            } catch (err) {
                setToast("❌ 복사에 실패했습니다.");
                setTimeout(() => setToast(null), 3000);
            }
        }
    };

    // Radial chart calculation
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (stats.avgRate / 100) * circumference;

    return (
        <main className="report-container">
            <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Link
                        href="/"
                        style={{
                            background: "var(--surface-alt)",
                            border: "1px solid var(--glass-border)",
                            borderRadius: "12px",
                            padding: "8px 16px",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "var(--foreground)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            textDecoration: "none"
                        }}
                    >
                        <span>←</span> HOME
                    </Link>
                    <h1 style={{ fontSize: "1.2rem", fontWeight: 800 }}>MY REPORT</h1>
                </div>
                <div className="gold-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '6px 12px' }}>
                    <span style={{ fontSize: '0.7rem', opacity: 0.9, fontWeight: 500 }}>{user?.displayName || '사용자'} 님</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Lv.{userStats.level}</span>
                </div>
            </header>

            <div className="report-tab-group">
                <button className={`report-tab ${period === 'daily' ? 'active' : ''}`} onClick={() => setPeriod('daily')}>일간</button>
                <button className={`report-tab ${period === 'weekly' ? 'active' : ''}`} onClick={() => setPeriod('weekly')}>주간</button>
                <button className={`report-tab ${period === 'monthly' ? 'active' : ''}`} onClick={() => setPeriod('monthly')}>월간</button>
            </div>

            {/* Advice Section */}
            <div className="infographic-card" style={{ background: "rgba(0, 255, 142, 0.05)", borderStyle: "dashed", borderColor: "var(--primary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span className="advice-badge">하이파이브의 조언 💡</span>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--foreground)", lineHeight: 1.5, fontWeight: 500, wordBreak: "keep-all" }}>
                    "{currentAdvice}"
                </p>
            </div>

            <div className="infographic-card" style={{ textAlign: 'center' }}>
                <div className="radial-progress-container">
                    <svg className="radial-progress-svg" width="140" height="140">
                        <circle className="radial-progress-bg" cx="70" cy="70" r={radius} />
                        <circle
                            className="radial-progress-value"
                            cx="70" cy="70" r={radius}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                        />
                    </svg>
                    <div className="radial-center-text">
                        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stats.avgRate}%</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>목표 달성률</div>
                    </div>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                    <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{stats.totalTime}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>총 집중 시간</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{stats.streak}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>누적 기록일</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>💰 {stats.monthlyCoins.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>보유 코인</div>
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <div className="chart-header">
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>
                        {period === 'daily' ? "HOURLY FOCUS" :
                            period === 'weekly' ? "WEEKLY TREND" : "MONTHLY TREND"}
                    </h3>
                </div>

                <div className="chart-bars">
                    {currentData.map((d, i) => (
                        <div key={i} className="chart-bar-wrapper">
                            <div
                                className="chart-bar-fill"
                                style={{ height: `${d.value}%`, minHeight: '4px' }}
                            ></div>
                            <span className="chart-label">{d.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="share-group">
                <button className="share-btn" onClick={() => handleShare('link')}>🔗 링크 복사</button>
                <button className="share-btn" onClick={() => handleShare('sns')} style={{ background: 'var(--primary)', color: '#000' }}>📤 공유하기</button>
            </div>

            {toast && <div className="toast-message">{toast}</div>}

            <footer className="report-footer" style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.4, fontSize: '0.7rem' }}>
                Hi-Five Focus Report System
            </footer>
        </main>
    );
}
