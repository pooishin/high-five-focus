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

        try {
            if (mode === 'signup') {
                await signUpWithEmail(email, password);
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
        <main className="login-container">
            <div className="login-card animate-fade-in">
                {/* Logo & Title */}
                <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <Image
                            src="/assets/images/logo.svg"
                            width={80}
                            height={80}
                            alt="Hi-Five Focus Logo"
                        />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                        Hi-Five Focus
                    </h1>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                        전략적인 포기와 압도적 집중
                    </p>
                </header>

                {/* Guest Mode (Default) */}
                {mode === 'guest' && (
                    <div className="auth-section">
                        <button
                            type="button"
                            className="btn-auth btn-guest"
                            onClick={handleGuestSignIn}
                            disabled={loading}
                        >
                            {loading ? '로딩 중...' : '🚀 게스트로 시작하기'}
                        </button>

                        <div className="divider">
                            <span>또는</span>
                        </div>

                        <button
                            className="btn-auth btn-google"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            style={{ marginBottom: '1.2rem' }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>🔐</span>
                            Google로 계속하기
                        </button>

                        <button
                            className="btn-auth btn-email"
                            onClick={() => setMode('signin')}
                            disabled={loading}
                            style={{ marginBottom: '2.5rem' }}
                        >
                            ✉️ 이메일로 로그인
                        </button>

                        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.75rem', opacity: 0.6 }}>
                            💡 게스트 모드는 브라우저에 임시 세션으로 저장됩니다.<br />
                            Supabase 연동을 통해 모든 기기에서 데이터를 동기화하세요.
                        </p>
                    </div>
                )}

                {/* Email Sign In/Up */}
                {(mode === 'signin' || mode === 'signup') && (
                    <div className="auth-section">
                        <form onSubmit={handleEmailAuth}>
                            <div className="input-group">
                                <label>이메일</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="auth-input"
                                />
                            </div>

                            <div className="input-group">
                                <label>비밀번호</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="auth-input"
                                />
                            </div>

                            {error && (
                                <div className="error-message">
                                    ⚠️ {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn-primary btn-large"
                                disabled={loading}
                                style={{ width: '100%', marginTop: '1rem' }}
                            >
                                {loading ? '처리 중...' : mode === 'signup' ? '회원가입' : '로그인'}
                            </button>
                        </form>

                        <div className="divider">
                            <span>또는</span>
                        </div>

                        <button
                            className="btn-google"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                        >
                            <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🔐</span>
                            Google로 계속하기
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            {mode === 'signin' ? (
                                <p style={{ fontSize: '0.85rem' }}>
                                    계정이 없으신가요?{' '}
                                    <button
                                        onClick={() => setMode('signup')}
                                        className="link-button"
                                    >
                                        회원가입
                                    </button>
                                </p>
                            ) : (
                                <p style={{ fontSize: '0.85rem' }}>
                                    이미 계정이 있으신가요?{' '}
                                    <button
                                        onClick={() => setMode('signin')}
                                        className="link-button"
                                    >
                                        로그인
                                    </button>
                                </p>
                            )}

                            <button
                                onClick={() => setMode('guest')}
                                className="link-button"
                                style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}
                            >
                                ← 게스트로 돌아가기
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>5-슬롯 집중</h3>
                    <p>하루 5개의 핵심 과업만 선택</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🎮</div>
                    <h3>게이미피케이션</h3>
                    <p>레벨업하고 코인을 획득하세요</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>실시간 리포트</h3>
                    <p>집중 시간을 시각화하고 공유</p>
                </div>
            </div>
        </main>
    );
}
