import { Unit, Topic } from '@/types';

export const cografyaUnits: Unit[] = [
  { id: 'cog-u1', subjectId: 'cog', name: 'Doğal Sistemler ve Harita Bilgisi', orderIndex: 1, topicCount: 4, icon: 'globe' },
  { id: 'cog-u2', subjectId: 'cog', name: 'Atmosfer ve İklim', orderIndex: 2, topicCount: 3, icon: 'compass' },
  { id: 'cog-u3', subjectId: 'cog', name: 'Beşerî Sistemler ve Yerleşme', orderIndex: 3, topicCount: 2, icon: 'layers' },
  { id: 'cog-u4', subjectId: 'cog', name: 'Bölgeler ve Ülkeler', orderIndex: 4, topicCount: 2, icon: 'landmark' },
  { id: 'cog-u5', subjectId: 'cog', name: 'Çevre ve Toplum', orderIndex: 5, topicCount: 2, icon: 'shield' }
];

export const cografyaTopics: Topic[] = [
  // Unit 1: Doğal Sistemler ve Harita Bilgisi
  { id: 'cog-u1-t1', unitId: 'cog-u1', subjectId: 'cog', name: 'Doğa ve İnsan Etkileşimi, Coğrafyanın İlkeleri', description: 'Coğrafyanın nedensellik, dağılış ve karşılıklı ilgi ilkeleri ile dört temel ortam.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'cog-u1-t2', unitId: 'cog-u1', subjectId: 'cog', name: 'Dünya\'nın Şekli ve Hareketleri', description: 'Geoitin sonuçları, günlük hareket ve eksen eğikliğinin mevsimlere etkisi.', orderIndex: 2, xpReward: 60, questionCount: 6 },
  { id: 'cog-u1-t3', unitId: 'cog-u1', subjectId: 'cog', name: 'Coğrafi Koordinat Sistemi ve Yerel Saat', description: 'Paralel, meridyen özellikleri, yerel saat hesaplamaları ve saat dilimleri.', orderIndex: 3, xpReward: 60, questionCount: 6 },
  { id: 'cog-u1-t4', unitId: 'cog-u1', subjectId: 'cog', name: 'Harita Bilgisi, Ölçek ve İzohipsler', description: 'Projeksiyon tipleri, harita ölçeği hesaplamaları ve eş yükselti eğrileri yöntemi.', orderIndex: 4, xpReward: 50, questionCount: 6 },

  // Unit 2: Atmosfer ve İklim
  { id: 'cog-u2-t1', unitId: 'cog-u2', subjectId: 'cog', name: 'Atmosferin Katmanları ve Sıcaklık Dağılışı', description: 'Troposfer, stratosfer ve sıcaklığı etkileyen faktörler (enlem, yükselti, nem).', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'cog-u2-t2', unitId: 'cog-u2', subjectId: 'cog', name: 'Basınç, Rüzgârlar ve Yağış Tipleri', description: 'Termik ve dinamik basınç, sürekli/yerel rüzgârlar, bağıl nem ve yağış türleri.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'cog-u2-t3', unitId: 'cog-u2', subjectId: 'cog', name: 'Büyük İklim Tipleri (Makroklima)', description: 'Ekvatoral, Akdeniz, Muson, Tundra ve Çöl iklimlerinin özellikleri ile bitki örtüsü.', orderIndex: 3, xpReward: 50, questionCount: 6 },

  // Unit 3: Beşerî Sistemler ve Yerleşme
  { id: 'cog-u3-t1', unitId: 'cog-u3', subjectId: 'cog', name: 'Yerleşmenin Tarihsel Gelişimi ve Dokuları', description: 'İlk yerleşmelerin seçildiği alanlar, kır ve şehir yerleşmeleri, toplu/dağınık dokular.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'cog-u3-t2', unitId: 'cog-u3', subjectId: 'cog', name: 'Türkiye\'de Yerleşmeler ve Nüfus Dağılışı', description: 'Türkiye\'de yerleşmeyi ve nüfusun dağılışını etkileyen doğal ve beşerî faktörler.', orderIndex: 2, xpReward: 40, questionCount: 6 },

  // Unit 4: Bölgeler ve Ülkeler
  { id: 'cog-u4-t1', unitId: 'cog-u4', subjectId: 'cog', name: 'Bölge Kavramı ve Bölge Türleri', description: 'Şekilsel (doğal, beşerî) bölgeler ve işlevsel (yönetim, hizmet, planlama) bölgeler.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'cog-u4-t2', unitId: 'cog-u4', subjectId: 'cog', name: 'Bölge Sınırlarının Değişebilirliği', description: 'Doğal bölge sınırlarının zor değişmesi, beşerî bölge sınırlarının dinamik yapısı.', orderIndex: 2, xpReward: 40, questionCount: 5 },

  // Unit 5: Çevre ve Toplum
  { id: 'cog-u5-t1', unitId: 'cog-u5', subjectId: 'cog', name: 'İnsanın Doğayı Değiştirme Biçimleri', description: 'Barajlar, tüneller, madencilik faaliyetleri ve doğa üzerindeki insan izleri.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'cog-u5-t2', unitId: 'cog-u5', subjectId: 'cog', name: 'Doğal Afetler ve Çevre Koruma', description: 'Deprem, heyelan, sel, kuraklık ve doğal afetlerden korunma yöntemleri.', orderIndex: 2, xpReward: 40, questionCount: 5 }
];
