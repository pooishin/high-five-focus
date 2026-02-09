"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
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

        // Decrement daily energy budget alongside task
        setRemainingEnergySeconds(prev => Math.max(0, prev - 1));

        const newTasks = [...prevTasks];
        const activeTask = { ...newTasks[activeIdx] };

        if (activeTask.remainingSeconds > 0) {
          activeTask.remainingSeconds = Math.max(0, activeTask.remainingSeconds - 1);
          if (activeTask.remainingSeconds === 0) {
            activeTask.status = "completed";
            handleTaskCompletion(activeTask.title);
          }
        }

        newTasks[activeIdx] = activeTask;
        return newTasks;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(stats));
  }, [stats]);

  // Track daily focus time
  useEffect(() => {
    const interval = setInterval(() => {
      const activeTask = tasks.find(t => t.status === "active");
      if (activeTask) {
        const today = new Date().toISOString().split('T')[0];
        const recordsStr = localStorage.getItem('focusRecords');
        const records = recordsStr ? JSON.parse(recordsStr) : [];

        const todayRecord = records.find((r: any) => r.date === today);
        if (todayRecord) {
          todayRecord.focusMinutes += 1 / 60; // Add 1 second as fraction of minute
        } else {
          records.push({
            date: today,
            focusMinutes: 1 / 60,
            tasksCompleted: 0,
            coinsEarned: 0
          });
        }

        localStorage.setItem('focusRecords', JSON.stringify(records));
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [tasks]);

  const handleTaskCompletion = (title: string) => {
    const isAllCompleted = tasks.every(t => t.id === -1 || t.status === "completed" || (t.title === title && t.status === "active")); // Logic to check if this completion makes all complete
    const currentCompletedCount = tasks.filter(t => t.status === "completed").length;
    const totalRemaining = tasks.length - currentCompletedCount - 1;

    setStats(prev => {
      const newExp = prev.exp + 50;
      const newLevel = Math.floor(newExp / 100) + 1;
      let reward = 10; // Basic task completion
      if (totalRemaining === 0) reward += 50; // All tasks complete bonus

      const newStats = {
        exp: newExp,
        level: newLevel,
        coins: prev.coins + reward,
        monthlyCoins: prev.monthlyCoins + reward
      };

      // Update daily record for task completion
      const today = new Date().toISOString().split('T')[0];
      const recordsStr = localStorage.getItem('focusRecords');
      const records = recordsStr ? JSON.parse(recordsStr) : [];
      const todayRecord = records.find((r: any) => r.date === today);

      if (todayRecord) {
        todayRecord.tasksCompleted += 1;
        todayRecord.coinsEarned += reward;
      } else {
        records.push({
          date: today,
          focusMinutes: 0,
          tasksCompleted: 1,
          coinsEarned: reward
        });
      }

      localStorage.setItem('focusRecords', JSON.stringify(records));

      return newStats;
    });

    // Auto-hide overlay after 3 seconds
    setTimeout(() => {
      setShowCompletion({ visible: false, title: "" });
    }, 3000);
  };

  // Derived States
  const currentTaskTotalMins = tasks.filter(t => t.status !== "completed").reduce((sum, task) => sum + task.remainingSeconds / 60, 0);
  const isOverCapacity = currentTaskTotalMins > (remainingEnergySeconds / 60);

  // Character Evolution mapping
  const getCharEmoji = (level: number) => {
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
    const s_total = Math.max(0, Math.round(secs));
    const h = Math.floor(s_total / 3600);
    const m = Math.floor((s_total % 3600) / 60);
    const s = s_total % 60;

    // Friendly format: 08h 00m 00s
    const hh = h > 0 ? `${h}h ` : '';
    const mm = m > 0 || h > 0 ? `${m.toString().padStart(2, '0')}m ` : '';
    const ss = `${s.toString().padStart(2, '0')}s`;

    return `${hh}${mm}${ss}`;
  };

  const getProgressColor = (remaining: number, total: number) => {
    const ratio = remaining / total;
    if (ratio > 0.5) return "var(--primary)";
    if (ratio > 0.2) return "var(--warning)";
    return "var(--error)";
  };

  // Handlers
  const handleToggleTask = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === "active" ? "pending" : "active" };
      }
      if (t.status === "active") return { ...t, status: "pending" };
      return t;
    }));
  };

  const moveTask = (idx: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= tasks.length) return;
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(idx, 1);
    newTasks.splice(newIdx, 0, movedTask);
    setTasks(newTasks);
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

  const handleSaveEdit = () => {
    if (!editingTask) return;
    const newTotalSecs = editMinutes * 60;
    setTasks(prev => prev.map(t =>
      t.id === editingTask.id
        ? { ...t, title: editTitle, totalSeconds: newTotalSecs, remainingSeconds: newTotalSecs }
        : t
    ));
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
            onClick={() => {
              setIsPlanSet(true);
              setRemainingEnergySeconds(totalWorkTime * 60);
              setStats(prev => ({
                ...prev,
                coins: prev.coins + 50,
                monthlyCoins: prev.monthlyCoins + 50
              }));
              // Add coin reward for existing initial tasks
              const initialTaskReward = tasks.length * 10;
              setStats(prev => ({
                ...prev,
                coins: prev.coins + initialTaskReward,
                monthlyCoins: prev.monthlyCoins + initialTaskReward
              }));
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
            <div className="focus-message animate-fade-in">
              🔥 지금은 몰입 시간입니다! 어떤 과업에 에너지를 쏟으실 건가요?
            </div>
          )}

          {isOverCapacity && (
            <div className="warning-banner" style={{ marginBottom: '1.5rem' }}>
              🚨 <b>오버 캐퍼시티!</b> 테스크 시간이 총 시간을 {formatTimeHM((currentTaskTotalMins - totalWorkTime) * 60)} 초과했습니다.
            </div>
          )}

          <div className="dashboard-list" style={{ padding: 0 }}>
            {tasks.map((task, idx) => {
              const progressRatio = task.remainingSeconds / task.totalSeconds;
              const isActive = task.status === "active";
              const isCompleted = task.status === "completed";
              const isReordering = reorderingTaskId === task.id;
              const color = isCompleted ? '#FFD700' : getProgressColor(task.remainingSeconds, task.totalSeconds);

              return (
                <div
                  key={task.id}
                  className={`task-card-horizontal ${isActive ? 'active' : ''} ${isReordering ? 'reorder-mode' : ''} ${isCompleted ? 'completed' : ''}`}
                  style={{ background: isCompleted ? 'rgba(255,215,0,0.05)' : 'var(--surface-alt)', marginBottom: '0.6rem', border: `1px solid ${isActive || isCompleted ? color : 'var(--glass-border)'}` }}
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
                    <div className="progress-bar-container" style={{ height: '6px' }}>
                      <div className="progress-bar-fill" style={{ width: `${progressRatio * 100}%`, background: color }}></div>
                    </div>
                    {!isReordering && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isActive ? color : 'inherit' }}>
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
                    <div className="task-controls" style={{ marginLeft: '1rem' }}>
                      <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleToggleTask(task.id); }} style={{ background: isActive ? color : 'var(--surface)', color: isActive ? '#000' : 'var(--foreground)' }}>
                        {isActive ? '⏸' : '▶'}
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
