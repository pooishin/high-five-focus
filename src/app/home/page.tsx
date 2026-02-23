"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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

interface UserStats {
  exp: number;
  level: number;
  coins: number;
  monthlyCoins: number;
}

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (!user.onboardingCompleted) {
      router.push('/onboarding');
    }
  }, [user, router]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<UserStats>({ exp: 0, level: 1, coins: 0, monthlyCoins: 0 });
  const [remainingEnergySeconds, setRemainingEnergySeconds] = useState(480 * 60);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showCompletion, setShowCompletion] = useState({ visible: false, title: "" });
  const [reorderingTaskId, setReorderingTaskId] = useState<number | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMinutes, setEditMinutes] = useState(0);

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.uid).single();
        if (profile) setStats({ exp: profile.exp, level: profile.level, coins: profile.coins, monthlyCoins: 0 });

        const { data: remoteTasks } = await supabase.from('tasks').select('*').eq('user_id', user.uid).order('position', { ascending: true });
        if (remoteTasks && remoteTasks.length > 0) {
          setTasks(remoteTasks.map((t: any) => ({
            id: t.id,
            title: t.title,
            totalSeconds: t.total_seconds,
            remainingSeconds: t.remaining_seconds,
            status: t.status
          })));
        } else {
          setTasks([]);
        }
      };
      loadData();
    }
  }, [user]);

  // 사운드 및 진동 재생 함수
  const playFeedback = (type: 'short' | 'long') => {
    // 사운드
    try {
      const audio = new Audio(type === 'short' ? '/assets/sounds/clapping.mp3' : '/assets/sounds/clapping_long.mp3');
      audio.volume = 0.7;
      audio.play().catch(e => console.log('Audio play failed (interaction required):', e));
    } catch (e) {
      console.error('Audio setup failed:', e);
    }

    // 진동 (Haptic)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (type === 'short') {
        navigator.vibrate(200); // 200ms 진동
      } else {
        navigator.vibrate([100, 50, 100, 50, 300]); // 패턴 진동
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => {
        const activeIdx = prevTasks.findIndex(t => t.status === "active");
        if (activeIdx === -1) return prevTasks;

        setRemainingEnergySeconds(prev => Math.max(0, prev - 1));

        const newTasks = [...prevTasks];
        const nextSeconds = newTasks[activeIdx].remainingSeconds - 1;

        // 0초 도달 시 알림 및 피드백 (한 번만 실행되도록 0일 때만)
        if (nextSeconds === 0) {
          playFeedback('short');
          if (Notification.permission === 'granted') {
            new Notification("테스크 완료! 👏", {
              body: `${newTasks[activeIdx].title} 끝! 고생하셨습니다.`,
              icon: '/assets/images/logo.svg'
            });
          }
        }

        newTasks[activeIdx] = { ...newTasks[activeIdx], remainingSeconds: nextSeconds };
        return newTasks;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const activeTask = tasks.find(t => t.status === "active");
    if (activeTask && user) {
      const syncTimer = setTimeout(async () => {
        await supabase.from('tasks').update({ remaining_seconds: activeTask.remainingSeconds, status: 'active' }).eq('id', activeTask.id);
      }, 5000);
      return () => clearTimeout(syncTimer);
    }
  }, [tasks, user]);

  useEffect(() => {
    const activeTask = tasks.find(t => t.status === "active");
    if (activeTask && isFocusMode) {
      const mins = Math.floor(activeTask.remainingSeconds / 60);
      const secs = activeTask.remainingSeconds % 60;
      document.title = `${mins}:${secs < 10 ? '0' : ''}${secs} - Hi-Five Focus`;
    } else {
      document.title = "Hi-Five Focus | 5-슬롯 타임박싱";
    }
  }, [tasks, isFocusMode]);

  const handleTaskCompletion = async (title: string) => {
    const completedTask = tasks.find(t => t.title === title);
    if (!completedTask) return;
    const isOvertime = completedTask.remainingSeconds < 0;
    const reward = isOvertime ? 5 : 10;

    // 모든 테스크 완료 체크
    const pendingTasks = tasks.filter(t => t.id !== completedTask.id && t.status !== 'completed');
    if (pendingTasks.length === 0) {
      playFeedback('long');
    } else {
      playFeedback('short');
    }

    setStats(prev => {
      const newExp = prev.exp + (isOvertime ? 20 : 50);
      return { ...prev, exp: newExp, level: Math.floor(newExp / 100) + 1, coins: prev.coins + reward };
    });

    if (user) {
      await supabase.rpc('increment_stats', { user_id: user.uid, exp_bonus: 50, coin_bonus: reward });
      await supabase.from('tasks').update({ status: 'completed', remaining_seconds: 0 }).eq('id', completedTask.id);
    }
    setShowCompletion({ visible: true, title });
    setTimeout(() => setShowCompletion({ visible: false, title: "" }), 3000);
  };

  const getFocusMessage = () => {
    const activeTask = tasks.find(t => t.status === "active");
    if (!activeTask) return "몰입할 과업을 선택하고 ▶ 버튼을 눌러주세요!";
    const ratio = activeTask.remainingSeconds / activeTask.totalSeconds;
    if (ratio > 0.8) return `🔥 ${activeTask.title}에 몰입을 시작합니다. 지금이 가장 중요해요!`;
    if (ratio > 0.5) return `⚡️ 안정적인 페이스입니다. 절반이나 왔어요!`;
    if (ratio > 0.2) return `⚠️ 마감이 얼마 남지 않았어요! 조금만 더 힘내세요.`;
    return ratio > 0 ? `🚨 마지막 스퍼트! 숨을 고르고 끝까지 몰입하세요.` : "수고하셨습니다! 하이파이브를 준비하세요. 🤚";
  };

  const formatTimeHMS = (secs: number) => {
    const isNeg = secs < 0;
    const s_total = Math.abs(Math.round(secs));
    const h = Math.floor(s_total / 3600);
    const m = Math.floor((s_total % 3600) / 60);
    const s = s_total % 60;
    return `${isNeg ? '-' : ''}${h > 0 ? h + 'h ' : ''}${m > 0 || h > 0 ? m.toString().padStart(2, '0') + 'm ' : ''}${s.toString().padStart(2, '0')}s`;
  };

  const handleToggleFocusMode = () => {
    const nextState = !isFocusMode;
    if (nextState) {
      if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
        Notification.requestPermission();
      }
      playFeedback('short');
    }
    setIsFocusMode(nextState);
  };

  // 스와이프 제스처 처리
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

    // 좌우 이동이 상하 이동보다 2배 이상 크고, 최소 거리 이상일 때만 스와이프 인식
    if (Math.abs(distanceX) > Math.abs(distanceY) * 2 && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        router.push('/report');
      } else {
        router.push('/plan');
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  const formatTimeHM = (secs: number) => `${Math.floor(secs / 3600)}h ${Math.floor((secs % 3600) / 60)}m`;

  const getProgressColor = (remaining: number, total: number) => {
    if (remaining < 0) return "var(--error)";
    const ratio = remaining / total;
    if (ratio > 0.5) return "var(--primary)";
    if (ratio > 0.2) return "var(--warning)";
    return "var(--error)";
  };

  const handleToggleTask = async (id: number) => {
    const target = tasks.find(t => t.id === id);
    if (!target) return;
    const newStatus = target.status === "active" ? "pending" : "active";
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : (newStatus === "active" && t.status === "active" ? { ...t, status: "pending" } : t)));
    if (user) {
      if (newStatus === "active") await supabase.from('tasks').update({ status: 'pending' }).eq('user_id', user.uid).eq('status', 'active');
      await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
    }
  };

  const moveTask = async (idx: number, dir: 'up' | 'down') => {
    const newIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= tasks.length) return;
    const newTasks = [...tasks];
    const [moved] = newTasks.splice(idx, 1);
    newTasks.splice(newIdx, 0, moved);
    setTasks(newTasks);
    if (user) await supabase.from('tasks').upsert(newTasks.map((t, i) => ({ id: t.id, user_id: user.uid, title: t.title, total_seconds: t.totalSeconds, remaining_seconds: t.remainingSeconds, status: t.status, position: i })));
  };

  const handlePointerDown = (id: number) => longPressTimer.current = setTimeout(() => setReorderingTaskId(id), 2000);
  const handlePointerUp = () => longPressTimer.current && clearTimeout(longPressTimer.current);

  const handleEditClick = (task: Task) => {
    if (reorderingTaskId) return;
    setEditingTask(task);
    setEditTitle(task.title);
    setEditMinutes(task.totalSeconds / 60);
  };

  const handleAddNewTask = () => {
    setEditingTask({ id: -1, title: "", totalSeconds: 60 * 60, remainingSeconds: 60 * 60, status: "pending" });
    setEditTitle("");
    setEditMinutes(60);
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;
    const newTotal = editMinutes * 60;

    if (editingTask.id === -1) {
      if (!user) return;
      const newTask = {
        user_id: user.uid,
        title: editTitle || "새로운 과업",
        total_seconds: newTotal,
        remaining_seconds: newTotal,
        status: 'pending',
        position: tasks.length
      };

      const { data, error } = await supabase.from('tasks').insert([newTask]).select();
      if (data && data[0]) {
        const createdTask: Task = {
          id: data[0].id,
          title: data[0].title,
          totalSeconds: data[0].total_seconds,
          remainingSeconds: data[0].remaining_seconds,
          status: data[0].status
        };
        setTasks(prev => [...prev, createdTask]);
      }
    } else {
      setTasks(prev => prev.map(t => t.id === editingTask.id ? { ...t, title: editTitle, totalSeconds: newTotal, remainingSeconds: newTotal } : t));
      if (user) await supabase.from('tasks').update({ title: editTitle, total_seconds: newTotal, remaining_seconds: newTotal }).eq('id', editingTask.id);
    }
    setEditingTask(null);
  };

  const getCharEmoji = (lvl: number) => {
    const active = tasks.find(t => t.status === "active");
    if (active && active.remainingSeconds < 0) return "😿";
    if (lvl >= 10) return "🦁";
    if (lvl >= 6) return "🐆";
    if (lvl >= 3) return "🐈";
    return "🐈‍⬛";
  };

  if (!user) return null;

  return (
    <main
      className="home-container"
      style={{ position: 'relative', minHeight: '100vh', touchAction: 'pan-y', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.4rem)', paddingBottom: '3rem' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {showCompletion.visible && (
        <div className="completion-overlay animate-pop-in">
          <div className="completion-content">
            <div className="hand-icon">✋</div>
            <h2 className="completion-title">HIGH FIVE!</h2>
            <p className="completion-subtitle">"{showCompletion.title}" 완료!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => router.push('/plan')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
            <Image src="/assets/images/logo.svg" width={28} height={28} alt="Settings" />
          </button>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 900 }}>Hi-Five Focus</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>Lv.{stats.level}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{stats.exp} EXP</div>
          </div>
          <button onClick={handleToggleFocusMode} style={{ background: isFocusMode ? 'var(--primary)' : 'var(--surface-alt)', color: isFocusMode ? '#000' : 'var(--foreground)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>
            {isFocusMode ? '🔥 FOCUS ON' : 'START FOCUS'}
          </button>
        </div>
      </header>

      <div className="rainbow-container animate-fade-in" style={{ margin: '0.5rem' }}>
        <div className="rainbow-inner" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
            <Link href="/report" className="btn-report">REPORT 📊</Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.7 }}>오늘의 가용 에너지</span>
            <span className={isFocusMode ? "rainbow-text" : ""} style={{ fontSize: '1.1rem', fontWeight: 800, color: isFocusMode ? 'transparent' : 'var(--primary)' }}>
              {formatTimeHMS(remainingEnergySeconds)}
            </span>
          </div>

          {isFocusMode && <div className="focus-message animate-fade-in" style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--glass-border)', marginBottom: '0.75rem', color: 'var(--primary)' }}>{getFocusMessage()}</div>}

          <div className="dashboard-list" style={{ padding: 0 }}>
            {tasks.length === 0 && (
              <div style={{ padding: '1.25rem 1rem', textAlign: 'center', opacity: 0.8, marginBottom: '0.75rem', border: '1px dashed var(--glass-border)', borderRadius: '12px', background: 'rgba(0,0,0,0.2)' }}>
                <p style={{ marginBottom: '0.25rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>오늘의 계획을 세워보세요! 📝</p>
                <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>빈 슬롯을 눌러 할 일을 추가할 수 있습니다.</p>
              </div>
            )}
            {tasks.map((task, idx) => {
              const ratio = (task.totalSeconds - task.remainingSeconds) / task.totalSeconds;
              const isActive = task.status === "active";
              const isCompleted = task.status === "completed";
              const color = isCompleted ? '#FFD700' : getProgressColor(task.remainingSeconds, task.totalSeconds);

              return (
                <div key={task.id} className={`task-card-horizontal ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`} style={{ marginBottom: '0.5rem', border: `1px solid ${isActive || isCompleted ? color : 'var(--glass-border)'}`, position: 'relative', overflow: 'hidden' } as any} onPointerDown={() => !isCompleted && handlePointerDown(task.id)} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} onClick={() => !isCompleted && !reorderingTaskId && handleEditClick(task)}>
                  {/* 진행 바 배경 */}
                  {!isCompleted && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${Math.min(Math.max(ratio * 100, 0), 100)}%`,
                      background: color,
                      opacity: 0.15,
                      zIndex: 0,
                      transition: 'width 1s linear'
                    }} />
                  )}

                  <div className="task-info-group" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="task-main-info" style={{ justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700 }}>{isCompleted && "✨ "}{task.title}</span>
                      {isCompleted ? <span className="gold-badge">COMPLETED</span> : <span className="task-time-badge">{formatTimeHM(task.totalSeconds)}</span>}
                    </div>
                    {!reorderingTaskId && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>{isCompleted ? '집중 완료!' : `${formatTimeHMS(task.remainingSeconds)} 남음`}</span>
                      </div>
                    )}
                  </div>
                  {!reorderingTaskId && !isCompleted && (
                    <div className="task-controls" style={{ marginLeft: '1rem', display: 'flex', gap: '0.6rem', position: 'relative', zIndex: 1 }}>
                      <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleToggleTask(task.id); }} style={{ background: isActive ? '#000' : 'var(--surface)', color: isActive ? color : 'var(--foreground)' }}>{isActive ? '⏸' : '▶'}</button>
                      {task.remainingSeconds <= 0 && (
                        <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleTaskCompletion(task.title); }} style={{ background: 'var(--primary)', color: '#000' }}>✅</button>
                      )}
                    </div>
                  )}
                  {reorderingTaskId === task.id && (
                    <div className="task-controls" style={{ position: 'relative', zIndex: 1 }}>
                      <button onClick={(e) => { e.stopPropagation(); moveTask(idx, 'up'); }}>🔼</button>
                      <button onClick={(e) => { e.stopPropagation(); moveTask(idx, 'down'); }}>🔽</button>
                      <button onClick={(e) => { e.stopPropagation(); setReorderingTaskId(null); }}>Done</button>
                    </div>
                  )}
                </div>
              );
            })}

            {Array.from({ length: Math.max(0, 5 - tasks.length) }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="task-card-horizontal empty-slot"
                onClick={handleAddNewTask}
                style={{
                  marginBottom: '0.5rem',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  opacity: 0.6,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '64px',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>+ 할 일 추가</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', padding: '0 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.9rem' }}>💰 <b>{stats.coins}</b></div>
            <div className="avatar-floating-mini" style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid var(--primary)' }}>{getCharEmoji(stats.level)}</div>
          </div>
        </div>
      </div>

      {editingTask && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>테스크 편집</h2>
            <label className="edit-label">과업명</label>
            <input className="edit-input" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
            <label className="edit-label">시간 (분)</label>
            <input type="number" className="edit-input" value={editMinutes} onChange={e => setEditMinutes(Number(e.target.value))} />
            <div className="edit-actions">
              <button className="btn-secondary" onClick={() => setEditingTask(null)}>취소</button>
              <button className="btn-primary" onClick={handleSaveEdit}>저장</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
