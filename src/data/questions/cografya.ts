import { Question } from '@/types';

export const cografyaQuestions: Question[] = [
  // cog-u1-t1: Doğa ve İnsan Etkileşimi (6 questions)
  {
    id: 'cog-u1-t1-q1',
    topicId: 'cog-u1-t1',
    type: 'multiple_choice',
    questionText: 'Coğrafya bilimini diğer bilimlerden ayıran ve incelenen olayın yeryüzündeki mekanını gösteren temel ilke hangisidir?',
    options: ['Dağılış ilkesi', 'Nedensellik ilkesi', 'Karşılıklı ilgi (Bağlantı) ilkesi', 'Dinamizm ilkesi'],
    correctAnswer: 0,
    explanation: 'Dağılış ilkesi yalnızca coğrafyaya özgüdür ve haritalarla olguların mekânsal yayılışını ortaya koyar.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t1-q2',
    topicId: 'cog-u1-t1',
    type: 'true_false',
    questionText: 'Litosfer (taş küre), hidrosfer (su küre), atmosfer (hava küre) ve biyosfer (canlılar küre) doğal ortamın dört temel bileşenidir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Coğrafya bu dört kürenin (muhteşem dörtlü) birbiriyle ve insanla olan etkileşimini inceler.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t1-q3',
    topicId: 'cog-u1-t1',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi insanın doğaya olan etkisine bir örnektir?',
    options: ['Dağlık alanlarda yerleşmelerin seyrek olması', 'Deniz doldurularak havalimanı inşa edilmesi', 'Kutup bölgelerinde igloların yapılması', 'Çöl bölgelerinde kerpiç evlerin kullanılması'],
    correctAnswer: 1,
    explanation: 'Denizin doldurularak havalimanı yapılması (örneğin Ordu-Giresun veya Rize-Artvin havalimanları) insanın doğayı değiştirmesidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t1-q4',
    topicId: 'cog-u1-t1',
    type: 'true_false',
    questionText: 'Fiziki coğrafyanın yeryüzü şekillerini inceleyen alt dalına "Jeomorfoloji" denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Jeomorfoloji yer şekillerinin oluşumunu ve gelişimini inceler; Klimatoloji ise iklimleri inceler.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t1-q5',
    topicId: 'cog-u1-t1',
    type: 'multiple_choice',
    questionText: 'Suların (okyanus, deniz, göl, akarsu ve yeraltı suları) özelliklerini ve dağılışını inceleyen fiziki coğrafya alt dalı hangisidir?',
    options: ['Hidrografya', 'Biyocoğrafya', 'Kartografya', 'Klimatoloji'],
    correctAnswer: 0,
    explanation: 'Hidrografya su coğrafyasıdır; Kartografya harita bilimidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t1-q6',
    topicId: 'cog-u1-t1',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi beşerî coğrafyanın inceleme alanlarından biri değildir?',
    options: ['Nüfus Coğrafyası', 'Yerleşme Coğrafyası', 'Jeoloji ve Kayaçlar', 'Tarım Coğrafyası'],
    correctAnswer: 2,
    explanation: 'Jeoloji ve kayaçlar fiziki coğrafyanın (litosfer) konusudur, beşerî coğrafya insan faaliyetlerini ele alır.',
    difficulty: 1,
    xpValue: 10,
  },

  // cog-u1-t2: Dünya'nın Şekli ve Hareketleri (6 questions)
  {
    id: 'cog-u1-t2-q1',
    topicId: 'cog-u1-t2',
    type: 'multiple_choice',
    questionText: 'Dünya\'nın kutuplardan basık, Ekvator\'dan şişkin olan kendine özgü geometrik şekline ne ad verilir?',
    options: ['Küre', 'Geoit', 'Elips', 'Piramit'],
    correctAnswer: 1,
    explanation: 'Kendi ekseni etrafında dönüşünden kaynaklanan merkezkaç kuvvetiyle oluşan bu özel şekle geoit denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t2-q2',
    topicId: 'cog-u1-t2',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi Dünya\'nın küresel şeklinin (enlem etkisinin) doğrudan bir sonucudur?',
    options: ['Ekvator\'dan kutuplara gidildikçe Güneş ışınlarının geliş açısının küçülmesi', 'Gece ve gündüzün birbirini ardalaması', 'Yerel saat farklarının oluşması', 'Mevsimlerin meydana gelmesi'],
    correctAnswer: 0,
    explanation: 'Küresel şekil nedeniyle Ekvator ışınları dik ve dike yakın alır, kutuplara doğru ışınların geliş açısı daralır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'cog-u1-t2-q3',
    topicId: 'cog-u1-t2',
    type: 'true_false',
    questionText: 'Yer çekimi kutuplarda Ekvator\'a göre daha fazladır çünkü kutuplar yerin merkezine daha yakındır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Geoidin sonucunda kutup yarıçapı (6357 km), Ekvator yarıçapından (6378 km) daha kısadır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'cog-u1-t2-q4',
    topicId: 'cog-u1-t2',
    type: 'multiple_choice',
    questionText: '21 Haziran tarihinde Güneş ışınları öğle vakti hangi enleme 90° dik açıyla düşer?',
    options: ['Ekvator', 'Yengeç Dönencesi (23° 27\' K)', 'Oğlak Dönencesi (23° 27\' G)', 'Kutup Dairesi'],
    correctAnswer: 1,
    explanation: '21 Haziran\'da Kuzey Yarım Küre\'de yaz başlangıcıdır ve ışınlar Yengeç Dönencesi\'ne dik gelir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t2-q5',
    topicId: 'cog-u1-t2',
    type: 'true_false',
    questionText: 'Ekinoks tarihlerinde (21 Mart ve 23 Eylül) tüm dünyada gece ve gündüz süreleri eşit (12\'şer saat) olur.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Güneş ışınları Ekvator\'a dik geldiği ve aydınlanma çemberi kutup noktalarından geçtiği için ekinoks gerçekleşir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t2-q6',
    topicId: 'cog-u1-t2',
    type: 'multiple_choice',
    questionText: 'Mevsimlerin oluşmasının ve yıl içinde gece-gündüz uzunluklarının değişmesinin temel nedeni nedir?',
    options: ['Dünya\'nın kendi ekseni etrafında dönmesi', 'Eksen eğikliği (23° 27\') ve Güneş etrafındaki yıllık hareket', 'Dünya\'nın Güneş\'e olan mesafesinin değişmesi', 'Ay\'ın çekim kuvveti'],
    correctAnswer: 1,
    explanation: 'Yörünge düzlemi ile Ekvator düzlemi arasındaki 23° 27\'lik açı ve yıllık hareket mevsimleri oluşturur.',
    difficulty: 2,
    xpValue: 15,
  },

  // cog-u1-t3: Coğrafi Koordinatlar (6 questions)
  {
    id: 'cog-u1-t3-q1',
    topicId: 'cog-u1-t3',
    type: 'multiple_choice',
    questionText: 'Ardışık iki meridyen arasındaki yerel saat farkı kaç dakikadır?',
    options: ['2 dakika', '4 dakika', '15 dakika', '60 dakika'],
    correctAnswer: 1,
    explanation: 'Dünya 360 meridyeni 24 saatte (1440 dakika) döndüğü için iki meridyen arası zaman farkı daima 4 dakikadır (1440/360=4).',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t3-q2',
    topicId: 'cog-u1-t3',
    type: 'multiple_choice',
    questionText: 'Türkiye hangi paralel ve meridyen dereceleri arasında yer alır?',
    options: ['36°-42° Kuzey paralelleri, 26°-45° Doğu meridyenleri', '26°-45° Kuzey paralelleri, 36°-42° Doğu meridyenleri', '30°-40° Güney paralelleri, 20°-35° Batı meridyenleri', '10°-20° Kuzey paralelleri, 40°-50° Doğu meridyenleri'],
    correctAnswer: 0,
    explanation: 'Türkiye 36°-42° Kuzey enlemleri ile 26°-45° Doğu boylamları arasında yer alan bir Orta Kuşak ülkesidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t3-q3',
    topicId: 'cog-u1-t3',
    type: 'true_false',
    questionText: 'Paralellerin çevre uzunlukları Ekvator\'dan kutuplara doğru gidildikçe küçülür ve kutuplarda nokta halini alır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Dünya\'nın küresel şekli nedeniyle paralel dairelerinin çapı kutuplara doğru daralır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t3-q4',
    topicId: 'cog-u1-t3',
    type: 'multiple_choice',
    questionText: '30° Doğu meridyeninde yerel saat 12.00 iken, 45° Doğu meridyeninde yerel saat kaçtır?',
    options: ['11.00', '12.15', '13.00', '14.00'],
    correctAnswer: 2,
    explanation: 'Boylam farkı = 45 - 30 = 15 meridyen. Zaman farkı = 15 * 4 = 60 dakika = 1 saat. Doğu daha ileri olduğu için 12.00 + 1.00 = 13.00 olur.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'cog-u1-t3-q5',
    topicId: 'cog-u1-t3',
    type: 'true_false',
    questionText: 'Ardışık iki paralel dairesi arasındaki kuş uçumu mesafe dünyanın her yerinde yaklaşık 111 km\'dir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Paraleller birbirine paralel olduğu için aralarındaki mesafe sabittir ve 111 km dir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t3-q6',
    topicId: 'cog-u1-t3',
    type: 'multiple_choice',
    questionText: 'Başlangıç meridyeni (0°) nereden geçmektedir?',
    options: ['Paris', 'Londra (Greenwich)', 'Roma', 'İstanbul'],
    correctAnswer: 1,
    explanation: 'İngiltere\'nin başkenti Londra\'daki Greenwich Gözlemevi uluslararası kabulle 0° Başlangıç Meridyeni sayılmıştır.',
    difficulty: 1,
    xpValue: 10,
  },

  // cog-u1-t4: Harita Bilgisi ve İzohipsler (6 questions)
  {
    id: 'cog-u1-t4-q1',
    topicId: 'cog-u1-t4',
    type: 'multiple_choice',
    questionText: 'Bir çizimin "harita" özelliği taşıyabilmesi için aşağıdakilerden hangisi zorunlu bir şarttır?',
    options: ['Renkli basılmış olması', 'Kuşbakışı görünüş ve belirli bir ölçeğe göre küçültülmüş olması', 'Yalnızca dağları göstermesi', 'Büyük boyutlu olması'],
    correctAnswer: 1,
    explanation: 'Harita: Kuşbakışı çizim, ölçek ve düzleme aktarım unsurlarını mutlaka taşımalıdır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t4-q2',
    topicId: 'cog-u1-t4',
    type: 'multiple_choice',
    questionText: 'İzohips (eş yükselti eğrileri) haritasında eğrilerin birbirine çok yaklaştığı (sıklaştığı) yerler hakkında ne söylenebilir?',
    options: ['Eğim fazladır ve akarsuyun akış hızı yüksektir.', 'Arazi düz bir ovadır.', 'Yükselti sıfırdır.', 'Göl alanı bulunur.'],
    correctAnswer: 0,
    explanation: 'İzohipslerin sıklaştığı yerlerde diklik (eğim) fazladır; uçurumlar ve şelaleler buralarda görülür.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'cog-u1-t4-q3',
    topicId: 'cog-u1-t4',
    type: 'true_false',
    questionText: 'Küresel yüzeyi düzleme aktarırken oluşan bozulmaları en aza indirmek için kullanılan matematiksel çizim yöntemlerine "projeksiyon" denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Silindirik, konik ve düzlem projeksiyonlar şekil ve alan bozulmalarını azaltmak için geliştirilmiştir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'cog-u1-t4-q4',
    topicId: 'cog-u1-t4',
    type: 'multiple_choice',
    questionText: 'Fiziki haritalarda 0 - 200 metre arasındaki alçak yükseltiler hangi renkle gösterilir?',
    options: ['Yeşil', 'Sarı', 'Kahverengi', 'Mavi'],
    correctAnswer: 0,
    explanation: 'Fiziki haritalarda renkler bitki örtüsünü değil yükselti basamaklarını gösterir; 0-500 m arası yeşil tonlarıdır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'cog-u1-t4-q5',
    topicId: 'cog-u1-t4',
    type: 'true_false',
    questionText: 'Büyük ölçekli haritaların ayrıntıyı gösterme gücü, küçük ölçekli haritalara göre daha fazladır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Büyük ölçekte payda küçüktür, küçültme oranı azdır, dolayısıyla ayrıntı daha nettir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'cog-u1-t4-q6',
    topicId: 'cog-u1-t4',
    type: 'multiple_choice',
    questionText: 'İzohips haritasında iç içe kapalı eğrilerin üzerinde ok işaretlerinin (◄) bulunması hangi yer şeklini ifade eder?',
    options: ['Vadi', 'Sırt', 'Kapalı çukur (Krater / Çanak)', 'Falez'],
    correctAnswer: 2,
    explanation: 'Ok işaretleri içeriye doğru yükseltinin azaldığı kapalı çukur (çanak veya krater) alanlarını gösterir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    "id": "cog-u2-t1-q1",
    "topicId": "cog-u2-t1",
    "type": "multiple_choice",
    "questionText": "Su buharının neredeyse tamamını (%99) bünyesinde barındıran ve bulut, yağmur, kar gibi hava olaylarının yalnızca gerçekleştiği atmosfer katmanı hangisidir?",
    "options": [
      "Stratosfer",
      "Troposfer",
      "Mezosfer",
      "Termosfer"
    ],
    "correctAnswer": 1,
    "explanation": "Troposfer yeryüzüne en yakın katmandır; su buharı burada bulunduğu için meteorolojik olaylar sadece troposferde yaşanır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u2-t1-q2",
    "topicId": "cog-u2-t1",
    "type": "multiple_choice",
    "questionText": "Troposferde yerden yükseldikçe sıcaklığın her 200 metrede yaklaşık 1 °C azalmasının temel nedeni nedir?",
    "options": [
      "Güneş'e yaklaşılması",
      "Atmosferin yerden yansıyan ışınlarla aşağıdan yukarıya doğru ısınması",
      "Rüzgâr hızının azalması",
      "Oksijen miktarının artması"
    ],
    "correctAnswer": 1,
    "explanation": "Güneş ışınları önce yeryüzünü ısıtır, atmosfer ise yerden yansıyan uzun dalgalı ışınlarla alttan ısınır; bu nedenle yükseldikçe sıcaklık düşer.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u2-t1-q3",
    "topicId": "cog-u2-t1",
    "type": "true_false",
    "questionText": "Stratosfer katmanında yer alan ozon (O₃) tabakası, Güneş'ten gelen zararlı ultraviyole (UV) ışınlarını emerek canlı yaşamını korur.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Ozonosfer (ozon tabakası) stratosferin üst kısmında yer alır ve doğal bir UV filtresidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u2-t1-q4",
    "topicId": "cog-u2-t1",
    "type": "multiple_choice",
    "questionText": "Kuzey Yarım Küre'de dağların güneye bakan yamaçlarının, kuzeye bakan yamaçlarına göre Güneş ışınlarını daha dik alarak daha sıcak olmasına ne ad verilir?",
    "options": [
      "Yükselti etkisi",
      "Bakı etkisi",
      "Karasallık",
      "Enlem farkı"
    ],
    "correctAnswer": 1,
    "explanation": "Bakı, dağ yamaçlarının Güneş'e dönük olma durumudur; Kuzey Yarım Küre'de güney yamaçlar daha çok ısınır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u2-t2-q1",
    "topicId": "cog-u2-t2",
    "type": "multiple_choice",
    "questionText": "Havanın yatay yöndeki hareketine rüzgâr denir. Rüzgârın esiş yönü daima hangi basınç merkezinden hangisine doğrudur?",
    "options": [
      "Alçak Basınçtan -> Yüksek Basınca",
      "Yüksek Basınçtan -> Alçak Basınca",
      "Sıcak bölgeden -> Soğuk bölgeye",
      "Denizden -> Dağa"
    ],
    "correctAnswer": 1,
    "explanation": "Rüzgâr, yüksek basınç alanlarındaki sıkışık havanın alçak basınç alanlarına doğru akmasıyla meydana gelir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u2-t2-q2",
    "topicId": "cog-u2-t2",
    "type": "multiple_choice",
    "questionText": "Kara ve denizlerin gün içinde farklı ısınma özelliklerine bağlı olarak ortaya çıkan, gündüz denizden karaya, gece karadan denize esen yerel rüzgâr hangisidir?",
    "options": [
      "Muson rüzgârları",
      "Meltem rüzgârları",
      "Alizeler",
      "Fön rüzgârı"
    ],
    "correctAnswer": 1,
    "explanation": "Meltemler günlük sıcaklık ve basınç farklarından doğan, iklim üzerinde kalıcı etkisi olmayan hafif yerel rüzgârlardır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u2-t2-q3",
    "topicId": "cog-u2-t2",
    "type": "true_false",
    "questionText": "Bir dağ yamacı boyunca yükselen nemli hava kütlesinin soğuyarak oluşturduğu yağışlara \"Yamaç (Orografik) yağışları\" denir ve Karadeniz kıyılarımızda yaygın görülür.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Rize ve Trabzon kıyılarındaki bol yağışlar Karadeniz üzerinden gelen nemli havanın Kaçkarlar boyunca yükselip yoğunlaşmasıyla (orografik) oluşur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u2-t2-q4",
    "topicId": "cog-u2-t2",
    "type": "multiple_choice",
    "questionText": "Farklı sıcaklık ve yoğunluktaki iki hava kütlesinin (sıcak ve soğuk hava) karşılaşma alanlarında oluşan yağış türü hangisidir?",
    "options": [
      "Konveksiyonel (Yükselim) yağış",
      "Cephesel (Frontal) yağış",
      "Orografik yağış",
      "Kırağı"
    ],
    "correctAnswer": 1,
    "explanation": "Orta kuşakta ve Türkiye'de kış aylarında görülen yağışların çoğu sıcak ve soğuk havanın çarpışması sonucu oluşan cephesel yağışlardır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u2-t3-q1",
    "topicId": "cog-u2-t3",
    "type": "multiple_choice",
    "questionText": "Her mevsimi sıcak ve bol yağışlı olan, yıllık sıcaklık farkının 2-3 °C'yi geçmediği, gür yağmur ormanları ve laterit topraklarla kaplı iklim türü hangisidir?",
    "options": [
      "Akdeniz iklimi",
      "Ekvatoral iklim",
      "Muson iklimi",
      "Tundra iklimi"
    ],
    "correctAnswer": 1,
    "explanation": "Amazon ve Kongo havzalarında görülen Ekvatoral iklimde güneş ışınları yıl boyu dike yakın açıyla gelir, konveksiyonel yağışlar etkilidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u2-t3-q2",
    "topicId": "cog-u2-t3",
    "type": "multiple_choice",
    "questionText": "Yazları sıcak ve kurak, kışları ılık ve yağışlı geçen, karakteristik bitki örtüsü zeytin, mersin, defne gibi bodur ağaççıklardan oluşan \"maki\" olan iklim hangisidir?",
    "options": [
      "Akdeniz iklimi",
      "Karasal iklim",
      "Okyanusal iklim",
      "Çöl iklimi"
    ],
    "correctAnswer": 0,
    "explanation": "Akdeniz iklimi Türkiye'nin güney ve batı kıyılarında, İtalya, İspanya ve Kaliforniya'da etkili olan ılıman kuşak iklimidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u2-t3-q3",
    "topicId": "cog-u2-t3",
    "type": "true_false",
    "questionText": "Güneydoğu Asya'da etkili olan Muson ikliminde yağışların neredeyse tamamı yaz mevsiminde denizden karaya esen yaz musonları nedeniyle düşer.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Yaz musonları Hint Okyanusu'ndan bol nem taşıyarak Hindistan ve Bangladeş'e dünyanın en yüksek yağışlarını bırakır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u2-t3-q4",
    "topicId": "cog-u2-t3",
    "type": "multiple_choice",
    "questionText": "Kutup altı kuşağında (Sibirya ve Kanada'nın kuzeyinde) görülen, toprağın yılın büyük bölümünde donmuş olduğu, yazın ise bataklığa dönüşüp yosun ve likenlerin yetiştiği iklim hangisidir?",
    "options": [
      "Sert Karasal iklim",
      "Tundra iklimi",
      "Step iklimi",
      "Çöl iklimi"
    ],
    "correctAnswer": 1,
    "explanation": "Tundra ikliminde sıcaklık yalnızca 2-3 ay 0 °C'nin üzerine çıkar; ağaç yetişmez, sadece tundra bitkileri görülür.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u3-t1-q1",
    "topicId": "cog-u3-t1",
    "type": "multiple_choice",
    "questionText": "İnsanlık tarihindeki ilk yerleşmelerin ve tarım medeniyetlerinin Mezopotamya (Fırat-Dicle), Mısır (Nil) ve Hindistan (İndus-Ganj) gibi bölgelerde kurulmasının en temel nedeni nedir?",
    "options": [
      "Maden rezervlerinin bolluğu",
      "Verimli tarım toprakları, ılıman iklim ve tatlı su kaynaklarının bulunması",
      "Deniz ticareti limanları olması",
      "Dağlık alanların savunmaya elverişli olması"
    ],
    "correctAnswer": 1,
    "explanation": "İlk insanlar yerleşik hayata geçerken su kaynaklarına yakın, sulanabilir verimli delta ve nehir vadilerini seçmişlerdir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u3-t1-q2",
    "topicId": "cog-u3-t1",
    "type": "multiple_choice",
    "questionText": "Arazinin engebeli, su kaynaklarının bol olduğu yerlerde evlerin birbirinden uzak ve tarlaların içine serpiştirildiği yerleşme dokusuna ne ad verilir?",
    "options": [
      "Toplu yerleşme",
      "Dağınık yerleşme",
      "Çizgisel yerleşme",
      "Dairesel yerleşme"
    ],
    "correctAnswer": 1,
    "explanation": "Dağınık yerleşmeler Karadeniz Bölgesi gibi arazinin parçalı ve suyun her yerde bulunduğu coğrafyalarda yaygındır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u3-t1-q3",
    "topicId": "cog-u3-t1",
    "type": "true_false",
    "questionText": "Su kaynaklarının kısıtlı ve arazinin düz olduğu bölgelerde (örneğin İç Anadolu) evler su kuyusu veya çeşme etrafında toplanarak \"toplu yerleşme\" dokusunu oluşturur.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Su azlığı ve düz arazi insanları suyun bulunduğu tek bir merkezde bir arada yaşamaya mecbur kılar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u3-t1-q4",
    "topicId": "cog-u3-t1",
    "type": "multiple_choice",
    "questionText": "Türkiye'de köyden küçük, idari olarak köye bağlı, geçici veya sürekli faaliyet gösteren yayla, kom, mezra, oba ve divan yerleşmelerine genel olarak ne ad verilir?",
    "options": [
      "Metropol yerleşmeler",
      "Köy altı yerleşmeleri",
      "Banliyöler",
      "Organize sanayi bölgeleri"
    ],
    "correctAnswer": 1,
    "explanation": "Köy altı yerleşmeleri tarım ve hayvancılık faaliyetleri için köy merkezinden uzakta kurulan küçük yerleşim birimleridir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u3-t2-q1",
    "topicId": "cog-u3-t2",
    "type": "multiple_choice",
    "questionText": "Türkiye'de nüfus ve yerleşmenin kıyı kuşaklarında (Marmara, Ege, Akdeniz kıyıları) yoğunlaşmasının temel nedeni nedir?",
    "options": [
      "Maden yataklarının sadece kıyılarda bulunması",
      "Ilıman iklim koşulları, verimli tarım ovaları, sanayi, ulaşım ve turizm olanakları",
      "İç kesimlerde ormanların çok sık olması",
      "Kıyılarda deprem riskinin bulunmaması"
    ],
    "correctAnswer": 1,
    "explanation": "Kıyı bölgeleri hem doğal çevre şartlarının elverişliliği hem de ekonomik ve ticari fırsatların fazlalığı sebebiyle yoğun göç almıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u3-t2-q2",
    "topicId": "cog-u3-t2",
    "type": "multiple_choice",
    "questionText": "Aşağıdaki alanlardan hangisi engebeli arazi, karstik kireç taşı yapısı ve tarım alanlarının darlığı nedeniyle Türkiye'de nüfusun en seyrek olduğu yerlerdendir?",
    "options": [
      "Çatalca-Kocaeli Yarımadası",
      "Çukurova",
      "Teke ve Taşeli Platoları",
      "Gediz Ovası"
    ],
    "correctAnswer": 2,
    "explanation": "Teke ve Taşeli platoları Akdeniz'de yer almasına rağmen karstik çorak topraklar ve engebe yüzünden çok tenhadır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u3-t2-q3",
    "topicId": "cog-u3-t2",
    "type": "true_false",
    "questionText": "Tuz Gölü çevresi ve Konya Kapalı Havzası düz bir arazi olmasına rağmen yıllık yağış miktarının yetersizliği ve şiddetli kuraklık sebebiyle seyrek nüfusludur.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Yağış azlığı ve su yetersizliği düz arazilere rağmen yerleşmeyi ve nüfus yoğunluğunu sınırlandırmıştır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u3-t2-q4",
    "topicId": "cog-u3-t2",
    "type": "multiple_choice",
    "questionText": "Hakkâri Yöresi ve Menteşe Yöresi'nin (Muğla çevresi) seyrek nüfuslu olmasında ortak rol oynayan temel doğal faktör hangisidir?",
    "options": [
      "Aşırı kuraklık",
      "Arazinin dağlık ve çok engebeli olması, ulaşım zorluğu",
      "Bitki örtüsünün çöl olması",
      "Toprakların tuzlu olması"
    ],
    "correctAnswer": 1,
    "explanation": "Her iki yörede de dağlık ve sarp arazi yapısı tarımı ve ulaşımı zorlaştırarak nüfusun seyrek kalmasına yol açmıştır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u4-t1-q1",
    "topicId": "cog-u4-t1",
    "type": "multiple_choice",
    "questionText": "Sahip oldukları doğal (fiziki) ve beşerî özellikler bakımından kendi içinde benzerlik gösteren, çevresinden ayrılan yeryüzü parçalarına ne ad verilir?",
    "options": [
      "Kıta",
      "Bölge",
      "Plato",
      "Havza"
    ],
    "correctAnswer": 1,
    "explanation": "Bölge, belirli kriterlere (iklim, bitki örtüsü, sanayi, nüfus) göre sınırlandırılmış yeryüzü alanıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u4-t1-q2",
    "topicId": "cog-u4-t1",
    "type": "multiple_choice",
    "questionText": "Aşağıdakilerden hangisi \"Doğal (Fiziki) Şekilsel Bölgeler\" sınıflandırmasına örnek gösterilemez?",
    "options": [
      "Amazon Yağmur Ormanları Bölgesi",
      "Himalaya Dağlık Bölgesi",
      "Marmara Sanayi ve Ticaret Bölgesi",
      "Büyük Sahra Çöl İklim Bölgesi"
    ],
    "correctAnswer": 2,
    "explanation": "Sanayi ve ticaret insan faaliyetine dayandığı için beşerî/ekonomik bir bölgedir; diğerleri doğaldır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u4-t1-q3",
    "topicId": "cog-u4-t1",
    "type": "true_false",
    "questionText": "Güneydoğu Anadolu Projesi (GAP) ve Doğu Karadeniz Projesi (DOKAP) gibi kalkınma amaçlı projeler \"İşlevsel Planlama (Proje) Bölgeleri\"ne örnektir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Ekonomik kalkınmayı sağlamak amacıyla devlet tarafından sınırları çizilen bölgelere işlevsel planlama bölgesi denir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u4-t1-q4",
    "topicId": "cog-u4-t1",
    "type": "multiple_choice",
    "questionText": "Devlet Su İşleri (DSİ), Karayolları Genel Müdürlüğü ve Orman Genel Müdürlüğü gibi kamu kurumlarının hizmetlerini yürütmek için oluşturduğu idari alanlar hangi bölge türüne girer?",
    "options": [
      "Doğal bölge",
      "İşlevsel Hizmet Bölgesi",
      "Kültür bölgesi",
      "Turizm bölgesi"
    ],
    "correctAnswer": 1,
    "explanation": "Belirli bir kamu hizmetinin ülke genelinde koordinasyonunu sağlayan şube ağlarına işlevsel hizmet bölgesi denir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u4-t2-q1",
    "topicId": "cog-u4-t2",
    "type": "multiple_choice",
    "questionText": "Bölge sınırlarının değişebilirliği ile ilgili aşağıdaki karşılaştırmalardan hangisi doğrudur?",
    "options": [
      "Doğal bölge sınırları beşerî bölge sınırlarına göre çok daha hızlı değişir.",
      "Beşerî ve ekonomik bölge sınırları, doğal bölge sınırlarına göre çok daha kısa sürede değişebilir.",
      "Hiçbir bölgenin sınırı zamanla değişemez.",
      "Siyasi bölge sınırları asla değişmez."
    ],
    "correctAnswer": 1,
    "explanation": "Dağ veya iklim gibi doğal sınırlar yüzbinlerce yılda değişirken, sanayi, tarım veya siyasi birlik (AB, NATO) sınırları birkaç yılda değişebilir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u4-t2-q2",
    "topicId": "cog-u4-t2",
    "type": "multiple_choice",
    "questionText": "Bir maden yatağının tükenmesi veya bir kentin sanayileşmesi durumunda o bölgenin özellikleri hakkında ne söylenebilir?",
    "options": [
      "Bölge işlevini kaybedebilir veya yeni bir ekonomik bölge türüne dönüşebilir.",
      "Doğal bölge haline gelir.",
      "Bölge haritadan silinir.",
      "İklimi tamamen değişir."
    ],
    "correctAnswer": 0,
    "explanation": "Beşerî bölgeler dinamiktir; maden bittiğinde maden bölgesi kimliğini kaybedebilir, tarım alanı sanayi bölgesine evrilebilir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u4-t2-q3",
    "topicId": "cog-u4-t2",
    "type": "true_false",
    "questionText": "Doğal bölgelerin sınırları genellikle kademeli geçiş gösterirken, siyasi ve idari bölgelerin sınırları kesin çizgilerle ayrılır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "İklim veya bitki örtüsü bir anda bıçakla kesilmiş gibi bitmez, aşamalı değişir; ancak il veya ülke sınırları kesin bir sınırdır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u4-t2-q4",
    "topicId": "cog-u4-t2",
    "type": "multiple_choice",
    "questionText": "Avrupa Birliği (AB) veya NATO gibi siyasi ve askeri bölgelerin sınırlarının genişlemesi veya daralması neye bağlıdır?",
    "options": [
      "Fay hatlarının hareketine",
      "Yeni ülkelerin üye olmasına veya ayrılmasına yönelik siyasi kararlara",
      "Buzulların erimesine",
      "Ekvatorun kaymasına"
    ],
    "correctAnswer": 1,
    "explanation": "Siyasi bölgeler üye devletlerin katılımı veya ayrılmasıyla (örneğin Brexit) doğrudan sınır değişikliğine uğrar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u5-t1-q1",
    "topicId": "cog-u5-t1",
    "type": "multiple_choice",
    "questionText": "İnsanoğlunun su ihtiyacını karşılamak, tarım arazilerini sulamak ve hidroelektrik enerji üretmek amacıyla akarsular üzerine kurduğu devasa yapılara ne ad verilir?",
    "options": [
      "Viyadük",
      "Baraj",
      "Tünel",
      "Mendirek"
    ],
    "correctAnswer": 1,
    "explanation": "Atatürk Barajı ve Keban Barajı gibi yapay göller insanın akarsu rejimini ve çevreyi değiştirdiği en büyük mühendislik örnekleridir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u5-t1-q2",
    "topicId": "cog-u5-t1",
    "type": "multiple_choice",
    "questionText": "Karadeniz Sahil Yolu, Ovit Tüneli ve Marmaray projeleri insanın doğaya müdahale ederek hangi alandaki engelleri aşma çabasına örnektir?",
    "options": [
      "Ulaşım ve erişilebilirlik",
      "Tarım üretimi",
      "Maden arama",
      "Orman yangınlarını söndürme"
    ],
    "correctAnswer": 0,
    "explanation": "Tüneller, köprüler ve viyadükler dağlık ve engebeli yeryüzü şekillerinin ulaşımdaki engelini ortadan kaldırmak için yapılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u5-t1-q3",
    "topicId": "cog-u5-t1",
    "type": "true_false",
    "questionText": "Denizin doldurulmasıyla inşa edilen Ordu-Giresun ve Rize-Artvin Havalimanları, insanın kıyı topoğrafyasını doğrudan değiştirmesine örnektir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Kıyı dolgu alanları kara ve kıyı çizgisini değiştirerek yeni kullanım alanları oluşturan beşerî müdahalelerdir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u5-t1-q4",
    "topicId": "cog-u5-t1",
    "type": "multiple_choice",
    "questionText": "Açık maden ocaklarının işletilmesi, ormanların tarım arazisine dönüştürülmesi gibi faaliyetlerin doğurabileceği en büyük çevre felaketi hangisidir?",
    "options": [
      "Depremlerin tamamen durması",
      "Toprak erozyonu, habitat kaybı ve ekosistemin bozulması",
      "Güneş ışınlarının açısının değişmesi",
      "Deniz suyunun tatlı suya dönüşmesi"
    ],
    "correctAnswer": 1,
    "explanation": "Ağaç örtüsünün tahrip edilmesi verimli üst toprağın rüzgâr ve yağmurla süpürülmesine (erozyon) ve canlı türlerinin yok olmasına neden olur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "cog-u5-t2-q1",
    "topicId": "cog-u5-t2",
    "type": "multiple_choice",
    "questionText": "Türkiye'nin jeolojik olarak genç oluşumlu bir ülke olması ve aktif fay hatları (KAF, DAF, BAF) üzerinde yer alması en çok hangi doğal afetin yaşanmasına yol açar?",
    "options": [
      "Tropikal fırtına (Kasırga)",
      "Deprem (Seizma)",
      "Tsunami",
      "Buzul erimesi"
    ],
    "correctAnswer": 1,
    "explanation": "Türkiye Alp-Himalaya deprem kuşağında yer alır ve can/mal kaybına en çok neden olan afet yıkıcı depremlerdir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u5-t2-q2",
    "topicId": "cog-u5-t2",
    "type": "multiple_choice",
    "questionText": "Eğimin fazla olduğu, killi toprak yapısına sahip ve aşırı yağış alan yamaçlarda toprağın kütle halinde aşağıya kayması olayına ne ad verilir?",
    "options": [
      "Erozyon",
      "Heyelan (Toprak kayması)",
      "Çığ",
      "Sel"
    ],
    "correctAnswer": 1,
    "explanation": "Heyelan Karadeniz Bölgesi'nde özellikle ilkbaharda kar erimeleri ve sağanak yağışlarla sıkça meydana gelir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u5-t2-q3",
    "topicId": "cog-u5-t2",
    "type": "true_false",
    "questionText": "Erozyon ani bir afet olmayıp, bitki örtüsünün yok edilmesi sonucu toprağın su ve rüzgârla yavaş yavaş süpürülüp çölleşmeye yol açan sinsi bir afettir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Erozyonla her yıl milyonlarca ton verimli tarım toprağı denizlere ve baraj göllerine taşınarak kaybolmaktadır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "cog-u5-t2-q4",
    "topicId": "cog-u5-t2",
    "type": "multiple_choice",
    "questionText": "Deprem ve taşkın gibi doğal afetlerin yol açtığı zararları en aza indirmek için alınması gereken en etkili önlem hangisidir?",
    "options": [
      "Dere yataklarına ve fay hatları üzerine yüksek katlı binalar yapmak",
      "Zemin etüdü yapılmış sağlam zeminlere, deprem yönetmeliğine uygun dirençli binalar inşa etmek ve afet bilinci oluşturmak",
      "Afetleri tamamen kadere bırakıp hiçbir tedbir almamak",
      "Şehirleri tamamen boşaltmak"
    ],
    "correctAnswer": 1,
    "explanation": "Sağlam zemin seçimi, mühendislik standartlarına uyum ve toplumda afet bilinci kayıpları asgariye indirir.",
    "difficulty": 1,
    "xpValue": 10
  }
];
