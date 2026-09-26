import { Unit, Topic } from '@/types';
import { matematikUnits, matematikTopics } from './matematik';
import { fizikUnits, fizikTopics } from './fizik';
import { kimyaUnits, kimyaTopics } from './kimya';
import { biyolojiUnits, biyolojiTopics } from './biyoloji';
import { edebiyatUnits, edebiyatTopics } from './edebiyat';
import { tarihUnits, tarihTopics } from './tarih';
import { cografyaUnits, cografyaTopics } from './cografya';
import { ingilizceUnits, ingilizceTopics } from './ingilizce';

// All units indexed by subject slug
export const unitsBySubject: Record<string, Unit[]> = {
  matematik: matematikUnits,
  fizik: fizikUnits,
  kimya: kimyaUnits,
  biyoloji: biyolojiUnits,
  edebiyat: edebiyatUnits,
  tarih: tarihUnits,
  cografya: cografyaUnits,
  ingilizce: ingilizceUnits,
};

// All units flat
export const allUnits: Unit[] = [
  ...matematikUnits,
  ...fizikUnits,
  ...kimyaUnits,
  ...biyolojiUnits,
  ...edebiyatUnits,
  ...tarihUnits,
  ...cografyaUnits,
  ...ingilizceUnits,
];

// All topics flat
export const allTopics: Topic[] = [
  ...matematikTopics,
  ...fizikTopics,
  ...kimyaTopics,
  ...biyolojiTopics,
  ...edebiyatTopics,
  ...tarihTopics,
  ...cografyaTopics,
  ...ingilizceTopics,
];

// All topics indexed by unit ID
export const topicsByUnit: Record<string, Topic[]> = {};
allTopics.forEach((topic) => {
  if (!topicsByUnit[topic.unitId]) {
    topicsByUnit[topic.unitId] = [];
  }
  topicsByUnit[topic.unitId].push(topic);
});

// Helper: get units for a subject slug
export function getUnitsForSubject(slug: string): Unit[] {
  return unitsBySubject[slug] || [];
}

// Helper: get topics for a unit ID
export function getTopicsForUnit(unitId: string): Topic[] {
  return topicsByUnit[unitId] || [];
}

// Helper: get a specific unit by ID
export function getUnitById(unitId: string): Unit | undefined {
  return allUnits.find((u) => u.id === unitId);
}

// Helper: get a specific topic by ID
export function getTopicById(topicId: string): Topic | undefined {
  return allTopics.find((t) => t.id === topicId);
}

// Helper: get human-readable Turkish name for a topic ID
export function getTopicName(topicId: string): string {
  const topic = getTopicById(topicId);
  return topic ? topic.name : topicId;
}

// Export all individual subject curricula
export {
  matematikUnits,
  matematikTopics,
  fizikUnits,
  fizikTopics,
  kimyaUnits,
  kimyaTopics,
  biyolojiUnits,
  biyolojiTopics,
  edebiyatUnits,
  edebiyatTopics,
  tarihUnits,
  tarihTopics,
  cografyaUnits,
  cografyaTopics,
  ingilizceUnits,
  ingilizceTopics,
};
