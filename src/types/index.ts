export interface Subject {
  id: string;
  name: string;        // Turkish name
  slug: string;        // URL-friendly
  icon: string;        // Emoji
  color: string;       // Tailwind color class
  description: string; // Short Turkish description
  unitCount: number;
  realmName: string;   // Themed world name (e.g., 'Sayı Vadisi')
  realmDescription: string;
}

export interface Unit {
  id: string;
  subjectId: string;
  name: string;
  orderIndex: number;
  topicCount: number;
  icon: string;
}

export interface Topic {
  id: string;
  unitId: string;
  subjectId: string;
  name: string;
  description: string;
  orderIndex: number;
  xpReward: number;      // XP for completing
  questionCount: number;
}

export type QuestionType = 'multiple_choice' | 'true_false';
export type Difficulty = 1 | 2 | 3; // easy, medium, hard

export interface Question {
  id: string;
  topicId: string;
  type: QuestionType;
  questionText: string;
  options: string[];         // For multiple choice
  correctAnswer: number;     // Index of correct option (0-based)
  explanation: string;       // Explanation shown after answer
  difficulty: Difficulty;
  xpValue: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  fullName?: string;
  avatarUrl: string;
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;    // ISO date
  badges: string[];          // Badge slugs
  gems?: number;             // Duolingo style gems
  hearts?: number;           // Duolingo style hearts
  grade?: 9 | 10 | 11 | 12;  // MEB grade (9-12)
  isRepeater?: boolean;      // Sınıf tekrarı mı?
  learningMode?: 'standard' | 'phoenix'; // Phoenix (Yeniden Doğuş) or Standard
  learningTrack?: 'standard' | 'phoenix'; // Standard Academic Track or Phoenix Remediation Track
  isOnboarded?: boolean;     // 3-step onboarding completed
  isAuthenticated?: boolean; // Auth state
  placementTickets?: number; // Seviye belirleme sınav hakkı
  lastWeeklyClaimDate?: string | null; // Son ücretsiz haftalık bilet alış tarihi
  clanId?: string | null;     // Üye olunan akademik klan ID
  clanRole?: 'leader' | 'officer' | 'member' | null;
  clanContributionXP?: number;// Bu haftaki klan XP katkısı
  masteredMistakesCount?: number; // Ebbinghaus motorunda mühürlenen (tamamlanan) hata sayısı
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  dailyGoalMinutes: number;
}

export interface TopicProgress {
  topicId: string;
  masteryLevel: number;      // 0-100
  correctCount: number;
  totalAttempts: number;
  lastStudied: string;       // ISO datetime
}

export interface QuizAttempt {
  id: string;
  topicId: string;
  score: number;             // Correct count
  totalQuestions: number;
  xpEarned: number;
  timeSpentSec: number;
  completedAt: string;       // ISO datetime
}

export interface DailyQuest {
  id: string;
  type: 'quiz' | 'flashcard' | 'pomodoro' | 'topic';
  description: string;       // Turkish
  targetSubjectId?: string;
  targetValue: number;       // e.g., 10 questions, 15 minutes
  currentValue: number;
  xpReward: number;
  completed: boolean;
}

export interface Badge {
  slug: string;
  name: string;
  description: string;
  icon: string;              // Emoji
  condition: string;         // Human-readable condition
}

export interface StreakDay {
  date: string;              // ISO date
  minutesStudied: number;
  xpEarned: number;
  questionsAnswered: number;
}

export interface TopicMasteryDiagnostic {
  topicId: string;
  topicName: string;
  subjectSlug: string;
  subjectName: string;
  masteryLevel: number; // 0 - 100
  totalAttempts: number;
  correctCount: number;
  isWeakPoint: boolean; // masteryLevel < 60
  reason: string;
  recommendation: string;
}

export interface DiagnosticReport {
  id: string;
  userId: string;
  predictedExamScore: number;
  weakTopicsCount: number;
  averageMastery: number;
  weakTopics: TopicMasteryDiagnostic[];
  createdAt: string;
}

export interface KazanımRadarData {
  predictedExamScore: number; // 0-100 (e.g. 88)
  overallMasteryRate: number; // 0-100
  totalCompletedTopics: number;
  totalTopicsCount: number;
  subjectScores: {
    subjectSlug: string;
    subjectName: string;
    score: number;
    completedCount: number;
    totalCount: number;
  }[];
}

// --- Seviye Belirleme Sınavı (Placement Assessment) Types ---
export type AssessmentQuestionType = 'multiple_choice' | 'open_ended';

export interface RubricCriterion {
  score: number; // e.g. 10 (Tam Puan), 5 (Kısmi Puan), 0 (Yetersiz)
  label: string; // 'Tam Puan', 'Kısmi Puan', 'Yetersiz'
  description: string;
}

export interface AssessmentQuestion {
  id: string;
  subjectSlug: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  type: AssessmentQuestionType;
  questionText: string;
  options?: string[]; // Multiple choice options
  correctAnswer?: number; // Index of correct option (0-based)
  sampleAnswer?: string; // Exemplar MEB answer for open-ended questions
  rubric?: {
    criteria: RubricCriterion[];
    keyTerms: string[]; // Essential keywords/concepts required for full score
    explanation: string;
  };
  difficulty: 1 | 2 | 3;
  points: number; // Weight points (e.g., 10 or 15)
}

