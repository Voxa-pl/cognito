import { Unit, Topic } from '@/types';

export const matematikUnits: Unit[] = [
  { id: 'mat-u1', subjectId: 'mat', name: 'Sayılar ve Nicelikler', orderIndex: 1, topicCount: 4, icon: 'calculator' },
  { id: 'mat-u2', subjectId: 'mat', name: 'Cebirsel Durumlar, Denklemler ve Eşitsizlikler', orderIndex: 2, topicCount: 3, icon: 'layers' },
  { id: 'mat-u3', subjectId: 'mat', name: 'Geometri - Üçgenler', orderIndex: 3, topicCount: 6, icon: 'compass' },
  { id: 'mat-u4', subjectId: 'mat', name: 'Veri, Olasılık ve İstatistik', orderIndex: 4, topicCount: 3, icon: 'trending-up' }
];

export const matematikTopics: Topic[] = [
  { id: 'mat-u1-t1', unitId: 'mat-u1', subjectId: 'mat', name: 'Gerçek Sayı Kümeleri ve Aralıklar', description: 'Gerçek sayı kümeleri ve aralıklar kavramlarını öğren.', orderIndex: 1, xpReward: 50, questionCount: 8 },
  { id: 'mat-u1-t2', unitId: 'mat-u1', subjectId: 'mat', name: 'Mutlak Değer', description: 'Mutlak değer kavramını ve özelliklerini kavra.', orderIndex: 2, xpReward: 50, questionCount: 8 },
  { id: 'mat-u1-t3', unitId: 'mat-u1', subjectId: 'mat', name: 'Üslü ve Köklü İfadeler', description: 'Üslü ve köklü ifadelerle işlemleri yap.', orderIndex: 3, xpReward: 60, questionCount: 8 },
  { id: 'mat-u1-t4', unitId: 'mat-u1', subjectId: 'mat', name: 'Oran ve Orantı', description: 'Oran ve orantı çeşitlerini öğren.', orderIndex: 4, xpReward: 40, questionCount: 6 },

  { id: 'mat-u2-t1', unitId: 'mat-u2', subjectId: 'mat', name: '1. Dereceden Bir Bilinmeyenli Denklem ve Eşitsizlikler', description: 'Denklem ve eşitsizlik çözümlerini kavra.', orderIndex: 1, xpReward: 50, questionCount: 8 },
  { id: 'mat-u2-t2', unitId: 'mat-u2', subjectId: 'mat', name: '1. Dereceden İki Bilinmeyenli Denklem Sistemleri', description: 'İki bilinmeyenli denklem sistemlerini çöz.', orderIndex: 2, xpReward: 60, questionCount: 6 },
  { id: 'mat-u2-t3', unitId: 'mat-u2', subjectId: 'mat', name: 'Problem Çözme ve Modelleme', description: 'Matematiksel problemleri çöz ve modelle.', orderIndex: 3, xpReward: 70, questionCount: 6 },

  { id: 'mat-u3-t1', unitId: 'mat-u3', subjectId: 'mat', name: 'Temel Geometrik Kavramlar ve Açılar', description: 'Temel geometri ve açı kavramlarını keşfet.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'mat-u3-t2', unitId: 'mat-u3', subjectId: 'mat', name: 'Üçgende Açılar', description: 'Üçgende açı özelliklerini incele.', orderIndex: 2, xpReward: 50, questionCount: 5 },
  { id: 'mat-u3-t3', unitId: 'mat-u3', subjectId: 'mat', name: 'Üçgenlerde Eşlik ve Benzerlik', description: 'Üçgenlerde eşlik ve benzerlik kurallarını öğren.', orderIndex: 3, xpReward: 60, questionCount: 6 },
  { id: 'mat-u3-t4', unitId: 'mat-u3', subjectId: 'mat', name: 'Üçgenin Yardımcı Elemanları', description: 'Açıortay, kenarortay ve yükseklik gibi kavramları kavra.', orderIndex: 4, xpReward: 50, questionCount: 6 },
  { id: 'mat-u3-t5', unitId: 'mat-u3', subjectId: 'mat', name: 'Dik Üçgen ve Trigonometriye Giriş', description: 'Pisagor teoremi ve temel trigonometriye giriş.', orderIndex: 5, xpReward: 60, questionCount: 6 },
  { id: 'mat-u3-t6', unitId: 'mat-u3', subjectId: 'mat', name: 'Üçgende Alan', description: 'Üçgenin alanını hesaplama yöntemlerini öğren.', orderIndex: 6, xpReward: 50, questionCount: 6 },

  { id: 'mat-u4-t1', unitId: 'mat-u4', subjectId: 'mat', name: 'Veri Toplama ve Gösterimi', description: 'Verileri toplayıp grafiklerle göster.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'mat-u4-t2', unitId: 'mat-u4', subjectId: 'mat', name: 'Merkezi Eğilim ve Yayılım Ölçüleri', description: 'Aritmetik ortalama, medyan ve mod kavramlarını anla.', orderIndex: 2, xpReward: 50, questionCount: 5 },
  { id: 'mat-u4-t3', unitId: 'mat-u4', subjectId: 'mat', name: 'Basit Olayların Olasılığı', description: 'Olasılık hesaplamalarına giriş yap.', orderIndex: 3, xpReward: 50, questionCount: 6 }
];
