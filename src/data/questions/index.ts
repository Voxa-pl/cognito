import { Question } from '@/types';
import { matematikQuestions } from './matematik';
import { fizikQuestions } from './fizik';
import { kimyaQuestions } from './kimya';
import { biyolojiQuestions } from './biyoloji';
import { edebiyatQuestions } from './edebiyat';
import { tarihQuestions } from './tarih';
import { cografyaQuestions } from './cografya';
import { ingilizceQuestions } from './ingilizce';

export const questionsBySubject: Record<string, Question[]> = {
  matematik: matematikQuestions,
  fizik: fizikQuestions,
  kimya: kimyaQuestions,
  biyoloji: biyolojiQuestions,
  edebiyat: edebiyatQuestions,
  tarih: tarihQuestions,
  cografya: cografyaQuestions,
  ingilizce: ingilizceQuestions,
};

export const allQuestions: Question[] = [
  ...matematikQuestions,
  ...fizikQuestions,
  ...kimyaQuestions,
  ...biyolojiQuestions,
  ...edebiyatQuestions,
  ...tarihQuestions,
  ...cografyaQuestions,
  ...ingilizceQuestions,
];

// Helper: get questions for a specific topic ID
export function getQuestionsByTopic(topicId: string): Question[] {
  return allQuestions.filter((q) => q.topicId === topicId);
}

// Helper: get questions for a subject slug
export function getQuestionsBySubject(slug: string): Question[] {
  return questionsBySubject[slug] || [];
}

// Helper: get stats for a topic ID
export function getTopicStats(topicId: string) {
  const topicQuestions = getQuestionsByTopic(topicId);
  return {
    count: topicQuestions.length,
    easy: topicQuestions.filter((q) => q.difficulty === 1).length,
    medium: topicQuestions.filter((q) => q.difficulty === 2).length,
    hard: topicQuestions.filter((q) => q.difficulty === 3).length,
  };
}

export {
  matematikQuestions,
  fizikQuestions,
  kimyaQuestions,
  biyolojiQuestions,
  edebiyatQuestions,
  tarihQuestions,
  cografyaQuestions,
  ingilizceQuestions,
};
