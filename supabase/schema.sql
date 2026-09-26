-- ==============================================================================
-- COGNITO - TÜRKİYE'NİN YENİ NESİL AKADEMİK ÖĞRENME PLATFORMU (MEB 2026-2027)
-- SUPABASE POSTGRESQL DATABASE SCHEMA (DDL + RLS POLICIES)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  grade INT CHECK (grade >= 9 AND grade <= 12),
  is_repeater BOOLEAN DEFAULT FALSE,
  learning_mode TEXT CHECK (learning_mode IN ('standard', 'phoenix')) DEFAULT 'standard',
  learning_track TEXT CHECK (learning_track IN ('standard', 'phoenix')) DEFAULT 'standard',
  total_xp INT NOT NULL DEFAULT 0,
  xp INT NOT NULL DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  streak INT NOT NULL DEFAULT 0,
  hearts INT NOT NULL DEFAULT 5,
  gems INT NOT NULL DEFAULT 100,
  placement_tickets INT NOT NULL DEFAULT 1,
  last_weekly_claim_date TIMESTAMPTZ,
  clan_id TEXT,
  clan_role TEXT CHECK (clan_role IN ('leader', 'officer', 'member')),
  clan_contribution_xp INT NOT NULL DEFAULT 0,
  badges TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index on email & grade & learning mode
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_grade ON public.profiles(grade);
CREATE INDEX IF NOT EXISTS idx_profiles_learning_mode ON public.profiles(learning_mode);
CREATE INDEX IF NOT EXISTS idx_profiles_clan ON public.profiles(clan_id);

