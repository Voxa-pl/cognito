import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { MistakeRecord, DuelRoom } from '@/types';
import { normalizeDuelRoomCode } from '@/lib/gamification/duels';

export function getSupabaseCredentials(): { url: string; key: string; isConfigured: boolean } {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (typeof window !== 'undefined') {
    try {
      const savedUrl = localStorage.getItem('cognito_supabase_url');
      const savedKey = localStorage.getItem('cognito_supabase_anon_key');
      if (savedUrl && savedKey) {
        url = savedUrl;
        key = savedKey;
      }
    } catch {
      // Ignore localStorage errors (e.g. incognito/disabled storage)
    }
  }

  const isConfigured = Boolean(
    url &&
    key &&
    !url.includes('your-project') &&
    !url.includes('placeholder') &&
    url.startsWith('http')
  );

  return { url, key, isConfigured };
}

/**
 * Returns true if valid Supabase environment variables are provided.
 */
export const isSupabaseConfigured = (): boolean => {
  return getSupabaseCredentials().isConfigured;
};

export function saveSupabaseCredentials(url: string, key: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cognito_supabase_url', url.trim());
      localStorage.setItem('cognito_supabase_anon_key', key.trim());
    } catch {
      // Ignore localStorage write error
    }
  }
}

export function clearSupabaseCredentials() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('cognito_supabase_url');
      localStorage.removeItem('cognito_supabase_anon_key');
    } catch {
      // Ignore localStorage error
    }
  }
}

let cachedClient: SupabaseClient | null = null;
let cachedKey = '';

export function getSupabaseClient(): SupabaseClient {
  const { url, key, isConfigured } = getSupabaseCredentials();
  const currentKey = `${url}:${key}`;
  if (cachedClient && cachedKey === currentKey) {
    return cachedClient;
  }

  const clientUrl = isConfigured ? url : 'https://placeholder-cognito.supabase.co';
  const clientKey = isConfigured ? key : 'placeholder-anon-key';

  cachedClient = createClient(clientUrl, clientKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  cachedKey = currentKey;
  return cachedClient;
}

// Proxy supabase client to always direct to the active instance
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const val = (client as any)[prop];
    if (typeof val === 'function') {
      return val.bind(client);
    }
    return val;
  },
});

export interface SupabaseProfileRow {
  id: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  grade?: number | null;
  is_repeater?: boolean | null;
  learning_mode?: 'standard' | 'phoenix' | null;
  learning_track?: 'standard' | 'phoenix' | null;
  total_xp?: number;
  xp?: number;
  level?: number;
  streak?: number;
  hearts?: number;
  gems?: number;
  placement_tickets?: number;
  last_weekly_claim_date?: string | null;
  clan_id?: string | null;
  clan_role?: 'leader' | 'officer' | 'member' | null;
  clan_contribution_xp?: number;
  badges?: string[];
  created_at?: string;
  updated_at?: string;
}

/**
 * Initiates Real Google OAuth with Supabase (accounts.google.com).
 */
export async function signInWithGoogleOAuth(appRedirectPath?: string) {
  if (!isSupabaseConfigured()) {
    return {
      data: null,
      error: new Error(
        'Supabase yapılandırılmamış. Gerçek Google OAuth için .env.local dosyasında NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY tanımlanmalıdır.'
      ),
    };
  }

  let callbackUrl: string | undefined;
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    if (appRedirectPath && !appRedirectPath.startsWith('http')) {
      callbackUrl = `${origin}/auth/callback?redirect=${encodeURIComponent(appRedirectPath)}`;
    } else if (appRedirectPath) {
      callbackUrl = appRedirectPath;
    } else {
      callbackUrl = `${origin}/auth/callback`;
    }
  }

  const result = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account',
      },
    },
  });

  // Guarantee immediate browser redirect to real Google OAuth URL
  if (result.data?.url && typeof window !== 'undefined') {
    window.location.href = result.data.url;
  }

  return result;
}

/**
 * Signs the user out from Supabase auth.
 */
export async function signOutFromSupabase() {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }
  return await supabase.auth.signOut();
}

/**
 * Fetches user profile from PostgreSQL profiles table.
 */
export async function fetchProfileFromSupabase(userId: string) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Upserts user profile in PostgreSQL profiles table.
 */
export async function upsertProfileToSupabase(profile: Partial<SupabaseProfileRow> & { id: string; email: string }) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        ...profile,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' })
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Syncs topic progress to PostgreSQL topic_progress table.
 */
