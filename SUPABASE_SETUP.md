# Supabase Setup Guide for High-Five Focus

Supabase 대시보드의 **SQL Editor**에 아래 코드를 복사하여 실행해 주세요.

## 1. Profiles 테이블 생성 (사용자 정보)

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  display_name text,
  photo_url text,
  is_anonymous boolean default false,
  level integer default 1,
  exp integer default 0,
  coins integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_login timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
-- 본인의 프로필만 읽고 쓸 수 있도록 설정
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);
```

## 2. Tasks 테이블 생성 (5-슬롯 타이머)

```sql
create table tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  total_seconds integer not null,
  remaining_seconds integer not null,
  status text check (status in ('pending', 'active', 'completed')) default 'pending',
  position integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table tasks enable row level security;

create policy "Users can manage their own tasks." on tasks
  for all using (auth.uid() = user_id);
```

## 3. Focus Logs 테이블 생성 (리포트 통계용)

```sql
create table focus_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date default current_date not null,
  focus_minutes integer default 0,
  tasks_completed integer default 0,
  coins_earned integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table focus_logs enable row level security;

create policy "Users can manage their own logs." on focus_logs
  for all using (auth.uid() = user_id);
```

---

## 4. Supabase 인증 설정

1. **Authentication > Providers**에서 **Google**을 활성화하세요.
2. **Authentication > Providers**에서 **Anonymous (익명 로그인)**를 활성화하세요. (Supabase 최신 버전에서 지원)
3. `.env.local` 파일에 Supabase URL과 Anon Key를 입력해 주세요.
