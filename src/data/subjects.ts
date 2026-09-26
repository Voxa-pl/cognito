import { Subject } from '@/types';

export const subjects: Subject[] = [
  {
    id: 'mat',
    name: 'Matematik',
    slug: 'matematik',
    icon: 'calculator',
    color: 'bg-indigo-600',
    description: 'Sayılar ve nicelikler, cebirsel bağıntılar, denklem sistemleri ve analitik düşünme becerileri.',
    unitCount: 4,
    realmName: 'Sayılar, Cebir ve Fonksiyonlar',
    realmDescription: 'Mantıksal çıkarım, modelleme ve problem çözme yeterlilikleri.'
  },
  {
    id: 'fiz',
    name: 'Fizik',
    slug: 'fizik',
    icon: 'zap',
    color: 'bg-blue-600',
    description: 'Fizik bilimine giriş, madde ve özellikleri, hareket, kuvvet, enerji ve elektrostatik ilkeleri.',
    unitCount: 6,
    realmName: 'Mekanik, Madde ve Enerji',
    realmDescription: 'Evrensel fizik yasaları, deneysel gözlem ve doğa olaylarının analizi.'
  },
  {
    id: 'kim',
    name: 'Kimya',
    slug: 'kimya',
    icon: 'flask-conical',
    color: 'bg-emerald-600',
    description: 'Kimya disiplini, atom teorisi, periyodik sistem, kimyasal türler arası etkileşimler ve maddenin halleri.',
    unitCount: 5,
    realmName: 'Maddenin Yapısı ve Etkileşimler',
    realmDescription: 'Atomik yapı, kimyasal bağlar ve termodinamik dönüşümler.'
  },
  {
    id: 'biy',
    name: 'Biyoloji',
    slug: 'biyoloji',
    icon: 'dna',
    color: 'bg-teal-600',
    description: 'Canlıların temel bileşenleri, hücre biyolojisi, organeller ve canlılar dünyasının sınıflandırılması.',
    unitCount: 5,
    realmName: 'Hücre ve Yaşam Bilimleri',
    realmDescription: 'Hücresel organizasyon, metabolizma ve biyolojik çeşitlilik.'
  },
  {
    id: 'tde',
    name: 'Türk Dili ve Edebiyatı',
    slug: 'edebiyat',
    icon: 'book-open',
    color: 'bg-amber-600',
    description: 'Edebiyat kuramı, metin tahlili, anlatım türleri (hikâye, şiir, masal, roman) ve Türk dili kuralları.',
    unitCount: 6,
    realmName: 'Türk Dili, Edebiyat ve Metin Tahlili',
    realmDescription: 'Dil bilgisi, retorik, edebi dönemler ve eleştirel okuma.'
  },
  {
    id: 'tar',
    name: 'Tarih',
    slug: 'tarih',
    icon: 'landmark',
    color: 'bg-orange-600',
    description: 'Tarih bilimi, ilk çağ medeniyetleri, Orta Çağ dünyası, Türk devletleri teşkilatı ve İslam medeniyeti.',
    unitCount: 6,
    realmName: 'Tarih Bilimi ve Medeniyetler',
    realmDescription: 'Tarihsel metodoloji, kronoloji ve medeniyetler tarihi analizi.'
  },
  {
    id: 'cog',
    name: 'Coğrafya',
    slug: 'cografya',
    icon: 'globe',
    color: 'bg-cyan-600',
    description: 'Doğal sistemler, harita bilgisi ve projeksiyonlar, iklim elemanları ve beşerî coğrafya dinamikleri.',
    unitCount: 5,
    realmName: 'Fiziki ve Beşerî Coğrafya',
    realmDescription: 'Yerküre sistemleri, kartografya ve mekânsal analiz.'
  },
  {
    id: 'ing',
    name: 'İngilizce',
    slug: 'ingilizce',
    icon: 'languages',
    color: 'bg-rose-600',
    description: 'TeenWise akademik programı doğrultusunda okuma, dinleme, dil bilgisi ve akademik iletişim becerileri.',
    unitCount: 10,
    realmName: 'Akademik ve Küresel İletişim',
    realmDescription: 'Uluslararası dil standartlarında A1-B1 düzeyinde dilsel yeterlilik.'
  }
];
