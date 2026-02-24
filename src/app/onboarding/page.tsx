"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const onboardingSteps = [
    {
        icon: '👋',
        title: 'Hi-Five Focus에 오신 걸 환영해요!',
        description: '하루 5개의 핵심 과업에만 집중하여 생산성을 극대화하는 타임박싱 도구입니다.',
        highlight: '전략적인 포기와 압도적 집중'
    },
    {
        icon: '✋',
        title: '하루 5개의 핵심 과업만 선택하세요',
        description: '너무 많은 할 일은 오히려 집중력을 떨어뜨립니다. 정말 중요한 5가지만 선택하세요.',
        highlight: '5-슬롯 제한 시스템'
    },
    {
        icon: '⏱️',
        title: '타이머를 시작하고 몰입하세요',
        description: '각 과업마다 예상 시간을 설정하고, 타이머를 시작하면 실시간으로 진행 상황을 확인할 수 있습니다.',
        highlight: 'Traffic Light UX (초록/노랑/빨강)'
    },
    {
        icon: '/assets/images/coin.png',
        title: '코인을 모아 보상을 받으세요',
        description: '과업을 완료할 때마다 코인과 경험치를 획득합니다. 레벨업하고 아바타를 성장시키세요!',
        highlight: '하루 최대 200코인 획득 가능'
    },
    {
        icon: '🦁',
        title: '아바타와 함께 성장하세요',
        description: '새끼고양이에서 시작해 사자로 진화합니다. 당신의 집중력이 아바타를 성장시킵니다!',
        highlight: '🐈‍⬛ → 🐈 → 🐆 → 🦁'
    }
];

export default function Onboarding() {
    const { user, completeOnboarding } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handleNext = async () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            await completeOnboarding();
            router.push('/');
        }
    };

    const handleSkip = async () => {
        await completeOnboarding();
        router.push('/');
    };

    const step = onboardingSteps[currentStep];
    const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

    return (
        <main className="onboarding-container">
            {/* Progress Bar */}
            <div className="onboarding-progress-bar">
                <div
                    className="onboarding-progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Skip Button */}
            <button
                className="onboarding-skip-btn"
                onClick={handleSkip}
            >
                건너뛰기
            </button>

            {/* Content */}
            <div className="onboarding-content animate-fade-in" key={currentStep}>
                {/* Logo */}
                <div className="onboarding-logo" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <Image src="/assets/images/coin.png" width={80} height={80} alt="Logo" />
                </div>

                {/* Icon */}
                <div className="onboarding-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                    {step.icon.startsWith('/') ? (
                        <Image src={step.icon} width={80} height={80} alt="step icon" />
                    ) : (
                        step.icon
                    )}
                </div>

                {/* Title */}
                <h1 className="onboarding-title">
                    {step.title}
                </h1>

                {/* Description */}
                <p className="onboarding-description">
                    {step.description}
                </p>

                {/* Highlight */}
                <div className="onboarding-highlight">
                    {step.highlight}
                </div>

                {/* Step Indicator */}
                <div className="onboarding-dots">
                    {onboardingSteps.map((_, index) => (
                        <div
                            key={index}
                            className={`onboarding-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="onboarding-navigation">
                <button
                    className="btn-onboarding btn-next"
                    onClick={handleNext}
                >
                    {currentStep === onboardingSteps.length - 1 ? '시작하기 🚀' : '다음'}
                </button>
            </div>
        </main>
    );
}