export type DiagnosticLevel = 'beginner' | 'developing' | 'competent' | 'advanced';

export interface PlacementExamResult {
  id: string;
  examDate: string; // ISO date
  score: number; // 0-100
  level: DiagnosticLevel;
  levelTitle: string; // 'Başlangıç Düzeyi', 'Gelişmekte Olan', 'Yetkin Düzey', 'İleri Düzey'
  levelDescription: string;
  examType: 'karma' | 'multiple_choice' | 'open_ended';
  subjectScores: {
    subjectSlug: string;
    subjectName: string;
    score: number;
    total: number;
    percentage: number;
  }[];
  remediationPlan: {
    topicId: string;
    topicName: string;
    subjectSlug: string;
    subjectName: string;
    action: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}

// --- MEB Ortak Sınav Senaryoları (MEB Exam Scenarios) Types ---
export interface ScenarioDistributionItem {
  learningOutcome: string; // e.g. "MAT.9.1.1. Gerçek sayılar kümesinde işlemler yapar"
  cognitiveLevel: 'Hatırlama' | 'Kavrama' | 'Uygulama' | 'Analiz';
  questionCount: number;
}

export interface MEBExamScenario {
  id: string;
  subjectSlug: string;
  subjectName: string;
  grade: number;
  term: 1 | 2;
  examNumber: 1 | 2;
  scenarioNumber: 1 | 2;
  title: string;
  description: string;
  difficultyLevel: 'Temel Düzey' | 'İleri Analiz Düzeyi';
  durationMinutes: number;
  totalPoints: number;
  distribution: ScenarioDistributionItem[];
  questions: AssessmentQuestion[];
}

export interface ScenarioExamAttempt {
  id: string;
  scenarioId: string;
  subjectName: string;
  title: string;
  score: number;
  totalPoints: number;
  completedAt: string;
  durationSeconds: number;
  cognitiveBreakdown: {
    level: 'Hatırlama' | 'Kavrama' | 'Uygulama' | 'Analiz';
    score: number;
    total: number;
  }[];
  feedback: string;
}

// --- Akademik Klan Sistemi (Academic Clans / Study Squads) Types ---
export interface ClanMember {
  id: string;
  name: string;
  avatarUrl: string;
  role: 'leader' | 'officer' | 'member';
  weeklyXPContribution: number;
  joinedAt: string;
  grade: number;
}

export interface ClanQuest {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  rewardXP: number;
  completed: boolean;
  claimed?: boolean;
  type: 'questions' | 'scenarios' | 'total_xp';
}

export interface ClanAnnouncement {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

export interface AcademicClan {
  id: string;
  name: string;
  tag: string; // e.g. [FEN], [ZİRVE], [MAARİF]
  motto: string;
  description: string;
  badgeIcon: string;
  badgeColor: string;
  level: number;
  weeklyXP: number;
  totalXP: number;
  memberCount: number;
  maxMembers: number;
  minLevelRequired: number;
  category: 'Fen & Matematik' | 'Sosyal Bilimler' | 'Genel Akademik Zirve' | 'Yeniden Doğuş / Phoenix';
  leaderName: string;
  members: ClanMember[];
  weeklyQuests: ClanQuest[];
  announcements: ClanAnnouncement[];
}

// --- Akıllı Hata Defteri & Ebbinghaus Aralıklı Tekrar (Spaced Repetition) Types ---
export interface MistakeRecord {
  id: string;
  userId: string;
  questionId: string;
  topicId: string;
  subjectId: string;
  questionText: string;
  options: string[];
  correctAnswer: number | string;
  userAnswer: number | string;
  explanation: string;
  learningOutcomeCode?: string; // MEB Kazanım Kodu (örn: MAT.9.1.1)
  stage: number; // 1: 1. Gün, 2: 3. Gün, 3: 7. Gün, 4: 14. Gün, 5: Mastered
  nextReviewDate: string; // ISO date
  lastReviewedAt?: string;
  consecutiveCorrect: number;
  isMastered: boolean;
  source: 'quiz' | 'placement' | 'scenario' | 'duel';
  createdAt: string;
}

// --- Canlı Akademik Düello & Özel Oda (Live Academic Duels) Types ---
export interface DuelQuestion {
  id: string;
  topicId?: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: 1 | 2 | 3;
  learningOutcomeCode?: string;
  subjectSlug: string;
}

export interface DuelRoom {
  id: string;
  code: string; // e.g. COG-842
  hostUserId: string;
  hostUserName: string;
  hostAvatarUrl?: string;
  guestUserId?: string;
  guestUserName?: string;
  guestAvatarUrl?: string;
  subjectSlug: string; // e.g. 'matematik', 'fizik', 'kimya', 'biyoloji', 'edebiyat', 'tarih', 'cografya', 'ingilizce', 'karma'
  subjectName: string;
  status: 'waiting' | 'ready' | 'active' | 'completed';
  questions: DuelQuestion[];
  currentQuestionIndex: number;
  hostScore: number;
  guestScore: number;
  hostAnsweredCurrent?: boolean;
  guestAnsweredCurrent?: boolean;
  hostAnswers?: (number | null)[];
  guestAnswers?: (number | null)[];
  winnerUserId?: string | 'tie';
  createdAt: string;
  expiresAt: string;
}

