'use client';

import { Unit } from '@/types';
import { BookOpen, X, Check, Sparkles, Lightbulb } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface UnitGuideModalProps {
  unit: Unit | null;
  isOpen: boolean;
  onClose: () => void;
}

// Educational guide summaries for 9th grade MEB 2026-2027 curriculum units
const unitSummaries: Record<string, { summary: string; keyPoints: string[]; tip: string }> = {
  'mat-u1': {
    summary: 'Gerçek sayılar kümesi; doğal sayılar (N), tam sayılar (Z), rasyonel sayılar (Q) ve irrasyonel sayıların (I) birleşimidir.',
    keyPoints: [
      'Mutlak değer |x|, x sayısının sayı doğrusundaki sıfıra olan uzaklığıdır ve asla negatif olamaz.',
      'a üzeri m ile a üzeri n çarpılırken tabanlar aynıysa üsler toplanır: a^(m+n).',
      'Kareköklü sayılarda kök dışına çıkarma tam kare çarpanlar bulunarak yapılır.',
      'Doğru orantıda bölümler (y/x = k), ters orantıda çarpımlar (x.y = k) sabittir.'
    ],
    tip: 'Mutlak değerli denklem çözerken içi sıfır yapan kritik noktayı belirlemeyi unutma!'
  },
  'mat-u2': {
    summary: 'Birinci dereceden denklemler ax + b = 0 formundadır ve bilinmeyenin en büyük derecesi 1\'dir.',
    keyPoints: [
      'Eşitsizliğin her iki tarafı negatif bir sayıyla çarpılır veya bölünürse eşitsizlik yön değiştirir.',
      'İki bilinmeyenli denklem sistemlerinde yok etme veya yerine koyma metodu kullanılır.',
      'Problemlerde verilen sözel ifadeyi adım adım matematiksel denkleme dökmek esastır.'
    ],
    tip: 'Eşitsizliklerde negatif sayıyla bölme yaparken işaret yönüne çok dikkat et!'
  },
  'mat-u3': {
    summary: 'Üçgenler geometrinin temel yapı taşıdır. İç açılar toplamı 180°, dış açılar toplamı 360°\'dir.',
    keyPoints: [
      'Üçgen eşitsizliği: Bir kenarın uzunluğu diğer iki kenarın farkının mutlak değerinden büyük, toplamından küçüktür.',
      'Pisagor bağıntısı: Dik üçgende hipotenüsün karesi dik kenarların kareleri toplamına eşittir: a² + b² = c².',
      'Açıortay üzerinde alınan bir noktadan kollara indirilen dikmeler birbirine eşittir.'
    ],
    tip: '3-4-5, 5-12-13, 8-15-17 gibi özel dik üçgen katlarını ezberlemek zaman kazandırır!'
  },
  'mat-u4': {
    summary: 'Veri analizi, merkezi eğilim (ortalama, medyan, mod) ve merkezi yayılım (açıklık, standart sapma) ölçülerini kapsar.',
    keyPoints: [
      'Aritmetik ortalama veri toplamının veri sayısına bölümüdür.',
      'Medyan (ortanca) veriler küçükten büyüğe sıralandığında tam ortadaki değerdir.',
      'Mod (tepe değer) seride en çok tekrar eden veri değeridir.'
    ],
    tip: 'Çift sayıda veri olduğunda medyan ortadaki iki verinin aritmetik ortalamasıdır.'
  },
  'fiz-u1': {
    summary: 'Fizik, madde ve enerji arasındaki etkileşimi inceleyen, deney ve gözleme dayalı temel doğa bilimidir.',
    keyPoints: [
      'Fiziğin alt dalları: Mekanik, Termodinamik, Optik, Elektromanyetizma, Atom Fiziği, Nükleer Fizik, Katıhal Fiziği, Yüksek Enerji ve Plazma Fiziği.',
      'Temel büyüklükler (KISAMUZ): Kütle, Işık şiddeti, Sıcaklık, Akım şiddeti, Madde miktarı, Uzunluk, Zaman.',
      'Vektörel büyüklükler yön ve doğrultu içerirken, skaler büyüklükler sadece sayı ve birimden oluşur.'
    ],
    tip: 'Kuvvet, hız, ivme ve yer değiştirme vektöreldir; kütle, zaman ve sıcaklık ise skalerdir.'
  },
  'fiz-u2': {
    summary: 'Madde kütlesi, hacmi ve eylemsizliği olan her şeydir. Özkütle (d = m/V) maddeler için ayırt edici bir özelliktir.',
    keyPoints: [
      'Aynı tür moleküller arası çekim kohezyon, farklı tür moleküller arası çekim adezyondur.',
      'Yüzey gerilimi kohezyon kuvveti etkisiyle sıvı yüzeyinde esnek zar oluşmasıdır.',
      'Kılcallık adezyon ve kohezyon kuvvetleri arasındaki farktan kaynaklanır.'
    ],
    tip: 'Sıvı sıcaklığı arttıkça yüzey gerilimi azalır; deterjan eklemek yüzey gerilimini düşürür.'
  },
  'fiz-u3': {
    summary: 'Hareket bir cismin seçilen referans noktasına göre konum değiştirmesidir. Hız vektörel, sürat skalerdir.',
    keyPoints: [
      'Yer değiştirme son konum ile ilk konum arasındaki en kısa yönlü uzaklıktır (Δx = x_son - x_ilk).',
      'Newton\'un 1. Yasası Eylemsizlik, 2. Yasası Temel Prensip (F_net = m.a), 3. Yasası Etki-Tepki\'dir.',
      'Sürtünme kuvveti daima bağıl kayma hareketini engelleyici yöndedir (F_s = k.N).'
    ],
    tip: 'Etki ve tepki kuvvetleri farklı cisimler üzerinde uygulandığı için birbirini asla yok etmez!'
  },
  'kim-u1': {
    summary: 'Simya teorik temellere dayanmazken kimya kontrollü deney ve ölçüme dayalı pozitif bir bilimdir.',
    keyPoints: [
      'Simyacılar imbik, fırın, su banyosu ve kükürt yakma gibi temel laboratuvar tekniklerini geliştirmiştir.',
      'Robert Boyle elementi kendinden daha basit maddelere ayrılamayan saf madde olarak tanımlamıştır.',
      'Elementler sembollerle (tek veya iki harf), bileşikler formüllerle gösterilir.'
    ],
    tip: 'Lavoisier\'in Kütlenin Korunumu Kanunu modern kimyanın başlangıcı kabul edilir.'
  },
  'kim-u2': {
    summary: 'Atom modelleri Dalton, Thomson, Rutherford, Bohr ve Modern Atom Teorisi (Kuantum) şeklinde gelişmiştir.',
    keyPoints: [
      'Atom numarası (Z) çekirdekteki proton sayısıdır ve elementin kimliğini belirler.',
      'Kütle numarası (A) = Proton sayısı + Nötron sayısı.',
      'Periyodik sistemde periyot katman sayısını, grup son katmandaki değerlik elektron sayısını verir.'
    ],
    tip: 'Aynı gruptaki elementlerin değerlik elektron sayıları eşit olduğu için kimyasal özellikleri benzerdir.'
  },
  'biy-u1': {
    summary: 'Canlıların ortak özellikleri: hücresel yapı, beslenme, hücresel solunum, metabolizma, homeostazi ve üremedir.',
    keyPoints: [
      'İnorganik bileşikler (su, mineraller, asitler, bazlar) canlılar tarafından sentezlenemez, dışarıdan alınır.',
      'Organik bileşikler: Karbonhidratlar (enerji 1. sıra), Lipitler (hücre zarı ve yedek enerji), Proteinler (yapıcı-onarıcı).',
      'Enzimler biyolojik katalizörlerdir; aktivasyon enerjisini düşürerek reaksiyonu hızlandırır.'
    ],
    tip: 'Enzimler tepkimeden değişmeden çıkar ve aynı reaksiyon için tekrar tekrar kullanılabilir.'
  },
  'biy-u2': {
    summary: 'Hücre teorisine göre tüm canlılar bir veya birden fazla hücreden meydana gelir. Hücreler prokaryot ve ökaryot olarak ikiye ayrılır.',
    keyPoints: [
      'Prokaryot hücrelerde çekirdek ve zarlı organel bulunmaz; DNA sitoplazmada çıplak halkasaldır.',
      'Mitokondri oksijenli solunumla ATP üretir; kloroplast fotosentezle organik besin üretir.',
      'Hücre zarı akıcı mozaik zar modeliyle açıklanır ve seçici geçirgendir.'
    ],
    tip: 'Ribozom zarsız bir organeldir ve hem prokaryot hem de tüm ökaryot hücrelerde evrensel olarak bulunur.'
  },
  'edb-u1': {
    summary: 'Edebiyat; duygu, düşünce ve hayallerin dil aracılığıyla estetik ve etkileyici biçimde ifade edilme sanatıdır.',
    keyPoints: [
      'Edebiyatın güzel sanatlar içindeki yeri işitsel (fonetik) sanatlar grubundadır.',
      'İletişimin temel ögeleri: Gönderici, alıcı, ileti (mesaj), kanal, bağlam, kod ve dönüttür.',
      'Dilin işlevleri: Göndergesel, heyecana bağlı, alıcıyı harekete geçirme, kanalı kontrol, dil ötesi ve şiirsel işlev.'
    ],
    tip: 'Bilimsel metinlerde dil göndergesel işlevde kullanılırken edebi eserlerde şiirsel (sanatsal) işlev ağırlıktadır.'
  },
  'edb-u2': {
    summary: 'Hikâye yaşanmış ya da yaşanabilir olayları kişi, yer ve zamana bağlayarak anlatan kısa edebi türdür.',
    keyPoints: [
      'Olay hikâyesi (Maupassant tarzı): Merak unsuru ve serim-düğüm-çözüm planı belirgindir (Ömer Seyfettin).',
      'Durum hikâyesi (Çehov tarzı): Yaşamdan bir kesit aktarılır, merak arka plandadır (Sait Faik, Memduh Şevket).',
      'Anlatıcı türleri: Birinci kişi (kahraman anlatıcı) ve üçüncü kişi (gözlemci veya ilahi/hâkim anlatıcı).'
    ],
    tip: 'İlahi anlatıcı kahramanların iç dünyasını, geçmişini ve akıllarından geçen tüm düşünceleri bilir.'
  },
  'tar-u1': {
    summary: 'Tarih; geçmişteki insan topluluklarının yaşayışlarını, birbirleriyle olan ilişkilerini yer ve zaman göstererek belgelere dayalı inceleyen sosyal bilimdir.',
    keyPoints: [
      'Tarihsel olayların tekrarı ve laboratuvar deneyi yapılamaz.',
      'Tarih araştırmalarında yöntem: Tarama (kaynak arama), Tasnif (sınıflandırma), Tahlil (çözümleme), Tenkit (eleştiri) ve Terkip (sentez).',
      'Birinci elden kaynaklar: Olayın geçtiği döneme ait kitabe, para, ferman, anıt ve arkeolojik buluntulardır.'
    ],
    tip: 'Tarih araştırmalarında olaylar dönemin sosyal, ekonomik ve ahlaki koşulları göz önüne alınarak değerlendirilir.'
  },
  'cog-u1': {
    summary: 'Coğrafya doğal çevre ile insan arasındaki karşılıklı etkileşimi dağılış, nedensellik ve karşılıklı ilgi ilkeleriyle inceler.',
    keyPoints: [
      'Doğal çevrenin 4 temel ortamı (Muhteşem Dörtlü): Litosfer (taş küre), Atmosfer (hava küre), Hidrosfer (su küre), Biyosfer (canlılar küresi).',
      'Dağılış ilkesi coğrafyayı diğer bilimlerden ayıran en temel ilkedir ve haritalarla gösterilir.',
      'Fiziki coğrafyanın alt dalları: Jeomorfoloji, Klimatoloji, Hidroğrafya, Biyocoğrafya ve Kartografyadır.'
    ],
    tip: 'Bir olay "Nerede?" sorusuna harita ve mekân ile yanıt veriyorsa coğrafyanın dağılış ilkesi uygulanıyordur.'
  },
  'ing-u1': {
    summary: 'TeenWise 9. sınıf 1. tema: Studying Abroad, personal identification, country nationalities, and daily routines.',
    keyPoints: [
      'Verb "to be" (am/is/are) usage for introductions, occupations, and feelings.',
      'Possessive adjectives (my, your, his, her, its, our, their) and possessive \'s.',
      'Simple Present Tense for recurring academic routines and universal facts.'
    ],
    tip: 'Remember the third-person singular rule: He/She/It takes -s/-es/-ies in positive Simple Present statements.'
  }
};