export async function syncTopicProgressToSupabase(params: {
  userId: string;
  topicId: string;
  masteryScore: number;
  completed: boolean;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('topic_progress')
      .upsert({
        user_id: params.userId,
        topic_id: params.topicId,
        mastery_score: params.masteryScore,
        completed: params.completed,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,topic_id' });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Records a quiz attempt in PostgreSQL quiz_attempts table.
 */
export async function recordQuizAttemptToSupabase(params: {
  userId: string;
  topicId: string;
  score: number;
  totalQuestions: number;
  xpEarned: number;
  timeSpentSec: number;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: params.userId,
        topic_id: params.topicId,
        score: params.score,
        total_questions: params.totalQuestions,
        xp_earned: params.xpEarned,
        time_spent_sec: params.timeSpentSec,
      });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export interface SupabaseDiagnosticReportRow {
  id?: string;
  user_id: string;
  predicted_exam_score: number;
  weak_topics?: any;
  mastery_summary?: any;
  grade?: number;
  learning_track?: 'standard' | 'phoenix';
  created_at?: string;
}

/**
 * Saves a diagnostic report in PostgreSQL diagnostic_reports table.
 */
export async function saveDiagnosticReportToSupabase(report: SupabaseDiagnosticReportRow) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('diagnostic_reports')
      .insert({
        user_id: report.user_id,
        predicted_exam_score: report.predicted_exam_score,
        weak_topics: report.weak_topics || [],
        mastery_summary: report.mastery_summary || {},
        grade: report.grade || 9,
        learning_track: report.learning_track || 'standard',
      })
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Fetches diagnostic reports for a user.
 */
export async function fetchDiagnosticReportsFromSupabase(userId: string) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('diagnostic_reports')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Logs detected security anomalies (speed-hacks, tamper attempts) to PostgreSQL anti_cheat_logs.
 */
export async function logSecurityViolationToSupabase(params: {
  userId: string;
  violationType: 'SPEED_HACK' | 'TOKEN_TAMPER' | 'XP_SPOOF' | 'STORAGE_TAMPER';
  details?: Record<string, any>;
  ipAddress?: string;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('anti_cheat_logs')
      .insert({
        user_id: params.userId,
        violation_type: params.violationType,
        details: params.details || {},
        ip_address: params.ipAddress || null,
      });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Fetches academic clans from Supabase.
 */
export async function fetchClansFromSupabase() {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('clans')
      .select('*')
      .order('weekly_xp', { ascending: false });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Records an issued quiz session token to PostgreSQL quiz_sessions table.
 */
export async function recordQuizSessionToSupabase(params: {
  sessionId: string;
  userId: string;
  topicId: string;
  questionCount: number;
  sessionToken: string;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('quiz_sessions')
      .insert({
        id: params.sessionId,
        user_id: params.userId,
        topic_id: params.topicId,
        question_count: params.questionCount,
        session_token: params.sessionToken,
        verified: false,
      });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Updates a quiz session upon completion verification in PostgreSQL quiz_sessions table.
 */
export async function updateQuizSessionInSupabase(params: {
  sessionId: string;
  verified: boolean;
  verifiedScore: number;
  verifiedXp: number;
  timeSpentSec: number;
  speedHackFlagged?: boolean;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('quiz_sessions')
      .update({
        verified: params.verified,
        verified_score: params.verifiedScore,
        verified_xp: params.verifiedXp,
        time_spent_sec: params.timeSpentSec,
        speed_hack_flagged: Boolean(params.speedHackFlagged),
      })
      .eq('id', params.sessionId);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Creates a clan in PostgreSQL clans table (strictly enforcing 10 member max).
 */
export async function createClanInSupabase(clan: {
  id: string;
  name: string;
  tag: string;
  motto: string;
  description: string;
  badge_icon: string;
  badge_color: string;
  category: string;
  leader_name: string;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('clans')
      .insert({
        ...clan,
        member_count: 1,
        max_members: 10,
        level: 1,
        weekly_xp: 0,
        total_xp: 0,
        min_level_required: 1,
      })
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Joins a user to a clan in PostgreSQL clan_members table with 10-member capacity validation.
 */
export async function joinClanInSupabase(params: {
  clanId: string;
  userId: string;
  role?: 'leader' | 'officer' | 'member';
}) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data: clan, error: clanErr } = await supabase
      .from('clans')
      .select('member_count, max_members')
      .eq('id', params.clanId)
      .single();

    if (clanErr || !clan) return { data: null, error: clanErr || new Error('Klan bulunamadı.') };
    if (clan.member_count >= (clan.max_members || 10)) {
      return { data: null, error: new Error('Bu klanın kontenjanı doludur (10/10).') };
    }

    const { data, error } = await supabase
      .from('clan_members')
      .insert({
        clan_id: params.clanId,
        user_id: params.userId,
        role: params.role || 'member',
      });

    if (!error) {
      await supabase
        .from('clans')
        .update({ member_count: clan.member_count + 1 })
        .eq('id', params.clanId);
    }
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Posts an announcement to a clan in PostgreSQL clan_announcements.
 */
export async function addClanAnnouncementToSupabase(params: {
  clanId: string;
  authorName: string;
  authorRole: string;
  content: string;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('clan_announcements')
      .insert({
        clan_id: params.clanId,
        author_name: params.authorName,
        author_role: params.authorRole,
        content: params.content,
      });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Syncs a mistake record to PostgreSQL mistake_vault table.
 */
export async function syncMistakeRecordToSupabase(record: MistakeRecord) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(record.userId);
  if (!isUuid) return { data: null, error: null };

  try {
    const { data, error } = await supabase
      .from('mistake_vault')
      .upsert({
        id: record.id,
        user_id: record.userId,
        question_id: record.questionId,
        topic_id: record.topicId,
        subject_id: record.subjectId,
        question_text: record.questionText,
        options: record.options,
        correct_answer: String(record.correctAnswer),
        user_answer: record.userAnswer !== undefined ? String(record.userAnswer) : null,
        explanation: record.explanation,
        learning_outcome_code: record.learningOutcomeCode || null,
        stage: record.stage,
        next_review_date: record.nextReviewDate,
        last_reviewed_at: record.lastReviewedAt || null,
        consecutive_correct: record.consecutiveCorrect,
        is_mastered: record.isMastered,
        source: record.source,
      }, { onConflict: 'id' });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Fetches user's mistake records from PostgreSQL mistake_vault table.
 */
export async function fetchMistakesFromSupabase(userId: string) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
  if (!isUuid) return { data: [], error: null };

  try {
    const { data, error } = await supabase
      .from('mistake_vault')
      .select('*')
      .eq('user_id', userId)
      .order('next_review_date', { ascending: true });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Creates a new duel room in Supabase duel_rooms table.
 */
export async function createDuelRoomInSupabase(room: DuelRoom) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('duel_rooms')
      .insert({
        id: room.id,
        code: room.code,
        host_user_id: room.hostUserId,
        host_user_name: room.hostUserName,
        host_avatar_url: room.hostAvatarUrl || null,
        guest_user_id: room.guestUserId || null,
        guest_user_name: room.guestUserName || null,
        guest_avatar_url: room.guestAvatarUrl || null,
        subject_slug: room.subjectSlug,
        subject_name: room.subjectName,
        status: room.status,
        questions: room.questions,
        current_question_index: room.currentQuestionIndex,
        host_score: room.hostScore,
        guest_score: room.guestScore,
        winner_user_id: room.winnerUserId || null,
        created_at: room.createdAt,
        expires_at: room.expiresAt,
      })
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Fetches a duel room by code or id from Supabase.
 */
export async function fetchDuelRoomFromSupabase(codeOrId: string) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const normalized = normalizeDuelRoomCode(codeOrId);
    const isCode = normalized.startsWith('COG-');
    const query = supabase.from('duel_rooms').select('*');
    const { data, error } = isCode
      ? await query.eq('code', normalized).single()
      : await query.eq('id', codeOrId).single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Updates a duel room state in Supabase.
 */
export async function updateDuelRoomInSupabase(roomId: string, updates: Partial<DuelRoom>) {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const dbUpdates: Record<string, any> = {};
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.guestUserId !== undefined) dbUpdates.guest_user_id = updates.guestUserId;
    if (updates.guestUserName !== undefined) dbUpdates.guest_user_name = updates.guestUserName;
    if (updates.guestAvatarUrl !== undefined) dbUpdates.guest_avatar_url = updates.guestAvatarUrl;
    if (updates.currentQuestionIndex !== undefined) dbUpdates.current_question_index = updates.currentQuestionIndex;
    if (updates.hostScore !== undefined) dbUpdates.host_score = updates.hostScore;
    if (updates.guestScore !== undefined) dbUpdates.guest_score = updates.guestScore;
    if (updates.winnerUserId !== undefined) dbUpdates.winner_user_id = updates.winnerUserId;

    const { data, error } = await supabase
      .from('duel_rooms')
      .update(dbUpdates)
      .eq('id', roomId)
      .select()
      .single();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Fetches active/waiting duel rooms from Supabase.
 */
export async function fetchActiveDuelRoomsFromSupabase() {
  if (!isSupabaseConfigured()) return { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('duel_rooms')
      .select('*')
      .in('status', ['waiting', 'ready', 'active'])
      .order('created_at', { ascending: false })
      .limit(20);
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}
