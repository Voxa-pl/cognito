import { Unit, Topic } from '@/types';

export const tarihUnits: Unit[] = [
  { id: 'tar-u1', subjectId: 'tar', name: 'Tarih ve Zaman', orderIndex: 1, topicCount: 3, icon: 'landmark' },
  { id: 'tar-u2', subjectId: 'tar', name: 'İnsanlığın İlk Dönemleri', orderIndex: 2, topicCount: 3, icon: 'compass' },
  { id: 'tar-u3', subjectId: 'tar', name: 'Orta Çağ\'da Dünya', orderIndex: 3, topicCount: 3, icon: 'shield' },
  { id: 'tar-u4', subjectId: 'tar', name: 'İlk ve Orta Çağlarda Türk Dünyası', orderIndex: 4, topicCount: 3, icon: 'award' },
  { id: 'tar-u5', subjectId: 'tar', name: 'İslam Medeniyetinin Doğuşu', orderIndex: 5, topicCount: 3, icon: 'sparkles' },
  { id: 'tar-u6', subjectId: 'tar', name: 'İlk Türk İslam Devletleri', orderIndex: 6, topicCount: 3, icon: 'layers' }
];

export const tarihTopics: Topic[] = [
  // Unit 1: Tarih ve Zaman
  { id: 'tar-u1-t1', unitId: 'tar-u1', subjectId: 'tar', name: 'Tarih Biliminin Konusu ve Yöntemi', description: 'Tarih araştırmalarında kaynak türleri, tarama, tasnif, tahlil, tenkit ve terkip basamakları.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'tar-u1-t2', unitId: 'tar-u1', subjectId: 'tar', name: 'Zamanın Taksimi ve Takvimler', description: 'Güneş ve Ay yılı esaslı takvimler, Türklerin tarih boyunca kullandığı 5 takvim.', orderIndex: 2, xpReward: 40, questionCount: 6 },
  { id: 'tar-u1-t3', unitId: 'tar-u1', subjectId: 'tar', name: 'Tarih Yazıcılığının Türleri', description: 'Hikâyeci (rivayetçi), öğretici (pragmatik) ve araştırmacı tarih yazıcılığı ekolleri.', orderIndex: 3, xpReward: 30, questionCount: 5 },

  // Unit 2: İnsanlığın İlk Dönemleri
  { id: 'tar-u2-t1', unitId: 'tar-u2', subjectId: 'tar', name: 'Tarih Öncesi Çağlar ve Yerleşik Hayat', description: 'Taş ve Maden çağları, Göbeklitepe, Çatalhöyük ve Çayönü yerleşimleri.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'tar-u2-t2', unitId: 'tar-u2', subjectId: 'tar', name: 'İlk Çağ Medeniyet Havzaları', description: 'Mezopotamya (Sümer, Babil, Asur), Mısır, Anadolu (Hitit, Frig, Lidya) ve Ege uygarlıkları.', orderIndex: 2, xpReward: 60, questionCount: 6 },
  { id: 'tar-u2-t3', unitId: 'tar-u2', subjectId: 'tar', name: 'İlk Çağ\'da Hukuk, Ordu ve Ticaret', description: 'Urkagina ve Hammurabi kanunları, Kral Yolu ve ilk düzenli ordular.', orderIndex: 3, xpReward: 50, questionCount: 6 },

  // Unit 3: Orta Çağ'da Dünya
  { id: 'tar-u3-t1', unitId: 'tar-u3', subjectId: 'tar', name: 'Orta Çağ\'da Siyasi Yapılar ve Feodalizm', description: 'Kavimler Göçü, Roma İmparatorluğu\'nun parçalanması ve feodal sistemin doğuşu.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'tar-u3-t2', unitId: 'tar-u3', subjectId: 'tar', name: 'Tarımdan Ticarete Orta Çağ Ekonomisi', description: 'İpek ve Baharat Yolları, loncalar, kervansaraylar ve panayırlar.', orderIndex: 2, xpReward: 40, questionCount: 5 },
  { id: 'tar-u3-t3', unitId: 'tar-u3', subjectId: 'tar', name: 'Orta Çağ Hukuku ve Cengiz Yasası', description: 'Roma Hukuku (12 Levha Kanunları, Justinianus Kanunları) ve Moğol hukuku.', orderIndex: 3, xpReward: 50, questionCount: 6 },

  // Unit 4: İlk ve Orta Çağlarda Türk Dünyası
  { id: 'tar-u4-t1', unitId: 'tar-u4', subjectId: 'tar', name: 'Türklerin Anayurdu ve Türk Göçleri', description: 'Orta Asya\'nın coğrafi özellikleri, konar-göçer yaşam tarzı ve göçlerin nedenleri.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'tar-u4-t2', unitId: 'tar-u4', subjectId: 'tar', name: 'İlk Türk Devletleri: Asya Hun, Kök Türk ve Uygurlar', description: 'Mete Han, onlu teşkilat, Bilge Kağan, Orhun Yazıtları ve Uygurların yerleşik hayata geçişi.', orderIndex: 2, xpReward: 60, questionCount: 6 },
  { id: 'tar-u4-t3', unitId: 'tar-u4', subjectId: 'tar', name: 'Türk Kültür ve Medeniyeti, Töre ve Ordu', description: 'Kut inancı, kurultay, ikili teşkilat, töre kuralları ve Türk cihan hâkimiyeti mefkûresi.', orderIndex: 3, xpReward: 50, questionCount: 6 },

  // Unit 5: İslam Medeniyetinin Doğuşu
  { id: 'tar-u5-t1', unitId: 'tar-u5', subjectId: 'tar', name: 'İslamiyet Öncesi Arabistan ve Hz. Muhammed Dönemi', description: 'Cahiliye Dönemi, Mekke ve Medine dönemi, Bedir, Uhud, Hendek savaşları ve Veda Haccı.', orderIndex: 1, xpReward: 50, questionCount: 6 },
  { id: 'tar-u5-t2', unitId: 'tar-u5', subjectId: 'tar', name: 'Dört Halife Dönemi (Cumhuriyet Devri)', description: 'Hz. Ebubekir, Hz. Ömer, Hz. Osman ve Hz. Ali dönemlerindeki fetihler ve kurumsallaşma.', orderIndex: 2, xpReward: 50, questionCount: 6 },
  { id: 'tar-u5-t3', unitId: 'tar-u5', subjectId: 'tar', name: 'Emeviler, Abbasiler ve Endülüs Medeniyeti', description: 'Arap milliyetçiliği politikası (mevali), Beytü\'l-Hikme ve İslam rönesansı.', orderIndex: 3, xpReward: 50, questionCount: 6 },

  // Unit 6: İlk Türk İslam Devletleri
  { id: 'tar-u6-t1', unitId: 'tar-u6', subjectId: 'tar', name: 'Türklerin İslamiyet\'i Kabulü ve Talas Savaşı', description: '751 Talas Savaşı\'nın sonuçları ve Türk-İslam sentezinin başlangıcı.', orderIndex: 1, xpReward: 40, questionCount: 6 },
  { id: 'tar-u6-t2', unitId: 'tar-u6', subjectId: 'tar', name: 'Karahanlılar, Gazneliler ve Büyük Selçuklular', description: 'Satuk Buğra Han, Sultan Mahmut, Dandanakan ve 1071 Malazgirt Zaferi.', orderIndex: 2, xpReward: 60, questionCount: 6 },
  { id: 'tar-u6-t3', unitId: 'tar-u6', subjectId: 'tar', name: 'İlk Türk İslam Eserleri ve Medeniyeti', description: 'Kutadgu Bilig, Divânu Lugâti\'t-Türk, Atabetü\'l-Hakâyık, Divân-ı Hikmet ve ikta sistemi.', orderIndex: 3, xpReward: 50, questionCount: 6 }
];
