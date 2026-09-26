import { MEBExamScenario } from '@/types';

export const examScenarios: MEBExamScenario[] = [
  // --- MATEMATİK 1. DÖNEM SENARYO 1 (TEMEL DÜZEY) ---
  {
    id: 'mat-term1-sc1',
    subjectSlug: 'matematik',
    subjectName: 'Matematik',
    grade: 9,
    term: 1,
    examNumber: 1,
    scenarioNumber: 1,
    title: '9. Sınıf Matematik 1. Dönem 1. Yazılı (Senaryo 1: Temel Düzey)',
    description: 'Akademik ölçme ve değerlendirme standartlarına uygun, temel kavram kavrama ve doğrudan uygulama düzeyinde açık uçlu ve çoktan seçmeli maddeler.',
    difficultyLevel: 'Temel Düzey',
    durationMinutes: 40,
    totalPoints: 100,
    distribution: [
      { learningOutcome: 'MAT.9.1.1. Gerçek sayılar kümesinde aralık kavramını açıklar.', cognitiveLevel: 'Hatırlama', questionCount: 1 },
      { learningOutcome: 'MAT.9.1.2. Birinci dereceden bir bilinmeyenli denklem ve eşitsizliklerin çözüm kümelerini bulur.', cognitiveLevel: 'Uygulama', questionCount: 2 },
      { learningOutcome: 'MAT.9.1.3. Mutlak değer içeren birinci dereceden bir bilinmeyenli denklem ve eşitsizliklerin çözüm kümelerini bulur.', cognitiveLevel: 'Kavrama', questionCount: 1 }
    ],
    questions: [
      {
        id: 'sc-mat1-q1',
        subjectSlug: 'matematik',
        subjectName: 'Matematik',
        topicId: 'mat-u1-t1',
        topicName: 'Gerçek Sayı Kümeleri ve Aralıklar',
        type: 'open_ended',
        questionText: 'A = (-3, 5] ve B = [1, 8) aralıkları veriliyor. Buna göre A ∩ B (A kesişim B) ve A ∪ B (A birleşim B) aralıklarını bulunuz ve çözümünüzü sayı doğrusu üzerinde gösteriniz gibi gerekçelendirerek yazınız.',
        sampleAnswer: '1) A ∩ B = [1, 5] (Her iki kümede ortak olan gerçek sayılar, 1 dahil, 5 dahil).\n2) A ∪ B = (-3, 8) (İki kümenin tüm elemanlarını içeren aralık, -3 açık, 8 açık).',
        difficulty: 1,
        points: 25,
        rubric: {
          criteria: [
            { score: 25, label: 'Tam Puan', description: 'Hem kesişim hem birleşim aralıklarını parantez sınırları dahil/hariç eksiksiz ve doğru yazma.' },
            { score: 15, label: 'Kısmi Puan', description: 'Aralıklardan birini doğru, diğerini sınır hatasıyla yazma.' },
            { score: 0, label: 'Yetersiz', description: 'Hatalı aralık gösterimi.' }
          ],
          keyTerms: ['[1, 5]', '(-3, 8)', 'kesişim', 'birleşim', 'dahil'],
          explanation: 'Kesişimde alt sınır büyük olan [1], üst sınır küçük olan [5]\'tir. Birleşimde en sol uç (-3), en sağ uç (8)\'dir.'
        }
      },
      {
        id: 'sc-mat1-q2',
        subjectSlug: 'matematik',
        subjectName: 'Matematik',
        topicId: 'mat-u1-t2',
        topicName: 'Birinci Dereceden Denklem ve Eşitsizlikler',
        type: 'multiple_choice',
        questionText: '3(2x - 1) - 2(x + 4) = 17 denklemini sağlayan x gerçek sayısı kaçtır?',
        options: ['6', '7', '8', '9'],
        correctAnswer: 1,
        difficulty: 1,
        points: 25,
        rubric: {
          criteria: [
            { score: 25, label: 'Tam Puan', description: 'Doğru seçeneği işaretleme.' },
            { score: 0, label: '0 Puan', description: 'Yanlış seçenek.' }
          ],
          keyTerms: ['denklem', 'x=7'],
          explanation: 'Parantezleri açarsak: 6x - 3 - 2x - 8 = 17 => 4x - 11 = 17 => 4x = 28 => x = 7.'
        }
      },
      {
        id: 'sc-mat1-q3',
        subjectSlug: 'matematik',
        subjectName: 'Matematik',
        topicId: 'mat-u1-t3',
        topicName: 'Mutlak Değerli Denklem ve Eşitsizlikler',
        type: 'open_ended',
        questionText: '|3x - 6| = 12 denkleminin çözüm kümesini adımlarını göstererek bulunuz.',
        sampleAnswer: 'Mutlak değer kuralına göre:\n1. Durum: 3x - 6 = 12 => 3x = 18 => x = 6\n2. Durum: 3x - 6 = -12 => 3x = -6 => x = -2\nÇözüm Kümesi Ç = {-2, 6} olur.',
        difficulty: 2,
        points: 25,
        rubric: {
          criteria: [
            { score: 25, label: 'Tam Puan', description: 'İki durumu da (+12 ve -12) ayrı ayrı yazıp x=6 ve x=-2 köklerini doğru bulma.' },
            { score: 12, label: 'Kısmi Puan', description: 'Yalnızca bir durumu çözüp tek kök bulma.' },
            { score: 0, label: 'Yetersiz', description: 'Yanlış çözüm.' }
          ],
          keyTerms: ['6', '-2', '{-2, 6}', 'durum', 'pozitif', 'negatif'],
          explanation: '|f(x)| = a (a>0) için f(x)=a veya f(x)=-a olarak iki ayrı denklem çözülür.'
        }
      },
      {
        id: 'sc-mat1-q4',
        subjectSlug: 'matematik',
        subjectName: 'Matematik',
        topicId: 'mat-u1-t2',
        topicName: 'Birinci Dereceden Denklem ve Eşitsizlikler',
        type: 'multiple_choice',
        questionText: '-3 < 2x + 1 ≤ 9 eşitsizliğini sağlayan tam sayıların toplamı kaçtır?',
        options: ['8', '9', '10', '14'],
        correctAnswer: 1,
        difficulty: 2,
        points: 25,
        rubric: {
          criteria: [
            { score: 25, label: 'Tam Puan', description: 'Doğru seçeneği bulma.' },
            { score: 0, label: '0 Puan', description: 'Yanlış seçenek.' }
          ],
          keyTerms: ['eşitsizlik', 'tam sayı'],
          explanation: 'Her taraftan 1 çıkarırsak: -4 < 2x ≤ 8. 2\'ye bölersek: -2 < x ≤ 4. Tam sayılar: -1, 0, 1, 2, 3, 4. Toplamı: -1 + 0 + 1 + 2 + 3 + 4 = 9.'
        }
      }
    ]
  },

  // --- MATEMATİK 1. DÖNEM SENARYO 2 (İLERİ ANALİZ DÜZEYİ) ---
  {
    id: 'mat-term1-sc2',
    subjectSlug: 'matematik',
    subjectName: 'Matematik',
    grade: 9,
    term: 1,
    examNumber: 1,
    scenarioNumber: 2,
    title: '9. Sınıf Matematik 1. Dönem 1. Yazılı (Senaryo 2: İleri Analiz Düzeyi)',
    description: 'Eleştirel düşünme, modelleme ve çok basamaklı mantıksal çıkarım odaklı açık uçlu analiz sınavı.',
    difficultyLevel: 'İleri Analiz Düzeyi',
    durationMinutes: 40,
    totalPoints: 100,
    distribution: [
      { learningOutcome: 'MAT.9.1.3. Mutlak değerli eşitsizlik modellerini gerçek hayat durumlarına uygular.', cognitiveLevel: 'Analiz', questionCount: 2 },
      { learningOutcome: 'MAT.9.2.1. Bileşik önermelerin doğruluk değerlerini ve totoloji/çelişki durumlarını modeller.', cognitiveLevel: 'Analiz', questionCount: 2 }
    ],
    questions: [
      {
        id: 'sc-mat2-q1',
        subjectSlug: 'matematik',
        subjectName: 'Matematik',
        topicId: 'mat-u1-t3',
        topicName: 'Mutlak Değerli Denklem ve Eşitsizlikler',
        type: 'open_ended',
        questionText: 'Bir ilaç laboratuvarında üretilen bir aşının saklama sıcaklığı 4°C olarak belirlenmiştir. Ancak sıcaklığın en fazla 3°C kadar sapma göstermesi durumunda aşının bozulmadığı bilinmektedir. Bu durumu ifade eden mutlak değerli eşitsizliği kurunuz ve aşının bozulmadan saklanabileceği sıcaklık aralığını bularak açıklayınız.',
        sampleAnswer: 'İdeal sıcaklık 4°C ve izin verilen sapma miktarı en fazla 3°C olduğuna göre:\nMutlak değerli eşitsizlik: |x - 4| ≤ 3 şeklinde modellenir.\nÇözümü:\n-3 ≤ x - 4 ≤ 3\n1 ≤ x ≤ 7\nAşı [1, 7] °C sıcaklık aralığında bozulmadan güvenle saklanabilir.',
        difficulty: 3,
        points: 30,
        rubric: {
          criteria: [
            { score: 30, label: 'Tam Puan (30/30)', description: '|x - 4| ≤ 3 modelini eksiksiz kurup [1, 7] aralığını matematiksel basamaklarla gerekçelendirme.' },
            { score: 18, label: 'Kısmi Puan (18/30)', description: 'Aralığı bulup mutlak değerli cebirsel modeli yazamama veya tersi.' },
            { score: 0, label: 'Yetersiz', description: 'Yanlış modelleme.' }
          ],
          keyTerms: ['|x - 4| ≤ 3', '[1, 7]', 'sapma', 'model', 'sıcaklık'],
          explanation: 'Gerçek hayat sapma durumları |x - merkez| ≤ tolerans biçiminde modellenir. 4 merkez, 3 tolerans ise |x - 4| ≤ 3 olur.'
        }
      },
      {
        id: 'sc-mat2-q2',
        subjectSlug: 'matematik',
        subjectName: 'Matematik',
        topicId: 'mat-u2-t1',
        topicName: 'Önermeler ve Bileşik Önermeler',
        type: 'open_ended',
        questionText: 'p, q ve r birer önerme olmak üzere; [(p ⇒ q) ∧ (q ⇒ r)] ⇒ (p ⇒ r) bileşik önermesinin bir "totoloji" (daima doğru) olduğunu mantıksal geçişme kuralı veya doğruluk değerleri analizi ile ispatlayınız.',
        sampleAnswer: 'Bu kural klasik mantıkta "zincirleme akıl yürütme" (hipotetik silojizm) olarak bilinir.\nÖnermenin yanlış (0) olabilmesi için sol tarafın [(p ⇒ q) ∧ (q ⇒ r)] = 1, sağ tarafın ise (p ⇒ r) = 0 olması gerekir.\n(p ⇒ r) = 0 olması ancak p = 1 ve r = 0 durumunda mümkündür.\nBu değerleri sol tarafa koyarsak: (1 ⇒ q) ∧ (q ⇒ 0) elde edilir.\nEğer q = 1 ise: (q ⇒ 0) = (1 ⇒ 0) = 0 olur, sol taraf 0 çıkar.\nEğer q = 0 ise: (1 ⇒ q) = (1 ⇒ 0) = 0 olur, sol taraf yine 0 çıkar.\nHer iki durumda da sol taraf 1 olamamaktadır. Dolayısıyla bu önermenin 0 değerini alması imkansızdır. Sonuç daima 1\'dir ve ifade bir totolojidir.',
        difficulty: 3,
        points: 35,
        rubric: {
          criteria: [
            { score: 35, label: 'Tam Puan (35/35)', description: 'Çelişki yöntemini veya doğruluk tablosunu tutarlı kullanarak ifadenin hiçbir durumda 0 olamayacağını ve daima 1 çıktığını ispatlama.' },
            { score: 20, label: 'Kısmi Puan (20/35)', description: 'Totoloji tanımını yapıp geçişme mantığını açıklayan ancak ispat adımlarını eksik bırakan çözüm.' },
            { score: 0, label: 'Yetersiz', description: 'Gerekçesiz ifade.' }
          ],
          keyTerms: ['totoloji', 'daima 1', 'ispat', 'geçişme', 'çelişki', 'doğruluk'],
          explanation: 'Hipotetik silojizm önermeler mantığının en temel totolojilerindendir; hiçbir doğruluk değer kombinasyonunda 0 sonucunu vermez.'
        }
      },
      {
        id: 'sc-mat2-q3',
        subjectSlug: 'matematik',
        subjectName: 'Matematik',
        topicId: 'mat-u1-t1',
        topicName: 'Gerçek Sayı Kümeleri ve Aralıklar',
        type: 'multiple_choice',
        questionText: 'x ve y gerçek sayıları için -3 < x < 4 ve -2 ≤ y ≤ 5 olduğuna göre x² + y³ ifadesinin alabileceği en büyük tam sayı değeri kaçtır?',
        options: ['139', '140', '141', '149'],
        correctAnswer: 1,
        difficulty: 3,
        points: 35,
        rubric: {
          criteria: [
            { score: 35, label: 'Tam Puan', description: 'Doğru seçeneği bulma.' },
            { score: 0, label: '0 Puan', description: 'Yanlış seçenek.' }
          ],
          keyTerms: ['140', 'kare', 'küp'],
          explanation: '-3 < x < 4 için 0 ≤ x² < 16. -2 ≤ y ≤ 5 için -8 ≤ y³ ≤ 125. Taraf tarafa toplarsak: -8 ≤ x² + y³ < 141. Alabileceği en büyük tam sayı 140\'tır.'
        }
      }
    ]
  },

  // --- TÜRK DİLİ VE EDEBİYATI SENARYO 1 (TEMEL DÜZEY) ---
  {
    id: 'edb-term1-sc1',
    subjectSlug: 'edebiyat',
    subjectName: 'Türk Dili ve Edebiyatı',
    grade: 9,
    term: 1,
    examNumber: 1,
    scenarioNumber: 1,
    title: '9. Sınıf Türk Dili ve Edebiyatı 1. Dönem 1. Yazılı (Senaryo 1: Temel Düzey)',
    description: 'Metin tahlili, hikaye yapı unsurları (olay, kişi, zaman, mekân) ve temel dil bilgisi açık uçlu sınavı.',
    difficultyLevel: 'Temel Düzey',
    durationMinutes: 40,
    totalPoints: 100,
    distribution: [
      { learningOutcome: 'EDB.9.1. Metin tahlili yapar, hikâyenin yapı unsurlarını belirler.', cognitiveLevel: 'Kavrama', questionCount: 2 },
      { learningOutcome: 'EDB.9.2. İsimlerin (adların) türlerini metin üzerinden tespit eder.', cognitiveLevel: 'Uygulama', questionCount: 2 }
    ],
    questions: [
      {
        id: 'sc-edb1-q1',
        subjectSlug: 'edebiyat',
        subjectName: 'Türk Dili ve Edebiyatı',
        topicId: 'edb-u2-t1',
        topicName: 'Hikâye (Öykü) Türü ve Unsurları',
        type: 'open_ended',
        questionText: '"İstasyon şefi cebinden çıkardığı köstekli saatin kapağını açtı. Sisli sabah ayazında trenin gecikeceğini anlamıştı." Bu parçadaki olay örgüsünü, mekânı, zamanı ve anlatıcı türünü (kaçıncı kişi ağzından olduğunu) belirleyiniz.',
        sampleAnswer: '1) Mekân: İstasyon / tren garı.\n2) Zaman: Sisli bir sabah vakti.\n3) Kişi: İstasyon şefi.\n4) Anlatıcı: 3. tekil kişi (o) anlatıcı (Gözlemci / Hâkim bakış açısı).',
        difficulty: 1,
        points: 30,
        rubric: {
          criteria: [
            { score: 30, label: 'Tam Puan (30/30)', description: 'Mekân, zaman, kişi ve 3. kişi anlatıcı unsurlarını eksiksiz yazma.' },
            { score: 15, label: 'Kısmi Puan (15/30)', description: 'Unsurlardan ikisini doğru yazma.' },
            { score: 0, label: 'Yetersiz', description: 'Hatalı tespitler.' }
          ],
          keyTerms: ['istasyon', 'sabah', 'istasyon şefi', '3. kişi', 'üçüncü kişi'],
          explanation: 'Hikayenin yapı unsurları kişi, zaman, mekân ve olay örgüsüdür. "Açtı", "anlamıştı" fiilleri 3. tekil şahıs anlatımıdır.'
        }
      },
      {
        id: 'sc-edb1-q2',
        subjectSlug: 'edebiyat',
        subjectName: 'Türk Dili ve Edebiyatı',
        topicId: 'edb-u2-t2',
        topicName: 'Hikâyede Anlatım Biçimleri ve Teknikleri',
        type: 'multiple_choice',
        questionText: 'Anlatıcının kahramanın zihninden geçenleri, duygularını ve iç dünyasını hiçbir aracı olmadan kendi kendine konuşuyormuş gibi doğrudan aktarmasına ne ad verilir?',
        options: ['Bilinç Akışı', 'İç Monolog', 'Geriye Dönüş', 'Özetleme'],
        correctAnswer: 1,
        difficulty: 2,
        points: 35,
        rubric: {
          criteria: [
            { score: 35, label: 'Tam Puan', description: 'Doğru seçeneği işaretleme.' },
            { score: 0, label: '0 Puan', description: 'Yanlış seçenek.' }
          ],
          keyTerms: ['iç monolog'],
          explanation: 'Karakterin kendi kendine düzenli bir gramer ve mantık silsilesi içinde içinden konuşması "iç monolog" tekniğidir.'
        }
      },
      {
        id: 'sc-edb1-q3',
        subjectSlug: 'edebiyat',
        subjectName: 'Türk Dili ve Edebiyatı',
        topicId: 'edb-u1-t1',
        topicName: 'Edebiyatın Tanımı ve Diğer Bilimlerle İlişkisi',
        type: 'open_ended',
        questionText: 'Edebiyatın "Tarih" ve "Psikoloji" bilimleriyle olan ilişkisini ikişer somut gerekçeyle açıklayınız.',
        sampleAnswer: '1) Tarih ile ilişkisi: Edebi eserler yazıldıkları dönemin sosyal ve siyasi olaylarını yansıtır. Tarihi romanlar geçmiş olayları edebi dille canlandırırken, edebi metinler de tarihçiler için dönemin zihniyetini anlatan birer kaynak niteliği taşır.\n2) Psikoloji ile ilişkisi: Edebiyat insanı derinlemesine işler. Kahramanların iç dünyaları, bunalımları, ruh halleri ve bilinçaltı psikolojinin ilkelerinden yararlanılarak tahlil edilir.',
        difficulty: 2,
        points: 35,
        rubric: {
          criteria: [
            { score: 35, label: 'Tam Puan (35/35)', description: 'Hem Tarih hem Psikoloji ile olan ilişkiyi bilimsel ve edebi gerekçeleriyle tutarlı açıklama.' },
            { score: 20, label: 'Kısmi Puan (20/35)', description: 'Yalnızca bir bilim dalıyla ilişkiyi doğru ifade etme.' },
            { score: 0, label: 'Yetersiz', description: 'Yüzeysel veya ilgisiz açıklama.' }
          ],
          keyTerms: ['tarih', 'psikoloji', 'insan', 'kaynak', 'iç dünya', 'ruh hali'],
          explanation: 'Edebiyat insanı konu alan bir sanat dalı olduğu için insan psikolojisiyle ve toplumların geçmişini inceleyen tarih bilimiyle doğrudan temas halindedir.'
        }
      }
    ]
  },

  // --- FİZİK 1. DÖNEM SENARYO 1 (TEMEL DÜZEY) ---
  {
    id: 'fiz-term1-sc1',
    subjectSlug: 'fizik',
    subjectName: 'Fizik',
    grade: 9,
    term: 1,
    examNumber: 1,
    scenarioNumber: 1,
    title: '9. Sınıf Fizik 1. Dönem 1. Yazılı (Senaryo 1: Temel Düzey)',
    description: 'Fizik bilimine giriş, büyüklükler ve özkütle hesaplamaları açık uçlu ortak sınavı.',
    difficultyLevel: 'Temel Düzey',
    durationMinutes: 40,
    totalPoints: 100,
    distribution: [
      { learningOutcome: 'FİZ.9.1. Fiziksel nicelikleri sınıflandırır.', cognitiveLevel: 'Hatırlama', questionCount: 1 },
      { learningOutcome: 'FİZ.9.2. Kütle, hacim ve özkütle ilişkisini hesaplar.', cognitiveLevel: 'Uygulama', questionCount: 2 }
    ],
    questions: [
      {
        id: 'sc-fiz1-q1',
        subjectSlug: 'fizik',
        subjectName: 'Fizik',
        topicId: 'fiz-u2-t1',
        topicName: 'Kütle, Hacim ve Özkütle',
        type: 'open_ended',
        questionText: 'Özkütlesi 2.5 g/cm³ olan homojen bir katı cismin kütlesi 200 gram olarak ölçülmüştür. Bu cismin hacmini bulunuz ve özkütle formülünü (d = m/V) kullanarak işlem basamaklarını gösteriniz.',
        sampleAnswer: 'Özkütle formülü: d = m / V\nVerilenler: d = 2.5 g/cm³, m = 200 g\nV = m / d\nV = 200 / 2.5 = 80 cm³ olarak bulunur.',
        difficulty: 1,
        points: 35,
        rubric: {
          criteria: [
            { score: 35, label: 'Tam Puan', description: 'Formülü yazıp, işlem basamaklarını doğru yaparak 80 cm³ sonucunu birimiyle bulma.' },
            { score: 20, label: 'Kısmi Puan', description: 'İşlem hatası yapıp formülü doğru yazma.' },
            { score: 0, label: 'Yetersiz', description: 'Hatalı çözüm.' }
          ],
          keyTerms: ['80', 'cm³', 'd = m/V', 'hacim'],
          explanation: 'Hacim = Kütle / Özkütle = 200 / 2.5 = 80 cm³.'
        }
      },
      {
        id: 'sc-fiz1-q2',
        subjectSlug: 'fizik',
        subjectName: 'Fizik',
        topicId: 'fiz-u1-t2',
        topicName: 'Fiziksel Büyüklükler ve Birimler',
        type: 'multiple_choice',
        questionText: 'SI birim sisteminde temel büyüklüklerden olan "Madde Miktarı" ve "Akım Şiddeti"nin birimleri sırasıyla aşağıdakilerden hangisidir?',
        options: ['Gram - Volt', 'Mol - Amper', 'Kilogram - Watt', 'Mol - Volt'],
        correctAnswer: 1,
        difficulty: 1,
        points: 30,
        rubric: {
          criteria: [
            { score: 30, label: 'Tam Puan', description: 'Doğru seçeneği bulma.' },
            { score: 0, label: '0 Puan', description: 'Yanlış seçenek.' }
          ],
          keyTerms: ['mol', 'amper'],
          explanation: 'Kısa Muz kodlamasındaki Madde Miktarı = Mol, Akım Şiddeti = Amper birimidir.'
        }
      },
      {
        id: 'sc-fiz1-q3',
        subjectSlug: 'fizik',
        subjectName: 'Fizik',
        topicId: 'fiz-u2-t2',
        topicName: 'Dayanıklılık, Adezyon ve Kohezyon',
        type: 'open_ended',
        questionText: 'Boyutları her yönde 2 katına çıkarılan küp şeklindeki bir cismin kendi ağırlığına karşı dayanıklılığı nasıl değişir? Dayanıklılık formülü (Kesit Alanı / Hacim) üzerinden matematiksel olarak açıklayınız.',
        sampleAnswer: 'Dayanıklılık = Kesit Alanı / Hacim ∝ 1 / Yükseklik (h)\nBaşlangıçta ayrıtı a olan küpün dayanıklılığı D1 ∝ 1/a idi.\nBoyutlar 2 katına çıkarıldığında yeni ayrıt 2a olur ve yeni dayanıklılık D2 ∝ 1/(2a) = D1 / 2 olur.\nDolayısıyla cismin dayanıklılığı yarıya (1/2 katına) iner.',
        difficulty: 2,
        points: 35,
        rubric: {
          criteria: [
            { score: 35, label: 'Tam Puan', description: 'Dayanıklılığın 1/h ile orantılı olduğunu ve 2 kat büyüyünce dayanıklılığın yarıya ineceğini tam açıklama.' },
            { score: 18, label: 'Kısmi Puan', description: 'Yarıya iner deyip formül gerekçesini yazamama.' },
            { score: 0, label: 'Yetersiz', description: 'Hatalı oran.' }
          ],
          keyTerms: ['yarıya', '1/2', 'kesit alanı', 'hacim', '1/h', 'azalır'],
          explanation: 'Galileo\'nun kare-küp kanununa göre bir cisim orantılı büyütüldüğünde hacmi (ve ağırlığı) küple, kesit alanı kareyle artar. Bu sebeple dayanıklılık boyutsal artışla ters orantılıdır.'
        }
      }
    ]
  }
];

// Helper: Get scenarios by subject
export function getScenariosBySubject(subjectSlug: string): MEBExamScenario[] {
  return examScenarios.filter((sc) => sc.subjectSlug === subjectSlug);
}

// Helper: Get scenario by ID
export function getScenarioById(id: string): MEBExamScenario | undefined {
  return examScenarios.find((sc) => sc.id === id);
}
