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
  const [maxSlots, setMaxSlots] = useState(5);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`maxSlots_${user.uid}`);
      if (saved) setMaxSlots(parseInt(saved, 10));
    }
  }, [user]);

  const handleAddSlot = async () => {
    if (stats.coins >= 1000) {
      if (confirm("손바닥 코인 1000개를 사용하여 할 일 슬롯 1개를 추가하시겠습니까? (영구 적용)")) {
        const newMax = maxSlots + 1;
        setMaxSlots(newMax);
        if (user) localStorage.setItem(`maxSlots_${user.uid}`, newMax.toString());

        const newCoins = stats.coins - 1000;
        setStats(p => ({ ...p, coins: newCoins }));
        if (user) {
          await supabase.from('profiles').update({ coins: newCoins }).eq('id', user.uid);
        }
      }
    } else {
      alert("코인이 부족합니다! (필요 코인: 1000개)");
    }
  };

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.uid).single();
        if (profile) {
          setStats({ exp: profile.exp, level: profile.level, coins: profile.coins, monthlyCoins: 0 });

          // 오늘의 가용 에너지 동기화 및 24시간 리셋 체크
          const lastPlanAt = profile.last_plan_at ? new Date(profile.last_plan_at) : null;
          const now = new Date();
          const isToday = lastPlanAt && lastPlanAt.toDateString() === now.toDateString();
          const hoursSincePlan = lastPlanAt ? (now.getTime() - lastPlanAt.getTime()) / (1000 * 60 * 60) : 25;

          if (isToday && hoursSincePlan < 24) {
            // 하루 내이고 24시간 미만인 경우: 설정된 전체 에너지를 초기값으로
            const plannedEnergy = profile.plan_total_seconds || 0;
            setRemainingEnergySeconds(plannedEnergy);
          } else {
            // 다른 날이거나 24시간이 경과한 경우: 에너지 0으로 초기화
            setRemainingEnergySeconds(0);
          }
        }

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

  // 사운드 및 진동 재생 함수 (Web Audio API를 이용한 합성 박수 소리 포함)
  const playFeedback = (type: 'short' | 'long') => {
    // 합성 박수 소리 생성 (오디오 파일이 없을 경우를 대비)
    const playSyntheticClap = (duration: number) => {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const nodes = 5; // 박수 소리 레이어 수
        for (let i = 0; i < nodes; i++) {
          const noise = audioCtx.createBufferSource();
          const bufferSize = audioCtx.sampleRate * duration;
          const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let j = 0; j < bufferSize; j++) {
            data[j] = Math.random() * 2 - 1;
          }
          noise.buffer = buffer;

          const filter = audioCtx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 800 + Math.random() * 1200;
          filter.Q.value = 1;

          const gain = audioCtx.createGain();
          gain.gain.setValueAtTime(0.2, audioCtx.currentTime + (i * 0.01));
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1 + (i * 0.01));

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(audioCtx.destination);
          noise.start(audioCtx.currentTime + (i * 0.01));
        }
      } catch (e) {
        console.error("Synthetic audio failed:", e);
      }
    };

    // 실제 파일 시도 후 실패 시 합성음 실행
    try {
      const audio = new Audio(type === 'short' ? '/assets/sounds/clapping.mp3' : '/assets/sounds/clapping_long.mp3');
      audio.volume = 0.7;
      audio.play().catch(() => {
        // 파일 로드 실패 시 합성음 재생
        playSyntheticClap(type === 'short' ? 0.2 : 1.0);
      });
    } catch (e) {
      playSyntheticClap(0.2);
    }

    // 진동 (Haptic)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (type === 'short') {
        navigator.vibrate(200);
      } else {
        navigator.vibrate([100, 50, 100, 50, 300]);
      }
    }
  };

  const lastTickAt = useRef<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - lastTickAt.current;
      const elapsedSecs = Math.floor(elapsedMs / 1000);

      if (elapsedSecs >= 1) {
        setTasks(prevTasks => {
          const activeIdx = prevTasks.findIndex(t => t.status === "active");
          if (activeIdx === -1) {
            lastTickAt.current = now;
            return prevTasks;
          }

          setRemainingEnergySeconds(prev => Math.max(0, prev - elapsedSecs));

          const newTasks = [...prevTasks];
          const nextSeconds = newTasks[activeIdx].remainingSeconds - elapsedSecs;

          // 0초 도달 시 피드백 및 알림 (처음 0이 되거나 그 이하로 내려갈 때 실행)
          if (newTasks[activeIdx].remainingSeconds > 0 && nextSeconds <= 0) {
            playFeedback('short');
            if (Notification.permission === 'granted') {
              new Notification("테스크 완료! 👏", {
                body: `${newTasks[activeIdx].title} 끝! 고생하셨습니다.`,
                icon: '/assets/images/logo.svg'
              });
            }
          }

          newTasks[activeIdx] = { ...newTasks[activeIdx], remainingSeconds: nextSeconds };
          lastTickAt.current = now; // 실제 차감된 시점을 기준으로 갱신
          return newTasks;
        });
      }
    }, 500); // 0.5초 간격으로 체크하여 더 빠른 반응성 제공

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // 백그라운드에서 돌아왔을 때 마지막 틱 시점과 비교하여 즉시 동기화가 일어나게 함
        // (interval이 다음 0.5초에 실행되면서 자연스럽게 elapsedSecs를 계산함)
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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
      // 즉시 UI 상태 업데이트
      setTasks(prev => prev.map(t => t.id === completedTask.id ? { ...t, status: 'completed', remainingSeconds: 0 } : t));

      await supabase.rpc('increment_stats', { user_id: user.uid, exp_bonus: 50, coin_bonus: reward });
      await supabase.from('tasks').update({ status: 'completed', remaining_seconds: 0 }).eq('id', completedTask.id);

      try {
        const todayStr = new Date().toISOString().split('T')[0];
        const focusMinutes = Math.ceil(completedTask.totalSeconds / 60);

        const { data: existingLog } = await supabase
          .from('focus_logs')
          .select('*')
          .eq('user_id', user.uid)
          .eq('date', todayStr)
          .single();

        if (existingLog) {
          await supabase.from('focus_logs').update({
            focus_minutes: existingLog.focus_minutes + focusMinutes,
            tasks_completed: existingLog.tasks_completed + 1,
            coins_earned: existingLog.coins_earned + reward
          }).eq('id', existingLog.id);
        } else {
          await supabase.from('focus_logs').insert([{
            user_id: user.uid,
            date: todayStr,
            focus_minutes: focusMinutes,
            tasks_completed: 1,
            coins_earned: reward
          }]);
        }
      } catch (err) {
        console.error("Failed to update focus logs:", err);
      }
    }
    setShowCompletion({ visible: true, title });
    // 모달이므로 사용자가 닫기 전까지 유지하거나 5초 뒤 자동 종료
    setTimeout(() => setShowCompletion({ visible: false, title: "" }), 5000);
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

    // 에너지가 0이거나 낮을 때도 형식을 유지하여 레이아웃 흔들림 방지
    return `${isNeg ? '-' : ''}${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
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
        <div className="modal-overlay" style={{ zIndex: 2000 }} onClick={() => setShowCompletion({ visible: false, title: "" })}>
          <div className="modal-content completion-modal animate-pop-in" onClick={e => e.stopPropagation()} style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--surface) 0%, #1a1a1a 100%)', border: '2px solid var(--primary)' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 20px var(--primary))' }}>✋</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--primary)', letterSpacing: '-0.05em' }}>HIGH FIVE!</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: 1.5 }}>
              <b>"{showCompletion.title}"</b><br />과업을 완벽하게 완료했습니다!
            </p>
            <button className="btn-primary" onClick={() => setShowCompletion({ visible: false, title: "" })} style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}>
              계속하기 ✨
            </button>
          </div>
        </div>
      )}

      {/* Header - Triple Flex Layout to ensure center alignment */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.2rem',
        padding: '0 0.75rem',
        height: '3.5rem'
      }}>
        {/* Left: Hamburger Menu */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <button style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', opacity: 0.8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--foreground)' }}>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Center: Logo & Title */}
        <div style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <Image src="/assets/images/logo.svg" width={26} height={26} alt="Logo" style={{ filter: 'drop-shadow(0 0 5px var(--primary-low))' }} />
          <h1 style={{ fontSize: '1.15rem', fontWeight: 950, letterSpacing: '-0.04em', background: 'linear-gradient(to bottom, #fff, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Hi-Five Focus
          </h1>
        </div>

        {/* Right: Plan Button */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => router.push('/plan')}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1.5px solid var(--glass-border)',
              padding: '5px 12px',
              borderRadius: '8px',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: 'var(--primary)',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            PLAN
          </button>
        </div>
      </header>

      <div className="rainbow-container animate-fade-in" style={{ margin: '0.5rem' }}>
        <div className="rainbow-inner" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.6rem', alignItems: 'center' }}>
            <button onClick={handleToggleFocusMode} style={{ background: isFocusMode ? 'var(--primary)' : 'var(--surface-alt)', color: isFocusMode ? '#000' : 'var(--foreground)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, boxShadow: isFocusMode ? '0 0 15px var(--primary-low)' : '0 4px 10px rgba(0,0,0,0.2)' }}>
              {isFocusMode ? '🔥 FOCUS ON' : 'START FOCUS'}
            </button>
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
                    <div className="task-controls" style={{ marginLeft: '1rem', display: 'flex', gap: '0.8rem', position: 'relative', zIndex: 1, alignItems: 'center' }}>
                      <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleToggleTask(task.id); }} style={{ background: isActive ? '#000' : 'var(--surface)', color: isActive ? color : 'var(--foreground)' }}>{isActive ? '⏸' : '▶'}</button>
                      <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleTaskCompletion(task.title); }} style={{ background: 'var(--primary)', color: '#000' }}>✅</button>
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

            {Array.from({ length: Math.max(0, maxSlots - tasks.length) }).map((_, idx) => (
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

            <button onClick={handleAddSlot} style={{ width: '100%', padding: '10px', borderRadius: '16px', border: '1px dashed var(--glass-border)', background: 'rgba(255,255,255,0.02)', color: 'var(--foreground)', opacity: 0.8, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'all 0.2s', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                + 테스크 추가 (1000 <Image src="/assets/images/coin.png" width={16} height={16} alt="coin" style={{ objectFit: 'contain' }} />)
              </span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', padding: '0 10px', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.9rem' }}>
              <Image src="/assets/images/coin.png" width={24} height={24} alt="coin" style={{ objectFit: 'contain' }} /> <b>{stats.coins}</b>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                {user?.displayName || '사용자'} 님
              </div>
              <div style={{ display: 'flex', gap: '6px', fontSize: '0.7rem', fontWeight: 800, opacity: 0.6 }}>
                <span>Lv.{stats.level}</span>
                <span>•</span>
                <span>{stats.exp} EXP</span>
              </div>
            </div>
            <div className="avatar-floating-mini" style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid var(--primary)', cursor: 'pointer', boxShadow: '0 0 10px var(--primary-low)' }} onClick={() => logout()}>
              {getCharEmoji(stats.level)}
            </div>
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
