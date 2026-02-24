"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
    const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsGuest } = useAuth();
    const router = useRouter();
    const [mode, setMode] = useState<'signin' | 'signup' | 'guest'>('guest');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect logic
    useEffect(() => {
        if (user) {
            if (user.onboardingCompleted) {
                router.push('/');
            } else {
                router.push('/onboarding');
            }
        }
    }, [user, router]);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message || '로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            if (mode === 'signup') {
                await signUpWithEmail(email, password);
                setSuccessMsg('가입이 성공했습니다! 이메일 인증 후 로그인해주세요. (테스트 환경에서는 즉시 로그인 시도 가능)');
                setPassword('');
            } else {
                await signInWithEmail(email, password);
            }
        } catch (err: any) {
            setError(err.message || '인증에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleGuestSignIn = async (e: React.MouseEvent) => {
        // 기본 동작 방지 (혹시 모를 폼 제출 방지)
        e.preventDefault();
        console.log('게스트 로그인 시도 중...');

        setLoading(true);
        setError('');
        try {
            console.log('signInAsGuest 함수 호출');
            await signInAsGuest();
            console.log('signInAsGuest 완료');
        } catch (err: any) {
            console.error('게스트 로그인 에러:', err);
            setError(err.message || '게스트 로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '1.5rem', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div className="login-card animate-fade-in" style={{ margin: '0 auto', maxWidth: '400px', width: '100%', padding: '2rem 1.5rem', flexShrink: 0 }}>
                {/* Logo & Title */}
                <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center', fontSize: '3.5rem' }}>
                        👋
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.25rem' }}>
                        Hi-Five Focus
                    </h1>
                    <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>
                        전략적인 포기와 압도적 집중
                    </p>
                </header>

                {/* Guest Mode (Default) */}
                {mode === 'guest' ? (
                    <div className="auth-section">
                        <button
                            type="button"
                            className="btn-primary btn-large"
                            onClick={handleGuestSignIn}
                            disabled={loading}
                            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.9rem', fontSize: '1rem', fontWeight: 700 }}
                        >
                            {loading ? '로딩 중...' : '🚀 게스트로 시작하기'}
                        </button>

                        <p style={{ textAlign: 'center', fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem', lineHeight: 1.4, color: 'var(--primary)' }}>
                            * 별도의 가입 없이 즉시 서비스를 체험할 수 있습니다.<br />
                            (단, 브라우저 쿠키 삭제 시 데이터가 초기화될 수 있습니다.)
                        </p>

                        <div className="divider" style={{ margin: '1.5rem 0' }}>
                            <span style={{ background: 'var(--surface)', padding: '0 10px', fontSize: '0.8rem', opacity: 0.5 }}>또는</span>
                        </div>

                        <button
                            className="btn-auth btn-google"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            style={{ width: '100%', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.8rem', borderRadius: '12px', background: '#FFF', color: '#000', border: 'none', fontWeight: 600, fontSize: '0.95rem' }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>🔐</span>
                            구글로그인
                        </button>

                        <button
                            className="btn-auth btn-email"
                            onClick={() => setMode('signin')}
                            disabled={loading}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.8rem', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.9rem', fontWeight: 600 }}
                        >
                            <span style={{ fontSize: '1.1rem' }}>✉️</span>
                            이메일로 로그인
                        </button>

                        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', opacity: 0.4, lineHeight: 1.5 }}>
                            💡 로그인하여 데이터를 안전하게 영구 보관하세요.
                        </p>
                    </div>
                ) : (mode === 'signin' || mode === 'signup') && (
                    <div className="auth-section">
                        <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="input-group">
                                <label style={{ fontSize: '0.85rem', marginBottom: '0.4rem', display: 'block', opacity: 0.8 }}>이메일</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) setError('');
                                    }}
                                    placeholder="your@email.com"
                                    required
                                    className="auth-input"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#FFF', fontSize: '1rem' }}
                                />
                            </div>

                            <div className="input-group">
                                <label style={{ fontSize: '0.85rem', marginBottom: '0.4rem', display: 'block', opacity: 0.8 }}>비밀번호</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) setError('');
                                    }}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="auth-input"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: '#FFF', fontSize: '1rem' }}
                                />
                            </div>

                            {error && (
                                <div className="error-message" style={{ fontSize: '0.85rem', color: '#ff6b6b', background: 'rgba(255, 82, 82, 0.1)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center' }}>
                                    ⚠️ {error}
                                </div>
                            )}

                            {successMsg && (
                                <div className="success-message" style={{ fontSize: '0.85rem', color: 'var(--primary)', background: 'rgba(0, 255, 142, 0.1)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center', lineHeight: 1.4 }}>
                                    ✅ {successMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={loading}
                                style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 700 }}
                            >
                                {loading ? '처리 중...' : mode === 'signup' ? '회원가입' : '로그인'}
                            </button>
                        </form>

                        <div className="divider" style={{ margin: '1.5rem 0', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>또는</span>
                        </div>

                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                            {mode === 'signin' ? (
                                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                    계정이 없으신가요?{' '}
                                    <button
                                        onClick={() => setMode('signup')}
                                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', padding: '0 5px' }}
                                    >
                                        회원가입
                                    </button>
                                </p>
                            ) : (
                                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                    이미 계정이 있으신가요?{' '}
                                    <button
                                        onClick={() => setMode('signin')}
                                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', padding: '0 5px' }}
                                    >
                                        로그인
                                    </button>
                                </p>
                            )}

                            <button
                                onClick={() => setMode('guest')}
                                style={{ fontSize: '0.85rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', marginTop: '0.5rem' }}
                            >
                                ← 초기 화면으로 돌아가기
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="features-grid" style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '3rem', width: '100%', maxWidth: '400px', margin: '2.5rem auto 0 auto' }}>
                <div className="feature-card" style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px rgba(0, 255, 142, 0.3))' }}>⚡</div>
                    <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem', fontWeight: 700, color: 'var(--primary)' }}>5-슬롯 집중 시스템</h3>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: 0, lineHeight: 1.4 }}>하루 5개의 핵심 과업에만 집중하여<br />마감 효과와 생산성을 극대화합니다.</p>
                    </div>
                </div>
                <div className="feature-card" style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))' }}>🎮</div>
                    <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem', fontWeight: 700, color: '#FFD700' }}>강력한 동기부여</h3>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: 0, lineHeight: 1.4 }}>집중 시간만큼 아바타가 성장하고<br />코인을 모아 슬롯을 확장하세요.</p>
                    </div>
                </div>
                <div className="feature-card" style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px rgba(0, 122, 255, 0.3))' }}>📊</div>
                    <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem', fontWeight: 700, color: '#007AFF' }}>스마트 데이터 리포트</h3>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: 0, lineHeight: 1.4 }}>나의 집중 패턴을 시각화하고<br />맞춤형 AI 조언을 받아보세요.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
