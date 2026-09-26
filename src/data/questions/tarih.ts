import { Question } from '@/types';

export const tarihQuestions: Question[] = [
  // tar-u1-t1: Tarih Biliminin Konusu ve Yöntemi (6 questions)
  {
    id: 'tar-u1-t1-q1',
    topicId: 'tar-u1-t1',
    type: 'multiple_choice',
    questionText: 'Tarih araştırmalarında olayların geçtiği döneme ait olan ferman, kitabe, para ve mühür gibi belgeler hangi tür kaynaktır?',
    options: ['Birinci elden kaynaklar (Ana kaynak)', 'İkinci elden kaynaklar', 'Sözlü kaynaklar', 'Görsel kaynaklar'],
    correctAnswer: 0,
    explanation: 'Olayın geçtiği çağdan kalan doğrudan ve özgün belgelere birinci elden (ana) kaynak denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tarih-u1-t1-q2',
    topicId: 'tar-u1-t1',
    type: 'true_false',
    questionText: 'Tarih biliminde doğa bilimlerinde olduğu gibi deney ve gözlem yöntemi kullanılamaz.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Tarihi olaylar geçmişte yaşanmış, bitmiş ve tekrarlanamaz nitelikte olduğu için laboratuvar ortamında deneyi yapılamaz.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u1-t1-q3',
    topicId: 'tar-u1-t1',
    type: 'multiple_choice',
    questionText: 'Tarih biliminin araştırma yöntemindeki 5T kuralının sıralaması aşağıdakilerden hangisinde doğru verilmiştir?',
    options: ['Tarama - Tasnif - Tahlil - Tenkit - Terkip', 'Tasnif - Tarama - Tenkit - Tahlil - Terkip', 'Tarama - Tenkit - Tasnif - Tahlil - Terkip', 'Terkip - Tahlil - Tenkit - Tasnif - Tarama'],
    correctAnswer: 0,
    explanation: 'Araştırma sırası: 1. Kaynak Arama (Tarama), 2. Sınıflandırma (Tasnif), 3. Çözümleme (Tahlil), 4. Eleştiri (Tenkit), 5. Birleştirme (Terkip).',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tar-u1-t1-q4',
    topicId: 'tar-u1-t1',
    type: 'multiple_choice',
    questionText: 'Eski madeni paraları, sikkeleri inceleyerek tarihe yardımcı olan uzmanlık bilimi hangisidir?',
    options: ['Nümizmatik (Meskukat)', 'Epigrafi', 'Paleografya', 'Filoloji'],
    correctAnswer: 0,
    explanation: 'Nümizmatik sikkeleri inceler; Epigrafi kitabeleri, Paleografya eski yazıları, Filoloji ise dilleri inceler.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u1-t1-q5',
    topicId: 'tar-u1-t1',
    type: 'true_false',
    questionText: 'Tarih araştırmalarında tenkit (eleştiri) aşamasında kaynağın orijinalliği ve verilen bilgilerin güvenilirliği denetlenir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'İç ve dış tenkit ile belgenin doğruluğu, yazarı ve tarafsızlığı test edilir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tar-u1-t1-q6',
    topicId: 'tar-u1-t1',
    type: 'multiple_choice',
    questionText: 'Bir olayın tarih araştırmalarında değerlendirilirken günümüzün değer yargılarıyla değil, olayın yaşandığı dönemin şartlarına göre incelenmesi kuralına ne ad verilir?',
    options: ['Tarihsel empati (Anakronizmden kaçınma)', 'Determinizm', 'Tasnif', 'Dogmatizm'],
    correctAnswer: 0,
    explanation: 'Olayları kendi çağının koşullarıyla anlamaya tarihsel empati denir; günümüz gözlüğüyle geçmişi yargılama hatasına ise anakronizm denir.',
    difficulty: 2,
    xpValue: 15,
  },

  // tar-u1-t2: Takvimler (6 questions)
  {
    id: 'tar-u1-t2-q1',
    topicId: 'tar-u1-t2',
    type: 'multiple_choice',
    questionText: 'Güneş yılı esasına dayanan ilk takvimi hangi uygarlık icat etmiştir?',
    options: ['Sümerler', 'Mısırlılar', 'Babilliler', 'Yunanlılar'],
    correctAnswer: 1,
    explanation: 'Nil nehrinin taşma zamanlarını hesaplamak isteyen Mısırlılar Güneş yılı takvimini bulmuşlardır; Sümerler ise Ay yılı takvimini icat etmiştir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u1-t2-q2',
    topicId: 'tar-u1-t2',
    type: 'multiple_choice',
    questionText: 'Türklerin İslamiyet\'i kabul ettikten sonra kullanmaya başladıkları ve Hz. Muhammed\'in hicretini (622) başlangıç kabul eden takvim hangisidir?',
    options: ['Celali Takvim', 'Hicri Takvim', 'Rumi Takvim', 'Miladi Takvim'],
    correctAnswer: 1,
    explanation: 'Hicri takvim Ay yılını esas alır ve 1 yılı 354 gündür; başlangıcı 622 Hicret olayıdır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u1-t2-q3',
    topicId: 'tar-u1-t2',
    type: 'true_false',
    questionText: 'On İki Hayvanlı Türk Takvimi, Güneş yılı esasına dayanan ve her yılı bir hayvan adıyla anılan milli Türk takvimidir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'İslamiyet öncesinde Türklerin kullandığı bu takvimde aylar sayılarla, yıllar ise 12 hayvan adıyla adlandırılır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u1-t2-q4',
    topicId: 'tar-u1-t2',
    type: 'multiple_choice',
    questionText: 'Büyük Selçuklu Sultanı Melikşah adına Ömer Hayyam başkanlığındaki heyet tarafından mali işleri düzenlemek için hazırlanan takvim hangisidir?',
    options: ['Rumi Takvim', 'Celali Takvim', 'Hicri Takvim', 'Jülyen Takvim'],
    correctAnswer: 1,
    explanation: 'Melikşah\'ın lakabı "Celaleddin" olduğu için bu takvime Celali Takvim adı verilmiştir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tar-u1-t2-q5',
    topicId: 'tar-u1-t2',
    type: 'true_false',
    questionText: 'Rumi takvim, Osmanlı Devleti\'nde mali işlerdeki aksaklıkları gidermek amacıyla 19. yüzyılda yürürlüğe konulmuştur.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Güneş yılı esaslı Rumi takvim vergi toplama ve bütçe hesaplarında Hicri takvimin farklarını önlemek için kullanılmıştır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tar-u1-t2-q6',
    topicId: 'tar-u1-t2',
    type: 'multiple_choice',
    questionText: 'Türkiye Cumhuriyeti Miladi Takvimi resmi olarak hangi tarihten itibaren uygulamaya koymuştur?',
    options: ['29 Ekim 1923', '1 Ocak 1926', '1 Kasım 1928', '23 Nisan 1920'],
    correctAnswer: 1,
    explanation: '26 Aralık 1925 tarihinde kabul edilen kanunla 1 Ocak 1926\'dan itibaren Miladi takvim kullanılmaya başlanmıştır.',
    difficulty: 1,
    xpValue: 10,
  },

  // tar-u2-t1 to tar-u2-t2: İnsanlığın İlk Dönemleri (6 questions)
  {
    id: 'tar-u2-t1-q1',
    topicId: 'tar-u2-t1',
    type: 'multiple_choice',
    questionText: 'Tarihte ilk kez yazıyı (çivi yazısı) kullanarak Tarih Çağları\'nı başlatan Mezopotamya uygarlığı hangisidir?',
    options: ['Sümerler', 'Akadlar', 'Babilliler', 'Asurlar'],
    correctAnswer: 0,
    explanation: 'MÖ 3200 civarında ziggurat depolarındaki ürünleri kaydetmek için çivi yazısını icat eden Sümerler tarihi başlatmıştır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u2-t1-q2',
    topicId: 'tar-u2-t1',
    type: 'multiple_choice',
    questionText: 'Şanlıurfa yakınlarında bulunan ve insanlık tarihinin bilinen en eski anıtsal tapınak kompleksi sayılan arkeolojik merkez hangisidir?',
    options: ['Çatalhöyük', 'Göbeklitepe', 'Çayönü', 'Alişar'],
    correctAnswer: 1,
    explanation: 'MÖ 10.000\'e dayanan T biçimli dikilitaşlarıyla Göbeklitepe dünyanın en eski kült (inanç) merkezidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u2-t1-q3',
    topicId: 'tar-u2-t1',
    type: 'true_false',
    questionText: 'Diyarbakır Çayönü, Yakın Doğu\'daki ilk köy yerleşmelerinden biri olarak tarımsal üretime geçişin kanıtıdır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Çayönü ilk köy yerleşkesi, Konya Çatalhöyük ise ilk kentsel yerleşme örneğidir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tar-u2-t2-q1',
    topicId: 'tar-u2-t2',
    type: 'multiple_choice',
    questionText: 'Tarihte parayı ilk kez icat ederek takas (değiş-tokuş) usulüne son veren Anadolu uygarlığı hangisidir?',
    options: ['Hititler', 'Frigler', 'Lidyalılar', 'Urartular'],
    correctAnswer: 2,
    explanation: 'Sardes başkentli Lidyalılar MÖ 7. yüzyılda madeni parayı icat ederek Kral Yolu ticaretini canlandırmıştır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u2-t2-q2',
    topicId: 'tar-u2-t2',
    type: 'true_false',
    questionText: 'MÖ 1280 tarihli Kadeş Barış Antlaşması, Mısırlılar ile Hititler arasında imzalanan tarihin bilinen ilk yazılı antlaşmasıdır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Kuzey Suriye egemenliği için savaşan II. Ramses ile Hattuşili arasında imzalanmıştır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u2-t2-q3',
    topicId: 'tar-u2-t2',
    type: 'multiple_choice',
    questionText: 'Anadolu\'ya çivi yazısını getirerek Anadolu\'da Tarih Çağları\'nı başlatan Mezopotamya kolonici uygarlığı hangisidir?',
    options: ['Asurlar', 'Babiller', 'Fenikeliler', 'Elamlar'],
    correctAnswer: 0,
    explanation: 'Kültepe (Kaniş) tabletleri Asurlu tüccarların Anadolu\'ya yazıyı taşıdığını kanıtlar.',
    difficulty: 2,
    xpValue: 15,
  },

  // tar-u4-t2: İlk Türk Devletleri (6 questions)
  {
    id: 'tar-u4-t2-q1',
    topicId: 'tar-u4-t2',
    type: 'multiple_choice',
    questionText: 'Tarihte bilinen ilk teşkilatlı Türk devleti ve ilk hükümdarı aşağıdakilerden hangisidir?',
    options: ['Asya Hun Devleti - Teoman', 'Kök Türk Devleti - Bumin Kağan', 'Uygur Devleti - Kutluk Bilge Kül Kağan', 'Avar Devleti - Bayan Han'],
    correctAnswer: 0,
    explanation: 'Tarihte bilinen ilk Türk devleti Asya Hun Devleti, bilinen ilk hükümdarı ise Teoman\'dır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u4-t2-q2',
    topicId: 'tar-u4-t2',
    type: 'multiple_choice',
    questionText: 'Türk ordusunun temeli sayılan "onlu teşkilat" sistemini kuran Asya Hun hükümdarı kimdir?',
    options: ['Mete Han', 'Bumin Kağan', 'İstemi Yabgu', 'Attila'],
    correctAnswer: 0,
    explanation: 'Mete Han\'ın tahta çıkış tarihi (MÖ 209), Türk Kara Kuvvetleri\'nin kuruluş yılı olarak kabul edilir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u4-t2-q3',
    topicId: 'tar-u4-t2',
    type: 'true_false',
    questionText: 'Orhun Yazıtları (Kök Türk Kitabeleri), Türk adının geçtiği ve Türkçenin ilk yazılı edebi belgeleridir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Bilge Kağan, Kül Tigin ve Tonyukuk adına dikilen Orhun Abideleri Türk tarihinin ilk yazılı kaynaklarıdır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u4-t2-q4',
    topicId: 'tar-u4-t2',
    type: 'multiple_choice',
    questionText: 'Maniheizm dinini kabul ederek yerleşik hayata geçen, saraylar ve tapınaklar inşa eden ilk Türk devleti hangisidir?',
    options: ['Uygurlar', 'Kök Türkler', 'Hazarlar', 'Kıpçaklar'],
    correctAnswer: 0,
    explanation: 'Bögü Kağan döneminde Maniheizmi benimseyen Uygurlar tarıma başlamış ve şehircilik kültürünü geliştirmiştir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u4-t2-q5',
    topicId: 'tar-u4-t2',
    type: 'true_false',
    questionText: 'Türklerde devleti yönetme yetkisinin hükümdara Gök Tengri tarafından verildiği inancına "Kut" denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Kut anlayışı gereği kan kutsal sayılmış ve hanedanın tüm erkek üyeleri taht hakkına sahip olmuştur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tar-u4-t2-q6',
    topicId: 'tar-u4-t2',
    type: 'multiple_choice',
    questionText: 'Kök Türkler döneminde devletin doğu kanadını kağan yönetirken, batı kanadını "yabgu" unvanıyla kim yönetmiştir?',
    options: ['İstemi Yabgu', 'Tonyukuk', 'Mukan Kağan', 'Kürşad'],
    correctAnswer: 0,
    explanation: 'Bumin Kağan doğuyu yönetirken, kardeşi İstemi Yabgu batı kanadını başarıyla sevk ve idare etmiştir (İkili Teşkilat).',
    difficulty: 2,
    xpValue: 15,
  },
  {
    "id": "tar-u1-t3-q1",
    "topicId": "tar-u1-t3",
    "type": "multiple_choice",
    "questionText": "Tarihi olayları efsanelerle karışık, neden-sonuç ilişkisi kurmadan sadece rivayetlere dayanarak anlatan, öncülüğünü Heredot'un yaptığı tarih yazıcılığı türü hangisidir?",
    "options": [
      "Hikâyeci (Rivayetçi) tarih",
      "Öğretici (Pragmatik) tarih",
      "Kronik tarih",
      "Araştırmacı (Bilimsel) tarih"
    ],
    "correctAnswer": 0,
    "explanation": "Heredot'un \"Historia\" eseriyle temsil edilen hikâyeci tarih, olayları kulaktan kulağa aktarılan rivayetlerle hikâyeleştirir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u1-t3-q2",
    "topicId": "tar-u1-t3",
    "type": "multiple_choice",
    "questionText": "Topluma ahlaki ders vermek, milli bilinci güçlendirmek ve kahramanları örnek göstermek amacıyla yazılan, Thukydides'in öncüsü olduğu tarih türü hangisidir?",
    "options": [
      "Sosyal tarih",
      "Öğretici (Pragmatik) tarih",
      "Bilimsel tarih",
      "Rivayetçi tarih"
    ],
    "correctAnswer": 1,
    "explanation": "Öğretici tarihin amacı okuyucuya ders vermek, vatanseverlik ve erdem aşılamaktır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u1-t3-q3",
    "topicId": "tar-u1-t3",
    "type": "true_false",
    "questionText": "Hitit krallarının tanrılarına hesap vermek amacıyla zaferleri kadar yenilgilerini de dürüstçe kaydettikleri \"Anallar\" (yıllıklar), objektif tarih yazıcılığının ilk örnekleridir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Hitit Analları tanrı korkusuyla yazıldığı için tarafsız ve objektif tarihi belgelerdir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u1-t3-q4",
    "topicId": "tar-u1-t3",
    "type": "multiple_choice",
    "questionText": "Olayların neden-sonuç ilişkilerini belgeler ışığında, dönemin şartlarını gözeterek tarafsızca inceleyen günümüz modern tarih yaklaşımı hangisidir?",
    "options": [
      "Hikâyeci tarih",
      "Araştırmacı (Neden-Nasılcı) tarih",
      "Kronik tarih",
      "Destansı tarih"
    ],
    "correctAnswer": 1,
    "explanation": "Araştırmacı tarih bilimsel yöntem basamaklarını (kaynak tarama, tenkit, tahlil) kullanarak nesnel bilgi üretir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u2-t3-q1",
    "topicId": "tar-u2-t3",
    "type": "multiple_choice",
    "questionText": "Tarihte bilinen ilk yazılı kanunları hazırlayarak mülkiyet ve vatandaş haklarını koruma altına alan Sümer kralı kimdir?",
    "options": [
      "Hammurabi",
      "Urukagina",
      "Sargon",
      "Nemrut"
    ],
    "correctAnswer": 1,
    "explanation": "Sümer Lagaş Kralı Urukagina (MÖ 2375), tarihin ilk yazılı kanunlarını yaparak hukuk devletinin temelini atmıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u2-t3-q2",
    "topicId": "tar-u2-t3",
    "type": "multiple_choice",
    "questionText": "\"Göze göz, dişe diş\" ilkesine dayanan son derece sert kısas cezalarıyla bilinen ünlü Babil kanunları hangi hükümdara aittir?",
    "options": [
      "Hammurabi",
      "Nabukadnezar",
      "Gılgamış",
      "Asurbanipal"
    ],
    "correctAnswer": 0,
    "explanation": "Babil Kralı Hammurabi Kanunları katı kısas hükümleri ve devlet otoritesini tanrısal buyruklara dayandırmasıyla ünlüdür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u2-t3-q3",
    "topicId": "tar-u2-t3",
    "type": "true_false",
    "questionText": "Anadolu uygarlıklarından Hititler, aile ve medeni hukuka büyük önem vermiş, kadınlara boşanma ve miras hakkı tanımış, ölüm cezaları yerine tazminat esasını getirmişlerdir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Hitit hukuku Mezopotamya'ya göre çok daha insancıl ve modern medeni kanunlara yakındır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u2-t3-q4",
    "topicId": "tar-u2-t3",
    "type": "multiple_choice",
    "questionText": "İlk Çağ'da parayı icat eden ve Efes'ten Mezopotamya'daki Sus şehrine uzanan ünlü Kral Yolu üzerinde ticaret yaparak zenginleşen Anadolu uygarlığı hangisidir?",
    "options": [
      "Urartular",
      "Frigler",
      "Lidyalılar",
      "İyonyalılar"
    ],
    "correctAnswer": 2,
    "explanation": "Lidyalılar madeni parayı icat ederek takas usulüne son vermiş ve Kral Yolu ticaretine egemen olmuştur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u3-t1-q1",
    "topicId": "tar-u3-t1",
    "type": "multiple_choice",
    "questionText": "375 yılında Hun Türklerinin batıya doğru ilerlemesiyle başlayan ve Roma İmparatorluğu'nun ikiye ayrılmasına yol açan büyük tarihi olay hangisidir?",
    "options": [
      "Haçlı Seferleri",
      "Kavimler Göçü",
      "Yüzyıl Savaşları",
      "Rönesans"
    ],
    "correctAnswer": 1,
    "explanation": "Kavimler Göçü ile Avrupa'nın etnik yapısı değişmiş, Batı Roma 476'da yıkılmış ve Orta Çağ başlamıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u3-t1-q2",
    "topicId": "tar-u3-t1",
    "type": "multiple_choice",
    "questionText": "Orta Çağ Avrupası'nda merkezi krallıkların zayıflamasıyla ortaya çıkan, toprağa dayalı, şatolarda yaşayan senyörlerin egemen olduğu siyasi sisteme ne ad verilir?",
    "options": [
      "Feodalizm (Derebeylik)",
      "Mutlakiyet",
      "Cumhuriyet",
      "Oligarşi"
    ],
    "correctAnswer": 0,
    "explanation": "Feodalizmde toprak sahibi senyörler süzeren (koruyan), köylüler ise serf (toprağa bağımlı köle) statüsündedir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u3-t1-q3",
    "topicId": "tar-u3-t1",
    "type": "true_false",
    "questionText": "Orta Çağ Avrupası'nda Katolik Kilisesi'nin denetiminde olan, sorgulanamayan ve dogmatik düşünce sistemine \"Skolastik düşünce\" denir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Skolastik düşünce bilimi ve özgür düşünceyi kilise dogmalarıyla baskı altına almıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u3-t1-q4",
    "topicId": "tar-u3-t1",
    "type": "multiple_choice",
    "questionText": "Feodal sistemde senyörün koruması altına giren vassallar ile senyör arasındaki ilişkiyi resmileştiren bağlılık andına ne ad verilir?",
    "options": [
      "Homenaj (Homage)",
      "Engizisyon",
      "Aforoz",
      "Endüljans"
    ],
    "correctAnswer": 0,
    "explanation": "Homenaj töreniyle vassal senyörüne sadakat yemini eder, senyör de ona toprak işletme hakkı tanırdı.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u3-t2-q1",
    "topicId": "tar-u3-t2",
    "type": "multiple_choice",
    "questionText": "Çin'in Şian kentinden başlayıp Orta Asya ve İran üzerinden Anadolu ve Avrupa'ya ulaşan dünyaca ünlü tarihi ticaret yolu hangisidir?",
    "options": [
      "Baharat Yolu",
      "İpek Yolu",
      "Kral Yolu",
      "Kürk Yolu"
    ],
    "correctAnswer": 1,
    "explanation": "İpek Yolu sadece ticari malların değil, kağıt, matbaa ve kültürün de Doğu'dan Batı'ya taşınmasını sağlamıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u3-t2-q2",
    "topicId": "tar-u3-t2",
    "type": "multiple_choice",
    "questionText": "Hindistan'dan başlayarak deniz yoluyla Basra Körfezi ve Kızıldeniz üzerinden Akdeniz limanlarına ulaşan ticaret yolu hangisidir?",
    "options": [
      "Baharat Yolu",
      "İpek Yolu",
      "Kehribar Yolu",
      "Tuz Yolu"
    ],
    "correctAnswer": 0,
    "explanation": "Baharat Yolu Hindistan ve Uzak Doğu'nun değerli baharat, zencefil ve tarçınını Avrupa pazarlarına ulaştırırdı.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u3-t2-q3",
    "topicId": "tar-u3-t2",
    "type": "true_false",
    "questionText": "Kervansaraylar, ticaret kervanlarının konaklaması, güvenliğinin sağlanması ve tüccarların ücretsiz ihtiyaçlarının karşılanması amacıyla ana ticaret yolları üzerine inşa edilmiştir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Kervansaraylar ticaretin canlanması ve kervan emniyeti için ilk sigortacılık örneklerini barındıran kurumlardır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u3-t2-q4",
    "topicId": "tar-u3-t2",
    "type": "multiple_choice",
    "questionText": "Orta Çağ şehirlerinde aynı meslekten esnaf ve zanaatkârların bir araya gelerek kurduğu, üretim kalitesini ve fiyatları denetleyen meslek örgütüne ne ad verilir?",
    "options": [
      "Lonca teşkilatı",
      "Senyörlük",
      "Süzerenlik",
      "Kervan"
    ],
    "correctAnswer": 0,
    "explanation": "Loncalar (İslam dünyasında Ahilik benzeri) haksız rekabeti önler, çırak-kalfa-usta hiyerarşisiyle mesleki eğitim verirdi.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u3-t3-q1",
    "topicId": "tar-u3-t3",
    "type": "multiple_choice",
    "questionText": "Doğu Roma (Bizans) İmparatoru Justinianus tarafından hazırlanan ve modern Avrupa medeni hukukunun temel taşı sayılan kanunlar hangisidir?",
    "options": [
      "12 Levha Kanunları",
      "Justinianus Kanunları (Corpus Iuris Civilis)",
      "Hammurabi Kanunları",
      "Urkagina Kanunları"
    ],
    "correctAnswer": 1,
    "explanation": "Justinianus Kanunları Roma hukukunu sistemleştirerek kamu ve özel hukuk ayrımını netleştirmiştir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u3-t3-q2",
    "topicId": "tar-u3-t3",
    "type": "multiple_choice",
    "questionText": "Roma Cumhuriyeti döneminde patriciler (soylular) ile plepler (halk) arasındaki sınıf çatışmasını önlemek amacıyla tunç levhalara kazınan kanunlar hangisidir?",
    "options": [
      "12 Levha Kanunları",
      "Cengiz Yasası",
      "Mete Han Yasaları",
      "Solon Yasaları"
    ],
    "correctAnswer": 0,
    "explanation": "12 Levha Kanunları Roma hukukunun başlangıcı olup halkın haklarını koruma altına almıştır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u3-t3-q3",
    "topicId": "tar-u3-t3",
    "type": "true_false",
    "questionText": "Moğol İmparatoru Cengiz Han'ın Türk-Moğol töresini yazılı hale getirerek oluşturduğu \"Büyük Yasa\" (Yasanâme-i Büzürg), çok sert cezalara sahipti.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Cengiz Yasası ordu disiplini, kamu düzeni ve hırsızlığa karşı ölümle cezalandırılan kesin kurallar getirmiştir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u3-t3-q4",
    "topicId": "tar-u3-t3",
    "type": "multiple_choice",
    "questionText": "Orta Çağ Avrupa hukukunda suçlunun suçlu olup olmadığını anlamak için ateşte yürütülmesi veya suya atılması şeklindeki akıl dışı yargılama usulüne ne ad verilirdi?",
    "options": [
      "Ordal (Tanrısal Yargı)",
      "Temyiz",
      "Duruşma",
      "Tahkim"
    ],
    "correctAnswer": 0,
    "explanation": "Ordal usulünde kilise baskısıyla sanığın ateşte yanmaması tanrısal bir mucizeye bağlanırdı.",
    "difficulty": 3,
    "xpValue": 20
  },
  {
    "id": "tar-u4-t1-q1",
    "topicId": "tar-u4-t1",
    "type": "multiple_choice",
    "questionText": "Türklerin ilk tarih sahnesine çıktığı anayurt neresidir?",
    "options": [
      "Orta Asya (İç Asya)",
      "Mezopotamya",
      "Balkanlar",
      "Kuzey Afrika"
    ],
    "correctAnswer": 0,
    "explanation": "Türklerin anayurdu Altay ve Tanrı dağları, Baykal gölü ve Hazar denizi arasındaki Orta Asya bozkırlarıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u4-t1-q2",
    "topicId": "tar-u4-t1",
    "type": "multiple_choice",
    "questionText": "Aşağıdakilerden hangisi Türklerin Orta Asya'dan diğer bölgelere göç etmesinin coğrafi ve ekonomik nedenlerinden biridir?",
    "options": [
      "Şiddetli kuraklık, otlakların yetersizliği ve hayvan hastalıkları",
      "Avrupa'nın daveti",
      "Deniz ticaretini geliştirmek istemeleri",
      "Yerleşik hayata geçme arzusu"
    ],
    "correctAnswer": 0,
    "explanation": "İklim şartlarının ağırlaşması, kuraklık ve hayvanlar için otlakların tükenmesi göçlerin temel ekonomik sebebidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u4-t1-q3",
    "topicId": "tar-u4-t1",
    "type": "true_false",
    "questionText": "Türklerin atı evcilleştirmeleri ve tekerlekli çadır arabaları (koşum) kullanmaları, göçleri hızlandıran en önemli unsurlar olmuştur.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Bozkır kültürünün iki büyük unsuru olan at ve araba Türklere muazzam bir hareket kabiliyeti kazandırmıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u4-t1-q4",
    "topicId": "tar-u4-t1",
    "type": "multiple_choice",
    "questionText": "Türklerin başka bir devletin esareti altına girmektense bağımsız yaşamak amacıyla yurtlarını terk etmeleri hangi milli karaktere dayanır?",
    "options": [
      "Bağımsızlık (İstiklal) tutkusu",
      "Korumacılık",
      "Kadercilik",
      "Gelenekçilik"
    ],
    "correctAnswer": 0,
    "explanation": "Türkler Çin veya başka yabancı boyların boyunduruğu altına girmeyi reddederek istiklalleri uğruna göç etmeyi seçmişlerdir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u4-t3-q1",
    "topicId": "tar-u4-t3",
    "type": "multiple_choice",
    "questionText": "İlk Türk devletlerinde hükümdara devleti yönetme yetkisinin Gök Tengri tarafından verildiğine inanılan kut anlayışı taht kavgalarını nasıl etkilemiştir?",
    "options": [
      "Hanedanın tüm erkek üyeleri taht hakkına sahip olduğu için taht kavgalarına ve devletlerin çabuk yıkılmasına yol açmıştır.",
      "Taht kavgalarını tamamen önlemiştir.",
      "Yalnızca ilk oğlun hükümdar olmasını sağlamıştır.",
      "Kadınların tahta geçmesini zorunlu kılmıştır."
    ],
    "correctAnswer": 0,
    "explanation": "Kut kan yoluyla tüm hanedana geçtiği kabul edildiğinden (\"ülke hanedanın ortak malıdır\") sık sık taht kavgaları çıkmıştır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u4-t3-q2",
    "topicId": "tar-u4-t3",
    "type": "multiple_choice",
    "questionText": "İlk Türk devletlerinde devlet işlerinin görüşülüp karara bağlandığı meclise ne ad verilirdi?",
    "options": [
      "Kurultay (Toy / Kengeş)",
      "Divan-ı Hümayun",
      "Pankuş",
      "Senato"
    ],
    "correctAnswer": 0,
    "explanation": "Kurultay boy beyleri, Hatun ve Kağan'ın katıldığı siyasi, askeri ve ekonomik danışma meclisidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u4-t3-q3",
    "topicId": "tar-u4-t3",
    "type": "true_false",
    "questionText": "Eski Türklerde yazısız hukuk kurallarına \"Töre\" denirdi ve Kağan dahi töre hükümlerine aykırı davranamazdı.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Töre adaletin, eşitliğin ve nizamın güvencesiydi; hükümdarın yetkileri töre ile sınırlandırılmıştı.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u4-t3-q4",
    "topicId": "tar-u4-t3",
    "type": "multiple_choice",
    "questionText": "Türk ordusunun savaşlarda sahte geri çekilme ve pusu kurma esasına dayanan ünlü taktiğine ne ad verilir?",
    "options": [
      "Turan Taktiği (Hilal / Kurt Kapanı)",
      "Meydan Savaşı",
      "Mancınık Saldırısı",
      "Yıldırım Harbi"
    ],
    "correctAnswer": 0,
    "explanation": "Turan taktiğinde atlı birlikler kaçıyor gibi yaparak düşmanı pusu kurulan alana çeker ve çembere alırdı.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t1-q1",
    "topicId": "tar-u5-t1",
    "type": "multiple_choice",
    "questionText": "İslamiyet öncesi Arap Yarımadası'nda putperestliğin, kabileciliğin, kan davalarının ve kadın haklarının yok sayıldığı döneme ne ad verilir?",
    "options": [
      "Cahiliye Dönemi",
      "Asr-ı Saadet",
      "Dört Halife Dönemi",
      "Fetret Dönemi"
    ],
    "correctAnswer": 0,
    "explanation": "Cahiliye Dönemi ahlaki yozlaşma, kız çocuklarının diri diri gömülmesi ve putperestlikle anılan karanlık dönemdir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t1-q2",
    "topicId": "tar-u5-t1",
    "type": "multiple_choice",
    "questionText": "Müslümanların Mekkeli müşriklerin baskıları sonucu 622 yılında Medine'ye göç etmeleri olayı (Hicret) hangi tarihi gelişmenin başlangıcı olmuştur?",
    "options": [
      "Hicri takvimin başlangıcı ve Medine İslam Devleti'nin kuruluşu",
      "Endülüs fethi",
      "Dört Halife döneminin sonu",
      "Malazgirt Zaferi"
    ],
    "correctAnswer": 0,
    "explanation": "Hicret ile İslam devleti kurulmuş, Medine Sözleşmesi imzalanmış ve Hz. Ömer döneminde Hicri takvimin miladı kabul edilmiştir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t1-q3",
    "topicId": "tar-u5-t1",
    "type": "true_false",
    "questionText": "Müslümanlar ile Mekkeli müşrikler arasındaki ilk büyük askeri zafer 624 yılındaki Bedir Savaşı'dır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Bedir Savaşı Müslümanların ilk askeri zaferidir ve İslam savaş hukuku burada şekillenmiştir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t1-q4",
    "topicId": "tar-u5-t1",
    "type": "multiple_choice",
    "questionText": "Hz. Muhammed'in 632 yılındaki vefatından önce 100 bini aşkın Müslümana hitap ettiği, insan hakları evrensel bildirisi niteliğindeki ünlü konuşması hangisidir?",
    "options": [
      "Veda Hutbesi",
      "Medine Sözleşmesi",
      "Hudeybiye Metni",
      "Akabe Biatı"
    ],
    "correctAnswer": 0,
    "explanation": "Veda Hutbesi ırk üstünlüğünü reddeden, can, mal ve kadın haklarını kutsal kılan evrensel bir insan hakları beyannamesidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t2-q1",
    "topicId": "tar-u5-t2",
    "type": "multiple_choice",
    "questionText": "Dört Halife Dönemi'ne, halifelerin ileri gelenlerin istişaresi ve biat (seçim) yöntemiyle belirlenmesi nedeniyle ne ad verilmiştir?",
    "options": [
      "Cumhuriyet Devri",
      "Saltanat Dönemi",
      "Meşrutiyet",
      "Teokrasi"
    ],
    "correctAnswer": 0,
    "explanation": "Halifeler babadan oğula miras yoluyla değil seçimle iş başına geldiği için bu döneme \"İslam'ın Cumhuriyet Devri\" denmiştir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t2-q2",
    "topicId": "tar-u5-t2",
    "type": "multiple_choice",
    "questionText": "Yalancı peygamberlerle (Ridde olayları) mücadele eden ve Kur'an-ı Kerim'i bir heyet kurarak ilk kez kitap (Mushaf) haline getiren halife kimdir?",
    "options": [
      "Hz. Ebubekir",
      "Hz. Ömer",
      "Hz. Osman",
      "Hz. Ali"
    ],
    "correctAnswer": 0,
    "explanation": "Yemame Savaşı'nda hafızların şehit düşmesi üzerine Hz. Ebubekir Kur'an ayetlerini Zeyd bin Sabit başkanlığında kitap haline getirtmiştir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t2-q3",
    "topicId": "tar-u5-t2",
    "type": "true_false",
    "questionText": "Hz. Ömer döneminde devlet teşkilatlanmasına büyük önem verilmiş; divan örgütü kurulmuş, eyaletlere kadılar atanmış ve ordugâh şehirleri inşa edilmiştir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Hz. Ömer adalet teşkilatı, düzenli ordu ve eyalet idaresiyle İslam devletini imparatorluk düzeyinde teşkilatlandırmıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t2-q4",
    "topicId": "tar-u5-t2",
    "type": "multiple_choice",
    "questionText": "İlk İslam donanmasını kurarak Kıbrıs'ı fetheden ve Kur'an-ı Kerim'i çoğaltarak eyalet merkezlerine gönderen halife kimdir?",
    "options": [
      "Hz. Osman",
      "Hz. Ali",
      "Hz. Ebubekir",
      "Hz. Ömer"
    ],
    "correctAnswer": 0,
    "explanation": "Hz. Osman döneminde deniz fetihleri başlamış ve Kur'an-ı Kerim özgün nüshalarından çoğaltılarak Şam, Kûfe, Basra gibi merkezlere gönderilmiştir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u5-t3-q1",
    "topicId": "tar-u5-t3",
    "type": "multiple_choice",
    "questionText": "Emeviler Dönemi'nde halifelik makamının babadan oğula geçen bir saltanata dönüşmesini sağlayan Emevi hükümdarı kimdir?",
    "options": [
      "Muaviye",
      "Abdülmelik",
      "Tarık bin Ziyad",
      "Velid"
    ],
    "correctAnswer": 0,
    "explanation": "Muaviye oğlu Yezid'i veliaht tayin ederek seçim geleneğine son vermiş ve halifeliği saltanata dönüştürmüştür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t3-q2",
    "topicId": "tar-u5-t3",
    "type": "multiple_choice",
    "questionText": "Emevilerin Arap olmayan Müslümanlara (Türkler, Farslar vb.) ikinci sınıf vatandaş muamelesi yaptığı ırkçı politikaya ne ad verilir?",
    "options": [
      "Mevali politikası",
      "İstimalet politikası",
      "Ümmetçilik",
      "Kut inancı"
    ],
    "correctAnswer": 0,
    "explanation": "Mevali (azatlı köle) politikası fethedilen milletlerin tepkisini çekmiş ve Emevilerin kısa sürede yıkılmasına zemin hazırlamıştır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u5-t3-q3",
    "topicId": "tar-u5-t3",
    "type": "true_false",
    "questionText": "Abbasiler Dönemi'nde Bağdat'ta kurulan \"Beytü'l-Hikme\" (Bilgelik Evi), Antik Yunan, Hint ve Fars klasiklerinin Arapçaya çevrildiği büyük bir bilim ve tercüme akademisidir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Beytü'l-Hikme İslam medeniyetinin altın çağını başlatmış ve bilimin Avrupa'ya aktarılmasını sağlamıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u5-t3-q4",
    "topicId": "tar-u5-t3",
    "type": "multiple_choice",
    "questionText": "İspanya'da 756-1031 yılları arasında hüküm süren, Kurtuba ve Gırnata gibi şehirlerde tıp, felsefe ve mimaride (El-Hamra Sarayı) Avrupa'yı aydınlatan medeniyet hangisidir?",
    "options": [
      "Endülüs Emevileri",
      "Babür Devleti",
      "Fatımiler",
      "Memlükler"
    ],
    "correctAnswer": 0,
    "explanation": "Endülüs medeniyeti İbni Rüşd gibi filozofları yetiştirmiş ve Avrupa Rönesansı'nın temellerini atmıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t1-q1",
    "topicId": "tar-u6-t1",
    "type": "multiple_choice",
    "questionText": "751 yılında Müslüman Abbasiler ile Çinliler arasında yapılan ve Karluk Türklerinin Abbasileri desteklemesiyle Türk-İslam tarihini başlatan savaş hangisidir?",
    "options": [
      "Talas Savaşı",
      "Dandanakan Savaşı",
      "Malazgirt Zaferi",
      "Yermük Savaşı"
    ],
    "correctAnswer": 0,
    "explanation": "Talas Savaşı ile Türkler kitleler halinde İslamiyet'i benimsemeye başlamış ve Çin'in batıya ilerleyişi durdurulmuştur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t1-q2",
    "topicId": "tar-u6-t1",
    "type": "multiple_choice",
    "questionText": "Türklerin İslamiyet'i kabul etmesini kolaylaştıran Gök Tengri inancı ile İslamiyet arasındaki benzerliklere hangisi örnek verilemez?",
    "options": [
      "Her iki inançta da tek tanrı anlayışı olması",
      "Ahiret, cennet (uçmağ) ve cehennem (tamu) inancının bulunması",
      "Türklerin puta tapmayı ve çok tanrıcılığı benimsemiş olması",
      "Töre ahlakı ile İslam ahlak kurallarının örtüşmesi"
    ],
    "correctAnswer": 2,
    "explanation": "Türkler hiçbir zaman puta tapmamışlardır; tek yaratıcı olan Gök Tengri'ye inanmaları İslam'ın tevhid inancıyla birebir örtüşmüştür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t1-q3",
    "topicId": "tar-u6-t1",
    "type": "true_false",
    "questionText": "Talas Savaşı sonrasında kağıt üretimi Çin sınırları dışına çıkarak ilk kez Semerkant şehrinde üretilmeye başlanmıştır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Talas Savaşı esirleri aracılığıyla kağıt Semerkant'ta (\"Şehirlerin Şahı\") üretilmiş ve dünya kültür tarihine geçmiştir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u6-t1-q4",
    "topicId": "tar-u6-t1",
    "type": "multiple_choice",
    "questionText": "Talas Savaşı'nda Müslümanların yanında yer alarak İslamiyet'i kabul eden ilk Türk boyu hangisidir?",
    "options": [
      "Karluklar",
      "Kıpçaklar",
      "Peçenekler",
      "Hazarlar"
    ],
    "correctAnswer": 0,
    "explanation": "Karluk boyu İslamiyet'i benimseyen ilk Türk boyudur ve Karahanlı Devleti'nin kurucu unsuru olmuştur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t2-q1",
    "topicId": "tar-u6-t2",
    "type": "multiple_choice",
    "questionText": "Orta Asya'da kurulan ilk Müslüman Türk devleti olan ve Satuk Buğra Han döneminde İslamiyet'i resmi din kabul eden devlet hangisidir?",
    "options": [
      "Karahanlılar",
      "Gazneliler",
      "Büyük Selçuklular",
      "Harzemşahlar"
    ],
    "correctAnswer": 0,
    "explanation": "Karahanlılar (840-1212) Orta Asya'da Türk kimliğini ve Türkçeyi koruyarak İslamiyet'i resmi din ilan eden ilk Türk devletidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t2-q2",
    "topicId": "tar-u6-t2",
    "type": "multiple_choice",
    "questionText": "Hindistan'a 17 sefer düzenleyerek bölgede İslamiyet'in yayılmasını sağlayan ve İslam tarihinde \"Sultan\" unvanını ilk kullanan hükümdar kimdir?",
    "options": [
      "Gazneli Sultan Mahmut",
      "Tuğrul Bey",
      "Alparslan",
      "Melikşah"
    ],
    "correctAnswer": 0,
    "explanation": "Gazneli Mahmut Abbasi halifesini Şii tehdidine karşı koruduğu için kendisine Sultan unvanı verilmiştir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t2-q3",
    "topicId": "tar-u6-t2",
    "type": "true_false",
    "questionText": "26 Ağustos 1071 tarihinde Sultan Alparslan komutasındaki Selçuklu ordusunun Bizans ordusunu yendiği Malazgirt Zaferi ile Anadolu'nun kapıları Türklere kesin olarak açılmıştır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Malazgirt Meydan Muharebesi Anadolu'nun Türkleşmesini ve Türkiye tarihini başlatan dönüm noktasıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t2-q4",
    "topicId": "tar-u6-t2",
    "type": "multiple_choice",
    "questionText": "1040 yılında Selçuklular ile Gazneliler arasında yapılan ve Selçukluların resmen kurulmasını, Gaznelilerin ise yıkılış sürecine girmesini sağlayan savaş hangisidir?",
    "options": [
      "Dandanakan Savaşı",
      "Pasinler Savaşı",
      "Miryokefalon Savaşı",
      "Katvan Savaşı"
    ],
    "correctAnswer": 0,
    "explanation": "Tuğrul ve Çağrı Beyler komutasındaki Selçuklular Dandanakan Savaşı ile Horasan'da bağımsız devletlerini kurmuşlardır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tar-u6-t3-q1",
    "topicId": "tar-u6-t3",
    "type": "multiple_choice",
    "questionText": "Yusuf Has Hacib tarafından Karahanlı hükümdarı Tabgaç Buğra Han'a sunulan, Türk-İslam edebiyatının ilk siyasetname ve mutluluk veren bilgi kitabı hangisidir?",
    "options": [
      "Kutadgu Bilig",
      "Divânu Lugâti't-Türk",
      "Atabetü'l-Hakâyık",
      "Divân-ı Hikmet"
    ],
    "correctAnswer": 0,
    "explanation": "Kutadgu Bilig (Mutluluk Veren Bilgi), adaleti, devleti, aklı ve kanaati temsil eden sembolik karakterlerle ideal devlet yönetimini anlatır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t3-q2",
    "topicId": "tar-u6-t3",
    "type": "multiple_choice",
    "questionText": "Araplara Türkçeyi öğretmek ve Türkçenin Arapça kadar zengin bir dil olduğunu kanıtlamak amacıyla Kaşgarlı Mahmut tarafından yazılan ilk Türkçe sözlük hangisidir?",
    "options": [
      "Divânu Lugâti't-Türk",
      "Muhakemetü'l-Lugateyn",
      "Mukaddimetü'l-Edeb",
      "Divân-ı Hikmet"
    ],
    "correctAnswer": 0,
    "explanation": "Divânu Lugâti't-Türk ilk Türkçe ansiklopedik sözlük olup içinde Türk dünyası haritası da yer alır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t3-q3",
    "topicId": "tar-u6-t3",
    "type": "true_false",
    "questionText": "Büyük Selçuklu Devleti'nde vezir Nizamülmülk tarafından kurulan \"Nizamiye Medreseleri\", dönemin en üst düzey üniversiteleri olup İmam Gazali gibi âlimleri yetiştirmiştir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Nizamiye Medreseleri devlet memuru yetiştirmek ve Bâtınîlik gibi zararlı akımlara karşı ilmi mücadele vermek için kurulmuştur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tar-u6-t3-q4",
    "topicId": "tar-u6-t3",
    "type": "multiple_choice",
    "questionText": "Selçuklularda devlet arazilerinin gelirlerinin hizmet karşılığı asker ve devlet adamlarına verilmesi esasına dayanan, hem tarımsal üretimi hem de atlı asker yetiştirilmesini sağlayan toprak sistemine ne ad verilir?",
    "options": [
      "İkta Sistemi",
      "İltizam",
      "Tımar",
      "Vakıf"
    ],
    "correctAnswer": 0,
    "explanation": "İkta sistemiyle hazineden para çıkmadan ordu beslenmiş, üretimde süreklilik ve taşrada asayiş sağlanmıştır.",
    "difficulty": 2,
    "xpValue": 15
  }
];
