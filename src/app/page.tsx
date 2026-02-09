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
  // Auth Check
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (!user.onboardingCompleted) {
      router.push('/onboarding');
    }
  }, [user, router]);

  // Logic States
  const [isPlanSet, setIsPlanSet] = useState(false);
  const [totalWorkTime, setTotalWorkTime] = useState(480);
  const [remainingEnergySeconds, setRemainingEnergySeconds] = useState(totalWorkTime * 60);
  const [focusTime, setFocusTime] = useState(180);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Project Proposal", totalSeconds: 90 * 60, remainingSeconds: 75 * 60, status: "pending" },
    { id: 2, title: "Team Meeting", totalSeconds: 45 * 60, remainingSeconds: 45 * 60, status: "pending" },
    { id: 3, title: "Code Review", totalSeconds: 60 * 60, remainingSeconds: 60 * 60, status: "pending" },
    { id: 4, title: "Client Call", totalSeconds: 30 * 60, remainingSeconds: 30 * 60, status: "pending" },
    { id: 5, title: "Email Cleanup", totalSeconds: 30 * 60, remainingSeconds: 30 * 60, status: "pending" },
  ]);

  // Gamification States
  const [stats, setStats] = useState<UserStats>({ exp: 0, level: 1, coins: 0, monthlyCoins: 0 });
  const [showCompletion, setShowCompletion] = useState({ visible: false, title: "" });

  // Reordering Logic States
  const [reorderingTaskId, setReorderingTaskId] = useState<number | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // Editing State
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMinutes, setEditMinutes] = useState(0);

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }

  // Timer Engine
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => {
        const activeIdx = prevTasks.findIndex(t => t.status === "active");
        if (activeIdx === -1) return prevTasks;

        setRemainingEnergySeconds(prev => Math.max(0, prev - 1));

        const newTasks = [...prevTasks];
        const activeTask = { ...newTasks[activeIdx] };

        // 타임오버 시에도 계속 카운트다운 (음수 허용)
        activeTask.remainingSeconds = activeTask.remainingSeconds - 1;

        newTasks[activeIdx] = activeTask;
        return newTasks;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sync Timer with Supabase (Throttled)
  useEffect(() => {
    const activeTask = tasks.find(t => t.status === "active");
    if (activeTask && user) {
      // 5초마다 한 번씩만 DB 업데이트 (부하 방지)
      const syncTimer = setTimeout(async () => {
        const { error } = await supabase
          .from('tasks')
          .update({ remaining_seconds: activeTask.remainingSeconds, status: 'active' })
          .eq('id', activeTask.id);
        if (error) console.error('Task sync error:', error);
      }, 5000);
      return () => clearTimeout(syncTimer);
    }
  }, [tasks, user]);
  // Browser Tab Utility & Smart Messages
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

  const getFocusMessage = () => {
    const activeTask = tasks.find(t => t.status === "active");
    if (!activeTask) return "몰입할 과업을 선택하고 ▶ 버튼을 눌러주세요!";

    const ratio = activeTask.remainingSeconds / activeTask.totalSeconds;
    if (ratio > 0.8) return `🔥 ${activeTask.title}에 몰입을 시작합니다. 지금이 가장 중요해요!`;
    if (ratio > 0.5) return `⚡️ 안정적인 페이스입니다. 절반이나 왔어요!`;
    if (ratio > 0.2) return `⚠️ 마감이 얼마 남지 않았어요! 조금만 더 힘내세요.`;
    if (ratio > 0) return `🚨 마지막 스퍼트! 숨을 고르고 끝까지 몰입하세요.`;
    return "수고하셨습니다! 하이파이브를 준비하세요. 🤚";
  };

  // Load Data from Supabase
  useEffect(() => {
    if (user) {
      const loadData = async () => {
        // Load Profile / Stats
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.uid)
          .single();

        if (profile) {
          setStats({
            exp: profile.exp,
            level: profile.level,
            coins: profile.coins,
            monthlyCoins: 0 // View only
          });
        }

        // Load Tasks
        const { data: remoteTasks } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.uid)
          .order('position', { ascending: true });

        if (remoteTasks && remoteTasks.length > 0) {
          setTasks(remoteTasks.map((t: any) => ({
            id: t.id,
            title: t.title,
            totalSeconds: t.total_seconds,
            remainingSeconds: t.remaining_seconds,
            status: t.status
          })));
          setIsPlanSet(true);
        }
      };
      loadData();
    }
  }, [user]);

  const handleTaskCompletion = async (title: string) => {
    const completedTask = tasks.find(t => t.title === title);
    if (!completedTask) return;

    const isOvertime = completedTask.remainingSeconds < 0;
    const isAllCompleted = tasks.every(t => t.id === -1 || t.status === "completed" || (t.title === title && t.status === "active"));

    // Penalty reward if overtime
    let reward = isOvertime ? 5 : 10;
    if (isAllCompleted && !isOvertime) reward += 50;

    // Optimistic UI Update
    setStats(prev => {
      const newExp = prev.exp + (isOvertime ? 20 : 50);
      const newLevel = Math.floor(newExp / 100) + 1;
      return { ...prev, exp: newExp, level: newLevel, coins: prev.coins + reward };
    });

    // Supabase Update
    if (user) {
      // Update Profile
      await supabase.rpc('increment_stats', {
        user_id: user.uid,
        exp_bonus: 50,
        coin_bonus: reward
      });

      // Log Focus
      await supabase.from('focus_logs').insert([{
        user_id: user.uid,
        focus_minutes: 0, // Calculated elsewhere or just event log
        tasks_completed: 1,
        coins_earned: reward
      }]);

      // Update Task Status
      const completedTask = tasks.find(t => t.title === title);
      if (completedTask) {
        await supabase
          .from('tasks')
          .update({ status: 'completed', remaining_seconds: 0 })
          .eq('id', completedTask.id);
      }
    }

    setShowCompletion({ visible: true, title });

    setTimeout(() => {
      setShowCompletion({ visible: false, title: "" });
    }, 3000);
  };

  // Derived States
  const currentTaskTotalMins = tasks.filter(t => t.status !== "completed").reduce((sum, task) => sum + task.remainingSeconds / 60, 0);
  const isOverCapacity = currentTaskTotalMins > (remainingEnergySeconds / 60);

  // Character Evolution mapping
  const getCharEmoji = (level: number) => {
    const activeTask = tasks.find(t => t.status === "active");
    const isOvertime = activeTask && activeTask.remainingSeconds < 0;

    if (isOvertime) return "😿";

    if (level >= 10) return "🦁"; // Lion (Final)
    if (level >= 6) return "🐆"; // Cheetah
    if (level >= 3) return "🐈"; // Cat
    return "🐈‍⬛"; // Kitten (Black cat emoji as kitten)
  };

  // Formatting helpers
  const formatTimeHM = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const formatTimeHMS = (secs: number) => {
    const isNegative = secs < 0;
    const s_total = Math.abs(Math.round(secs));
    const h = Math.floor(s_total / 3600);
    const m = Math.floor((s_total % 3600) / 60);
    const s = s_total % 60;

    const hh = h > 0 ? `${h}h ` : '';
    const mm = m > 0 || h > 0 ? `${m.toString().padStart(2, '0')}m ` : '';
    const ss = `${s.toString().padStart(2, '0')}s`;

    return `${isNegative ? '-' : ''}${hh}${mm}${ss}`;
  };

  const getProgressColor = (remaining: number, total: number) => {
    if (remaining < 0) return "var(--error)"; // Overtime Status
    const ratio = remaining / total;
    if (ratio > 0.5) return "var(--primary)";
    if (ratio > 0.2) return "var(--warning)";
    return "var(--error)";
  };

  // Handlers
  const handleToggleTask = async (id: number) => {
    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask) return;

    const newStatus = targetTask.status === "active" ? "pending" : "active";

    // Optimistic UI Update
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: newStatus };
      }
      if (newStatus === "active" && t.status === "active") return { ...t, status: "pending" };
      return t;
    }));

    // Supabase Update
    if (user) {
      // 만약 active로 바꾸는 거라면 다른 active들을 pending으로 먼저 바꿈
      if (newStatus === "active") {
        await supabase.from('tasks').update({ status: 'pending' }).eq('user_id', user.uid).eq('status', 'active');
      }
      await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
    }
  };

  const moveTask = async (idx: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= tasks.length) return;
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(idx, 1);
    newTasks.splice(newIdx, 0, movedTask);

    setTasks(newTasks);

    // Supabase Update Positions
    if (user) {
      const updates = newTasks.map((t, i) => ({
        id: t.id,
        user_id: user.uid,
        title: t.title,
        total_seconds: t.totalSeconds,
        remaining_seconds: t.remainingSeconds,
        status: t.status,
        position: i
      }));
      await supabase.from('tasks').upsert(updates);
    }
  };

  const handlePointerDown = (id: number) => {
    longPressTimer.current = setTimeout(() => {
      setReorderingTaskId(id);
    }, 2000);
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const handleEditClick = (task: Task) => {
    if (reorderingTaskId) return;
    setEditingTask(task);
    setEditTitle(task.title);
    setEditMinutes(task.totalSeconds / 60);
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;
    const newTotalSecs = editMinutes * 60;

    setTasks(prev => prev.map(t =>
      t.id === editingTask.id
        ? { ...t, title: editTitle, totalSeconds: newTotalSecs, remainingSeconds: newTotalSecs }
        : t
    ));

    // Supabase Update
    if (user) {
      await supabase
        .from('tasks')
        .update({
          title: editTitle,
          total_seconds: newTotalSecs,
          remaining_seconds: newTotalSecs
        })
        .eq('id', editingTask.id);
    }

    setEditingTask(null);
  };

  if (!isPlanSet) {
    const isStartEnabled = totalWorkTime > 0 && focusTime > 0;

    return (
      <main className="setup-view animate-fade-in">
        <header style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Image src="/assets/images/logo.svg" width={64} height={64} alt="Nano Banana Logo" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>TODAY'S PLAN</h1>
          <p style={{ opacity: 0.8, color: 'var(--primary)', fontWeight: 700 }}>오늘의 에너지를 결정해 주세요!</p>
        </header>

        <div className="setup-card">
          <div className="setup-input-group">
            <label className="setup-label">🕒 오늘의 총 에너지 (분)</label>
            <input
              type="number"
              className="setup-input"
              placeholder="예: 480"
              value={totalWorkTime || ''}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setTotalWorkTime(Number(e.target.value))}
            />
          </div>
          <div className="setup-input-group">
            <label className="setup-label">🔥 목표 집중 시간 (분)</label>
            <input
              type="number"
              className="setup-input"
              placeholder="예: 180"
              value={focusTime || ''}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setFocusTime(Number(e.target.value))}
            />
          </div>

          <button
            className="btn-primary btn-start"
            disabled={!isStartEnabled}
            onClick={async () => {
              setIsPlanSet(true);
              setRemainingEnergySeconds(totalWorkTime * 60);

              if (user) {
                // Save Tasks to Supabase
                const tasksToInsert = tasks.map((t, index) => ({
                  user_id: user.uid,
                  title: t.title,
                  total_seconds: t.totalSeconds,
                  remaining_seconds: t.totalSeconds, // Reset to total on start
                  status: 'pending',
                  position: index
                }));

                const { error: deleteError } = await supabase.from('tasks').delete().eq('user_id', user.uid);
                console.log('Inserting tasks to Supabase:', tasksToInsert);
                const { error: insertError } = await supabase.from('tasks').insert(tasksToInsert);

                if (insertError) {
                  console.error('Task insert error detail:', insertError.message, insertError.details, insertError.hint);
                }

                // Initial Rewards
                const initialReward = 50 + (tasks.length * 10);
                await supabase.rpc('increment_stats', {
                  user_id: user.uid,
                  exp_bonus: 0,
                  coin_bonus: initialReward
                });

                setStats(prev => ({
                  ...prev,
                  coins: prev.coins + initialReward
                }));
              }
            }}
          >
            START
          </button>

          <button
            onClick={logout}
            style={{
              marginTop: '1.5rem',
              fontSize: '0.8rem',
              color: 'var(--foreground-muted)',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            로그아웃
          </button>
        </div>

        <p style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.5 }}>
          충분한 휴식과 집중은 비례합니다.
        </p>
      </main>
    );
  }

  return (
    <main style={{ paddingBottom: '80px' }}>
      {/* High-Five Completion Overlay */}
      {showCompletion.visible && (
        <div className="high-five-overlay">
          <div className="high-five-icon">🤚✨</div>
          <h2 style={{ color: '#FFD700', marginTop: '1.5rem' }}>HIGH FIVE!</h2>
          <p style={{ color: '#FFF' }}>"{showCompletion.title}" 완료!</p>
          <div className="reward-info">
            <div className="reward-coins">💰 +10 Coins</div>
            <div className="reward-exp">✨ +50 Focus EXP</div>
          </div>
        </div>
      )}

      <header style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => setIsPlanSet(false)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
            <Image src="/assets/images/logo.svg" width={28} height={28} alt="Settings" />
          </button>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 900 }}>Hi-Five Focus</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>Lv.{stats.level}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{stats.exp} EXP</div>
          </div>
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            style={{ background: isFocusMode ? 'var(--primary)' : 'var(--surface-alt)', color: isFocusMode ? '#000' : 'var(--foreground)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}
          >
            {isFocusMode ? '🔥 FOCUS ON' : 'START FOCUS'}
          </button>
        </div>
      </header>

      <div className="rainbow-container animate-fade-in">
        <div className="rainbow-inner">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
            <Link href="/report" className="btn-report">
              REPORT <span style={{ fontSize: '0.8rem' }}>📊</span>
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.7 }}>오늘의 가용 에너지</span>
            <span className={isFocusMode ? "rainbow-text" : ""} style={{ fontSize: '1.1rem', fontWeight: 800, color: isFocusMode ? 'transparent' : 'var(--primary)' }}>
              {formatTimeHMS(remainingEnergySeconds)}
            </span>
          </div>

          {isFocusMode && (
            <div className="focus-message animate-fade-in" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: '1px solid var(--glass-border)',
              marginBottom: '1rem',
              color: 'var(--primary)'
            }}>
              {getFocusMessage()}
            </div>
          )}

          {isOverCapacity && (
            <div className="warning-banner" style={{ marginBottom: '1.5rem' }}>
              🚨 <b>오버 캐퍼시티!</b> 테스크 시간이 총 시간을 {formatTimeHM((currentTaskTotalMins - totalWorkTime) * 60)} 초과했습니다.
            </div>
          )}

          <div className="dashboard-list" style={{ padding: 0 }}>
            {tasks.map((task, idx) => {
              const elapsedRatio = (task.totalSeconds - task.remainingSeconds) / task.totalSeconds;
              const isActive = task.status === "active";
              const isCompleted = task.status === "completed";
              const isReordering = reorderingTaskId === task.id;
              const color = isCompleted ? '#FFD700' : getProgressColor(task.remainingSeconds, task.totalSeconds);

              return (
                <div
                  key={task.id}
                  className={`task-card-horizontal ${isActive ? 'active' : ''} ${isReordering ? 'reorder-mode' : ''} ${isCompleted ? 'completed' : ''}`}
                  style={{
                    '--progress': `${elapsedRatio * 100}%`,
                    '--progress-color': color,
                    marginBottom: '0.6rem',
                    border: `1px solid ${isActive || isCompleted ? color : 'var(--glass-border)'}`
                  } as any}
                  onPointerDown={() => !isCompleted && handlePointerDown(task.id)}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  onClick={() => !isCompleted && !isReordering && handleEditClick(task)}
                >
                  {isReordering && <span className="reorder-hint">REORDERING</span>}
                  <div className="task-info-group">
                    <div className="task-main-info" style={{ justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700 }}>{isCompleted && "✨ "}{task.title}</span>
                      {isCompleted ? <span className="gold-badge">COMPLETED</span> : <span className="task-time-badge">{formatTimeHM(task.totalSeconds)}</span>}
                    </div>

                    {!isReordering && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'inherit' }}>
                          {isCompleted ? '집중 완료!' : `${formatTimeHMS(task.remainingSeconds)} 남음`}
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {isReordering && (
                            <>
                              <button onClick={(e) => { e.stopPropagation(); moveTask(idx, 'up'); }}>🔼</button>
                              <button onClick={(e) => { e.stopPropagation(); moveTask(idx, 'down'); }}>🔽</button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {!isReordering && !isCompleted && (
                    <div className="task-controls" style={{ marginLeft: '1rem', display: 'flex', gap: '0.6rem' }}>
                      <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleToggleTask(task.id); }} style={{ background: isActive ? '#000' : 'var(--surface)', color: isActive ? color : 'var(--foreground)' }}>
                        {isActive ? '⏸' : '▶'}
                      </button>
                      <button
                        className="icon-btn"
                        onClick={(e) => { e.stopPropagation(); handleTaskCompletion(task.title); }}
                        style={{ background: 'var(--primary)', color: '#000', fontSize: '1rem' }}
                      >
                        ✅
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', padding: '0 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.9rem' }}>
              💰 <b>{stats.coins}</b>
            </div>
            <div
              className="avatar-floating-mini"
              style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid var(--primary)', boxShadow: '0 4px 15px rgba(0,255,142,0.1)' }}
            >
              {getCharEmoji(stats.level)}
            </div>
          </div>
        </div>
      </div>

      {
        editingTask && (
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
        )
      }

    </main >
  );
}
