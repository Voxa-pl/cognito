import { Unit, Topic } from '@/types';

export const biyolojiUnits: Unit[] = [
  { id: 'biy-u1', subjectId: 'biy', name: 'Yaşam Bilimi Biyoloji', orderIndex: 1, topicCount: 4, icon: 'dna' },
  { id: 'biy-u2', subjectId: 'biy', name: 'Hücrenin Yapısı ve İşlevi', orderIndex: 2, topicCount: 4, icon: 'layers' },
  { id: 'biy-u3', subjectId: 'biy', name: 'Canlılar Dünyası ve Sınıflandırma', orderIndex: 3, topicCount: 4, icon: 'globe' },
  { id: 'biy-u4', subjectId: 'biy', name: 'Hücre Bölünmeleri ve Üreme', orderIndex: 4, topicCount: 3, icon: 'sparkles' },
  { id: 'biy-u5', subjectId: 'biy', name: 'Ekosistem ve Güncel Çevre Sorunları', orderIndex: 5, topicCount: 3, icon: 'compass' }
];

export const biyolojiTopics: Topic[] = [
  // Unit 1: Yaşam Bilimi Biyoloji
  { id: 'biy-u1-t1', unitId: 'biy-u1', subjectId: 'biy', name: 'Canlıların Ortak Özellikleri', description: 'Hücresel yapı, beslenme, solunum, homeostazi ve üreme gibi ortak özellikleri öğren.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'biy-u1-t2', unitId: 'biy-u1', subjectId: 'biy', name: 'İnorganik Bileşikler: Su, Mineral ve Asit-Baz', description: 'Suyun canlılar için önemi, minerallerin görevleri ve tampon çözeltiler.', orderIndex: 2, xpReward: 40, questionCount: 6 },
  { id: 'biy-u1-t3', unitId: 'biy-u1', subjectId: 'biy', name: 'Organik Bileşikler: Karbonhidrat, Yağ ve Protein', description: 'Monosakkaritler, trigliseritler, amino asitler ve polipeptit yapıları.', orderIndex: 3, xpReward: 50, questionCount: 6 },
  { id: 'biy-u1-t4', unitId: 'biy-u1', subjectId: 'biy', name: 'Enzimler, Nükleik Asitler ve ATP', description: 'Enzimlerin çalışma mekanizması, DNA/RNA yapısı ve enerji molekülü ATP.', orderIndex: 4, xpReward: 60, questionCount: 6 },

  // Unit 2: Hücrenin Yapısı ve İşlevi
  { id: 'biy-u2-t1', unitId: 'biy-u2', subjectId: 'biy', name: 'Hücre Teorisi ve Hücre Tipleri', description: 'Prokaryot ve ökaryot hücre yapılarının temel farklarını karşılaştır.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'biy-u2-t2', unitId: 'biy-u2', subjectId: 'biy', name: 'Hücre Zarı ve Madde Geçişleri', description: 'Difüzyon, osmoz, aktif taşıma, endositoz ve ekzositoz mekanizmaları.', orderIndex: 2, xpReward: 60, questionCount: 6 },
  { id: 'biy-u2-t3', unitId: 'biy-u2', subjectId: 'biy', name: 'Sitoplazma ve Organeller', description: 'Mitokondri, kloroplast, ribozom, endoplazmik retikulum ve golgi fonksiyonları.', orderIndex: 3, xpReward: 60, questionCount: 6 },
  { id: 'biy-u2-t4', unitId: 'biy-u2', subjectId: 'biy', name: 'Çekirdek ve Hücresel Organizasyon', description: 'Çekirdekçik, kromatin iplik ve tek hücreliden çok hücreliye organizasyon.', orderIndex: 4, xpReward: 40, questionCount: 5 },

  // Unit 3: Canlılar Dünyası ve Sınıflandırma
  { id: 'biy-u3-t1', unitId: 'biy-u3', subjectId: 'biy', name: 'Canlıların Sınıflandırılması ve İkili Adlandırma', description: 'Doğal (filogenetik) sınıflandırma basamakları ve Linnaeus adlandırma sistemi.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'biy-u3-t2', unitId: 'biy-u3', subjectId: 'biy', name: 'Bakteriler ve Arkeler Âlemi', description: 'Prokaryot mikroorganizmaların biyolojik ve ekonomik önemini kavra.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'biy-u3-t3', unitId: 'biy-u3', subjectId: 'biy', name: 'Protistler, Mantarlar ve Bitkiler Âlemi', description: 'Ökaryot canlıların anatomik özellikleri ve fotosentetik üreticiler.', orderIndex: 3, xpReward: 50, questionCount: 6 },
  { id: 'biy-u3-t4', unitId: 'biy-u3', subjectId: 'biy', name: 'Hayvanlar Âlemi ve Virüsler', description: 'Omurgasız ve omurgalı hayvanlar ile virüslerin biyolojik yapısı.', orderIndex: 4, xpReward: 60, questionCount: 6 },

  // Unit 4: Hücre Bölünmeleri ve Üreme
  { id: 'biy-u4-t1', unitId: 'biy-u4', subjectId: 'biy', name: 'Mitoz Bölünme ve Eşeysiz Üreme', description: 'Mitozun evreleri, sitokinez ve eşeysiz üreme çeşitleri.', orderIndex: 1, xpReward: 50, questionCount: 5 },
  { id: 'biy-u4-t2', unitId: 'biy-u4', subjectId: 'biy', name: 'Mayoz Bölünme ve Eşeyli Üreme', description: 'Krossing-over, homolog kromozom ayrılması ve genetik çeşitlilik.', orderIndex: 2, xpReward: 60, questionCount: 6 },
  { id: 'biy-u4-t3', unitId: 'biy-u4', subjectId: 'biy', name: 'Bölünmelerin Karşılaştırılması', description: 'Mitoz ve mayozun kromozom sayısı ve kalıtsal yapı bakımından karşılaştırması.', orderIndex: 3, xpReward: 40, questionCount: 5 },

  // Unit 5: Ekosistem ve Güncel Çevre Sorunları
  { id: 'biy-u5-t1', unitId: 'biy-u5', subjectId: 'biy', name: 'Ekosistemin Yapısı ve Besin Zinciri', description: 'Üretici, tüketici, ayrıştırıcı dengesi ve enerji piramidi.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'biy-u5-t2', unitId: 'biy-u5', subjectId: 'biy', name: 'Madde Döngüleri ve Biyoçeşitlilik', description: 'Karbon, azot ve su döngüleri ile biyoçeşitliliğin korunması.', orderIndex: 2, xpReward: 40, questionCount: 5 },
  { id: 'biy-u5-t3', unitId: 'biy-u5', subjectId: 'biy', name: 'Küresel Çevre Sorunları ve Sürdürülebilirlik', description: 'Ekolojik ayak izi, karbon ayak izi ve çevre etiği.', orderIndex: 3, xpReward: 40, questionCount: 5 }
];
