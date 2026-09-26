import { Unit, Topic } from '@/types';

export const edebiyatUnits: Unit[] = [
  { id: 'tde-u1', subjectId: 'tde', name: 'Giriş ve Dil Bilgisi', orderIndex: 1, topicCount: 3, icon: 'book-open' },
  { id: 'tde-u2', subjectId: 'tde', name: 'Hikâye (Öykü)', orderIndex: 2, topicCount: 3, icon: 'book-text' },
  { id: 'tde-u3', subjectId: 'tde', name: 'Şiir', orderIndex: 3, topicCount: 3, icon: 'sparkles' },
  { id: 'tde-u4', subjectId: 'tde', name: 'Masal ve Fabl', orderIndex: 4, topicCount: 3, icon: 'compass' },
  { id: 'tde-u5', subjectId: 'tde', name: 'Roman', orderIndex: 5, topicCount: 3, icon: 'layers' },
  { id: 'tde-u6', subjectId: 'tde', name: 'Tiyatro', orderIndex: 6, topicCount: 3, icon: 'award' }
];

export const edebiyatTopics: Topic[] = [
  // Unit 1: Giriş ve Dil Bilgisi
  { id: 'tde-u1-t1', unitId: 'tde-u1', subjectId: 'tde', name: 'Edebiyatın Tanımı ve Sanatla İlişkisi', description: 'Güzel sanatlar içinde edebiyatın yeri ve bilim dallarıyla ilişkisi.', orderIndex: 1, xpReward: 30, questionCount: 6 },
  { id: 'tde-u1-t2', unitId: 'tde-u1', subjectId: 'tde', name: 'Dilin Tarihî Gelişimi ve Lehçe-Şive-Ağız', description: 'Türkçenin tarihî dönemleri ve dilin kullanımından doğan türler.', orderIndex: 2, xpReward: 40, questionCount: 6 },
  { id: 'tde-u1-t3', unitId: 'tde-u1', subjectId: 'tde', name: 'İletişim ve Ögeleri', description: 'Gönderici, alıcı, ileti, kanal, dönüt, kod ve bağlam unsurlarını kavra.', orderIndex: 3, xpReward: 40, questionCount: 6 },

  // Unit 2: Hikâye (Öykü)
  { id: 'tde-u2-t1', unitId: 'tde-u2', subjectId: 'tde', name: 'Olay ve Durum Hikâyesi', description: 'Maupassant tarzı olay hikâyesi ile Çehov tarzı durum hikâyesinin farkları.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'tde-u2-t2', unitId: 'tde-u2', subjectId: 'tde', name: 'Hikâyenin Yapı Unsurları ve Anlatıcı', description: 'Olay örgüsü, kişi, zaman, mekân ve anlatıcı bakış açıları.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'tde-u2-t3', unitId: 'tde-u2', subjectId: 'tde', name: 'İsimler ve İsim Tamlamaları', description: 'Varlıkların verilişine, maddesine ve sayısına göre isimler, tamlamalar.', orderIndex: 3, xpReward: 50, questionCount: 6 },

  // Unit 3: Şiir
  { id: 'tde-u3-t1', unitId: 'tde-u3', subjectId: 'tde', name: 'Nazım Birimi, Ölçü ve Ahenk Unsurları', description: 'Dize, beyit, dörtlük, hece/aruz ölçüsü, kafiye çeşitleri ve redif.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'tde-u3-t2', unitId: 'tde-u3', subjectId: 'tde', name: 'Şiir Türleri: Lirik, Epik, Didaktik, Pastoral', description: 'Konularına göre şiir türlerini ve temel edebi sanatları tanı.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'tde-u3-t3', unitId: 'tde-u3', subjectId: 'tde', name: 'Sıfatlar (Ön Adlar) ve Sıfat Tamlamaları', description: 'Niteleme ve belirtme sıfatları, sıfatlarda pekiştirme ve küçültme.', orderIndex: 3, xpReward: 50, questionCount: 6 },

  // Unit 4: Masal ve Fabl
  { id: 'tde-u4-t1', unitId: 'tde-u4', subjectId: 'tde', name: 'Masalın Özellikleri ve Bölümleri', description: 'Döşeme, serim, düğüm, çözüm ve dilek bölümleri ile tekerlemeler.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'tde-u4-t2', unitId: 'tde-u4', subjectId: 'tde', name: 'Fabl Türü ve Dünya Edebiyatındaki Örnekleri', description: 'Teşhis ve intak sanatları, Ezop, La Fontaine ve Şeyhi\'nin Harname\'si.', orderIndex: 2, xpReward: 40, questionCount: 5 },
  { id: 'tde-u4-t3', unitId: 'tde-u4', subjectId: 'tde', name: 'Edat, Bağlaç ve Ünlemler', description: 'Tek başına anlamı olmayan, cümle içinde görev üstlenen sözcükler.', orderIndex: 3, xpReward: 50, questionCount: 6 },

  // Unit 5: Roman
  { id: 'tde-u5-t1', unitId: 'tde-u5', subjectId: 'tde', name: 'Roman Türünün Tarihî Gelişimi', description: 'İlk roman örnekleri (Don Kişot), Türk edebiyatında ilk çeviri ve yerli romanlar.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'tde-u5-t2', unitId: 'tde-u5', subjectId: 'tde', name: 'Romanda Teknikler ve Anlatım Türleri', description: 'İç monolog, bilinç akışı, diyalog, betimleme ve öyküleme teknikleri.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'tde-u5-t3', unitId: 'tde-u5', subjectId: 'tde', name: 'Zamirler (Adıllar)', description: 'Kişi, işaret, belgisiz, soru ve dönüşlülük zamirleri.', orderIndex: 3, xpReward: 50, questionCount: 6 },

  // Unit 6: Tiyatro
  { id: 'tde-u6-t1', unitId: 'tde-u6', subjectId: 'tde', name: 'Tiyatronun Tarihçesi ve Temel Türleri', description: 'Trajedi, komedi ve dram türlerinin özellikleri ile üç birlik kuralı.', orderIndex: 1, xpReward: 40, questionCount: 5 },
  { id: 'tde-u6-t2', unitId: 'tde-u6', subjectId: 'tde', name: 'Geleneksel Türk Tiyatrosu', description: 'Karagöz, Orta Oyunu, Meddah ve Köy Seyirlik Oyunlarının yapısı.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'tde-u6-t3', unitId: 'tde-u6', subjectId: 'tde', name: 'Zarflar (Belirteçler)', description: 'Durum, zaman, yer-yön, miktar ve soru zarflarının cümledeki görevleri.', orderIndex: 3, xpReward: 50, questionCount: 6 }
];