export function UnitGuideModal({ unit, isOpen, onClose }: UnitGuideModalProps) {
  if (!isOpen || !unit) return null;

  const guide = unitSummaries[unit.id] || {
    summary: `${unit.name} ünitesi için hedeflenen kazanımlar ve önemli temel kavramlar.`,
    keyPoints: [
      'Ünite konularındaki temel tanımları ve kuralları öğren.',
      'Kavram haritalarını ve formülleri düzenli tekrar et.',
      'Örnek soruları çözerek problem çözme hızını artır.'
    ],
    tip: 'Her gün düzenli pratik yaparak öğrendiklerini pekiştir!'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] text-[#afafaf] dark:text-[#94a3b8] hover:text-[#4b4b4b] dark:hover:text-[#f8fafc] hover:bg-[#f7f7f7] dark:hover:bg-[#334155] transition-all cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/50 shadow-sm">
            <BookOpen className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#1cb0f6]">
              ÜNİTE REHBERİ
            </span>
            <h3 className="text-lg sm:text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc] leading-tight">
              {unit.name}
            </h3>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-[#4b4b4b] dark:text-[#94a3b8] leading-relaxed bg-[#f7f7f7] dark:bg-[#0f172a] p-3.5 rounded-2xl border border-[#e5e5e5] dark:border-[#334155]">
            {guide.summary}
          </p>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#ffc800]" />
              <span>Önemli Kazanımlar</span>
            </h4>
            <ul className="space-y-2">
              {guide.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#4b4b4b] dark:text-[#e2e8f0]">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f8d0] dark:bg-[#14532d]/50 text-[#58cc02] dark:text-[#4ade80] mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam Tip */}
          <div className="flex items-start gap-3 rounded-2xl bg-[#fff8e1] dark:bg-[#78350f]/20 border-2 border-[#ffe082] dark:border-[#b45309]/50 p-3.5">
            <Lightbulb className="h-5 w-5 text-[#ff9600] shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-black text-[#e68700] dark:text-[#f59e0b] uppercase block">
                Akademik Sınav İpucu
              </span>
              <p className="text-xs font-bold text-[#8d6e12] dark:text-[#fde68a] leading-snug">
                {guide.tip}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="btn-duo btn-duo-green w-full py-3.5 rounded-2xl text-sm font-black text-white cursor-pointer"
          >
            ANLADIM, TEŞEKKÜRLER!
          </button>
        </div>
      </div>
    </div>
  );
}
