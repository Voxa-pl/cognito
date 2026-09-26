import { Question } from '@/types';

export const edebiyatQuestions: Question[] = [
  // tde-u1-t1: Edebiyatın Tanımı ve Sanatla İlişkisi (6 questions)
  {
    id: 'tde-u1-t1-q1',
    topicId: 'tde-u1-t1',
    type: 'multiple_choice',
    questionText: 'Edebiyat, güzel sanatların sınıflandırılmasında hangi grupta yer alır?',
    options: ['Görsel (Plastik) sanatlar', 'İşitsel (Fonetik) sanatlar', 'Dramatik (Ritmik) sanatlar', 'Uygulamalı sanatlar'],
    correctAnswer: 1,
    explanation: 'Edebiyat ve müzik, malzemesi ses ve söz olan işitsel (fonetik) sanatlar grubunda yer alır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u1-t1-q2',
    topicId: 'tde-u1-t1',
    type: 'true_false',
    questionText: 'Edebiyatın temel anlatım malzemesi dildir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Edebiyat duygu, düşünce ve hayalleri dil aracılığıyla estetik biçimde aktaran söz sanatıdır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u1-t1-q3',
    topicId: 'tde-u1-t1',
    type: 'multiple_choice',
    questionText: 'Tarihsel bir roman yazarken yazarın en çok yararlandığı bilim dalı hangisidir?',
    options: ['Coğrafya', 'Tarih', 'Sosyoloji', 'Psikoloji'],
    correctAnswer: 1,
    explanation: 'Dönemin olaylarını, savaşlarını ve koşullarını kurgularken edebiyat doğrudan tarih biliminden faydalanır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u1-t1-q4',
    topicId: 'tde-u1-t1',
    type: 'true_false',
    questionText: 'Edebi metinlerde kelimeler yalnızca ilk ve gerçek (sözlük) anlamlarıyla kullanılır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 1,
    explanation: 'Edebi metinlerde estetik etki yaratmak amacıyla kelimelerin yan ve mecaz anlamlarına, çağrışım değerlerine geniş yer verilir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u1-t1-q5',
    topicId: 'tde-u1-t1',
    type: 'multiple_choice',
    questionText: 'İnsan ruhunun derinliklerini, bilinçaltını ve iç çatışmalarını yansıtan bir roman edebiyatın hangi bilimle ilişkisini gösterir?',
    options: ['Psikoloji', 'Felsefe', 'Arkeoloji', 'Antropoloji'],
    correctAnswer: 0,
    explanation: 'Ruhsal tahliller ve iç çatışmalar edebiyatın psikoloji ve psikiyatri ile olan sıkı bağını ortaya koyar.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u1-t1-q6',
    topicId: 'tde-u1-t1',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi edebi metinlerin özelliklerinden biri değildir?',
    options: ['Öğreticilik ve doğrudan bilgi vermek birincil amaçtır.', 'Okuyucuda estetik zevk ve heyecan uyandırmak hedeflenir.', 'Öznel (subjektif) bir bakış açısı hâkimdir.', 'Kurmaca bir gerçekliğe dayanır.'],
    correctAnswer: 0,
    explanation: 'Doğrudan öğreticilik ve nesnel bilgi vermek bilimsel veya öğretici metinlerin görevidir; edebi metinlerde estetik haz ön plandadır.',
    difficulty: 2,
    xpValue: 15,
  },

  // tde-u1-t3: İletişim ve Ögeleri (6 questions)
  {
    id: 'tde-u1-t3-q1',
    topicId: 'tde-u1-t3',
    type: 'multiple_choice',
    questionText: 'Bir iletişim sürecinde iletiyi hazırlayan ve hedef kitleye gönderen kaynak ögeye ne ad verilir?',
    options: ['Alıcı', 'Gönderici (Kaynak)', 'Kanal', 'Dönüt (Geri bildirim)'],
    correctAnswer: 1,
    explanation: 'İletişimi başlatan ve mesajı kodlayıp aktaran kişi veya unsura gönderici denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u1-t3-q2',
    topicId: 'tde-u1-t3',
    type: 'true_false',
    questionText: 'Alıcının göndericinin iletisine verdiği cevaba ya da tepkiye "dönüt" (geri bildirim) denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Dönüt, iletişimin hedefine ulaşıp ulaşmadığını gösteren en temel geri bildirim ögesidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u1-t3-q3',
    topicId: 'tde-u1-t3',
    type: 'multiple_choice',
    questionText: 'Öğretmenin derste "Kitaplarınızı açın" sözüne öğrencilerin kitaplarını açarak karşılık vermesinde "kanal" nedir?',
    options: ['Öğretmen', 'Öğrenciler', 'Ses dalgaları ve hava', 'Kitap'],
    correctAnswer: 2,
    explanation: 'İletinin göndericiden alıcıya ulaşmasını sağlayan fiziksel ortama veya araca kanal denir (burada ses dalgaları).',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tde-u1-t3-q4',
    topicId: 'tde-u1-t3',
    type: 'multiple_choice',
    questionText: 'İletişimin gerçekleştiği fiziki, psikolojik ve kültürel çevreye ne ad verilir?',
    options: ['Bağlam', 'Kod (Şifre)', 'İleti', 'Filtre'],
    correctAnswer: 0,
    explanation: 'İletişim unsurlarının birlikte oluşturduğu ortama bağlam denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u1-t3-q5',
    topicId: 'tde-u1-t3',
    type: 'true_false',
    questionText: 'İletinin özel bir işaret veya dil sistemiyle şifrelenmiş haline "kod" (şifre) denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Türkçe dili, mors alfabesi veya trafik işaretleri birer koddur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u1-t3-q6',
    topicId: 'tde-u1-t3',
    type: 'multiple_choice',
    questionText: 'Göndericinin duygu ve düşüncelerini bildirmek amacıyla alıcıya ilettiği söze, mesaja veya anlama ne ad verilir?',
    options: ['Kanal', 'İleti (Mesaj)', 'Dönüt', 'Bağlam'],
    correctAnswer: 1,
    explanation: 'İletilmek istenen duygu, düşünce veya bilgiye ileti (mesaj) denir.',
    difficulty: 1,
    xpValue: 10,
  },

  // tde-u2-t1: Olay ve Durum Hikâyesi (6 questions)
  {
    id: 'tde-u2-t1-q1',
    topicId: 'tde-u2-t1',
    type: 'multiple_choice',
    questionText: 'Türk edebiyatında olay (klasik / Maupassant tarzı) hikâyeciliğinin en önemli ve öncü temsilcisi kimdir?',
    options: ['Sait Faik Abasıyanık', 'Ömer Seyfettin', 'Memduh Şevket Esendal', 'Ahmet Hamdi Tanpınar'],
    correctAnswer: 1,
    explanation: 'Ömer Seyfettin, olay örgüsü, merak unsuru ve beklenmedik sonlarıyla olay hikâyeciliğinin ustasıdır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u2-t1-q2',
    topicId: 'tde-u2-t1',
    type: 'multiple_choice',
    questionText: 'Durum (kesit / Çehov tarzı) hikâyeciliği ile ilgili aşağıdakilerden hangisi yanlıştır?',
    options: ['Merak ve heyecan unsuru en üst düzeydedir.', 'Hayatın bir kesiti, duygu ve psikolojik atmosfer ön plandadır.', 'Belirli bir serim-düğüm-çözüm planına sıkı sıkıya bağlı kalınmaz.', 'Sonuç okuyucunun hayal gücüne bırakılır.'],
    correctAnswer: 0,
    explanation: 'Durum hikâyesinde merak unsuru ikinci plandadır; olaylar değil günlük yaşamdan bir an ve duygular işlenir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tde-u2-t1-q3',
    topicId: 'tde-u2-t1',
    type: 'true_false',
    questionText: 'Sait Faik Abasıyanık ve Memduh Şevket Esendal Türk edebiyatında durum (Çehov tarzı) hikâyesinin önde gelen temsilcileridir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Her iki usta yazar da günlük hayatın içinden insan manzaralarını kesit hikâyeleriyle ölümsüzleştirmiştir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u2-t1-q4',
    topicId: 'tde-u2-t1',
    type: 'multiple_choice',
    questionText: 'Dünya edebiyatında hikâye türünün ilk başarılı örneği sayılan "Decameron" adlı eser kime aittir?',
    options: ['Giovanni Boccaccio', 'Guy de Maupassant', 'Anton Çehov', 'Miguel de Cervantes'],
    correctAnswer: 0,
    explanation: 'İtalyan yazar Boccaccio\'nun 14. yüzyılda kaleme aldığı Decameron hikâye türünün ilk örneğidir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tde-u2-t1-q5',
    topicId: 'tde-u2-t1',
    type: 'true_false',
    questionText: 'Tanzimat Dönemi yazarı Ahmet Mithat Efendi\'nin "Letaif-i Rivayat" eseri Türk edebiyatında ilk yerli hikâye kabul edilir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Letaif-i Rivayat ilk yerli hikâye, Samipaşazade Sezai\'nin Küçük Şeyler eseri ise Batılı anlamda ilk modern hikâyedir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tde-u2-t1-q6',
    topicId: 'tde-u2-t1',
    type: 'multiple_choice',
    questionText: 'Hikâyede her şeyi bilen, kahramanların iç dünyasını, aklından geçenleri ve geçmiş/geleceği gören anlatıcı bakış açısı hangisidir?',
    options: ['Kahraman anlatıcı', 'Gözlemci anlatıcı', 'İlahi (Hâkim / Tanrısal) anlatıcı', 'Çoğulcu anlatıcı'],
    correctAnswer: 2,
    explanation: 'İlahi bakış açısında anlatıcı kahramanların kalbinden geçenleri ve gizli duygularını eksiksiz bilir.',
    difficulty: 1,
    xpValue: 10,
  },

  // tde-u2-t3: İsimler ve İsim Tamlamaları (6 questions)
  {
    id: 'tde-u2-t3-q1',
    topicId: 'tde-u2-t3',
    type: 'multiple_choice',
    questionText: '"Kapının kolu" tamlaması hangi tür isim tamlamasıdır?',
    options: ['Belirtili isim tamlaması', 'Belirtisiz isim tamlaması', 'Zincirleme isim tamlaması', 'Takısız isim tamlaması'],
    correctAnswer: 0,
    explanation: 'Tamlayan tamlayan eki (-ın), tamlanan ise iyelik eki (-u) aldığı için belirtili isim tamlamasıdır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u2-t3-q2',
    topicId: 'tde-u2-t3',
    type: 'multiple_choice',
    questionText: '"Türk edebiyatı tarihi" tamlaması hangi tür isim tamlamasıdır?',
    options: ['Belirtisiz isim tamlaması', 'Belirtili isim tamlaması', 'Zincirleme isim tamlaması', 'Sıfat tamlaması'],
    correctAnswer: 2,
    explanation: 'En az üç ismin birbirine tamlama kurallarıyla bağlanmasıyla oluşan tamlamalara zincirleme isim tamlaması denir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tde-u2-t3-q3',
    topicId: 'tde-u2-t3',
    type: 'true_false',
    questionText: '"Okul bahçesi" tamlamasında tamlayan ilgi eki almadığı için bu tamlama belirtisiz isim tamlamasıdır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Tamlayanın ek almayıp tamlananın iyelik eki aldığı tamlamalara belirtisiz isim tamlaması denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u2-t3-q4',
    topicId: 'tde-u2-t3',
    type: 'multiple_choice',
    questionText: 'Aşağıdaki cümlelerin hangisinde topluluk ismi kullanılmıştır?',
    options: ['Ağaçlar ilkbaharda çiçek açar.', 'Sürü nehrin kenarında otluyordu.', 'Kitapları masanın üstüne dizdi.', 'Çocuklar bahçede oyun oynuyor.'],
    correctAnswer: 1,
    explanation: '"Sürü" sözcüğü biçimce tekil olmasına rağmen anlamca birden çok hayvanı karşıladığı için topluluk ismidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u2-t3-q5',
    topicId: 'tde-u2-t3',
    type: 'true_false',
    questionText: 'Beş duyu organımızdan en az biriyle algılayabildiğimiz varlıkları karşılayan isimlere somut isim denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Rüzgâr, ses, ışık somut isimdir; rüya, sevgi, hüzün ise soyut isimdir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u2-t3-q6',
    topicId: 'tde-u2-t3',
    type: 'multiple_choice',
    questionText: 'Aşağıdaki tamlamaların hangisinde tamlayan ile tamlanan arasına başka bir sözcük girmiştir?',
    options: ['Evin kapısı', 'Denizin serin dalgaları', 'Yol kenarı', 'Masa örtüsü'],
    correctAnswer: 1,
    explanation: '"Denizin dalgaları" tamlamasının arasına "serin" niteleme sıfatı girmiştir.',
    difficulty: 2,
    xpValue: 15,
  },

  // tde-u3-t1: Nazım Birimi, Ölçü ve Ahenk Unsurları (6 questions)
  {
    id: 'tde-u3-t1-q1',
    topicId: 'tde-u3-t1',
    type: 'multiple_choice',
    questionText: 'Dize sonlarında yazılışları ve görevleri aynı olan eklerin veya sözcüklerin tekrarlanmasına ne ad verilir?',
    options: ['Tam kafiye', 'Zengin kafiye', 'Redif', 'Aliterasyon'],
    correctAnswer: 2,
    explanation: 'Dize sonlarında kafiyeden sonra gelen, anlam ve görevi tıpatıp aynı olan ses tekrarlarına redif denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u3-t1-q2',
    topicId: 'tde-u3-t1',
    type: 'multiple_choice',
    questionText: 'Dize sonlarında yalnızca tek bir ses benzerliğine dayanan kafiye türü hangisidir?',
    options: ['Yarım kafiye', 'Tam kafiye', 'Zengin kafiye', 'Cinaslı kafiye'],
    correctAnswer: 0,
    explanation: 'Tek ses benzerliğine yarım kafiye (halk şiirinde yaygındır), iki ses benzerliğine tam kafiye, üç veya daha fazla ses benzerliğine zengin kafiye denir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u3-t1-q3',
    topicId: 'tde-u3-t1',
    type: 'true_false',
    questionText: 'Türk edebiyatının milli ölçüsü, dizelerdeki hece sayılarının eşitliğine dayanan "hece ölçüsü"dür.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Hece ölçüsü İslamiyet öncesi dönemden beri Türk şiirinin öz ve milli ölçüsüdür.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'tde-u3-t1-q4',
    topicId: 'tde-u3-t1',
    type: 'multiple_choice',
    questionText: 'Yazılışları ve okunuşları aynı, anlamları farklı olan kelimelerle yapılan uyak türü hangisidir?',
    options: ['Tunç uyak', 'Cinaslı uyak', 'Tam uyak', 'Yarım uyak'],
    correctAnswer: 1,
    explanation: 'Eş sesli sözcüklerin dize sonlarında uyak oluşturmasına cinaslı uyak denir (örneğin: bağ bana / gül bana).',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tde-u3-t1-q5',
    topicId: 'tde-u3-t1',
    type: 'true_false',
    questionText: 'Şiirde ahenk sağlamak amacıyla aynı ünsüz harflerin sıkça tekrarlanmasına "aliterasyon" denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Ünsüz tekrarına aliterasyon, ünlü harf tekrarına ise asonans denir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'tde-u3-t1-q6',
    topicId: 'tde-u3-t1',
    type: 'multiple_choice',
    questionText: 'Şiirde a-a-b-b şeklinde kafiyelenen kafiye örgüsü aşağıdakilerden hangisidir?',
    options: ['Çapraz uyak', 'Sarma uyak', 'Düz uyak', 'Mani tipi uyak'],
    correctAnswer: 2,
    explanation: 'a-a-b-b veya a-a-a-b biçimindeki diziliş düz uyaktır; a-b-a-b çapraz, a-b-b-a sarmadır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    "id": "tde-u1-t2-q1",
    "topicId": "tde-u1-t2",
    "type": "multiple_choice",
    "questionText": "Bir dilin tarihsel, bölgesel ve siyasi sebeplerle metinlerle takip edilemeyen çok eski dönemlerinde ayrılmış kollarına ne ad verilir?",
    "options": [
      "Şive",
      "Ağız",
      "Lehçe",
      "Argo"
    ],
    "correctAnswer": 2,
    "explanation": "Lehçe, ana dilden ses, şekil ve söz varlığı bakımından çok derin ayrılıklar gösteren ve metinlerle takip edilemeyen kollarıdır (Çuvaşça ve Yakutça).",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u1-t2-q2",
    "topicId": "tde-u1-t2",
    "type": "multiple_choice",
    "questionText": "Bir dilin bilinen ve yazılı metinlerle takip edilebilen dönemlerinde ayrılmış kollarına ne ad verilir?",
    "options": [
      "Şive",
      "Lehçe",
      "Jargon",
      "Standart dil"
    ],
    "correctAnswer": 0,
    "explanation": "Şive (örneğin Azerbaycan Türkçesi, Özbek Türkçesi, Kazak Türkçesi), yazılı metinlerle takip edilebilen tarihî kollardır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u1-t2-q3",
    "topicId": "tde-u1-t2",
    "type": "true_false",
    "questionText": "Aynı dil ve şive içinde bir ülkenin farklı bölge ve şehirlerinde görülen söyleyiş farklılıklarına \"ağız\" denir (Ege ağzı, Karadeniz ağzı gibi).",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Ağız (diyalekt), aynı milletin coğrafi sınırları içindeki yerel telaffuz ve ses çeşitliliğidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u1-t2-q4",
    "topicId": "tde-u1-t2",
    "type": "multiple_choice",
    "questionText": "Belli bir meslek veya topluluktaki insanların kendi aralarında kullandığı, başkalarının anlamakta zorlandığı özel kelime dağarcığına ne ad verilir?",
    "options": [
      "Argo",
      "Jargon",
      "Lehçe",
      "Ağız"
    ],
    "correctAnswer": 1,
    "explanation": "Jargon (örneğin tıp veya denizcilik jargonu), mesleki terimler ve uzmanlık sözcükleri topluluğudur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u2-t2-q1",
    "topicId": "tde-u2-t2",
    "type": "multiple_choice",
    "questionText": "Hikâyede kahramanların aklından geçenleri, duygularını, geçmişlerini ve geleceklerini her şeyi bilen bir tanrısal güçle anlatan bakış açısı hangisidir?",
    "options": [
      "Kahraman anlatıcı bakış açısı",
      "Gözlemci (kameraman) bakış açısı",
      "İlahi (Hâkim / Tanrısal) bakış açısı",
      "Çoğulcu bakış açısı"
    ],
    "correctAnswer": 2,
    "explanation": "İlahi bakış açısında anlatıcı kahramanların tüm iç dünyasına, bilinçaltına ve gizli niyetlerine tamamen hâkimdir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u2-t2-q2",
    "topicId": "tde-u2-t2",
    "type": "multiple_choice",
    "questionText": "Anlatıcının sadece dışarıdan gördüklerini, bir video kamera gibi tarafsızca ve kahramanların duygularına karışmadan aktardığı bakış açısı hangisidir?",
    "options": [
      "Gözlemci anlatıcı bakış açısı",
      "Hâkim bakış açısı",
      "Ben anlatıcı bakış açısı",
      "Epik anlatıcı"
    ],
    "correctAnswer": 0,
    "explanation": "Gözlemci bakış açısında anlatıcı olaya müdahale etmez, yorum katmaz; gördüklerini tarafsızca aktarır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u2-t2-q3",
    "topicId": "tde-u2-t2",
    "type": "true_false",
    "questionText": "Bir hikâyede olayların sebep-sonuç ilişkisiyle birbirine bağlanarak gelişmesine \"olay örgüsü\" denir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Olay örgüsü kurmaca metindeki olayların kurgusal ve nedensel sıralanışıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u2-t2-q4",
    "topicId": "tde-u2-t2",
    "type": "multiple_choice",
    "questionText": "Hikâyede olayın içinde bizzat yer alan, olayları birinci tekil şahıs ağzıyla (\"gittim\", \"gördüm\") aktaran anlatıcı türü hangisidir?",
    "options": [
      "İlahi anlatıcı",
      "Kahraman anlatıcı",
      "Gözlemci anlatıcı",
      "Üçüncü şahıs anlatıcı"
    ],
    "correctAnswer": 1,
    "explanation": "Kahraman anlatıcı hikâyenin kişilerinden biridir ve olayları kendi gözünden birinci tekil (\"ben\") diliyle anlatır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u3-t2-q1",
    "topicId": "tde-u3-t2",
    "type": "multiple_choice",
    "questionText": "Aşk, sevgi, özlem, ayrılık gibi bireysel coşkulu duyguları içtenlikle dile getiren duygusal şiir türüne ne ad verilir?",
    "options": [
      "Epik şiir",
      "Lirik şiir",
      "Didaktik şiir",
      "Pastoral şiir"
    ],
    "correctAnswer": 1,
    "explanation": "Eski Yunan'da \"lyra\" (lir) çalgısı eşliğinde söylenen coşkulu ve duygusal şiirlere lirik şiir denir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u3-t2-q2",
    "topicId": "tde-u3-t2",
    "type": "multiple_choice",
    "questionText": "Kahramanlık, savaş, yiğitlik, vatan sevgisi ve tarihi zaferleri coşkulu bir dille anlatan şiir türü hangisidir?",
    "options": [
      "Didaktik şiir",
      "Satirik şiir",
      "Epik şiir",
      "Dramatik şiir"
    ],
    "correctAnswer": 2,
    "explanation": "Epik şiir destansı ve kahramanlık temalı şiirlerdir (Epos sözcüğünden gelir; Köroğlu, Dadaloğlu örnek verilebilir).",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u3-t2-q3",
    "topicId": "tde-u3-t2",
    "type": "true_false",
    "questionText": "Belli bir konuda bilgi vermek, ahlaki bir öğüt veya ders aşılamak amacıyla yazılan öğretici şiirlere \"didaktik şiir\" denir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Didaktik şiir akla seslenir ve nasihat/öğüt verme amacı taşır (Yusuf Has Hacib'in Kutadgu Bilig eseri gibi).",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u3-t2-q4",
    "topicId": "tde-u3-t2",
    "type": "multiple_choice",
    "questionText": "Doğa güzelliklerini, kır ve orman manzarasını, çobanların köy hayatını anlatan şiir türü hangisidir?",
    "options": [
      "Pastoral şiir",
      "Satirik şiir",
      "Epik şiir",
      "Lirik şiir"
    ],
    "correctAnswer": 0,
    "explanation": "Pastoral şiir kır ve çoban hayatını konu alır; idil ve eglog gibi alt türleri vardır (Kemalettin Kamu'nun Bingöl Çobanları şiiri gibi).",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u3-t3-q1",
    "topicId": "tde-u3-t3",
    "type": "multiple_choice",
    "questionText": "\"Geniş caddeler, serin rüzgârlar, kırık masa\" tamlamalarındaki altı çizili sıfatlar hangi tür sıfata örnektir?",
    "options": [
      "İşaret sıfatı",
      "Niteleme sıfatı",
      "Belgisiz sıfat",
      "Soru sıfatı"
    ],
    "correctAnswer": 1,
    "explanation": "İsme sorulan \"Nasıl?\" sorusunun cevabı olan ve varlıkların durumunu, rengini, biçimini gösteren sıfatlar niteleme sıfatıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u3-t3-q2",
    "topicId": "tde-u3-t3",
    "type": "multiple_choice",
    "questionText": "\"Bu kitap, şu ağaç, o masa\" örneklerindeki sıfatlar belirtme sıfatlarının hangi alt grubuna girer?",
    "options": [
      "Sayı sıfatı",
      "İşaret sıfatı",
      "Belgisiz sıfat",
      "Soru sıfatı"
    ],
    "correctAnswer": 1,
    "explanation": "Varlıkları işaret ederek gösteren ve isme sorulan \"Hangi?\" sorusuna yanıt veren sıfatlar işaret sıfatıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u3-t3-q3",
    "topicId": "tde-u3-t3",
    "type": "true_false",
    "questionText": "\"İhtiyar adam bankta oturdu\" cümlesindeki niteleme sıfatı \"ihtiyar\", isim düştüğünde \"İhtiyar bankta oturdu\" şeklinde adlaşmış sıfat olur.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Niteleme sıfatının önündeki isim düştüğünde sıfat isim gibi kullanılır ve adlaşmış sıfat adını alır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u3-t3-q4",
    "topicId": "tde-u3-t3",
    "type": "multiple_choice",
    "questionText": "Aşağıdaki cümlelerin hangisinde bir \"belgisiz sıfat\" kullanılmıştır?",
    "options": [
      "Üç öğrenci geldi.",
      "Bazı günler çok yoğundur.",
      "Kırmızı arabayı aldık.",
      "Hangi soruyu çözdün?"
    ],
    "correctAnswer": 1,
    "explanation": "\"Bazı\" sözcüğü önündeki gün ismini kesin ve net sayı belirtmeksizin belirsiz şekilde tamamladığı için belgisiz sıfattır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u4-t1-q1",
    "topicId": "tde-u4-t1",
    "type": "multiple_choice",
    "questionText": "Masalların \"Bir varmış, bir yokmuş, evvel zaman içinde...\" gibi tekerlemelerle başladığı giriş bölümüne ne ad verilir?",
    "options": [
      "Serim",
      "Düğüm",
      "Döşeme",
      "Dilek"
    ],
    "correctAnswer": 2,
    "explanation": "Döşeme bölümü dinleyicinin ilgisini çekmek amacıyla söylenen tekerlemelerin yer aldığı giriş bölümüdür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u4-t1-q2",
    "topicId": "tde-u4-t1",
    "type": "multiple_choice",
    "questionText": "Masal türünün genel özellikleri ile ilgili aşağıdakilerden hangisi yanlıştır?",
    "options": [
      "Olaylar hayal ürünü ve olağanüstüdür.",
      "Zaman ve mekân tamamen belirsizdir (Kaf Dağı, periler ülkesi).",
      "Milli ve dini motiflere sıkça yer verilir, tarihi gerçekleri anlatır.",
      "İyiler daima kazanır, kötüler cezalandırılır; evrensel ahlak öğütlenir."
    ],
    "correctAnswer": 2,
    "explanation": "Masallarda milli ve dini ögelere yer verilmez; tüm insanlığı ilgilendiren evrensel değerler (iyilik, dürüstlük) işlenir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u4-t1-q3",
    "topicId": "tde-u4-t1",
    "type": "true_false",
    "questionText": "Masalların sonunda anlatıcının \"Onlar ermiş muradına, biz çıkalım kerevetine\" gibi iyi temennilerde bulunduğu bölüme \"Dilek\" bölümü denir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Masal Döşeme, Serim, Düğüm, Çözüm ve Dilek olmak üzere beş bölümden oluşur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u4-t1-q4",
    "topicId": "tde-u4-t1",
    "type": "multiple_choice",
    "questionText": "Masallarda merak duygusunun en üst düzeye ulaştığı, olayların karmaşıklaştığı ve çatışmaların düğümlendiği ana bölüm hangisidir?",
    "options": [
      "Serim",
      "Döşeme",
      "Düğüm",
      "Çözüm"
    ],
    "correctAnswer": 2,
    "explanation": "Düğüm bölümünde çatışmalar doruk noktaya çıkar ve merak unsuru zirveye taşınır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u4-t2-q1",
    "topicId": "tde-u4-t2",
    "type": "multiple_choice",
    "questionText": "İnsan dışındaki canlı ve cansız varlıkların (hayvanlar, bitkiler) konuşturularak insanlara ahlaki ders verme amacıyla yazılan manzum veya mensur hikâyelere ne ad verilir?",
    "options": [
      "Destan",
      "Fabl",
      "Roman",
      "Biyografi"
    ],
    "correctAnswer": 1,
    "explanation": "Fabl, hayvanlar üzerinden insani kusurları hicveden ve ders veren sembolik anlatılardır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u4-t2-q2",
    "topicId": "tde-u4-t2",
    "type": "multiple_choice",
    "questionText": "Fabl türünde vazgeçilmez olan, insan dışındaki varlıklara insani özellikler yükleme ve onları insan gibi konuşturma edebi sanatları hangileridir?",
    "options": [
      "Teşhis (Kişileştirme) ve İntak (Konuşturma)",
      "Tezat ve Mübalağa",
      "Tenasüp ve Telmih",
      "Cinas ve Kinaye"
    ],
    "correctAnswer": 0,
    "explanation": "Fabllarda hayvanların kişilik kazanması teşhis, insan diliyle konuşması ise intak sanatıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u4-t2-q3",
    "topicId": "tde-u4-t2",
    "type": "true_false",
    "questionText": "15. yüzyılda Şeyhî tarafından kaleme alınan ve bir eşeğin başından geçenleri anlatan \"Har-nâme\", Türk edebiyatındaki ilk fabl örneği kabul edilir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Şeyhî'nin Har-nâme (Eşek Kitabı) mesnevisi hiciv ve fabl türünün edebiyatımızdaki şaheseridir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u4-t2-q4",
    "topicId": "tde-u4-t2",
    "type": "multiple_choice",
    "questionText": "Hint edebiyatında Beydeba tarafından hükümdara devlet yönetimi konusunda ahlaki öğütler vermek üzere hayvan masalları şeklinde yazılan ünlü fabl eseri hangisidir?",
    "options": [
      "Binbir Gece Masalları",
      "Kelile ve Dimne",
      "Ezop Masalları",
      "Gülliver'in Gezileri"
    ],
    "correctAnswer": 1,
    "explanation": "Kelile ve Dimne (iki çakalın adıdır), Doğu edebiyatının ilk ve en büyük fabl klasiğidir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u4-t3-q1",
    "topicId": "tde-u4-t3",
    "type": "multiple_choice",
    "questionText": "Tek başına anlamı olmayan, ancak cümle içinde sözcükler arasında benzerlik, amaç, araç, neden gibi anlam ilgileri kuran sözcük türü hangisidir?",
    "options": [
      "Edat (İlgeç)",
      "Zamir",
      "Zarf",
      "Fiil"
    ],
    "correctAnswer": 0,
    "explanation": "\"Gibi, için, kadar, göre, ile\" gibi sözcükler edattır; cümleden çıkarıldıklarında cümlenin anlamı bozulur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u4-t3-q2",
    "topicId": "tde-u4-t3",
    "type": "multiple_choice",
    "questionText": "Aşağıdaki cümlelerin hangisinde \"ile\" sözcüğü bağlaç olarak kullanılmıştır?",
    "options": [
      "Okula otobüs ile gittik.",
      "Ali ile Veli kütüphanede ders çalışıyor.",
      "Ödevini özen ile hazırlamıştı.",
      "Bıçak ile ekmeği kesti."
    ],
    "correctAnswer": 1,
    "explanation": "\"İle\" yerine \"ve\" getirilebiliyorsa bağlaçtır: \"Ali ve Veli\". Araç bildirdiğinde ise edattır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u4-t3-q3",
    "topicId": "tde-u4-t3",
    "type": "true_false",
    "questionText": "Bağlaçlar cümleden çıkarıldığında cümlenin anlamı tamamen bozulmaz, yalnızca anlamda daralma veya hafif değişiklik olabilir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Bağlaçlar bağımsız ögeleri birbirine bağlar; edatların aksine cümleden çıkarıldıklarında cümle genellikle dil bilgisi açısından çökmez.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u4-t3-q4",
    "topicId": "tde-u4-t3",
    "type": "multiple_choice",
    "questionText": "\"Eyvah, treni kaçırdık!\" cümlesindeki \"Eyvah\" sözcüğü hangi sözcük türüne örnektir?",
    "options": [
      "Edat",
      "Bağlaç",
      "Ünlem",
      "Zarf"
    ],
    "correctAnswer": 2,
    "explanation": "Korku, sevinç, şaşkınlık, acıma gibi ani duyguları bildiren veya seslenme belirten sözcüklere ünlem denir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u5-t1-q1",
    "topicId": "tde-u5-t1",
    "type": "multiple_choice",
    "questionText": "Dünya edebiyatında modern anlamda ilk roman örneği kabul edilen 17. yüzyıl İspanyol yazarı Cervantes'in ölümsüz eseri hangisidir?",
    "options": [
      "Sefiller",
      "Don Kişot",
      "İlahi Komedya",
      "Robinson Crusoe"
    ],
    "correctAnswer": 1,
    "explanation": "Cervantes'in 1605 yılında yayımlanan Don Kişot eseri ilk modern roman sayılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u5-t1-q2",
    "topicId": "tde-u5-t1",
    "type": "multiple_choice",
    "questionText": "Türk edebiyatında Şemsettin Sami tarafından 1872 yılında kaleme alınan ilk yerli Türk romanı hangisidir?",
    "options": [
      "Taaşşuk-ı Talat ve Fitnat",
      "İntibah",
      "Araba Sevdası",
      "Mai ve Siyah"
    ],
    "correctAnswer": 0,
    "explanation": "Taaşşuk-ı Talat ve Fitnat (Talat ve Fitnat'ın Aşkı), ilk yerli Türk romanıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u5-t1-q3",
    "topicId": "tde-u5-t1",
    "type": "true_false",
    "questionText": "Türk edebiyatında ilk edebi roman Namık Kemal'in \"İntibah\", ilk tarihi romanı ise yine Namık Kemal'in \"Cezmi\" adlı eseridir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Namık Kemal Tanzimat Dönemi'nde hem ilk edebi romanı (İntibah - Sergüzeşt-i Ali Bey) hem de ilk tarihi romanı (Cezmi) yazmıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u5-t1-q4",
    "topicId": "tde-u5-t1",
    "type": "multiple_choice",
    "questionText": "Recaizade Mahmut Ekrem'in yazdığı ve yanlış Batılılaşmayı, züppe tipini (Bihruz Bey) eleştiren ilk realist Türk romanı hangisidir?",
    "options": [
      "Karabibik",
      "Araba Sevdası",
      "Aşk-ı Memnu",
      "Eylül"
    ],
    "correctAnswer": 1,
    "explanation": "Araba Sevdası Türk edebiyatının ilk realist (gerçekçi) romanı olarak kabul edilir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u5-t2-q1",
    "topicId": "tde-u5-t2",
    "type": "multiple_choice",
    "questionText": "Romanda kahramanın aklından geçenlerin, çağrışımların mantıksal bir sıra gözetilmeksizin düzensiz ve sıçramalarla aktarıldığı modern anlatım tekniği hangisidir?",
    "options": [
      "İç monolog",
      "Bilinç akışı",
      "Geriye dönüş (Flashback)",
      "Diyalog"
    ],
    "correctAnswer": 1,
    "explanation": "Bilinç akışında kahramanın düşünceleri serbest çağrışımlarla, dil bilgisi kurallarına bağlı kalmaksızın akar.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u5-t2-q2",
    "topicId": "tde-u5-t2",
    "type": "multiple_choice",
    "questionText": "Olayların kronolojik akışını keserek geçmişte yaşanmış bir olaya veya döneme dönülmesini sağlayan anlatım tekniği hangisidir?",
    "options": [
      "Özetleme",
      "Geriye dönüş",
      "İç çözümleme",
      "Montaj"
    ],
    "correctAnswer": 1,
    "explanation": "Geriye dönüş (flashback), karakterlerin geçmişini veya olayın başlangıç nedenini aydınlatmak için kullanılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u5-t2-q3",
    "topicId": "tde-u5-t2",
    "type": "true_false",
    "questionText": "Betimleme (tasvir), varlıkların ve mekânların okuyucunun gözünde canlanacak şekilde sözcüklerle resim çizilerek anlatılmasıdır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Betimleme duyu organlarına hitap eden sıfatlar ve ayrıntılarla atmosfer yaratır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u5-t2-q4",
    "topicId": "tde-u5-t2",
    "type": "multiple_choice",
    "questionText": "Bir yazarın başka bir yazarın üslubunu, dilini ve anlatım tarzını taklit ederek eser kaleme almasına ne ad verilir?",
    "options": [
      "Parodi",
      "Pastiş",
      "Kolaj",
      "İç monolog"
    ],
    "correctAnswer": 1,
    "explanation": "Pastiş üslup taklididir; konusuyla alay etmek amacıyla yeniden yazmaya ise parodi denir.",
    "difficulty": 3,
    "xpValue": 20
  },
  {
    "id": "tde-u5-t3-q1",
    "topicId": "tde-u5-t3",
    "type": "multiple_choice",
    "questionText": "İsmin yerini tutan ve \"ben, sen, o, biz, siz, onlar\" sözcüklerinden oluşan zamir türü hangisidir?",
    "options": [
      "İşaret zamiri",
      "Kişi (Şahıs) zamiri",
      "Belgisiz zamir",
      "Soru zamiri"
    ],
    "correctAnswer": 1,
    "explanation": "Kişi zamirleri insan isimlerinin yerine kullanılan sözcüklerdir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u5-t3-q2",
    "topicId": "tde-u5-t3",
    "type": "multiple_choice",
    "questionText": "\"Kendi\" sözcüğü zamirlerin hangi türüne girer?",
    "options": [
      "Dönüşlülük zamiri",
      "İşaret zamiri",
      "Belgisiz zamir",
      "Soru zamiri"
    ],
    "correctAnswer": 0,
    "explanation": "\"Kendi\" sözcüğü şahsı pekiştiren veya eylemin kendisine döndüğünü gösteren dönüşlülük zamiridir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u5-t3-q3",
    "topicId": "tde-u5-t3",
    "type": "true_false",
    "questionText": "\"Bu soruyu herkes çözebilir\" cümlesinde \"bu\" işaret sıfatı, \"herkes\" ise belgisiz zamirdir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "\"Bu\" ismi nitelediği için sıfattır; \"herkes\" ise insan isimlerinin yerini belirsizce tuttuğu için belgisiz zamirdir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u5-t3-q4",
    "topicId": "tde-u5-t3",
    "type": "multiple_choice",
    "questionText": "Aşağıdaki cümlelerin hangisinde soru anlamı bir zamirle sağlanmıştır?",
    "options": [
      "Hangi okula gidiyorsun?",
      "Kapıyı kim çaldı?",
      "Nasıl bir ev arıyorsunuz?",
      "Ne zaman geleceksin?"
    ],
    "correctAnswer": 1,
    "explanation": "\"Kim\" sorusunun cevabı bir isim veya zamirdir (\"Ali çaldı\" / \"O çaldı\"); dolayısıyla soru zamiridir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u6-t1-q1",
    "topicId": "tde-u6-t1",
    "type": "multiple_choice",
    "questionText": "Antik Yunan'da bağ bozumu tanrısı Dionysos adına düzenlenen dinsel törenlerden doğan edebi tür hangisidir?",
    "options": [
      "Roman",
      "Tiyatro",
      "Hikâye",
      "Fabl"
    ],
    "correctAnswer": 1,
    "explanation": "Tiyatro Antik Yunan dini bayramlarındaki koro ve taklit gösterilerinden doğmuştur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u6-t1-q2",
    "topicId": "tde-u6-t1",
    "type": "multiple_choice",
    "questionText": "Klasik trajedide ve komedide uygulanan; olayın tek bir yerde, tek bir ana olay etrafında ve en fazla 24 saat içinde geçmesini öngören kurala ne ad verilir?",
    "options": [
      "Üç birlik kuralı",
      "Perde kuralı",
      "Diyalog ilkesi",
      "Koro düzeni"
    ],
    "correctAnswer": 0,
    "explanation": "Üç birlik kuralı: Zaman birliği (24 saat), yer birliği (tek mekân) ve olay birliğidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u6-t1-q3",
    "topicId": "tde-u6-t1",
    "type": "true_false",
    "questionText": "Dram türü, hayatı hem acıklı hem de gülünç yönleriyle bir arada ele alan ve üç birlik kuralına uyma zorunluluğu olmayan modern tiyatro türüdür.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Dram, Shakespeare ve Victor Hugo ile romantizm döneminde kuralları yıkarak ortaya çıkmıştır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u6-t1-q4",
    "topicId": "tde-u6-t1",
    "type": "multiple_choice",
    "questionText": "Türk edebiyatında Batılı anlamda sahnelenen ilk tiyatro eseri ve yazarı hangisidir?",
    "options": [
      "Şair Evlenmesi - İbrahim Şinasi",
      "Vatan yahut Silistre - Namık Kemal",
      "Çok Bilen Çok Yanılır - Recaizade Mahmut Ekrem",
      "Kösem Sultan - Turan Oflazoğlu"
    ],
    "correctAnswer": 1,
    "explanation": "İlk yazılan tiyatro Şinasi'nin Şair Evlenmesi'dir; sahnede ilk oynanan (sahnelenen) tiyatro ise Namık Kemal'in Vatan yahut Silistre'sidir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u6-t2-q1",
    "topicId": "tde-u6-t2",
    "type": "multiple_choice",
    "questionText": "Geleneksel gölge oyunumuz Karagöz ile ilgili aşağıdakilerden hangisi yanlıştır?",
    "options": [
      "Deve veya manda derisinden yapılan tasvirler beyaz bir perdeye yansıtılır.",
      "Karagöz halkı temsil eder, Hacivat ise aydın ve medrese diliyle konuşur.",
      "Tüm karakterleri \"Hayali\" (Hayalbaz) adı verilen tek bir sanatçı seslendirir.",
      "Önceden ezberlenmiş katı yazılı bir tiyatro metnine harfiyen uyulur."
    ],
    "correctAnswer": 3,
    "explanation": "Geleneksel Türk tiyatrosu yazılı metne dayanmaz; doğaçlama (tuluat) yöntemiyle icra edilir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u6-t2-q2",
    "topicId": "tde-u6-t2",
    "type": "multiple_choice",
    "questionText": "Orta Oyununda Karagöz oyunundaki Karagöz'ün karşılığı olan saf halk tipi ile Hacivat'ın karşılığı olan okumuş yarı aydın tip hangi seçenekte doğru eşleştirilmiştir?",
    "options": [
      "Kavuklu = Karagöz, Pişekâr = Hacivat",
      "Pişekâr = Karagöz, Kavuklu = Hacivat",
      "Zenne = Karagöz, Çelebi = Hacivat",
      "Matiz = Karagöz, Beberuhi = Hacivat"
    ],
    "correctAnswer": 0,
    "explanation": "Kavuklu halk adamı olup Karagöz'ü, Pişekâr ise oyunu yönlendiren Hacivat'ı temsil eder.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u6-t2-q3",
    "topicId": "tde-u6-t2",
    "type": "true_false",
    "questionText": "Meddah, elinde bir mendil (yağlık) ve baston (değnek) ile yüksek bir yerde oturup tek başına hikâyeler anlatan ve taklitler yapan geleneksel anlatı sanatçısıdır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Meddah tek kişilik bir seyirlik oyundur; mendili ve sopasını ses ve rol değişimlerinde aksesuar olarak kullanır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u6-t2-q4",
    "topicId": "tde-u6-t2",
    "type": "multiple_choice",
    "questionText": "Gölge oyunu ve Orta Oyununun dört ana bölümü hangi seçenekte kronolojik olarak doğru verilmiştir?",
    "options": [
      "Mukaddime (Giriş) -> Muhavere (Söyleşme) -> Fasıl (Asıl Oyun) -> Bitiş",
      "Fasıl -> Mukaddime -> Muhavere -> Bitiş",
      "Bitiş -> Muhavere -> Fasıl -> Mukaddime",
      "Giriş -> Düğüm -> Çözüm -> Dilek"
    ],
    "correctAnswer": 0,
    "explanation": "Klasik bölümler: Mukaddime (giriş), Muhavere (atışma/söyleşme), Fasıl (asıl oyun) ve Bitiş (özür dileme ve gelecek oyun duyurusu) şeklindedir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u6-t3-q1",
    "topicId": "tde-u6-t3",
    "type": "multiple_choice",
    "questionText": "\"Öğrenciler dersi dikkatle dinlediler\" cümlesinde fiili niteleyen \"dikkatle\" sözcüğü hangi zarf türüdür?",
    "options": [
      "Durum (Hâl) zarfı",
      "Zaman zarfı",
      "Yer-yön zarfı",
      "Miktar zarfı"
    ],
    "correctAnswer": 0,
    "explanation": "Fiile sorulan \"Nasıl dinlediler?\" sorusuna yanıt veren belirteç durum zarfıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u6-t3-q2",
    "topicId": "tde-u6-t3",
    "type": "multiple_choice",
    "questionText": "Yer-yön zarfları (içeri, dışarı, yukarı, aşağı, ileri, geri) ile ilgili aşağıdakilerden hangisi doğrudur?",
    "options": [
      "İsmin hal eklerini alırlarsa zarf olmaktan çıkıp isimleşirler.",
      "Daima fiilden sonra gelirler.",
      "Sadece sıfatları nitelerler.",
      "İsim tamlamasında tamlayan olurlar."
    ],
    "correctAnswer": 0,
    "explanation": "\"Aşağı indi\" (zarftır), ancak \"Aşağıya indi\" (-e hal eki aldığı an isimleşir). Ek almamaları şarttır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "tde-u6-t3-q3",
    "topicId": "tde-u6-t3",
    "type": "true_false",
    "questionText": "\"Dün akşam bize geldi\" cümlesindeki \"dün akşam\" söz grubu eylemin gerçekleştiği zamanı bildiren bir zaman zarfıdır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Fiile sorulan \"Ne zaman geldi?\" sorusunun cevabı zaman zarfıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "tde-u6-t3-q4",
    "topicId": "tde-u6-t3",
    "type": "multiple_choice",
    "questionText": "Aşağıdaki cümlelerin hangisinde \"en, çok, daha\" gibi bir miktar (üstünlük/derecelendirme) zarfı kullanılmıştır?",
    "options": [
      "Sınıfın en çalışkan öğrencisidir.",
      "Hızlı koşarak yetişti.",
      "Sabah erkenden yola çıktı.",
      "Buraya niçin geldin?"
    ],
    "correctAnswer": 0,
    "explanation": "\"En\", çalışkan sıfatının derecesini belirten miktar (üstünlük) zarfıdır.",
    "difficulty": 2,
    "xpValue": 15
  }
];
