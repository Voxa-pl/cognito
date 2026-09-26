import { Badge } from '@/types';

export const badges: Badge[] = [
  { slug: 'alev-savascisi', name: 'Haftalık İstikrar', description: '7 gün kesintisiz çalışma serisi', icon: 'flame', condition: '7-day streak' },
  { slug: 'dag-tirmanicisi', name: 'Aylık Disiplin', description: '30 gün kesintisiz çalışma serisi', icon: 'compass', condition: '30-day streak' },
  { slug: 'beyin-firtinasi', name: '100 Doğru Başarısı', description: '100 soruyu doğru cevapla', icon: 'brain', condition: '100 correct answers' },
  { slug: 'simsek-hizi', name: 'Analitik Hız & Doğruluk', description: 'Bir testi 60 saniyenin altında hatasız tamamla', icon: 'zap', condition: 'perfect quiz <60s' },
  { slug: 'kitap-kurdu', name: 'Çok Yönlü Akademik Başarı', description: '3 farklı dersi başarıyla tamamla', icon: 'book-open', condition: '3 subjects done' },
  { slug: 'hedef-odakli', name: 'Hedef Disiplini', description: 'Art arda 5 günlük çalışma hedefini tamamla', icon: 'target', condition: '5 daily quests in row' },
  { slug: 'yildiz-ogrenci', name: 'Üstün Akademik Düzey', description: '10. seviyeye ulaş', icon: 'star', condition: 'level 10' },
  { slug: 'lider', name: 'Akademik Başarı Birincisi', description: 'Haftalık başarı sıralamasında 1. ol', icon: 'award', condition: 'weekly #1' },
  { slug: 'pisagor-ustasi', name: 'Matematik & Mantık Yetkinliği', description: 'Matematik kazanımlarında ustalaş', icon: 'calculator', condition: 'Master Mathematics' },
  { slug: 'simyadan-kimyaya', name: 'Kimya Bilimleri Başarısı', description: 'Kimya kazanımlarında ustalaş', icon: 'flask-conical', condition: 'Master Chemistry' },
  { slug: 'zaman-yolcusu', name: 'Tarih & Medeniyet Bilinci', description: 'Tarih kazanımlarında ustalaş', icon: 'landmark', condition: 'Master History' },
  { slug: 'hucre-kasifi', name: 'Biyolojik Bilimler Yetkinliği', description: 'Biyoloji kazanımlarında ustalaş', icon: 'dna', condition: 'Master Biology' },
  { slug: 'sahne-yildizi', name: 'Türk Dili & Edebiyat Uzmanlığı', description: 'Türk Dili ve Edebiyatı kazanımlarında ustalaş', icon: 'sparkles', condition: 'Master Literature' },
  { slug: 'harita-ustasi', name: 'Coğrafi Analiz Yetkinliği', description: 'Coğrafya kazanımlarında ustalaş', icon: 'globe', condition: 'Master Geography' },
  { slug: 'newton-ciragi', name: 'Fizik Bilimi & Modelleme', description: 'Fizik kazanımlarında ustalaş', icon: 'shield', condition: 'Master Physics' },
  { slug: 'grammar-champion', name: 'Yabancı Dil Yetkinliği', description: 'İngilizce kazanımlarında ustalaş', icon: 'trophy', condition: 'Master English' },
  { slug: 'zumruduanka', name: 'Zümrüdüanka (Küllerinden Doğan Azim)', description: 'Sınıf tekrarını avantaja çevirip temelleri sağlamlaştıran öğrenci', icon: 'flame', condition: 'Phoenix (Yeniden Doğuş) Modu' }
];
