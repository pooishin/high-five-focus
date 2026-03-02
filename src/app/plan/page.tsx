"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Task {
  id: any;
  title: string;
  totalSeconds: number;
  remainingSeconds: number;
  status: "active" | "pending" | "completed";
}

export default function PlanPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Project Proposal", totalSeconds: 90 * 60, remainingSeconds: 90 * 60, status: "pending" },
    { id: 2, title: "Team Meeting", totalSeconds: 45 * 60, remainingSeconds: 45 * 60, status: "pending" },
    { id: 3, title: "Code Review", totalSeconds: 60 * 60, remainingSeconds: 60 * 60, status: "pending" },
    { id: 4, title: "Client Call", totalSeconds: 30 * 60, remainingSeconds: 30 * 60, status: "pending" },
    { id: 5, title: "Email Cleanup", totalSeconds: 30 * 60, remainingSeconds: 30 * 60, status: "pending" },
  ]);

  const [totalWorkHours, setTotalWorkHours] = useState(0);
  const [totalWorkMinutes, setTotalWorkMinutes] = useState(0);
  const [focusHours, setFocusHours] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);

  useEffect(() => {
    if (user) {
      const loadPlan = async () => {
        const { data: profile } = await supabase.from('profiles').select('last_plan_at, plan_total_seconds, plan_focus_seconds').eq('id', user.uid).single();

        if (profile) {
          const lastPlanAt = profile.last_plan_at ? new Date(profile.last_plan_at) : null;
          const isToday = lastPlanAt && lastPlanAt.toDateString() === new Date().toDateString();

          if (isToday) {
            // 오늘 내 재방문인 경우 기존 값 로드
            const totalSecs = profile.plan_total_seconds || 0;
            const focusSecs = profile.plan_focus_seconds || 0;
            setTotalWorkHours(Math.floor(totalSecs / 3600));
            setTotalWorkMinutes(Math.floor((totalSecs % 3600) / 60));
            setFocusHours(Math.floor(focusSecs / 3600));
            setFocusMinutes(Math.floor((focusSecs % 3600) / 60));
          } else {
            // 새 날인 경우 0으로 초기화
            setTotalWorkHours(0);
            setTotalWorkMinutes(0);
            setFocusHours(0);
            setFocusMinutes(0);
          }
        }
      };
      loadPlan();
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const totalWorkTime = totalWorkHours * 60 + totalWorkMinutes;
  const focusTime = focusHours * 60 + focusMinutes;

  const isStartEnabled = totalWorkTime > 0 && focusTime > 0;

  const handleStart = async () => {
    if (user) {
      const now = new Date();
      const { data: profile } = await supabase.from('profiles').select('last_plan_at').eq('id', user.uid).single();
      const lastPlanAt = profile?.last_plan_at ? new Date(profile.last_plan_at) : null;
      const isToday = lastPlanAt && lastPlanAt.toDateString() === now.toDateString();

      // 오늘의 총 에너지 초 단위 계산
      const totalSecs = totalWorkHours * 3600 + totalWorkMinutes * 60;
      const focusSecs = focusHours * 3600 + focusMinutes * 60;

      if (!isToday) {
        // 날짜가 바뀌었거나 처음인 경우에만 기존 테스크 초기화
        await supabase.from('tasks').delete().eq('user_id', user.uid);
      }

      // 프로필에 오늘 설정값 저장
      await supabase.from('profiles').update({
        last_plan_at: now.toISOString(),
        plan_total_seconds: totalSecs,
        plan_focus_seconds: focusSecs
      }).eq('id', user.uid);

      // 시작 보상 (새 날인 경우에만)
      if (!isToday) {
        await supabase.rpc('increment_stats', {
          user_id: user.uid,
          exp_bonus: 0,
          coin_bonus: 10
        });
      }

      router.push('/home');
    }
  };

  if (!user) return null;

  return (
    <main className="setup-view animate-fade-in">
      <header style={{ marginBottom: '0.2rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '0.1rem' }}>
          <Image src="/assets/images/logo.svg" width={32} height={32} alt="Logo" />
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.1rem' }}>TODAY'S PLAN</h1>
        <p style={{ opacity: 0.8, color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem' }}>오늘의 에너지를 결정해 주세요!</p>
      </header>

      <div className="setup-card" style={{ padding: '1rem' }}>
        {/* 원형 프로그레스 */}
        {totalWorkTime > 0 && (
          <div style={{ marginBottom: '0.6rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            {/* 왼쪽 범례 - 총 에너지 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>총 에너지</span>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }}></div>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)' }}>
                {totalWorkHours}:{totalWorkMinutes.toString().padStart(2, '0')}
              </div>
            </div>

            {/* 중앙 원형 차트 */}
            <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
              <svg width="110" height="110" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                <circle cx="55" cy="55" r="48" fill="none" stroke="var(--primary)" strokeWidth="6" strokeDasharray={`${2 * Math.PI * 48}`} strokeDashoffset="0" strokeLinecap="round" />
                <circle cx="55" cy="55" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                <circle cx="55" cy="55" r="38" fill="none" stroke={focusTime > totalWorkTime ? 'var(--error)' : '#FFD700'} strokeWidth="6" strokeDasharray={`${2 * Math.PI * 38}`} strokeDashoffset={`${2 * Math.PI * 38 * (1 - Math.min(focusTime / totalWorkTime, 1))}`} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.3s ease' }} />
              </svg>
            </div>

            {/* 오른쪽 범례 - 집중 비율 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFD700' }}></div>
                <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>집중 비율</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: focusTime > totalWorkTime ? 'var(--error)' : '#FFD700' }}>
                {Math.round((focusTime / totalWorkTime) * 100)}%
              </div>
            </div>
          </div>
        )}

        {focusTime > totalWorkTime && (
          <div style={{ background: 'rgba(255, 82, 82, 0.1)', border: '1px solid var(--error)', borderRadius: '10px', padding: '0.6rem 0.9rem', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--error)', textAlign: 'center' }}>
            ⚠️ 집중 시간이 총 에너지를 초과했습니다!
          </div>
        )}

        <div className="setup-input-group" style={{ marginBottom: '0.75rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
          <label className="setup-label" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>🕒 오늘의 총 에너지</label>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <input type="number" className="setup-input" placeholder="시간" value={totalWorkHours} onChange={(e) => setTotalWorkHours(Math.max(0, Number(e.target.value)))} style={{ textAlign: 'center', padding: '0.6rem' }} />
              <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.2rem', textAlign: 'center' }}>시간</div>
            </div>
            <div style={{ fontSize: '1.1rem', opacity: 0.5, fontWeight: 700 }}>:</div>
            <div style={{ flex: 1 }}>
              <input type="number" className="setup-input" placeholder="분" value={totalWorkMinutes} onChange={(e) => setTotalWorkMinutes(Math.max(0, Math.min(59, Number(e.target.value))))} style={{ textAlign: 'center', padding: '0.6rem' }} />
              <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.2rem', textAlign: 'center' }}>분</div>
            </div>
          </div>
        </div>

        <div className="setup-input-group" style={{ marginBottom: '1rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
          <label className="setup-label" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔥 목표 집중 시간</label>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <input type="number" className="setup-input" placeholder="시간" value={focusHours} onChange={(e) => setFocusHours(Math.max(0, Number(e.target.value)))} style={{ textAlign: 'center', padding: '0.6rem' }} />
              <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.2rem', textAlign: 'center' }}>시간</div>
            </div>
            <div style={{ fontSize: '1.1rem', opacity: 0.5, fontWeight: 700 }}>:</div>
            <div style={{ flex: 1 }}>
              <input type="number" className="setup-input" placeholder="분" value={focusMinutes} onChange={(e) => setFocusMinutes(Math.max(0, Math.min(59, Number(e.target.value))))} style={{ textAlign: 'center', padding: '0.6rem' }} />
              <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.2rem', textAlign: 'center' }}>분</div>
            </div>
          </div>
        </div>

        <button className="btn-primary btn-start" disabled={!isStartEnabled} onClick={handleStart}>
          START
        </button>

        <button onClick={logout} style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--foreground-muted)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
          로그아웃
        </button>
      </div>

      <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', opacity: 0.5 }}>
        충분한 휴식과 집중은 비례합니다.
      </p>
    </main>
  );
}
