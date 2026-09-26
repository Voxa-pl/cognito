import { Unit, Topic } from '@/types';

export const kimyaUnits: Unit[] = [
  { id: 'kim-u1', subjectId: 'kim', name: 'Kimya Bilimi', orderIndex: 1, topicCount: 4, icon: 'flask-conical' },
  { id: 'kim-u2', subjectId: 'kim', name: 'Atom ve Periyodik Sistem', orderIndex: 2, topicCount: 4, icon: 'layers' },
  { id: 'kim-u3', subjectId: 'kim', name: 'Kimyasal Türler Arası Etkileşimler', orderIndex: 3, topicCount: 4, icon: 'zap' },
  { id: 'kim-u4', subjectId: 'kim', name: 'Maddenin Halleri', orderIndex: 4, topicCount: 4, icon: 'flame' },
  { id: 'kim-u5', subjectId: 'kim', name: 'Çevre Kimyası', orderIndex: 5, topicCount: 3, icon: 'globe' }
];

export const kimyaTopics: Topic[] = [
  // Unit 1: Kimya Bilimi
  { id: 'kim-u1-t1', unitId: 'kim-u1', subjectId: 'kim', name: 'Simyadan Kimyaya', description: 'Simya döneminden modern kimya bilimine geçiş sürecini kavra.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'kim-u1-t2', unitId: 'kim-u1', subjectId: 'kim', name: 'Kimya Disiplinleri ve Çalışma Alanları', description: 'Organik, inorganik, analitik kimya gibi ana disiplinleri öğren.', orderIndex: 2, xpReward: 40, questionCount: 6 },
  { id: 'kim-u1-t3', unitId: 'kim-u1', subjectId: 'kim', name: 'Kimyanın Sembolik Dili', description: 'Element sembollerini ve yaygın bileşik formüllerini tanı.', orderIndex: 3, xpReward: 50, questionCount: 6 },
  { id: 'kim-u1-t4', unitId: 'kim-u1', subjectId: 'kim', name: 'Kimya Uygulamalarında Güvenlik', description: 'Laboratuvar güvenlik kuralları ve tehlike uyarı işaretlerini öğren.', orderIndex: 4, xpReward: 30, questionCount: 5 },

  // Unit 2: Atom ve Periyodik Sistem
  { id: 'kim-u2-t1', unitId: 'kim-u2', subjectId: 'kim', name: 'Atom Modelleri', description: 'Dalton, Thomson, Rutherford ve Bohr atom modellerini incele.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'kim-u2-t2', unitId: 'kim-u2', subjectId: 'kim', name: 'Atomun Yapısı ve Tanecikler', description: 'Proton, nötron, elektron, kütle numarası ve izotop kavramlarını anla.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'kim-u2-t3', unitId: 'kim-u2', subjectId: 'kim', name: 'Periyodik Sistem ve Yer Bulma', description: 'Moseley yasası, periyotlar, gruplar ve katman elektron dağılımını öğren.', orderIndex: 3, xpReward: 60, questionCount: 6 },
  { id: 'kim-u2-t4', unitId: 'kim-u2', subjectId: 'kim', name: 'Periyodik Özelliklerin Değişimi', description: 'Atom yarıçapı, iyonlaşma enerjisi, elektronegatiflik değişimlerini kavra.', orderIndex: 4, xpReward: 60, questionCount: 6 },

  // Unit 3: Kimyasal Türler Arası Etkileşimler
  { id: 'kim-u3-t1', unitId: 'kim-u3', subjectId: 'kim', name: 'Kimyasal Türler ve Etkileşimlerin Sınıflandırılması', description: 'Atom, molekül, iyon kavramları ile güçlü-zayıf etkileşimleri tanı.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'kim-u3-t2', unitId: 'kim-u3', subjectId: 'kim', name: 'İyonik Bağ ve İyonik Bileşikler', description: 'Elektron alışverişi, Lewis yapısı ve iyonik bileşiklerin adlandırılması.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'kim-u3-t3', unitId: 'kim-u3', subjectId: 'kim', name: 'Kovalent Bağ ve Metalik Bağ', description: 'Elektron ortaklaşması, polar/apolar kovalent bağ ve metalik bağ teorisi.', orderIndex: 3, xpReward: 60, questionCount: 6 },
  { id: 'kim-u3-t4', unitId: 'kim-u3', subjectId: 'kim', name: 'Zayıf Etkileşimler ve Fiziksel/Kimyasal Değişimler', description: 'Van der Waals, hidrojen bağları ve değişimlerin ayırt edilmesi.', orderIndex: 4, xpReward: 50, questionCount: 6 },

  // Unit 4: Maddenin Halleri
  { id: 'kim-u4-t1', unitId: 'kim-u4', subjectId: 'kim', name: 'Maddenin Fiziksel Halleri', description: 'Katı, sıvı, gaz ve plazma hallerinin genel özelliklerini karşılaştır.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'kim-u4-t2', unitId: 'kim-u4', subjectId: 'kim', name: 'Katılar ve Kristal Türleri', description: 'Amorf ve kristal katılar (iyonik, moleküler, kovalent, metalik).', orderIndex: 2, xpReward: 50, questionCount: 5 },
  { id: 'kim-u4-t3', unitId: 'kim-u4', subjectId: 'kim', name: 'Sıvılar: Viskozite ve Buhar Basıncı', description: 'Viskoziteyi etkileyen faktörler, buharlaşma, kaynama ve nem.', orderIndex: 3, xpReward: 50, questionCount: 6 },
  { id: 'kim-u4-t4', unitId: 'kim-u4', subjectId: 'kim', name: 'Gazlar ve Plazma Hali', description: 'Gaz yasalarının temelleri ve plazma halinin kullanım alanları.', orderIndex: 4, xpReward: 50, questionCount: 5 },

  // Unit 5: Çevre Kimyası
  { id: 'kim-u5-t1', unitId: 'kim-u5', subjectId: 'kim', name: 'Hava Kirliliği ve Sera Etkisi', description: 'Sera gazları, ozon tabakasının incelmesi ve asit yağmurlarını incele.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'kim-u5-t2', unitId: 'kim-u5', subjectId: 'kim', name: 'Su ve Toprak Kirliliği', description: 'Ağır metaller, deterjanlar, pestisitler ve su arıtma yöntemleri.', orderIndex: 2, xpReward: 40, questionCount: 5 },
  { id: 'kim-u5-t3', unitId: 'kim-u5', subjectId: 'kim', name: 'Çevreye Faydalı ve Zararlı Kimyasallar', description: 'Sodyum, potasyum, kalsiyum gibi elementler ile cıva ve kurşun etkileri.', orderIndex: 3, xpReward: 40, questionCount: 5 }
];