-- ------------------------------------------------------------------------------
-- 2. TOPIC PROGRESS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  mastery_score INT NOT NULL DEFAULT 0 CHECK (mastery_score >= 0 AND mastery_score <= 100),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_user_topic UNIQUE (user_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_topic_progress_user ON public.topic_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_topic_progress_topic ON public.topic_progress(topic_id);

-- ------------------------------------------------------------------------------
-- 3. QUIZ ATTEMPTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  total_questions INT NOT NULL DEFAULT 0,
  xp_earned INT NOT NULL DEFAULT 0,
  time_spent_sec INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_topic ON public.quiz_attempts(topic_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created ON public.quiz_attempts(created_at DESC);

-- ------------------------------------------------------------------------------
-- 4. DIAGNOSTIC REPORTS TABLE (AKILLI EKSİK TEŞHİS MOTORU)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.diagnostic_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  predicted_exam_score INT NOT NULL CHECK (predicted_exam_score >= 0 AND predicted_exam_score <= 100),
  weak_topics JSONB DEFAULT '[]'::jsonb,
  mastery_summary JSONB DEFAULT '{}'::jsonb,
  grade INT CHECK (grade >= 9 AND grade <= 12),
  learning_track TEXT CHECK (learning_track IN ('standard', 'phoenix')) DEFAULT 'standard',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_reports_user ON public.diagnostic_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_reports_created ON public.diagnostic_reports(created_at DESC);

-- ------------------------------------------------------------------------------
-- 5. AKADEMİK KLANLAR (CLANS) TABLE (STRICT 10 MEMBER CAPACITY)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tag TEXT NOT NULL UNIQUE,
  motto TEXT NOT NULL DEFAULT 'Birlikte Zirveye!',
  description TEXT NOT NULL,
  badge_icon TEXT NOT NULL DEFAULT 'Shield',
  badge_color TEXT NOT NULL DEFAULT '#1cb0f6',
  level INT NOT NULL DEFAULT 1,
  weekly_xp INT NOT NULL DEFAULT 0,
  total_xp INT NOT NULL DEFAULT 0,
  member_count INT NOT NULL DEFAULT 1 CHECK (member_count >= 1 AND member_count <= 10),
  max_members INT NOT NULL DEFAULT 10 CHECK (max_members = 10),
  min_level_required INT NOT NULL DEFAULT 1,
  category TEXT NOT NULL CHECK (category IN ('Fen & Matematik', 'Sosyal Bilimler', 'Genel Akademik Zirve', 'Yeniden Doğuş / Phoenix')),
  leader_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_clans_weekly_xp ON public.clans(weekly_xp DESC);
CREATE INDEX IF NOT EXISTS idx_clans_category ON public.clans(category);

-- ------------------------------------------------------------------------------
-- 6. CLAN MEMBERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clan_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clan_id TEXT NOT NULL REFERENCES public.clans(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('leader', 'officer', 'member')) DEFAULT 'member',
  weekly_xp_contribution INT NOT NULL DEFAULT 0,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_clan_member UNIQUE (clan_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_clan_members_clan ON public.clan_members(clan_id);
CREATE INDEX IF NOT EXISTS idx_clan_members_user ON public.clan_members(user_id);

-- ------------------------------------------------------------------------------
-- 7. CLAN ANNOUNCEMENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clan_announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clan_id TEXT NOT NULL REFERENCES public.clans(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_clan_announcements_clan ON public.clan_announcements(clan_id);

-- ------------------------------------------------------------------------------
-- 8. QUIZ SESSIONS TABLE (HMAC ANTI-CHEAT SESSION AUDIT)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  question_count INT NOT NULL,
  session_token TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  verified_xp INT NOT NULL DEFAULT 0,
  verified_score INT NOT NULL DEFAULT 0,
  time_spent_sec INT NOT NULL DEFAULT 0,
  speed_hack_flagged BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user ON public.quiz_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_created ON public.quiz_sessions(created_at DESC);

-- ------------------------------------------------------------------------------
-- 9. ANTI-CHEAT LOGS TABLE (SPEED HACKS & CLIENT TAMPER DETECTION)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.anti_cheat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  violation_type TEXT NOT NULL, -- e.g. 'SPEED_HACK', 'TOKEN_TAMPER', 'XP_SPOOF', 'STORAGE_TAMPER'
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_anti_cheat_logs_user ON public.anti_cheat_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_anti_cheat_logs_created ON public.anti_cheat_logs(created_at DESC);

-- ------------------------------------------------------------------------------
-- 10. PLACEMENT EXAM RESULTS & SCENARIO ATTEMPTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.placement_exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  score INT NOT NULL CHECK (score >= 0 AND score <= 100),
  level TEXT NOT NULL,
  level_title TEXT NOT NULL,
  level_description TEXT,
  exam_type TEXT NOT NULL,
  subject_scores JSONB DEFAULT '[]'::jsonb,
  remediation_plan JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.scenario_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scenario_id TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  title TEXT NOT NULL,
  score INT NOT NULL,
  total_points INT NOT NULL,
  duration_seconds INT NOT NULL,
  cognitive_breakdown JSONB DEFAULT '[]'::jsonb,
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 11. MISTAKE VAULT TABLE (AKILLI HATA DEFTERİ & EBBINGHAUS MOTORU)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mistake_vault (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer TEXT NOT NULL,
  user_answer TEXT,
  explanation TEXT,
  learning_outcome_code TEXT,
  stage INT NOT NULL DEFAULT 1 CHECK (stage >= 1 AND stage <= 5),
  next_review_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_reviewed_at TIMESTAMPTZ,
  consecutive_correct INT NOT NULL DEFAULT 0,
  is_mastered BOOLEAN NOT NULL DEFAULT FALSE,
  source TEXT NOT NULL CHECK (source IN ('quiz', 'placement', 'scenario', 'duel')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mistake_vault_user ON public.mistake_vault(user_id);
CREATE INDEX IF NOT EXISTS idx_mistake_vault_next_review ON public.mistake_vault(next_review_date);
CREATE INDEX IF NOT EXISTS idx_mistake_vault_mastered ON public.mistake_vault(is_mastered);
CREATE INDEX IF NOT EXISTS idx_mistake_vault_question ON public.mistake_vault(question_id);

-- ------------------------------------------------------------------------------
-- 12. AUTOMATIC UPDATED_AT TRIGGER
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_topic_progress_updated_at ON public.topic_progress;
CREATE TRIGGER tr_topic_progress_updated_at
BEFORE UPDATE ON public.topic_progress
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_clans_updated_at ON public.clans;
CREATE TRIGGER tr_clans_updated_at
BEFORE UPDATE ON public.clans
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 12. AUTO-CREATE PROFILE ON AUTH.USERS SIGNUP (TRIGGER)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, grade, is_repeater, learning_mode, placement_tickets)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', NULL),
    9,
    FALSE,
    'standard',
    1
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 13. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clan_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clan_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anti_cheat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenario_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistake_vault ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Topic Progress Policies
DROP POLICY IF EXISTS "Users can view own topic progress" ON public.topic_progress;
CREATE POLICY "Users can view own topic progress" ON public.topic_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own topic progress" ON public.topic_progress;
CREATE POLICY "Users can insert own topic progress" ON public.topic_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own topic progress" ON public.topic_progress;
CREATE POLICY "Users can update own topic progress" ON public.topic_progress FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Quiz Attempts Policies
DROP POLICY IF EXISTS "Users can view own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users can view own quiz attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users can insert own quiz attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Clans Policies: Anyone authenticated can view clans
DROP POLICY IF EXISTS "Clans are viewable by everyone" ON public.clans;
CREATE POLICY "Clans are viewable by everyone" ON public.clans FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Authenticated users can create clans" ON public.clans;
CREATE POLICY "Authenticated users can create clans" ON public.clans FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Clan leaders can update their clan" ON public.clans;
CREATE POLICY "Clan leaders can update their clan" ON public.clans FOR UPDATE TO authenticated USING (true);

-- Clan Members Policies
DROP POLICY IF EXISTS "Clan members are viewable by everyone" ON public.clan_members;
CREATE POLICY "Clan members are viewable by everyone" ON public.clan_members FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Users can join a clan" ON public.clan_members;
CREATE POLICY "Users can join a clan" ON public.clan_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Clan Announcements Policies
DROP POLICY IF EXISTS "Announcements are viewable by clan members" ON public.clan_announcements;
CREATE POLICY "Announcements are viewable by clan members" ON public.clan_announcements FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Clan leaders and officers can post announcements" ON public.clan_announcements;
CREATE POLICY "Clan leaders and officers can post announcements" ON public.clan_announcements FOR INSERT TO authenticated WITH CHECK (true);

-- Placement and Scenario Exam Policies
DROP POLICY IF EXISTS "Users view own placement exams" ON public.placement_exam_results;
CREATE POLICY "Users view own placement exams" ON public.placement_exam_results FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own placement exams" ON public.placement_exam_results;
CREATE POLICY "Users insert own placement exams" ON public.placement_exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own scenario attempts" ON public.scenario_attempts;
CREATE POLICY "Users view own scenario attempts" ON public.scenario_attempts FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own scenario attempts" ON public.scenario_attempts;
CREATE POLICY "Users insert own scenario attempts" ON public.scenario_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Mistake Vault Policies
DROP POLICY IF EXISTS "Users can view own mistakes" ON public.mistake_vault;
CREATE POLICY "Users can view own mistakes" ON public.mistake_vault FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own mistakes" ON public.mistake_vault;
CREATE POLICY "Users can insert own mistakes" ON public.mistake_vault FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own mistakes" ON public.mistake_vault;
CREATE POLICY "Users can update own mistakes" ON public.mistake_vault FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own mistakes" ON public.mistake_vault;
CREATE POLICY "Users can delete own mistakes" ON public.mistake_vault FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 11. DUEL ROOMS TABLE (CANLI AKADEMIK DUELLO ODALARI)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.duel_rooms (
  id TEXT PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  host_user_id TEXT NOT NULL,
  host_user_name TEXT NOT NULL,
  host_avatar_url TEXT,
  guest_user_id TEXT,
  guest_user_name TEXT,
  guest_avatar_url TEXT,
  subject_slug TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('waiting', 'ready', 'active', 'completed')) DEFAULT 'waiting',
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  current_question_index INT NOT NULL DEFAULT 0,
  host_score INT NOT NULL DEFAULT 0,
  guest_score INT NOT NULL DEFAULT 0,
  winner_user_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '2 hours')
);

CREATE INDEX IF NOT EXISTS idx_duel_rooms_code ON public.duel_rooms(code);
CREATE INDEX IF NOT EXISTS idx_duel_rooms_status ON public.duel_rooms(status);
CREATE INDEX IF NOT EXISTS idx_duel_rooms_host ON public.duel_rooms(host_user_id);
CREATE INDEX IF NOT EXISTS idx_duel_rooms_guest ON public.duel_rooms(guest_user_id);

ALTER TABLE public.duel_rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Duel rooms are viewable by participants or open lobbies" ON public.duel_rooms;
CREATE POLICY "Duel rooms are viewable by participants or open lobbies" ON public.duel_rooms FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Users can create duel rooms" ON public.duel_rooms;
CREATE POLICY "Users can create duel rooms" ON public.duel_rooms FOR INSERT TO authenticated, anon WITH CHECK (true);

DROP POLICY IF EXISTS "Participants can update duel rooms" ON public.duel_rooms;
CREATE POLICY "Participants can update duel rooms" ON public.duel_rooms FOR UPDATE TO authenticated, anon USING (true);
