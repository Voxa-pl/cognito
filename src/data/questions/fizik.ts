import { Question } from '@/types';

export const fizikQuestions: Question[] = [
  // fiz-u1-t1: Fizik Bilimi ve Önemi (4 questions)
  {
    id: 'fiz-q1',
    topicId: 'fiz-u1-t1',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi fiziğin inceleme alanına girmez?',
    options: ['Cisimlerin hareketi', 'Işığın yansıması', 'Canlıların sınıflandırılması', 'Elektrik akımı'],
    correctAnswer: 2,
    explanation: 'Canlıların sınıflandırılması biyolojinin konusudur. Fizik madde ve enerji etkileşimlerini inceler.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q2',
    topicId: 'fiz-u1-t1',
    type: 'true_false',
    questionText: 'Fizik, doğada gerçekleşen olayları açıklamak için deney ve gözleme dayalı bilimsel yöntemleri kullanır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Fizik bilimi gözlem, deney ve matematiksel modellemelere dayanır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q3',
    topicId: 'fiz-u1-t1',
    type: 'multiple_choice',
    questionText: 'Fizik bilimi ile ilgili olarak verilen:\nI. Madde ve enerji etkileşimlerini inceler.\nII. Sınanabilir ve yanlışlanabilir bilgiler üretir.\nIII. Kesin ve hiçbir zaman değişmez doğruları vardır.\nyargılarından hangileri doğrudur?',
    options: ['Yalnız I', 'I ve II', 'II ve III', 'I, II ve III'],
    correctAnswer: 1,
    explanation: 'Bilimsel bilgiler mutlak doğru değildir, yeni bulgularla değişebilir. Bu nedenle III. yargı yanlıştır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q4',
    topicId: 'fiz-u1-t1',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi fizikte kullanılan bilimsel bilginin özelliklerinden biri değildir?',
    options: ['Nesneldir', 'Dinamiktir', 'Denenebilirdir', 'Dogmatiktir'],
    correctAnswer: 3,
    explanation: 'Dogmatik düşünce, sorgulanmadan kabul edilen inançlara dayanır ve bilimsel bilginin tam zıddıdır.',
    difficulty: 3,
    xpValue: 25,
  },

  // fiz-u1-t2: Fiziğin Alt Dalları (4 questions)
  {
    id: 'fiz-q5',
    topicId: 'fiz-u1-t2',
    type: 'multiple_choice',
    questionText: 'Optik, fiziğin hangi konusu ile ilgilenir?',
    options: ['Isı ve sıcaklık', 'Işık ve ışık olayları', 'Atomun yapısı', 'Kuvvet ve hareket'],
    correctAnswer: 1,
    explanation: 'Optik; ışığın doğası, yansıması, kırılması gibi ışıkla ilgili olayları inceleyen alt daldır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q6',
    topicId: 'fiz-u1-t2',
    type: 'multiple_choice',
    questionText: 'Güneş enerjisi panellerinin çalışma prensibi, temel olarak fiziğin hangi alt dalı ile açıklanır?',
    options: ['Mekanik', 'Termodinamik', 'Katıhâl Fiziği', 'Nükleer Fizik'],
    correctAnswer: 2,
    explanation: 'Güneş panellerindeki yarı iletken malzemeler katıhâl fiziğinin inceleme alanına girer.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q7',
    topicId: 'fiz-u1-t2',
    type: 'true_false',
    questionText: 'Nükleer fizik, atomun çekirdeğindeki olayları ve radyoaktiviteyi inceler.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Atom çekirdeğinin yapısı ve çekirdek tepkimeleri nükleer fiziğin (çekirdek fiziği) konusudur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q8',
    topicId: 'fiz-u1-t2',
    type: 'multiple_choice',
    questionText: 'Aşağıdaki eşleştirmelerden hangisi yanlıştır?',
    options: ['Mekanik - Hareket', 'Termodinamik - Isı', 'Elektromanyetizma - Mıknatıslar', 'Atom Fiziği - Çekirdek bölünmesi'],
    correctAnswer: 3,
    explanation: 'Çekirdek bölünmesi (fisyon) nükleer fiziğin konusudur, atom fiziği ise atomun genel yapısını ve elektronları inceler.',
    difficulty: 3,
    xpValue: 25,
  },

  // fiz-u1-t3: Fiziksel Niceliklerin Sınıflandırılması (5 questions)
  {
    id: 'fiz-q9',
    topicId: 'fiz-u1-t3',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi temel bir büyüklüktür?',
    options: ['Kuvvet', 'Hız', 'Kütle', 'Enerji'],
    correctAnswer: 2,
    explanation: 'Kütle (KISA MUZ içindeki "K") temel bir büyüklüktür. Kuvvet, hız ve enerji türetilmiş büyüklüklerdir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q10',
    topicId: 'fiz-u1-t3',
    type: 'true_false',
    questionText: 'Vektörel büyüklüklerin tam olarak ifade edilebilmesi için sayı ve birimin yanında yön de belirtilmelidir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Vektörel büyüklükler sayı, birim ve yöne sahiptir (örneğin kuvvet, hız, ivme).',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q11',
    topicId: 'fiz-u1-t3',
    type: 'multiple_choice',
    questionText: 'Uluslararası Birim Sistemi (SI) baz alındığında, sıcaklığın birimi aşağıdakilerden hangisidir?',
    options: ['Celsius', 'Fahrenheit', 'Kelvin', 'Joule'],
    correctAnswer: 2,
    explanation: 'Günlük hayatta Celsius kullanılsa da SI birim sisteminde sıcaklık birimi Kelvin (K) dir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q12',
    topicId: 'fiz-u1-t3',
    type: 'multiple_choice',
    questionText: 'Aşağıdaki büyüklüklerden hangisi türetilmiş ve skaler bir niceliktir?',
    options: ['Ağırlık', 'Sürat', 'İvme', 'Zaman'],
    correctAnswer: 1,
    explanation: 'Sürat türetilmiştir ve yönsüz olduğu için skalerdir. Ağırlık ve ivme vektörel, zaman ise temeldir.',
    difficulty: 3,
    xpValue: 25,
  },
  {
    id: 'fiz-q13',
    topicId: 'fiz-u1-t3',
    type: 'multiple_choice',
    questionText: 'Bir sporcu 40 metrelik yolu 5 saniyede koşuyor. Burada ifade edilen büyüklüklerin türü için aşağıdakilerden hangisi doğrudur?',
    options: ['Her ikisi de temel büyüklüktür', 'Uzunluk türetilmiş, zaman temeldir', 'Uzunluk temel, zaman temeldir', 'Her ikisi de vektörel büyüklüktür'],
    correctAnswer: 2,
    explanation: 'Uzunluk (metre) ve zaman (saniye) KISA MUZ şifresindeki temel büyüklüklerdir.',
    difficulty: 2,
    xpValue: 15,
  },

  // fiz-u2-t1: Kütle, Hacim ve Özkütle (6 questions)
  {
    id: 'fiz-q14',
    topicId: 'fiz-u2-t1',
    type: 'multiple_choice',
    questionText: 'Özkütle (yoğunluk) kavramı için aşağıdakilerden hangisi doğrudur?',
    options: ['Kütle arttıkça özkütle de sürekli artar.', 'Sabit sıcaklık ve basınçta saf maddeler için ayırt edicidir.', 'Hacim ile doğru orantılıdır.', 'Birim hacimdeki madde ağırlığıdır.'],
    correctAnswer: 1,
    explanation: 'Özkütle, sabit sıcaklık ve basınç altında saf maddeler için ayırt edici bir özelliktir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q15',
    topicId: 'fiz-u2-t1',
    type: 'multiple_choice',
    questionText: 'Kütlesi 100 gram, hacmi 25 cm³ olan bir cismin özkütlesi kaç g/cm³ tür?',
    options: ['0,25', '2,5', '4', '2500'],
    correctAnswer: 2,
    explanation: 'Özkütle formülü d = m/V dir. d = 100 / 25 = 4 g/cm³ bulunur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q16',
    topicId: 'fiz-u2-t1',
    type: 'true_false',
    questionText: 'Kütle m, hacim V ile gösterildiğinde, özkütle formülü d=V/m şeklindedir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 1,
    explanation: 'Özkütle, kütlenin hacme oranıdır yani d=m/V şeklinde ifade edilir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q17',
    topicId: 'fiz-u2-t1',
    type: 'multiple_choice',
    questionText: 'Özkütlesi 2 g/cm³ olan bir sıvıdan 50 cm³ hacminde alınıyor. Alınan sıvının kütlesi kaç gramdır?',
    options: ['25', '100', '150', '200'],
    correctAnswer: 1,
    explanation: 'm = d·V bağıntısından m = 2 · 50 = 100 gramdır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q18',
    topicId: 'fiz-u2-t1',
    type: 'multiple_choice',
    questionText: 'Yarıçapı 2 cm olan küre şeklindeki bir bilyenin kütlesi 96 gramdır. (π = 3 alınız.) Bu bilyenin özkütlesi kaç g/cm³ olur?',
    options: ['2', '3', '4', '6'],
    correctAnswer: 1,
    explanation: 'Kürenin hacmi V = 4/3·π·r³ = 4/3·3·2³ = 32 cm³. Özkütle d = m/V = 96 / 32 = 3 g/cm³.',
    difficulty: 3,
    xpValue: 25,
  },
  {
    id: 'fiz-q19',
    topicId: 'fiz-u2-t1',
    type: 'multiple_choice',
    questionText: 'Kütle-hacim grafiğinde eğim bize aşağıdakilerden hangisini verir?',
    options: ['Ağırlığı', 'Özkütleyi', 'Hızı', 'Özısısı'],
    correctAnswer: 1,
    explanation: 'Kütle (dikey) / Hacim (yatay) oranı eğimi verir ve bu da d = m/V özkütleye eşittir.',
    difficulty: 2,
    xpValue: 15,
  },

  // fiz-u2-t2: Katılarda Dayanıklılık (4 questions)
  {
    id: 'fiz-q20',
    topicId: 'fiz-u2-t2',
    type: 'multiple_choice',
    questionText: 'Katı bir cismin boyutları orantılı olarak artırıldığında, kendi ağırlığına karşı dayanıklılığı nasıl değişir?',
    options: ['Artar', 'Azalır', 'Değişmez', 'Önce artar, sonra azalır'],
    correctAnswer: 1,
    explanation: 'Dayanıklılık, Kesit Alanı / Hacim (1/yükseklik) ile orantılıdır. Boyutlar arttıkça yükseklik artacağından dayanıklılık azalır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q21',
    topicId: 'fiz-u2-t2',
    type: 'true_false',
    questionText: 'Bir küpün tüm ayrıtları 2 katına çıkarılırsa dayanıklılığı yarıya iner.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Dayanıklılık h (yükseklik) ile ters orantılıdır (1/h). Boyut 2 katına çıkarsa dayanıklılık yarıya (1/2) düşer.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q22',
    topicId: 'fiz-u2-t2',
    type: 'multiple_choice',
    questionText: 'Aynı maddeden yapılmış, silindir biçimindeki X ve Y cisimlerinin yükseklikleri sırasıyla h ve 3h\'tır. X\'in dayanıklılığının Y\'ninkine oranı kaçtır?',
    options: ['1/3', '1', '3', '9'],
    correctAnswer: 2,
    explanation: 'Dayanıklılık 1/h ile orantılıdır. Dx = 1/h, Dy = 1/3h ise Dx/Dy = 3 tür.',
    difficulty: 3,
    xpValue: 25,
  },
  {
    id: 'fiz-q23',
    topicId: 'fiz-u2-t2',
    type: 'multiple_choice',
    questionText: 'Kendi ağırlıklarına karşı dayanıklılık kavramı, aşağıdakilerden hangisinde önemli bir faktör değildir?',
    options: ['Gökyüzü delen binaların tasarımı', 'Karıncaların kendi ağırlığının katlarca fazlasını taşıyabilmesi', 'Fillerin bacaklarının kalın olması', 'Uzaydaki astronotun kütlesinin ölçülmesi'],
    correctAnswer: 3,
    explanation: 'Uzayda kütle çekimi çok zayıftır (yerçekimsiz ortam hissi) ve ağırlığa karşı dayanıklılık yeryüzündeki gibi bir statik yapı sorunu oluşturmaz.',
    difficulty: 1,
    xpValue: 10,
  },

  // fiz-u2-t3: Akışkanların Özellikleri (4 questions)
  {
    id: 'fiz-q24',
    topicId: 'fiz-u2-t3',
    type: 'multiple_choice',
    questionText: 'Sıvı yüzeyindeki moleküllerin birbirini çekmesi sonucunda sıvı yüzeyinin zar gibi davranması olayına ne ad verilir?',
    options: ['Kılcallık', 'Adesyon', 'Kohezyon', 'Yüzey Gerilimi'],
    correctAnswer: 3,
    explanation: 'Sıvı molekülleri arasındaki kohezyon kuvveti etkisiyle sıvı yüzeyinde oluşan bu gerginliğe yüzey gerilimi denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q25',
    topicId: 'fiz-u2-t3',
    type: 'true_false',
    questionText: 'Adesyon (yapışma) kuvveti, farklı cins moleküller arasındaki çekim kuvvetidir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Farklı moleküller arası çekime adesyon, aynı moleküller arası çekime kohezyon denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q26',
    topicId: 'fiz-u2-t3',
    type: 'multiple_choice',
    questionText: 'Bir sıvının kılcal (ince) borularda yükselmesi veya alçalması olayı aşağıdakilerden hangisi ile açıklanır?',
    options: ['Dayanıklılık', 'Kılcallık', 'Özkütle', 'Açık hava basıncı'],
    correctAnswer: 1,
    explanation: 'Sıvıların ince borularda adezyon ve kohezyon kuvvetleri etkisiyle yükselmesi veya alçalmasına kılcallık denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q27',
    topicId: 'fiz-u2-t3',
    type: 'multiple_choice',
    questionText: 'Bir sıvıya deterjan eklenirse yüzey gerilimi ve sıcaklık artırılırsa yüzey gerilimi nasıl değişir?',
    options: ['İkisinde de artar', 'Deterjan azaltır, sıcaklık artırır', 'İkisinde de azalır', 'Deterjan artırır, sıcaklık azaltır'],
    correctAnswer: 2,
    explanation: 'Deterjan eklemek ve sıcaklığı artırmak moleküller arası bağları zayıflatarak yüzey gerilimini azaltır.',
    difficulty: 3,
    xpValue: 25,
  },

  // fiz-u3-t1: Hareket Kavramları (5 questions)
  {
    id: 'fiz-q28',
    topicId: 'fiz-u3-t1',
    type: 'multiple_choice',
    questionText: 'Bir hareketlinin ilk konumu ile son konumu arasındaki en kısa yönlü uzaklığa ne denir?',
    options: ['Alınan yol', 'Yer değiştirme', 'Hız', 'İvme'],
    correctAnswer: 1,
    explanation: 'En kısa ve yönlü mesafeye yer değiştirme (Δx) denir. Alınan yol ise yörüngenin toplam uzunluğudur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q29',
    topicId: 'fiz-u3-t1',
    type: 'true_false',
    questionText: 'Hız skaler, sürat ise vektörel bir büyüklüktür.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 1,
    explanation: 'Tam tersi. Hız yer değiştirme ile ilgilidir ve vektöreldir. Sürat alınan yol ile ilgilidir ve skalerdir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q30',
    topicId: 'fiz-u3-t1',
    type: 'multiple_choice',
    questionText: 'Dairesel bir pistte tam bir tur atan koşucu için hangisi doğrudur?',
    options: ['Yer değiştirmesi sıfırdır.', 'Alınan yol sıfırdır.', 'Ortalama hızı en büyüktür.', 'Yer değiştirmesi pistin çevresine eşittir.'],
    correctAnswer: 0,
    explanation: 'Başladığı noktaya geri döndüğü için son konum ile ilk konum aynıdır, yani yer değiştirme sıfırdır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q31',
    topicId: 'fiz-u3-t1',
    type: 'multiple_choice',
    questionText: 'Doğuya doğru 30 km gittikten sonra, kuzeye doğru 40 km giden bir aracın yer değiştirmesi kaç km\'dir?',
    options: ['10', '50', '70', '120'],
    correctAnswer: 1,
    explanation: 'Yer değiştirme vektöreldir. Dik üçgende pisagor bağıntısından kök(30² + 40²) = 50 km olur.',
    difficulty: 3,
    xpValue: 25,
  },
  {
    id: 'fiz-q32',
    topicId: 'fiz-u3-t1',
    type: 'multiple_choice',
    questionText: 'Birim zamandaki hız değişimine ne ad verilir?',
    options: ['Sürat', 'Ortalama Hız', 'İvme', 'Yer Değiştirme'],
    correctAnswer: 2,
    explanation: 'Hızın zamana göre değişimine ivme (a) denir. a = Δv/Δt formülü ile hesaplanır.',
    difficulty: 1,
    xpValue: 10,
  },

  // fiz-u3-t2: Düzgün Doğrusal Hareket (5 questions)
  {
    id: 'fiz-q33',
    topicId: 'fiz-u3-t2',
    type: 'multiple_choice',
    questionText: 'Düzgün doğrusal (sabit hızlı) hareket yapan bir cisim için hangisi kesinlikle doğrudur?',
    options: ['İvmesi sabittir ve sıfırdan farklıdır.', 'Eşit zaman aralıklarında eşit yollar alır.', 'Hız vektörü sürekli yön değiştirir.', 'Kinetik enerjisi sürekli artar.'],
    correctAnswer: 1,
    explanation: 'Sabit hızlı harekette hız değişmez. Bu yüzden cisim eşit sürelerde daima eşit miktarda yer değiştirir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q34',
    topicId: 'fiz-u3-t2',
    type: 'true_false',
    questionText: 'Konum-zaman grafiğinin eğimi cismin ivmesini verir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 1,
    explanation: 'Konum-zaman (x-t) grafiğinin eğimi hızı (v) verir. İvmeyi veren hız-zaman (v-t) grafiğinin eğimidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q35',
    topicId: 'fiz-u3-t2',
    type: 'multiple_choice',
    questionText: 'Hızı 72 km/h olan bir aracın hızı m/s cinsinden kaçtır?',
    options: ['10', '15', '20', '36'],
    correctAnswer: 2,
    explanation: '1 km = 1000 m, 1 saat = 3600 s. 72 km/h = 72000 m / 3600 s = 20 m/s.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q36',
    topicId: 'fiz-u3-t2',
    type: 'multiple_choice',
    questionText: 'Sabit 15 m/s hızla giden bir araç 3 dakikada kaç metre yol alır?',
    options: ['45', '900', '1800', '2700'],
    correctAnswer: 3,
    explanation: 'Zamanı saniyeye çevirmeliyiz: t = 3 * 60 = 180 s. x = v*t = 15 * 180 = 2700 metre.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q37',
    topicId: 'fiz-u3-t2',
    type: 'multiple_choice',
    questionText: 'Hız-zaman grafiği ile zaman ekseni arasında kalan alan neyi verir?',
    options: ['İvmeyi', 'Alınan yolu (Yer değiştirmeyi)', 'Cismin kütlesini', 'Uygulanan kuvveti'],
    correctAnswer: 1,
    explanation: 'Hız-zaman (v-t) grafiğinde alan Δx = v·Δt eşitliğinden yer değiştirmeyi verir.',
    difficulty: 2,
    xpValue: 15,
  },

  // fiz-u3-t3: Kuvvet Kavramı (4 questions)
  {
    id: 'fiz-q38',
    topicId: 'fiz-u3-t3',
    type: 'multiple_choice',
    questionText: 'Duran bir cismi harekete geçirebilen, hareket eden bir cismi durdurabilen veya cismin şeklini değiştirebilen etkiye ne denir?',
    options: ['Kütle', 'İvme', 'Kuvvet', 'Momentum'],
    correctAnswer: 2,
    explanation: 'Kuvvet (F), cisimlerin hareket durumlarını ve şekillerini değiştirebilen vektörel bir etkidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q39',
    topicId: 'fiz-u3-t3',
    type: 'true_false',
    questionText: 'Doğadaki temel kuvvetlerden olan Kütle Çekim Kuvveti, sadece temas gerektiren bir kuvvettir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 1,
    explanation: 'Kütle çekim kuvveti, uzaktan etki eden (temas gerektirmeyen) bir alan kuvvetidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q40',
    topicId: 'fiz-u3-t3',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi doğadaki dört temel kuvvetten biri değildir?',
    options: ['Güçlü Nükleer Kuvvet', 'Elektromanyetik Kuvvet', 'Kaldırma Kuvveti', 'Zayıf Nükleer Kuvvet'],
    correctAnswer: 2,
    explanation: 'Dört temel kuvvet: Güçlü nükleer, zayıf nükleer, elektromanyetik ve kütle çekim kuvvetidir. Kaldırma kuvveti elektromanyetik kökenli makroskobik bir etkidir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q41',
    topicId: 'fiz-u3-t3',
    type: 'multiple_choice',
    questionText: 'Sürtünmesiz yatay düzlemde bir cisme Doğu yönünde 15 N, Batı yönünde 5 N kuvvet uygulanıyor. Bileşke (net) kuvvetin büyüklüğü ve yönü nedir?',
    options: ['10 N, Doğu', '20 N, Doğu', '10 N, Batı', '20 N, Batı'],
    correctAnswer: 0,
    explanation: 'Zıt yönlü kuvvetler çıkarılır. R = 15 - 5 = 10 N, büyük kuvvetin yönünde (Doğu) olur.',
    difficulty: 2,
    xpValue: 15,
  },

  // fiz-u3-t4: Newton'un Hareket Yasaları (5 questions)
  {
    id: 'fiz-q42',
    topicId: 'fiz-u3-t4',
    type: 'multiple_choice',
    questionText: 'Bir cismin üzerine etki eden net kuvvet sıfır ise, cisim duruyorsa durmaya devam eder, hareketli ise sabit hızla hareketine devam eder. Bu ilke Newton\'un hangi yasasıdır?',
    options: ['Etki-Tepki Yasası', 'Temel Yasa', 'Eylemsizlik Yasası', 'Evrensel Çekim Yasası'],
    correctAnswer: 2,
    explanation: 'Net kuvvetin sıfır olması durumunda cismin mevcut hareket durumunu korumasına Eylemsizlik Yasası (1. Yasa) denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q43',
    topicId: 'fiz-u3-t4',
    type: 'true_false',
    questionText: 'Newton\'un II. Hareket Yasası\'na göre, bir cisme etki eden net kuvvet arttıkça cismin ivmesi azalır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 1,
    explanation: 'Temel Yasa (F = m·a) gereği, kütle sabitken net kuvvet artarsa ivme de doğru orantılı olarak artar.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'fiz-q44',
    topicId: 'fiz-u3-t4',
    type: 'multiple_choice',
    questionText: 'Kütlesi 4 kg olan bir cisme yatay sürtünmesiz düzlemde 20 N\'luk net kuvvet uygulanıyor. Cismin kazanacağı ivme kaç m/s² olur?',
    options: ['5', '16', '24', '80'],
    correctAnswer: 0,
    explanation: 'F = m·a formülünden 20 = 4·a => a = 5 m/s² olur.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q45',
    topicId: 'fiz-u3-t4',
    type: 'multiple_choice',
    questionText: 'Newton\'un 3. Yasası olan "Etki-Tepki Prensibi" için aşağıdakilerden hangisi doğrudur?',
    options: ['Etki ve tepki kuvvetleri birbirini sıfırlar.', 'Farklı cisimler üzerinde oluşurlar.', 'Sadece temas eden katı cisimler arasında görülür.', 'Tepki kuvveti daima etki kuvvetinden küçüktür.'],
    correctAnswer: 1,
    explanation: 'Etki ve tepki kuvvetleri eşit büyüklükte, zıt yönlüdür ancak birbirini sıfırlamazlar çünkü FARKLI cisimlere etki ederler.',
    difficulty: 3,
    xpValue: 25,
  },
  {
    id: 'fiz-q46',
    topicId: 'fiz-u3-t4',
    type: 'multiple_choice',
    questionText: 'Dünya yüzeyinde kütlesi 60 kg olan bir kişinin ağırlığı yaklaşık olarak kaç Newton\'dur? (g ≈ 10 m/s²)',
    options: ['6', '60', '300', '600'],
    correctAnswer: 3,
    explanation: 'Ağırlık bir kuvvettir ve G = m·g formülü ile hesaplanır. G = 60 · 10 = 600 N.',
    difficulty: 2,
    xpValue: 15,
  },

  // fiz-u3-t5: Sürtünme Kuvveti (4 questions)
  {
    id: 'fiz-q47',
    topicId: 'fiz-u3-t5',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi sürtünme kuvvetinin özelliklerinden biri değildir?',
    options: ['Hareketi zorlaştırıcı etkisi vardır.', 'Birbirine temas eden yüzeyler arasında oluşur.', 'Cismin yüzey alanına (temas alanına) bağlıdır.', 'Yüzeyin cinsine bağlıdır.'],
    correctAnswer: 2,
    explanation: 'Sürtünme kuvveti sürtünen yüzeylerin büyüklüğüne (alanına) bağlı DEĞİLDİR; cismin ağırlığına (tepki kuvvetine) ve yüzeyin cinsine bağlıdır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q48',
    topicId: 'fiz-u3-t5',
    type: 'true_false',
    questionText: 'Statik sürtünme kuvvetinin alabileceği en büyük değer, kinetik sürtünme kuvvetinden daima büyüktür.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Bir cismi harekete geçirmek, hareket halindeki bir cismi hareket ettirmeye devam etmekten daha zordur. Bu nedenle fs(max) > fk dır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'fiz-q49',
    topicId: 'fiz-u3-t5',
    type: 'multiple_choice',
    questionText: 'Yatay bir zeminde duran 2 kg kütleli cisme zemin ile arasındaki statik sürtünme katsayısı 0,4 tür. Cisme etki edebilecek maksimum statik sürtünme kuvveti kaç N dur? (g=10 m/s²)',
    options: ['2', '4', '8', '20'],
    correctAnswer: 2,
    explanation: 'Tepki kuvveti N = m·g = 2·10 = 20 N. Maksimum statik sürtünme fs = k·N = 0,4 · 20 = 8 N dur.',
    difficulty: 3,
    xpValue: 25,
  },
  {
    id: 'fiz-q50',
    topicId: 'fiz-u3-t5',
    type: 'multiple_choice',
    questionText: 'Sürtünme kuvvetinin hayatta sağladığı yararlara aşağıdakilerden hangisi örnek verilemez?',
    options: ['Yürüyebilmemiz', 'Araçların fren yaparak durabilmesi', 'Makinelerdeki dişlilerin aşınması', 'Kalemle kağıda yazı yazabilmemiz'],
    correctAnswer: 2,
    explanation: 'Dişlilerin aşınması sürtünmenin zararlı bir sonucudur. Diğerleri ise sürtünmenin yararlı ve gerekli olduğu durumlardır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    "id": "fiz-q51",
    "topicId": "fiz-u1-t4",
    "type": "multiple_choice",
    "questionText": "Türkiye'de temel ve uygulamalı bilimsel araştırmaları desteklemek, genç bilim insanlarını teşvik etmek amacıyla 1963 yılında kurulan bilim merkezi hangisidir?",
    "options": [
      "TÜBİTAK",
      "CERN",
      "NASA",
      "ESA"
    ],
    "correctAnswer": 0,
    "explanation": "TÜBİTAK (Türkiye Bilimsel ve Teknolojik Araştırma Kurumu), ülkemizde bilimi ve araştırmacıları destekleyen temel kurumdur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q52",
    "topicId": "fiz-u1-t4",
    "type": "multiple_choice",
    "questionText": "İsviçre-Fransa sınırında yer alan, dünyanın en büyük parçacık fiziği laboratuvarı ve Büyük Hadron Çarpıştırıcısı'na ev sahipliği yapan araştırma merkezi hangisidir?",
    "options": [
      "NASA",
      "CERN",
      "TENMAK",
      "ASELSAN"
    ],
    "correctAnswer": 1,
    "explanation": "CERN (Avrupa Nükleer Araştırma Merkezi), atom altı parçacıkların ve maddenin yapısının incelendiği en büyük parçacık hızlandırıcı merkezidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q53",
    "topicId": "fiz-u1-t4",
    "type": "true_false",
    "questionText": "ASELSAN, Türk Silahlı Kuvvetleri'nin haberleşme ve savunma elektroniği ihtiyaçlarını karşılamak üzere kurulmuş milli bir araştırma ve teknoloji kuruluşudur.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "ASELSAN, savunma sanayii elektroniği, radar, elektro-optik sistemler gibi alanlarda milli teknolojiler geliştirmektedir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q54",
    "topicId": "fiz-u1-t4",
    "type": "multiple_choice",
    "questionText": "Uzay araştırmaları, uzay mekikleri ve diğer gezegenlerin keşfi alanında faaliyet gösteren NASA (ABD) ve ESA (Avrupa) kuruluşlarının temel amacı nedir?",
    "options": [
      "Yalnızca nükleer silah geliştirmek",
      "Evreni, Güneş sistemini ve uzay teknolojilerini bilimsel yöntemlerle keşfetmek",
      "Ticari uçak bileti satmak",
      "Hava tahmin raporlarını yayınlamak"
    ],
    "correctAnswer": 1,
    "explanation": "NASA ve ESA uzay bilimleri, uydu teknolojileri ve gezegen araştırmalarında öncü uluslararası uzay ajanslarıdır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q55",
    "topicId": "fiz-u2-t4",
    "type": "multiple_choice",
    "questionText": "Maddenin katı, sıvı ve gaz halinden sonra gelen, serbest elektronlar, pozitif iyonlar ve nötr atomların bir arada bulunduğu dördüncü haline ne ad verilir?",
    "options": [
      "Süperiletken",
      "Plazma",
      "Kristal",
      "Amorf"
    ],
    "correctAnswer": 1,
    "explanation": "Yüksek enerji ve sıcaklıkta gaz atomlarının elektron kaybederek iyonlaşması sonucu oluşan bu karışıma plazma (iyonize gaz) denir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q56",
    "topicId": "fiz-u2-t4",
    "type": "multiple_choice",
    "questionText": "Aşağıdakilerden hangisi doğal plazmaya örnek gösterilemez?",
    "options": [
      "Güneş ve yıldızlar",
      "Şimşek ve yıldırım",
      "Kutup ışıkları (Aurora)",
      "Floresan ve neon lambalar"
    ],
    "correctAnswer": 3,
    "explanation": "Floresan ve neon lambalar insan eliyle üretilmiş yapay plazma örnekleridir; Güneş, şimşek ve kutup ışıkları ise doğal plazmadır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q57",
    "topicId": "fiz-u2-t4",
    "type": "true_false",
    "questionText": "Plazma hali, serbest elektronlar ve iyonlar içerdiği için elektrik akımını ve ısıyı çok iyi iletir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Gazlar normalde yalıtkan iken plazma serbest yük taşıyıcıları sayesinde elektriği ve ısıyı mükemmel derecede iletir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q58",
    "topicId": "fiz-u2-t4",
    "type": "multiple_choice",
    "questionText": "Plazma hali ile ilgili olarak verilen:\nI. Elektriksel olarak toplamda nötrdür.\nII. Manyetik ve elektriksel alanlarla kontrol edilebilir.\nIII. Belirli bir hacmi ve şekli vardır.\nyargılarından hangileri doğrudur?",
    "options": [
      "Yalnız I",
      "I ve II",
      "II ve III",
      "I, II ve III"
    ],
    "correctAnswer": 1,
    "explanation": "Pozitif yük sayısı negatif yüklere eşit olduğundan plazma nötrdür ve elektromanyetik alanla yönlendirilebilir. Ancak gazlar gibi belirli bir şekli ve hacmi yoktur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q59",
    "topicId": "fiz-u4-t1",
    "type": "multiple_choice",
    "questionText": "Fiziksel anlamda iş yapılabilmesi için aşağıdaki koşullardan hangisinin gerçekleşmesi zorunludur?",
    "options": [
      "Cismin çok ağır olması",
      "Cisme kuvvet uygulanması ve cismin bu kuvvet doğrultusunda yer değiştirmesi",
      "Cismin mutlaka yukarı kaldırılması",
      "Kuvvetin hareket yönüne dik olması"
    ],
    "correctAnswer": 1,
    "explanation": "Fizikte iş W = F · Δx dir. Cisme kuvvet uygulanmalı ve cisim bu kuvvetle AYNI doğrultuda hareket etmelidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q60",
    "topicId": "fiz-u4-t1",
    "type": "multiple_choice",
    "questionText": "Bir işçi 50 N'luk yatay kuvvet uygulayarak bir sandığı yatay zeminde 8 metre sürüklüyor. İşçinin yaptığı mekanik iş kaç Joule'dür?",
    "options": [
      "40 J",
      "100 J",
      "400 J",
      "800 J"
    ],
    "correctAnswer": 2,
    "explanation": "W = F · Δx = 50 N · 8 m = 400 Joule.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q61",
    "topicId": "fiz-u4-t1",
    "type": "true_false",
    "questionText": "Sırtında çanta taşıyan bir öğrenci yatay yolda sabit hızla yürürken yer çekimi kuvvetine karşı fiziksel anlamda iş yapmış olur.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 1,
    "explanation": "Öğrencinin uyguladığı kuvvet düşey yöndedir, hareket ise yatay doğrultudadır. Kuvvet yer değiştirmeye dik olduğundan yer çekimine karşı iş sıfırdır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q62",
    "topicId": "fiz-u4-t1",
    "type": "multiple_choice",
    "questionText": "Birim zamanda yapılan işe veya birim zamanda harcanan enerjiye ne ad verilir ve SI birimi nedir?",
    "options": [
      "İvme - m/s²",
      "Güç - Watt (J/s)",
      "Kuvvet - Newton",
      "Basınç - Pascal"
    ],
    "correctAnswer": 1,
    "explanation": "Güç (P = W / t), birim zamanda yapılan iştir ve birimi Watt (W = J/s) dır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q63",
    "topicId": "fiz-u4-t2",
    "type": "multiple_choice",
    "questionText": "Kütlesi m, hızı v olan bir cismin sahip olduğu kinetik enerji hangi formülle ifade edilir?",
    "options": [
      "m · g · h",
      "1/2 · m · v²",
      "F · x",
      "m · v"
    ],
    "correctAnswer": 1,
    "explanation": "Öteleme kinetik enerjisi Ek = 1/2 m v² formülüyle hesaplanır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q64",
    "topicId": "fiz-u4-t2",
    "type": "multiple_choice",
    "questionText": "Kütlesi 2 kg olan bir kuş, yerden 20 metre yüksekte uçmaktadır. Kuşun yer çekimi potansiyel enerjisi kaç Joule'dür? (g = 10 m/s²)",
    "options": [
      "40 J",
      "200 J",
      "400 J",
      "800 J"
    ],
    "correctAnswer": 2,
    "explanation": "Ep = m · g · h = 2 kg · 10 m/s² · 20 m = 400 J.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q65",
    "topicId": "fiz-u4-t2",
    "type": "true_false",
    "questionText": "Bir otomobilin hızı 2 katına çıkarılırsa, sahip olduğu kinetik enerji de 2 katına çıkar.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 1,
    "explanation": "Kinetik enerji hızın karesiyle (v²) orantılıdır. Hız 2 katına çıkarsa kinetik enerji 4 katına çıkar.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q66",
    "topicId": "fiz-u4-t2",
    "type": "multiple_choice",
    "questionText": "Mekanik enerji aşağıdakilerden hangisinin toplamına eşittir?",
    "options": [
      "Isı enerjisi + Kinetik enerji",
      "Kinetik enerji + Potansiyel enerji",
      "Elektrik enerjisi + Işık enerjisi",
      "Kimyasal enerji + Nükleer enerji"
    ],
    "correctAnswer": 1,
    "explanation": "Bir sistemin mekanik enerjisi kinetik enerji ile potansiyel enerjisinin toplamıdır (Emek = Ek + Ep).",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q67",
    "topicId": "fiz-u4-t3",
    "type": "multiple_choice",
    "questionText": "Sürtünmelerin ve hava direncinin ihmal edildiği bir ortamda serbest bırakılan bir taş aşağı düşerken enerji dönüşümü nasıl gerçekleşir?",
    "options": [
      "Kinetik enerji artar, potansiyel enerji artar",
      "Potansiyel enerji azalır, kinetik enerjiye dönüşür; mekanik enerji korunur",
      "Mekanik enerji tamamen kaybolur",
      "Yalnızca ısı enerjisi açığa çıkar"
    ],
    "correctAnswer": 1,
    "explanation": "Sürtünmesiz ortamda düşen cismin yüksekliği azaldıkça potansiyel enerjisi azalır ve bu enerji kinetik enerjiye dönüşür. Toplam mekanik enerji sabit kalır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q68",
    "topicId": "fiz-u4-t3",
    "type": "true_false",
    "questionText": "Sürtünmeli ortamlarda toplam mekanik enerji korunmaz; mekanik enerjinin bir kısmı ısı enerjisine dönüşür.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Sürtünme kuvveti iş yaparak mekanik enerjiyi ısıya çevirir. Evrendeki toplam enerji korunsa da mekanik enerji azalır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q69",
    "topicId": "fiz-u4-t3",
    "type": "multiple_choice",
    "questionText": "Sürtünmesiz bir sarkaç hareketinde, sarkacın denge noktasından geçerken kinetik ve potansiyel enerjileri nasıldır?",
    "options": [
      "Potansiyel enerji maksimum, kinetik sıfırdır",
      "Kinetik enerji maksimum, potansiyel enerji minimumdur",
      "Her iki enerji de sıfırdır",
      "Hız sıfırdır"
    ],
    "correctAnswer": 1,
    "explanation": "Denge konumunda yükseklik en az olduğundan potansiyel enerji en küçük, hız en büyük olduğu için kinetik enerji maksimumdur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q70",
    "topicId": "fiz-u4-t3",
    "type": "multiple_choice",
    "questionText": "Yerden düşey yukarı doğru fırlatılan bir cisim maksimum yüksekliğe ulaştığı anda hızı ve enerjisi için ne söylenebilir?",
    "options": [
      "Hızı sıfır, kinetik enerjisi sıfır, potansiyel enerjisi maksimumdur",
      "Hızı maksimum, potansiyel enerjisi sıfırdır",
      "Mekanik enerjisi sıfırlanmıştır",
      "Kinetik enerji potansiyelden büyüktür"
    ],
    "correctAnswer": 0,
    "explanation": "Maksimum yükseklikte anlık hız sıfırlandığı için kinetik enerji sıfır, tüm mekanik enerji potansiyel enerjiye dönüşmüştür.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q71",
    "topicId": "fiz-u4-t4",
    "type": "multiple_choice",
    "questionText": "Bir elektrik motoru 1000 J elektrik enerjisi tüketerek 750 J mekanik iş üretmiştir. Bu motorun verimi yüzde kaçtır?",
    "options": [
      "%25",
      "%50",
      "%75",
      "%85"
    ],
    "correctAnswer": 2,
    "explanation": "Verim = (Yararlı İş / Harcanan Enerji) · 100 = (750 / 1000) · 100 = %75.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q72",
    "topicId": "fiz-u4-t4",
    "type": "true_false",
    "questionText": "Doğadaki hiçbir mekanik sistemin veya makinenin verimi %100 veya daha büyük olamaz.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Termodinamiğin 2. yasası gereği sürtünme ve ısı kayıplarından dolayı harcanan enerjinin tamamı yararlı işe dönüştürülemez; verim daima %100'den küçüktür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q73",
    "topicId": "fiz-u4-t4",
    "type": "multiple_choice",
    "questionText": "Aşağıdakilerden hangisi evlerde enerji tasarrufu sağlamak için uygulanan yöntemlerden biri değildir?",
    "options": [
      "Binalara dış cephe ısı yalıtımı (mantolama) yaptırmak",
      "A akkor ampuller yerine enerji tasarruflu LED ampuller kullanmak",
      "Isıtıcıların önünü mobilyalarla kapatmak",
      "A enerji sınıfı beyaz eşyaları tercih etmek"
    ],
    "correctAnswer": 2,
    "explanation": "Radyatör veya ısıtıcıların önünün kapatılması ısının odaya yayılmasını engelleyerek enerji israfına yol açar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q74",
    "topicId": "fiz-u4-t4",
    "type": "multiple_choice",
    "questionText": "Beyaz eşyaların üzerindeki enerji etiketlerinde yer alan \"A\" sınıfı neyi ifade eder?",
    "options": [
      "Cihazın daha çok ses çıkardığını",
      "Cihazın yüksek enerji verimliliğine sahip olduğunu ve az elektrik tükettiğini",
      "Cihazın sadece gece çalıştığını",
      "Cihazın gücünün çok düşük olduğunu"
    ],
    "correctAnswer": 1,
    "explanation": "A sınıfı (ve A+, A++) cihazlar aynı işi çok daha az elektrik enerjisi harcayarak gerçekleştiren yüksek verimli cihazlardır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q75",
    "topicId": "fiz-u4-t5",
    "type": "multiple_choice",
    "questionText": "Doğal süreçlerle kendini sürekli yenileyebilen ve kullanıldığında tükenmeyen enerji kaynaklarına ne ad verilir?",
    "options": [
      "Fosil yakıtlar",
      "Yenilenebilir enerji kaynakları",
      "Yenilenemez enerji kaynakları",
      "Nükleer enerji kaynakları"
    ],
    "correctAnswer": 1,
    "explanation": "Güneş, rüzgâr, hidroelektrik, jeotermal ve biyokütle enerjileri tükenmeyen yenilenebilir kaynaklardır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q76",
    "topicId": "fiz-u4-t5",
    "type": "multiple_choice",
    "questionText": "Aşağıdakilerden hangisi yenilenemez (fosil) bir enerji kaynağıdır?",
    "options": [
      "Rüzgâr enerjisi",
      "Jeotermal enerji",
      "Taş kömürü",
      "Güneş enerjisi"
    ],
    "correctAnswer": 2,
    "explanation": "Kömür, petrol ve doğal gaz oluşumu milyonlarca yıl süren ve rezervleri sınırlı olan fosil (yenilenemez) yakıtlardır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q77",
    "topicId": "fiz-u4-t5",
    "type": "true_false",
    "questionText": "Fosil yakıtların aşırı kullanımı atmosfere sera gazı salınımını artırarak küresel ısınmaya ve asit yağmurlarına yol açar.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Kömür ve petrolün yanması sonucu açığa çıkan CO₂, SO₂ ve NO₂ gazları sera etkisini artırır ve asit yağmuru oluşturur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q78",
    "topicId": "fiz-u4-t5",
    "type": "multiple_choice",
    "questionText": "Yer kabuğunun derinliklerindeki sıcak su ve buhardan elde edilen elektrik ve ısı enerjisi türü hangisidir?",
    "options": [
      "Jeotermal enerji",
      "Hidroelektrik enerji",
      "Biyokütle enerjisi",
      "Dalga enerjisi"
    ],
    "correctAnswer": 0,
    "explanation": "Jeo (yer) + termal (ısı) kaynaklı sıcak suların buhar türbinlerini döndürmesiyle jeotermal enerji üretilir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q79",
    "topicId": "fiz-u5-t1",
    "type": "multiple_choice",
    "questionText": "Bir maddedeki atom ve moleküllerin ortalama kinetik enerjisinin bir göstergesi olan ve termometreyle ölçülen nicelik hangisidir?",
    "options": [
      "Isı",
      "Sıcaklık",
      "İç enerji",
      "Öz ısı"
    ],
    "correctAnswer": 1,
    "explanation": "Sıcaklık bir enerji değildir, taneciklerin ortalama kinetik enerjisinin bir göstergesidir ve termometreyle ölçülür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q80",
    "topicId": "fiz-u5-t1",
    "type": "multiple_choice",
    "questionText": "Sıcaklık farkından dolayı sıcaklığı yüksek olan maddeden düşük olan maddeye aktarılan enerjiye ne ad verilir ve SI birimi nedir?",
    "options": [
      "Sıcaklık - Kelvin",
      "Isı - Joule",
      "İç enerji - Newton",
      "Genleşme - Metre"
    ],
    "correctAnswer": 1,
    "explanation": "Isı aktarılan bir enerjidir ve SI sistemindeki birimi Joule'dür (kalori de yaygın kullanılır).",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q81",
    "topicId": "fiz-u5-t1",
    "type": "true_false",
    "questionText": "\"Bugün havanın ısısı 25 °C olacak\" ifadesi fizik bilimi açısından doğru bir kullanımdır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 1,
    "explanation": "Fiziksel olarak 25 °C sıcaklıktır, ısı değildir. Doğru ifade \"Havanın sıcaklığı 25 °C\" olmalıdır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q82",
    "topicId": "fiz-u5-t1",
    "type": "multiple_choice",
    "questionText": "Bir cismi oluşturan tüm atom ve moleküllerin kinetik enerjileri ile potansiyel enerjilerinin toplamına ne ad verilir?",
    "options": [
      "Öz ısı",
      "İç enerji",
      "Sıcaklık",
      "Isı sığası"
    ],
    "correctAnswer": 1,
    "explanation": "Maddenin mikroskobik taneciklerinin sahip olduğu tüm öteleme, dönme, titreşim ve bağ potansiyel enerjilerinin toplamı iç enerjidir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q83",
    "topicId": "fiz-u5-t2",
    "type": "multiple_choice",
    "questionText": "Moleküler hareketin tamamen durduğu varsayılan, ulaşılabilecek en düşük sıcaklık olan \"Mutlak Sıfır Noktası\" kaç Kelvin'dir?",
    "options": [
      "-273 K",
      "0 K",
      "100 K",
      "273 K"
    ],
    "correctAnswer": 1,
    "explanation": "Mutlak sıfır noktası 0 Kelvin (-273,15 °C) dir. Kelvin ölçeğinde negatif sıcaklık değeri bulunmaz.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q84",
    "topicId": "fiz-u5-t2",
    "type": "multiple_choice",
    "questionText": "27 °C sıcaklığın Kelvin ölçeğindeki karşılığı aşağıdakilerden hangisidir?",
    "options": [
      "246 K",
      "273 K",
      "300 K",
      "327 K"
    ],
    "correctAnswer": 2,
    "explanation": "T(K) = t(°C) + 273 formülünden T = 27 + 273 = 300 K bulunur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q85",
    "topicId": "fiz-u5-t2",
    "type": "true_false",
    "questionText": "Sıvılı bir termometrenin duyarlılığını artırmak için haznesinin geniş, kılcal borusunun ise ince olması gerekir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Hazne büyük olursa sıvı miktarı ve genleşme miktarı artar, boru ince olursa sıvı seviyesindeki yükselme daha net gözlenir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q86",
    "topicId": "fiz-u5-t2",
    "type": "multiple_choice",
    "questionText": "\"20 °C sıcaklık, 10 °C sıcaklığın iki katıdır\" yargısı neden yanlıştır?",
    "options": [
      "Çünkü Celcius termometresi hassas değildir",
      "Çünkü Celcius ölçeği bağıl bir ölçektir, kat ilişkisi yalnızca mutlak sıfırdan başlayan Kelvin ölçeğinde geçerlidir",
      "Çünkü sıcaklık skaler bir büyüklüktür",
      "Çünkü ısı kalorimetreyle ölçülür"
    ],
    "correctAnswer": 1,
    "explanation": "Celcius ölçeğinde sıfır noktası keyfi olarak suyun donma noktası seçilmiştir. Oransal kat hesaplamaları ancak mutlak sıfırdan başlayan Kelvin ölçeğinde yapılabilir.",
    "difficulty": 3,
    "xpValue": 20
  },
  {
    "id": "fiz-q87",
    "topicId": "fiz-u5-t3",
    "type": "multiple_choice",
    "questionText": "Saf bir maddenin 1 gramının sıcaklığını 1 °C değiştirmek için verilmesi ya da alınması gereken ısı enerjisine ne ad verilir?",
    "options": [
      "Isı sığası",
      "Öz ısı (özgül ısı)",
      "Gizli ısı",
      "Erime ısısı"
    ],
    "correctAnswer": 1,
    "explanation": "Öz ısı (c), maddeler için ayırt edici bir özelliktir ve birimi cal/g·°C veya J/kg·K'dir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q88",
    "topicId": "fiz-u5-t3",
    "type": "multiple_choice",
    "questionText": "Suyun öz ısısının karaların öz ısısından büyük olması çevre koşullarını nasıl etkiler?",
    "options": [
      "Denizler karalara göre daha geç ısınır ve daha geç soğur",
      "Karalar kışın denizlerden daha ılık kalır",
      "Deniz suyu asla donmaz",
      "Rüzgâr oluşumu tamamen durur"
    ],
    "correctAnswer": 0,
    "explanation": "Öz ısısı büyük olan maddelerin sıcaklık değişimi yavaştır. Bu yüzden denizler geç ısınıp geç soğuyarak kıyı iklimlerini ılımanlaştırır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q89",
    "topicId": "fiz-u5-t3",
    "type": "true_false",
    "questionText": "Isı sığası (C = m · c) madde miktarına (kütleye) bağlı olduğu için saf maddeler için ayırt edici bir özellik değildir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Öz ısı (c) ayırt edicidir, ancak kütleyle çarpımı olan ısı sığası (C) kütleye göre değiştiğinden ayırt edici değildir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q90",
    "topicId": "fiz-u5-t3",
    "type": "multiple_choice",
    "questionText": "Kütlesi 100 g olan bir metal parçasının sıcaklığını 10 °C'den 30 °C'ye çıkarmak için 400 cal ısı gerekiyor. Bu metalin öz ısısı kaç cal/g·°C'dir?",
    "options": [
      "0,1",
      "0,2",
      "0,4",
      "2,0"
    ],
    "correctAnswer": 1,
    "explanation": "Q = m · c · ΔT formülünden 400 = 100 · c · (30 - 10) => 400 = 2000 · c => c = 0,2 cal/g·°C.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q91",
    "topicId": "fiz-u5-t4",
    "type": "multiple_choice",
    "questionText": "Saf bir maddenin sabit basınç altında hâl değiştirdiği süre boyunca sıcaklığı nasıl değişir?",
    "options": [
      "Sürekli artar",
      "Sabit kalır",
      "Sürekli azalır",
      "Önce artar sonra azalır"
    ],
    "correctAnswer": 1,
    "explanation": "Saf maddeler erirken veya kaynarken verilen ısı sıcaklığı artırmak yerine moleküller arası bağları kırmak için kullanılır; sıcaklık sabit kalır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q92",
    "topicId": "fiz-u5-t4",
    "type": "multiple_choice",
    "questionText": "Katı bir maddenin sıvı hâle geçmeden doğrudan gaz hâle geçmesi olayına ne ad verilir?",
    "options": [
      "Buharlaşma",
      "Kırağılaşma",
      "Süblimleşme",
      "Yoğuşma"
    ],
    "correctAnswer": 2,
    "explanation": "Naftalin ve kuru buzun doğrudan gaz haline geçmesi süblimleşmedir. Gazın doğrudan katıya geçmesine ise kırağılaşma denir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q93",
    "topicId": "fiz-u5-t4",
    "type": "true_false",
    "questionText": "Elimize kolonya döküldüğünde serinlik hissetmemizin nedeni, buharlaşan alkolün elimizden ısı almasıdır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Buharlaşma endotermik (ısı alan) bir olaydır; buharlaşan sıvı çevresinden ısı alarak o ortamın sıcaklığını düşürür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q94",
    "topicId": "fiz-u5-t4",
    "type": "multiple_choice",
    "questionText": "Düdüklü tencerede yemeklerin normal tencereye göre çok daha hızlı pişmesinin fiziksel nedeni nedir?",
    "options": [
      "Tencere kapağının cam olması",
      "İç basıncın artması sonucu suyun kaynama noktasının 100 °C'nin üzerine çıkması",
      "Yemeğin daha az su çekmesi",
      "Isının dışarıya hiç kaçamaması"
    ],
    "correctAnswer": 1,
    "explanation": "Sıvı yüzeyindeki açık basınç arttıkça suyun kaynama sıcaklığı yükselir (yaklaşık 120 °C). Yüksek sıcaklıkta yemek çok daha hızlı pişer.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q95",
    "topicId": "fiz-u5-t5",
    "type": "multiple_choice",
    "questionText": "Yalıtılmış bir ortamda farklı sıcaklıklarda iki cisim birbirine temas ettirildiğinde ısı akışı ne zamana kadar devam eder?",
    "options": [
      "Kütleleri eşitlenene kadar",
      "Sıcaklıkları eşitlenip ısıl dengeye ulaşılıncaya kadar",
      "Hacimleri eşitlenene kadar",
      "Öz ısıları eşitlenene kadar"
    ],
    "correctAnswer": 1,
    "explanation": "Isı alışverişi sıcaklıklar eşitleninceye kadar sürer. Eşitlenen bu son sıcaklığa denge sıcaklığı (Td) denir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q96",
    "topicId": "fiz-u5-t5",
    "type": "true_false",
    "questionText": "Yalıtılmış bir sistemde ısı alışverişinde bulunan iki madde arasında alınan ısı miktarı, verilen ısı miktarına daima eşittir (Qalınan = Qverilen).",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Enerjinin korunumu ilkesi gereği dış ortamla ısı alışverişi yoksa verilen ısı alınan ısıya tam olarak eşittir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q97",
    "topicId": "fiz-u5-t5",
    "type": "multiple_choice",
    "questionText": "20 °C'de 100 g su ile 80 °C'de 100 g su karıştırıldığında denge sıcaklığı kaç °C olur? (Isı kaybı yoktur)",
    "options": [
      "40 °C",
      "50 °C",
      "60 °C",
      "100 °C"
    ],
    "correctAnswer": 1,
    "explanation": "Aynı tür sıvı ve eşit kütlede olduklarında ısı sığaları eşittir; denge sıcaklığı aritmetik ortalamadır: (20 + 80) / 2 = 50 °C.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q98",
    "topicId": "fiz-u5-t5",
    "type": "multiple_choice",
    "questionText": "Farklı sıcaklıktaki T1 ve T2 (T1 > T2) sıcaklığındaki iki cisim karıştırıldığında oluşacak denge sıcaklığı (Td) için hangisi kesinlikle doğrudur?",
    "options": [
      "Td > T1",
      "Td < T2",
      "T2 < Td < T1",
      "Td = T1 + T2"
    ],
    "correctAnswer": 2,
    "explanation": "Denge sıcaklığı daima soğuk olan maddenin sıcaklığından büyük, sıcak olan maddenin sıcaklığından küçüktür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q99",
    "topicId": "fiz-u5-t6",
    "type": "multiple_choice",
    "questionText": "Çorba kasesine bırakılan metal kaşığın sapının bir süre sonra ısınması ısının hangi yolla yayılmasına örnektir?",
    "options": [
      "Işıma (Radyasyon)",
      "İletim",
      "Konveksiyon (Taşıma)",
      "Buharlaşma"
    ],
    "correctAnswer": 1,
    "explanation": "Katı maddelerde taneciklerin titreşim hareketiyle ısının birbirine aktarılması iletim yoludur. Metaller iyi iletkendir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q100",
    "topicId": "fiz-u5-t6",
    "type": "multiple_choice",
    "questionText": "Güneş'in uzay boşluğunu geçerek Dünya'mızı ısıtması ısının hangi yolla aktarılması sayesinde gerçekleşir?",
    "options": [
      "İletim",
      "Konveksiyon",
      "Işıma (Radyasyon)",
      "Sürtünme"
    ],
    "correctAnswer": 2,
    "explanation": "Işıma, ısının elektromanyetik dalgalarla yayılmasıdır ve maddesel ortama ihtiyaç duymadan boşlukta da gerçekleşir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q101",
    "topicId": "fiz-u5-t6",
    "type": "true_false",
    "questionText": "Odadaki kalorifer peteğinin odayı ısıtması, ısınan havanın genleşip yükselmesi ve soğuk havanın dibe çökmesi şeklindeki konveksiyon yoluyla gerçekleşir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Sıvı ve gaz akışkanlarda ısınan maddenin öteleme hareketiyle yer değiştirmesi olayına konveksiyon denir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q102",
    "topicId": "fiz-u5-t6",
    "type": "multiple_choice",
    "questionText": "Termosların çift cidarlı cam duvarlarının arasının boşaltılması (vakumlanması) ısının hangi yayılma yollarını engellemek içindir?",
    "options": [
      "Yalnız ışıma",
      "İletim ve konveksiyon",
      "Yalnız iletim",
      "Yalnız buharlaşma"
    ],
    "correctAnswer": 1,
    "explanation": "İletim ve konveksiyon için maddesel ortam gerekir; vakumlu boşlukta bu iki yolla ısı transferi tamamen engellenir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q103",
    "topicId": "fiz-u5-t7",
    "type": "multiple_choice",
    "questionText": "Sıcaklığı artırılan bir katı telin boyundaki uzama miktarı aşağıdakilerden hangisine bağlı değildir?",
    "options": [
      "Telin ilk boyuna",
      "Sıcaklık artış miktarına",
      "Telin yapıldığı maddenin cinsine (boyca genleşme katsayısına)",
      "Telin bulunduğu ortamın aydınlığına"
    ],
    "correctAnswer": 3,
    "explanation": "ΔL = L0 · λ · ΔT dir. İlk boy, genleşme katsayısı ve sıcaklık değişimine bağlıdır; ışık şiddetine bağlı değildir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q104",
    "topicId": "fiz-u5-t7",
    "type": "multiple_choice",
    "questionText": "Suyun +4 °C'deki özel durumu ile ilgili aşağıdakilerden hangisi doğrudur?",
    "options": [
      "+4 °C'de suyun hacmi maksimum, özkütlesi minimumdur",
      "+4 °C'de suyun hacmi minimum, özkütlesi maksimumdur (1 g/cm³)",
      "+4 °C'de su donmaya başlar",
      "+4 °C'de suyun özkütlesi sıfırdır"
    ],
    "correctAnswer": 1,
    "explanation": "Su +4 °C'de en küçük hacme ve en büyük özkütleye ulaşır. Bu sebeple göller ve denizler dipten değil üstten donar ve su altı yaşamı korunur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q105",
    "topicId": "fiz-u5-t7",
    "type": "true_false",
    "questionText": "Gazlar için genleşme katsayısı ayırt edici bir özelliktir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 1,
    "explanation": "Tüm gazların aynı sıcaklık artışında genleşme katsayıları eşittir (1/273), bu yüzden gazlarda genleşme ayırt edici DEĞİLDİR.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q106",
    "topicId": "fiz-u5-t7",
    "type": "multiple_choice",
    "questionText": "Genleşme katsayıları farklı iki metal şeridin birbirine perçinlenmesiyle oluşturulan ve sıcaklık değişiminde bükülen sistemlere ne ad verilir?",
    "options": [
      "Elektroskop",
      "Metal çifti (Bimetal)",
      "Termokupl",
      "Manometre"
    ],
    "correctAnswer": 1,
    "explanation": "Metal çiftleri (bimetal) termostatlarda, ütülerde ve yangın alarmlarında sıcaklık kontrol anahtarı olarak kullanılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q107",
    "topicId": "fiz-u6-t1",
    "type": "multiple_choice",
    "questionText": "Yün kumaşa sürtülen ebonit (plastik) çubuk ve ipek kumaşa sürtülen cam çubuğun kazandığı elektrik yük cinsleri hangisinde doğru verilmiştir?",
    "options": [
      "Ebonit: Negatif (-), Cam: Pozitif (+)",
      "Ebonit: Pozitif (+), Cam: Negatif (-)",
      "Her ikisi de nötr kalır",
      "Her ikisi de pozitif (+) olur"
    ],
    "correctAnswer": 0,
    "explanation": "Ebonit sürtünmeyle elektron alarak eksi (-) yüklenir, cam ise ipeğe elektron vererek artı (+) yüklenir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q108",
    "topicId": "fiz-u6-t1",
    "type": "true_false",
    "questionText": "Sürtünme ile elektriklenmede toplam yük korunur; sürtünen cisimlerden biri ne kadar pozitif yük kazanırsa diğeri o kadar negatif yük kazanır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Elektronlar bir cisimden diğerine geçer, yok olmaz. Toplam yük miktarı daima sıfır (nötr) kalır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q109",
    "topicId": "fiz-u6-t1",
    "type": "multiple_choice",
    "questionText": "Yarıçapları r ve 2r olan iletken kürelerin yükleri sırasıyla +4q ve +8q dur. Küreler birbirine dokundurulup ayrılırsa r yarıçaplı kürenin son yükü ne olur?",
    "options": [
      "+2q",
      "+4q",
      "+6q",
      "+8q"
    ],
    "correctAnswer": 1,
    "explanation": "Toplam yük Q = 4q + 8q = 12q. Toplam yarıçap = r + 2r = 3r. r başına düşen yük = 12q / 3r = 4q/r. r yarıçaplı kürenin yükü +4q olur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q110",
    "topicId": "fiz-u6-t1",
    "type": "multiple_choice",
    "questionText": "Nötr iletken bir cisme pozitif (+) yüklü bir çubuk dokundurulmadan yaklaştırılırsa ne gerçekleşir?",
    "options": [
      "Cisim tamamen pozitif yüklenir",
      "Yakın uçta negatif (-) yükler toplanır, uzak uçta pozitif (+) yükler kalır (Etki ile kutuplanma)",
      "Cisim tüm yüklerini kaybeder",
      "Hiçbir değişiklik olmaz"
    ],
    "correctAnswer": 1,
    "explanation": "Etki ile elektriklenmede zıt yükler çekilerek yakın uca toplanır, aynı yükler uzak uca itilir; cisim kutuplanır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q111",
    "topicId": "fiz-u6-t2",
    "type": "multiple_choice",
    "questionText": "Bir cismin elektrikle yüklü olup olmadığını, yüklüyse hangi cins yükle yüklü olduğunu anlamaya yarayan deney aletine ne ad verilir?",
    "options": [
      "Voltmetre",
      "Elektroskop",
      "Dinamometre",
      "Barometre"
    ],
    "correctAnswer": 1,
    "explanation": "Elektroskop metal topuz, iletken gövde ve hafif metal yapraklardan oluşur; yük durumunu belirler.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q112",
    "topicId": "fiz-u6-t2",
    "type": "multiple_choice",
    "questionText": "Nötr bir elektroskoba negatif (-) yüklü bir iletken cisim dokundurulursa yaprakların durumu ne olur?",
    "options": [
      "Kapalı kalmaya devam eder",
      "Her iki yaprak da negatif yüklenerek birbirini iter ve açılır",
      "Yapraklardan biri açılır diğeri kapanır",
      "Yapraklar kopar"
    ],
    "correctAnswer": 1,
    "explanation": "Dokunma sonucu elektroskop eksi yüklenir. İki yaprak da aynı yükle (eksi) yüklendiği için birbirini iterek açılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q113",
    "topicId": "fiz-u6-t2",
    "type": "true_false",
    "questionText": "Pozitif (+) yüklü bir elektroskobun topuzuna aynı cins (+) yüklü bir cisim yaklaştırılırsa yapraklar biraz daha açılır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Topuzdaki artı yükler yapraklardaki eksi yükleri çeker, yapraklarda artı yük yoğunluğu artar ve yapraklar daha fazla açılır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q114",
    "topicId": "fiz-u6-t2",
    "type": "multiple_choice",
    "questionText": "Yüklü bir elektroskobun yapraklarının tamamen kapanabilmesi için aşağıdakilerden hangisi yapılmalıdır?",
    "options": [
      "Topuzuna zıt işaretli ve eşit miktarda yük dokundurulmalı veya topraklanmalıdır",
      "Güneş ışığına tutulmalıdır",
      "Metal yapraklar çıkarılmalıdır",
      "Ortam soğutulmalıdır"
    ],
    "correctAnswer": 0,
    "explanation": "Elektroskop nötr hale gelirse (örneğin topraklanırsa) yapraklar üzerindeki yük sıfırlanır ve yerçekimi etkisiyle tamamen kapanır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q115",
    "topicId": "fiz-u6-t3",
    "type": "multiple_choice",
    "questionText": "Aşağıdaki madde çiftlerinden hangisinde her iki madde de elektrik iletkenidir?",
    "options": [
      "Bakır tel - Tuzlu su",
      "Plastik cetvel - Saf su",
      "Cam bardak - Tahta kaşık",
      "Porselen tabak - Kuru hava"
    ],
    "correctAnswer": 0,
    "explanation": "Metaller (bakır) ve iyon içeren sıvılar (tuzlu su) elektrik akımını çok iyi iletir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q116",
    "topicId": "fiz-u6-t3",
    "type": "multiple_choice",
    "questionText": "Yüklü bir iletken cismin bir iletken telle yeryüzüne (toprağa) bağlanarak nötr hale getirilmesi işlemine ne ad verilir?",
    "options": [
      "Yalıtım",
      "Topraklama",
      "İndüksiyon",
      "Polarizasyon"
    ],
    "correctAnswer": 1,
    "explanation": "Topraklama, cisimdeki fazla yükün toprağa akmasını veya topraktan elektron alarak cismin nötrlenmesini sağlar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q117",
    "topicId": "fiz-u6-t3",
    "type": "true_false",
    "questionText": "Pozitif (+) yüklü iletken bir cisim topraklandığında, cisimdeki pozitif protonlar toprağa akar.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 1,
    "explanation": "Protonlar atom çekirdeğindedir ve hareket etmez! Topraktan cisme elektron (-) akar ve pozitif yükleri nötrler.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q118",
    "topicId": "fiz-u6-t3",
    "type": "multiple_choice",
    "questionText": "Akaryakıt taşıyan tankerlerin arkasında yere değen zincirler sarkıtılmasının ve ameliyathanelerde antistatik zemin kullanılmasının temel amacı nedir?",
    "options": [
      "Daha hızlı gitmek",
      "Statik elektrik birikimini topraklayarak kıvılcım ve patlama riskini önlemek",
      "Yakıt tasarrufu yapmak",
      "Araç ağırlığını azaltmak"
    ],
    "correctAnswer": 1,
    "explanation": "Hava ve zemin sürtünmesiyle oluşan statik yükler zincirle toprağa aktarılır, kıvılcım çıkması önlenir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q119",
    "topicId": "fiz-u6-t4",
    "type": "multiple_choice",
    "questionText": "Noktasal iki elektrik yükü arasındaki elektriksel kuvvet (Coulomb kuvveti) yüklerin büyüklüğü ve aralarındaki uzaklıkla nasıl orantılıdır?",
    "options": [
      "Yüklerin çarpımı ile ters, uzaklıkla doğru",
      "Yüklerin çarpımı ile doğru, aralarındaki uzaklığın karesi ile ters",
      "Yüklerin toplamı ile doğru, uzaklıkla orantısız",
      "Yalnızca ortamın sıcaklığına bağlı"
    ],
    "correctAnswer": 1,
    "explanation": "Coulomb Yasası: F = k · (|q1 · q2|) / d² dir. Yüklerin çarpımıyla doğru, uzaklığın karesiyle ters orantılıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "fiz-q120",
    "topicId": "fiz-u6-t4",
    "type": "multiple_choice",
    "questionText": "Aralarındaki uzaklık d iken birbirine F kuvveti uygulayan iki yüklü cisim arasındaki uzaklık 2d yapılırsa elektriksel kuvvet kaç F olur?",
    "options": [
      "F/4",
      "F/2",
      "2F",
      "4F"
    ],
    "correctAnswer": 0,
    "explanation": "Kuvvet uzaklığın karesiyle ters orantılıdır: (2d)² = 4d² olduğundan kuvvet F / 4'e düşer.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "fiz-q121",
    "topicId": "fiz-u6-t4",
    "type": "true_false",
    "questionText": "Yükleri +q ve +4q olan iki cisimden +4q yükünün +q yüküne uyguladığı itme kuvveti, +q'nun +4q'ya uyguladığı kuvvetten 4 kat daha büyüktür.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 1,
    "explanation": "Newton'un etki-tepki prensibi gereği Coulomb kuvveti her iki cisim için de daima eşit büyüklükte ve zıt yönlüdür.",
    "difficulty": 3,
    "xpValue": 20
  },
  {
    "id": "fiz-q122",
    "topicId": "fiz-u6-t4",
    "type": "multiple_choice",
    "questionText": "Aynı cins yüklü iki cisim arasına hava yerine dielektrik katsayısı daha büyük olan yalıtkan bir madde (örneğin cam veya porselen) konulursa elektriksel kuvvet nasıl değişir?",
    "options": [
      "Artar",
      "Azalır",
      "Değişmez",
      "Sıfır olur"
    ],
    "correctAnswer": 1,
    "explanation": "Ortamın yalıtkanlık (dielektrik) katsayısı arttıkça Coulomb sabiti k küçülür ve yükler arasındaki elektriksel kuvvet azalır.",
    "difficulty": 3,
    "xpValue": 20
  }
];
