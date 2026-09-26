import { Unit, Topic } from '@/types';

export const ingilizceUnits: Unit[] = [
  { id: 'ing-u1', subjectId: 'ing', name: 'Studying Abroad', orderIndex: 1, topicCount: 2, icon: 'languages' },
  { id: 'ing-u2', subjectId: 'ing', name: 'My Environment', orderIndex: 2, topicCount: 2, icon: 'home' },
  { id: 'ing-u3', subjectId: 'ing', name: 'Movies', orderIndex: 3, topicCount: 2, icon: 'sparkles' },
  { id: 'ing-u4', subjectId: 'ing', name: 'Human in Nature', orderIndex: 4, topicCount: 2, icon: 'compass' },
  { id: 'ing-u5', subjectId: 'ing', name: 'Inspirational People', orderIndex: 5, topicCount: 2, icon: 'star' },
  { id: 'ing-u6', subjectId: 'ing', name: 'Bridging Cultures', orderIndex: 6, topicCount: 2, icon: 'globe' },
  { id: 'ing-u7', subjectId: 'ing', name: 'World Heritage', orderIndex: 7, topicCount: 2, icon: 'landmark' },
  { id: 'ing-u8', subjectId: 'ing', name: 'Emergency and Health', orderIndex: 8, topicCount: 2, icon: 'shield' },
  { id: 'ing-u9', subjectId: 'ing', name: 'Invitations and Celebrations', orderIndex: 9, topicCount: 2, icon: 'award' },
  { id: 'ing-u10', subjectId: 'ing', name: 'Television and Media', orderIndex: 10, topicCount: 2, icon: 'layers' }
];

export const ingilizceTopics: Topic[] = [
  // Unit 1: Studying Abroad
  { id: 'ing-u1-t1', unitId: 'ing-u1', subjectId: 'ing', name: 'Greetings and Introductions', description: 'Meeting people, personal pronouns, verb to be, nationalities and countries.', orderIndex: 1, xpReward: 30, questionCount: 5 },
  { id: 'ing-u1-t2', unitId: 'ing-u1', subjectId: 'ing', name: 'Possessive Adjectives and Basic Questions', description: 'Possessive \'s, my/your/his/her, Wh- questions (where, what, who).', orderIndex: 2, xpReward: 30, questionCount: 5 },

  // Unit 2: My Environment
  { id: 'ing-u2-t1', unitId: 'ing-u2', subjectId: 'ing', name: 'Rooms, Furniture and Prepositions', description: 'Describing homes, prepositions of place (in, on, under, between, next to).', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'ing-u2-t2', unitId: 'ing-u2', subjectId: 'ing', name: 'There is / There are and Directions', description: 'Quantifiers (some, any, a/an), asking and giving street directions.', orderIndex: 2, xpReward: 40, questionCount: 5 },

  // Unit 3: Movies
  { id: 'ing-u3-t1', unitId: 'ing-u3', subjectId: 'ing', name: 'Movie Genres and Likes/Dislikes', description: 'Comedy, sci-fi, horror, express likes (love, hate, like, prefer, can\'t stand).', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'ing-u3-t2', unitId: 'ing-u3', subjectId: 'ing', name: 'Present Simple: Daily Routines & Opinions', description: 'Habits, third person -s, frequency adverbs (always, often, rarely, never).', orderIndex: 2, xpReward: 50, questionCount: 5 },

  // Unit 4: Human in Nature
  { id: 'ing-u4-t1', unitId: 'ing-u4', subjectId: 'ing', name: 'Abilities: Can and Can\'t', description: 'Expressing natural talents, sports abilities, and physical limitations.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'ing-u4-t2', unitId: 'ing-u4', subjectId: 'ing', name: 'Present Continuous: Actions in Progress', description: 'Forming am/is/are + verb-ing, time expressions (now, right now, at the moment).', orderIndex: 2, xpReward: 50, questionCount: 5 },

  // Unit 5: Inspirational People
  { id: 'ing-u5-t1', unitId: 'ing-u5', subjectId: 'ing', name: 'Physical Appearance and Personality', description: 'Adjectives for describing character and looks (tall, curly, generous, stubborn).', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'ing-u5-t2', unitId: 'ing-u5', subjectId: 'ing', name: 'Comparative Adjectives', description: 'Comparing two people/things with -er than / more ... than / irregular forms.', orderIndex: 2, xpReward: 50, questionCount: 5 },

  // Unit 6: Bridging Cultures
  { id: 'ing-u6-t1', unitId: 'ing-u6', subjectId: 'ing', name: 'Traditions and Cultural Customs', description: 'Festivals around the world, national foods and dining etiquette.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'ing-u6-t2', unitId: 'ing-u6', subjectId: 'ing', name: 'Obligations: Have to, Must, Mustn\'t', description: 'Expressing rules, necessities, prohibitions and social obligations.', orderIndex: 2, xpReward: 50, questionCount: 5 },

  // Unit 7: World Heritage
  { id: 'ing-u7-t1', unitId: 'ing-u7', subjectId: 'ing', name: 'Past Simple: Was and Were', description: 'Talking about past states, biographical dates, historical monuments.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'ing-u7-t2', unitId: 'ing-u7', subjectId: 'ing', name: 'Past Simple: Regular and Irregular Verbs', description: 'Forming past actions (-ed vs went, saw, bought), past time markers.', orderIndex: 2, xpReward: 50, questionCount: 5 },

  // Unit 8: Emergency and Health
  { id: 'ing-u8-t1', unitId: 'ing-u8', subjectId: 'ing', name: 'Health Problems and Symptoms', description: 'Illnesses (headache, flu, fever, cough) and hospital vocabulary.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'ing-u8-t2', unitId: 'ing-u8', subjectId: 'ing', name: 'Giving Advice: Should and Shouldn\'t', description: 'Suggesting remedies, doctor instructions and health guidelines.', orderIndex: 2, xpReward: 50, questionCount: 5 },

  // Unit 9: Invitations and Celebrations
  { id: 'ing-u9-t1', unitId: 'ing-u9', subjectId: 'ing', name: 'Making Suggestions: Let\'s, Shall we, Why not', description: 'Proposing activities and planning weekend celebrations.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'ing-u9-t2', unitId: 'ing-u9', subjectId: 'ing', name: 'Accepting and Refusing Invitations', description: 'Polite responses, giving reasons and excuses (I\'d love to, but...).', orderIndex: 2, xpReward: 40, questionCount: 5 },

  // Unit 10: Television and Media
  { id: 'ing-u10-t1', unitId: 'ing-u10', subjectId: 'ing', name: 'TV Programs and Media Types', description: 'Documentaries, reality shows, news, sitcoms and broadcasting terms.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'ing-u10-t2', unitId: 'ing-u10', subjectId: 'ing', name: 'Future Plans: Be Going To', description: 'Expressing intentions, future decisions and predictions based on evidence.', orderIndex: 2, xpReward: 50, questionCount: 5 }
];
