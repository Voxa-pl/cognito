import { Unit, Topic } from '@/types';

export const fizikUnits: Unit[] = [
  { id: 'fiz-u1', subjectId: 'fiz', name: 'Fizik Bilimine Giriş', orderIndex: 1, topicCount: 4, icon: 'compass' },
  { id: 'fiz-u2', subjectId: 'fiz', name: 'Madde ve Özellikleri', orderIndex: 2, topicCount: 4, icon: 'layers' },
  { id: 'fiz-u3', subjectId: 'fiz', name: 'Hareket ve Kuvvet', orderIndex: 3, topicCount: 5, icon: 'trending-up' },
  { id: 'fiz-u4', subjectId: 'fiz', name: 'Enerji', orderIndex: 4, topicCount: 5, icon: 'zap' },
  { id: 'fiz-u5', subjectId: 'fiz', name: 'Isı ve Sıcaklık', orderIndex: 5, topicCount: 7, icon: 'flame' },
  { id: 'fiz-u6', subjectId: 'fiz', name: 'Elektrostatik', orderIndex: 6, topicCount: 4, icon: 'shield' }
];

export const fizikTopics: Topic[] = [
  { id: 'fiz-u1-t1', unitId: 'fiz-u1', subjectId: 'fiz', name: 'Fizik Bilimi ve Önemi', description: 'Fiziğin ne olduğunu ve önemini keşfet.', orderIndex: 1, xpReward: 30, questionCount: 6 },
  { id: 'fiz-u1-t2', unitId: 'fiz-u1', subjectId: 'fiz', name: 'Fiziğin Alt Dalları', description: 'Mekanik, termodinamik gibi fiziğin alt dallarını öğren.', orderIndex: 2, xpReward: 40, questionCount: 6 },
  { id: 'fiz-u1-t3', unitId: 'fiz-u1', subjectId: 'fiz', name: 'Fiziksel Niceliklerin Sınıflandırılması', description: 'Temel ve türetilmiş, skaler ve vektörel nicelikleri kavra.', orderIndex: 3, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u1-t4', unitId: 'fiz-u1', subjectId: 'fiz', name: 'Bilimsel Araştırma Merkezleri', description: 'CERN, TÜBİTAK gibi araştırma merkezlerini tanı.', orderIndex: 4, xpReward: 30, questionCount: 5 },

  { id: 'fiz-u2-t1', unitId: 'fiz-u2', subjectId: 'fiz', name: 'Kütle, Hacim ve Özkütle', description: 'Maddenin temel özelliklerini öğren.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u2-t2', unitId: 'fiz-u2', subjectId: 'fiz', name: 'Katılarda Dayanıklılık', description: 'Katı cisimlerin dayanıklılık özelliklerini incele.', orderIndex: 2, xpReward: 40, questionCount: 5 },
  { id: 'fiz-u2-t3', unitId: 'fiz-u2', subjectId: 'fiz', name: 'Akışkanların Özellikleri', description: 'Yüzey gerilimi ve kılcallık kavramlarını anla.', orderIndex: 3, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u2-t4', unitId: 'fiz-u2', subjectId: 'fiz', name: 'Maddenin Plazma Hali', description: 'Maddenin 4. hali olan plazmayı keşfet.', orderIndex: 4, xpReward: 30, questionCount: 5 },

  { id: 'fiz-u3-t1', unitId: 'fiz-u3', subjectId: 'fiz', name: 'Hareket Kavramları', description: 'Konum, yer değiştirme, hız ve sürat kavramlarını öğren.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u3-t2', unitId: 'fiz-u3', subjectId: 'fiz', name: 'Düzgün Doğrusal Hareket', description: 'Sabit hızlı hareketin özelliklerini kavra.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u3-t3', unitId: 'fiz-u3', subjectId: 'fiz', name: 'Kuvvet Kavramı ve Çeşitleri', description: 'Kuvvetin ne olduğunu ve doğadaki temel kuvvetleri tanı.', orderIndex: 3, xpReward: 40, questionCount: 6 },
  { id: 'fiz-u3-t4', unitId: 'fiz-u3', subjectId: 'fiz', name: 'Newton\'un Hareket Yasaları', description: 'Eylemsizlik, dinamiğin temel prensibi ve etki-tepki yasaları.', orderIndex: 4, xpReward: 60, questionCount: 6 },
  { id: 'fiz-u3-t5', unitId: 'fiz-u3', subjectId: 'fiz', name: 'Sürtünme Kuvveti', description: 'Sürtünme kuvvetinin özelliklerini ve etkilerini incele.', orderIndex: 5, xpReward: 50, questionCount: 6 },

  { id: 'fiz-u4-t1', unitId: 'fiz-u4', subjectId: 'fiz', name: 'İş ve Güç', description: 'Fiziksel anlamda iş ve güç kavramlarını öğren.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u4-t2', unitId: 'fiz-u4', subjectId: 'fiz', name: 'Mekanik Enerji Çeşitleri', description: 'Kinetik ve potansiyel enerjiyi kavra.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u4-t3', unitId: 'fiz-u4', subjectId: 'fiz', name: 'Mekanik Enerjinin Korunumu', description: 'Enerjinin korunumu yasasını anla.', orderIndex: 3, xpReward: 60, questionCount: 6 },
  { id: 'fiz-u4-t4', unitId: 'fiz-u4', subjectId: 'fiz', name: 'Verim ve Enerji Tasarrufu', description: 'Sistemlerde verim ve enerji tasarrufunun önemini keşfet.', orderIndex: 4, xpReward: 40, questionCount: 5 },
  { id: 'fiz-u4-t5', unitId: 'fiz-u4', subjectId: 'fiz', name: 'Enerji Kaynakları', description: 'Yenilenebilir ve yenilenemez enerji kaynaklarını tanı.', orderIndex: 5, xpReward: 40, questionCount: 5 },

  { id: 'fiz-u5-t1', unitId: 'fiz-u5', subjectId: 'fiz', name: 'Temel Kavramlar', description: 'Isı, sıcaklık ve iç enerji kavramlarını öğren.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'fiz-u5-t2', unitId: 'fiz-u5', subjectId: 'fiz', name: 'Termometreler ve Sıcaklık Ölçekleri', description: 'Termometre çeşitleri ve sıcaklık birimlerini kavra.', orderIndex: 2, xpReward: 40, questionCount: 5 },
  { id: 'fiz-u5-t3', unitId: 'fiz-u5', subjectId: 'fiz', name: 'Öz Isı ve Isı Sığası', description: 'Öz ısı ve ısı sığası hesaplamalarını yap.', orderIndex: 3, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u5-t4', unitId: 'fiz-u5', subjectId: 'fiz', name: 'Hâl Değişimi', description: 'Maddenin hâl değişimi olaylarını incele.', orderIndex: 4, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u5-t5', unitId: 'fiz-u5', subjectId: 'fiz', name: 'Isıl Denge', description: 'Farklı sıcaklıktaki maddelerin ısıl dengesini hesapla.', orderIndex: 5, xpReward: 60, questionCount: 6 },
  { id: 'fiz-u5-t6', unitId: 'fiz-u5', subjectId: 'fiz', name: 'Isının Yayılma Yolları', description: 'İletim, konveksiyon ve ışıma yollarını öğren.', orderIndex: 6, xpReward: 40, questionCount: 5 },
  { id: 'fiz-u5-t7', unitId: 'fiz-u5', subjectId: 'fiz', name: 'Genleşme', description: 'Katı ve sıvıların genleşme özelliklerini anla.', orderIndex: 7, xpReward: 50, questionCount: 6 },

  { id: 'fiz-u6-t1', unitId: 'fiz-u6', subjectId: 'fiz', name: 'Elektrik Yükleri ve Yüklenme Yolları', description: 'Elektrik yüklerini ve statik elektriklenmeyi kavra.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'fiz-u6-t2', unitId: 'fiz-u6', subjectId: 'fiz', name: 'Elektroskop', description: 'Elektroskobun çalışma prensibini öğren.', orderIndex: 2, xpReward: 40, questionCount: 5 },
  { id: 'fiz-u6-t3', unitId: 'fiz-u6', subjectId: 'fiz', name: 'İletken, Yalıtkan ve Topraklama', description: 'İletkenlik, yalıtkanlık ve topraklama olaylarını incele.', orderIndex: 3, xpReward: 40, questionCount: 5 },
  { id: 'fiz-u6-t4', unitId: 'fiz-u6', subjectId: 'fiz', name: 'Coulomb Yasası', description: 'Yüklü cisimler arasındaki elektriksel kuvveti hesapla.', orderIndex: 4, xpReward: 60, questionCount: 6 }
];
