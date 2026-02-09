---
description: Deploy High-Five Focus to Vercel
---

# Vercel 배포 가이드

High-Five Focus 프로젝트를 Vercel에 배포하기 위한 단계별 가이드입니다.

## 1. 사전 준비

1.  **GitHub 저장소에 코드 푸시**:
    - 현재의 코드 상태를 GitHub 저장소에 커밋하고 푸시했는지 확인하세요.
    - `git push origin main` (또는 해당 브랜치)

2.  **Vercel 계정**:
    - [Vercel](https://vercel.com/) 가입 또는 로그인이 필요합니다.
    - GitHub 계정과 연동하는 것이 가장 편리합니다.

## 2. 프로젝트 Import (Vercel 대시보드)

1.  Vercel 대시보드에서 **"Add New..."** -> **"Project"** 클릭.
2.  **"Import Git Repository"** 영역에서 High-Five Focus 저장소의 **"Import"** 버튼 클릭.

## 3. 환경 변수 설정 (중요!)

**Configure Project** 단계에서 **Environment Variables** 섹션을 열고 다음 변수들을 추가해야 합니다.
(`.env.local` 파일의 내용을 참조하세요)

| Key | Value |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `your_supabase_project_url` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_supabase_anon_key` |

*   `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트의 API URL
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 프로젝트의 API Key (anon/public)

## 4. 배포 (Deploy)

1.  **"Deploy"** 버튼을 클릭합니다.
2.  Vercel이 빌드 및 배포 과정을 자동으로 진행합니다.
3.  완료되면 대시보드에서 **"Visit"** 버튼을 눌러 배포된 사이트를 확인할 수 있습니다.

## 5. (선택사항) Supabase Auth 설정

배포된 도메인에서 로그인이 정상 작동하려면 Supabase Auth 설정에 배포된 URL을 추가해야 합니다.

1.  Supabase 대시보드 -> **Authentication** -> **URL Configuration** 이동.
2.  **Site URL**에 배포된 Vercel URL (예: `https://high-five-focus.vercel.app`) 입력.
3.  **Redirect URLs**에 `https://high-five-focus.vercel.app/**` 추가.

---

이제 High-Five Focus 서비스가 전 세계에 배포되었습니다! 🚀
