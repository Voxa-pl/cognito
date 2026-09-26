import { Question } from '@/types';

export const biyolojiQuestions: Question[] = [
  // biy-u1-t1: Canlıların Ortak Özellikleri (6 questions)
  {
    id: 'biy-u1-t1-q1',
    topicId: 'biy-u1-t1',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi tüm canlı organizmalar tarafından ortak olarak gerçekleştirilen bir faaliyettir?',
    options: ['Fotosentez yapma', 'Hücresel solunum ile ATP üretme', 'Eşeyli üreme', 'Aktif yer değiştirme hareketi'],
    correctAnswer: 1,
    explanation: 'Tüm canlılar yaşamsal faaliyetleri için gerekli enerjiyi hücresel solunum (veya fermantasyon) ile ATP üreterek sağlarlar.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t1-q2',
    topicId: 'biy-u1-t1',
    type: 'true_false',
    questionText: 'Canlının değişen çevre şartlarına rağmen kararlı bir iç denge sürdürmesine "homeostazi" denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Homeostazi (örneğin vücut sıcaklığının veya kan pH\'sının dengede tutulması) tüm canlıların ortak özelliğidir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t1-q3',
    topicId: 'biy-u1-t1',
    type: 'multiple_choice',
    questionText: 'Canlıların metabolizma olayları anabolizma (yapım) ve katabolizma (yıkım) olarak ikiye ayrılır. Aşağıdakilerden hangisi bir anabolizma örneğidir?',
    options: ['Oksijenli solunum', 'Protein sentezi', 'Glikozun parçalanması', 'Hücre içi sindirim'],
    correctAnswer: 1,
    explanation: 'Amino asitlerden protein sentezlenmesi bir dehidrasyon ve yapım (anabolizma / özümleme) olayıdır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u1-t1-q4',
    topicId: 'biy-u1-t1',
    type: 'true_false',
    questionText: 'Üreme, bir canlının bireysel olarak yaşamını sürdürebilmesi için zorunlu bir olaydır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 1,
    explanation: 'Üreme bireyin hayatta kalması için değil, türün devamlılığı ve neslin tükenmemesi için gereklidir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u1-t1-q5',
    topicId: 'biy-u1-t1',
    type: 'multiple_choice',
    questionText: 'Tüm canlıların hücre yapısında ortak olarak bulunan organel aşağıdakilerden hangisidir?',
    options: ['Mitokondri', 'Ribozom', 'Kloroplast', 'Endoplazmik Retikulum'],
    correctAnswer: 1,
    explanation: 'Ribozom zarsız bir organeldir ve prokaryot ve ökaryot tüm canlı hücrelerde protein sentezi için mutlaka bulunur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t1-q6',
    topicId: 'biy-u1-t1',
    type: 'multiple_choice',
    questionText: 'Canlıların çevrelerine uyum sağlayarak yaşama ve üreme şanslarını artıran kalıtsal özelliklerine ne denir?',
    options: ['Adaptasyon', 'Modifikasyon', 'Mutasyon', 'Metamorfoz'],
    correctAnswer: 0,
    explanation: 'Adaptasyon (örneğin kaktüsün yapraklarının dikene dönüşmesi), canlının hayatta kalma başarısını artıran kalıtsal uyumdur.',
    difficulty: 1,
    xpValue: 10,
  },

  // biy-u1-t2: İnorganik Bileşikler (6 questions)
  {
    id: 'biy-u1-t2-q1',
    topicId: 'biy-u1-t2',
    type: 'multiple_choice',
    questionText: 'Aşağıdakilerden hangisi inorganik bileşiklerin özelliklerinden biri değildir?',
    options: ['Canlılar tarafından sentezlenemeyip dışarıdan hazır alınırlar.', 'Sindirilmeden hücre zarından doğrudan geçebilirler.', 'Hücrede öncelikli olarak enerji verici olarak kullanılırlar.', 'Enzimlerin yapısına kofaktör olarak katılabilirler.'],
    correctAnswer: 2,
    explanation: 'İnorganik maddeler (su, mineraller, tuzlar, asit-bazlar) asla enerji verici (ATP üretiminde yakıt) olarak kullanılmazlar.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u1-t2-q2',
    topicId: 'biy-u1-t2',
    type: 'true_false',
    questionText: 'Su moleküllerinin hidrojen bağları sayesinde birbirini çekmesine "kohezyon", suya başka yüzeylerin tutunmasına "adezyon" denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Kohezyon ve adezyon kuvvetleri, bitkilerde suyun yerçekimine zıt olarak metrelerce yukarı taşınmasını sağlar.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u1-t2-q3',
    topicId: 'biy-u1-t2',
    type: 'multiple_choice',
    questionText: 'İnsan vücudunda hemoglobin proteininin yapısında oksijen taşınmasını sağlayan temel mineral hangisidir?',
    options: ['Kalsiyum (Ca)', 'Demir (Fe)', 'Magnezyum (Mg)', 'İyot (I)'],
    correctAnswer: 1,
    explanation: 'Demir minerali kanda alyuvarlardaki hemoglobinin merkezinde yer alır; eksikliğinde anemi (kansızlık) görülür.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t2-q4',
    topicId: 'biy-u1-t2',
    type: 'true_false',
    questionText: 'Suyun özgül ısısının yüksek olması, denizlerin ve karaların sıcaklığının dengelenmesinde ve canlıların vücut ısısının korunmasında hayati rol oynar.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Su geç ısınıp geç soğur; bu durum iklimlerin ılımanlaşmasını ve canlıların ani sıcaklık şoklarından korunmasını sağlar.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t2-q5',
    topicId: 'biy-u1-t2',
    type: 'multiple_choice',
    questionText: 'Klorofil pigmentinin yapısında merkez atom olarak bulunan ve eksikliğinde bitki yapraklarında sararma görülen mineral hangisidir?',
    options: ['Magnezyum (Mg)', 'Sodyum (Na)', 'Kalsiyum (Ca)', 'Klor (Cl)'],
    correctAnswer: 0,
    explanation: 'Magnezyum klorofilin sentezi ve yapısı için zorunlu temel mineraldir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u1-t2-q6',
    topicId: 'biy-u1-t2',
    type: 'multiple_choice',
    questionText: 'Tiroit bezinden salgılanan tiroksin hormonunun yapısına katılan mineral hangisidir?',
    options: ['Fosfor', 'Kükürt', 'İyot', 'Çinko'],
    correctAnswer: 2,
    explanation: 'Tiroksin yapısında iyot bulunur; iyot yetersizliğinde tiroit bezi büyür ve basit guatr hastalığı meydana gelir.',
    difficulty: 2,
    xpValue: 15,
  },

  // biy-u1-t3: Organik Bileşikler (6 questions)
  {
    id: 'biy-u1-t3-q1',
    topicId: 'biy-u1-t3',
    type: 'multiple_choice',
    questionText: 'Açlık durumunda vücudumuzda enerji elde etmek için kullanılan organik moleküllerin kullanım sırası nasıldır?',
    options: ['Karbonhidrat - Yağ - Protein', 'Yağ - Karbonhidrat - Protein', 'Protein - Yağ - Karbonhidrat', 'Karbonhidrat - Protein - Yağ'],
    correctAnswer: 0,
    explanation: 'Hücreler ilk önce kolay parçalanan karbonhidratları, sonra yüksek enerjili yağları, en son ise yapısal olan proteinleri tüketir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t3-q2',
    topicId: 'biy-u1-t3',
    type: 'multiple_choice',
    questionText: 'Bitkilerde fotosentez sonucu üretilen glikozun depo formu olan polisakkarit hangisidir?',
    options: ['Glikojen', 'Nişasta', 'Selüloz', 'Kitin'],
    correctAnswer: 1,
    explanation: 'Bitkisel depo polisakkariti nişastadır; hayvanlarda, mantarlarda ve bakterilerde ise glikojendir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t3-q3',
    topicId: 'biy-u1-t3',
    type: 'true_false',
    questionText: 'Proteinlerin yapı taşları amino asitlerdir ve amino asitler birbirine peptit bağlarıyla bağlanır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Bir amino asidin karboksil grubu ile diğerinin amino grubu arasında peptit bağı kurulur ve su açığa çıkar.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t3-q4',
    topicId: 'biy-u1-t3',
    type: 'multiple_choice',
    questionText: 'Böceklerin dış iskeletinde ve mantarların hücre duvarında bulunan azotlu yapısal polisakkarit hangisidir?',
    options: ['Selüloz', 'Glikojen', 'Kitin', 'Nişasta'],
    correctAnswer: 2,
    explanation: 'Kitin, yapısında azot (N) atomu bulunduran tek yapısal polisakkarittir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u1-t3-q5',
    topicId: 'biy-u1-t3',
    type: 'true_false',
    questionText: 'Doymamış yağ asitleri oda sıcaklığında genellikle sıvı haldedir ve yapılarında en az bir çift karbon-karbon çift bağı (C=C) bulunur.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Zeytinyağı, ayçiçek yağı gibi bitkisel yağlar doymamış yağ asidi içerir ve sıvıdır.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u1-t3-q6',
    topicId: 'biy-u1-t3',
    type: 'multiple_choice',
    questionText: 'Yüksek sıcaklık, aşırı pH veya basınç etkisiyle bir proteinin üç boyutlu doğal yapısının bozulmasına ne ad verilir?',
    options: ['Denatürasyon', 'Renatürasyon', 'Dehidrasyon', 'Hidroliz'],
    correctAnswer: 0,
    explanation: 'Proteinin üçüncül ve ikincil yapısının bozularak işlevsizleşmesine denatürasyon denir (örneğin yumurtanın pişmesi).',
    difficulty: 2,
    xpValue: 15,
  },

  // biy-u1-t4: Enzimler, Nükleik Asitler ve ATP (6 questions)
  {
    id: 'biy-u1-t4-q1',
    topicId: 'biy-u1-t4',
    type: 'multiple_choice',
    questionText: 'Biyokimyasal tepkimelerin başlaması için gereken aktivasyon enerjisini düşüren biyolojik katalizörlere ne ad verilir?',
    options: ['Hormonlar', 'Enzimler', 'Vitaminler', 'Antikorlar'],
    correctAnswer: 1,
    explanation: 'Enzimler tepkimenin aktivasyon enerjisini düşürerek tepkime hızını milyonlarca kat artırırlar.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t4-q2',
    topicId: 'biy-u1-t4',
    type: 'true_false',
    questionText: 'DNA molekülünde Adenin ile Timin arasında 2, Guanin ile Sitozin arasında 3 hidrojen bağı kurulur.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Watson-Crick DNA modelinde A=T ikili, G≡C üçlü zayıf hidrojen bağı ile birbirine eşlenir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t4-q3',
    topicId: 'biy-u1-t4',
    type: 'multiple_choice',
    questionText: 'RNA molekülünde DNA\'daki Timin bazı yerine hangi pirimidin bazı bulunur?',
    options: ['Urasil', 'Guanin', 'Sitozin', 'Adenin'],
    correctAnswer: 0,
    explanation: 'Urasil sadece RNA\'da, Timin ise sadece DNA\'da bulunan karakteristik azotlu organik bazdır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t4-q4',
    topicId: 'biy-u1-t4',
    type: 'multiple_choice',
    questionText: 'Hücrenin evrensel enerji para birimi olan ATP molekülünün yapısında aşağıdakilerden hangisi yer almaz?',
    options: ['Adenin bazı', 'Riboz şekeri', '3 adet fosfat grubu', 'Deoksiriboz şekeri'],
    correctAnswer: 3,
    explanation: 'ATP yapısında 5 karbonlu şeker olarak deoksiriboz değil, riboz bulunur.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u1-t4-q5',
    topicId: 'biy-u1-t4',
    type: 'true_false',
    questionText: 'Enzimler tepkimelerden hiçbir değişikliğe uğramadan çıkarlar ve aynı tepkime için tekrar tekrar kullanılabilirler.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Enzimler tüketici değil katalizördür; substratı ürüne dönüştürdükten sonra serbest kalıp yeni substrata bağlanırlar.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u1-t4-q6',
    topicId: 'biy-u1-t4',
    type: 'multiple_choice',
    questionText: 'Bir enzimin etki ettiği özgül maddeye ne ad verilir?',
    options: ['Kofaktör', 'Koenzim', 'Substrat', 'Apoenzim'],
    correctAnswer: 2,
    explanation: 'Enzimin aktif bölgesine "anahtar-kilit" uyumuyla bağlanan moleküle substrat denir.',
    difficulty: 1,
    xpValue: 10,
  },

  // biy-u2-t2: Hücre Zarı ve Madde Geçişleri (6 questions)
  {
    id: 'biy-u2-t2-q1',
    topicId: 'biy-u2-t2',
    type: 'multiple_choice',
    questionText: 'Hücre zarından su moleküllerinin çok yoğun oldukları ortamdan az yoğun oldukları ortama yarı geçirgen zardan geçişine ne ad verilir?',
    options: ['Basit difüzyon', 'Osmoz', 'Aktif taşıma', 'Fagositoz'],
    correctAnswer: 1,
    explanation: 'Suyun yarı geçirgen zardan difüzyonuna özel olarak osmoz denir ve ATP harcanmaz.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u2-t2-q2',
    topicId: 'biy-u2-t2',
    type: 'multiple_choice',
    questionText: 'Maddelerin az yoğun ortamdan çok yoğun ortama taşınması ve bu sırada ATP enerjisi ile taşıyıcı proteinlerin kullanılması olayına ne ad verilir?',
    options: ['Kolaylaştırılmış difüzyon', 'Pinositoz', 'Aktif taşıma', 'Diyaliz'],
    correctAnswer: 2,
    explanation: 'Konsantrasyon gradyanına zıt yönde gerçekleşen ve enerji gerektiren taşımaya aktif taşıma denir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u2-t2-q3',
    topicId: 'biy-u2-t2',
    type: 'true_false',
    questionText: 'Bir bitki hücresi hipertonik (çok yoğun) ortama konulduğunda su kaybederek büzülür; bu olaya "plazmoliz" denir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Hipertonik ortamda hücre su kaybeder ve sitoplazma çeperden içeriye doğru büzüşür (plazmoliz).',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u2-t2-q4',
    topicId: 'biy-u2-t2',
    type: 'multiple_choice',
    questionText: 'Büyük katı moleküllerin yalancı ayaklar oluşturularak hücre içine koful şeklinde alınmasına ne ad verilir?',
    options: ['Fagositoz', 'Pinositoz', 'Ekzositoz', 'Turgor'],
    correctAnswer: 0,
    explanation: 'Endositozun katı maddeleri yutma formuna fagositoz (hücrenin yemesi) denir; örneğin akyuvarların bakterileri yutması.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u2-t2-q5',
    topicId: 'biy-u2-t2',
    type: 'true_false',
    questionText: 'Hücre çeperi (duvarı) olan hücreler endositoz (fagositoz ve pinositoz) yapamazlar.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Bitkiler, mantarlar ve bakteriler sert çeper nedeniyle hücre zarını içeriye doğru çökertip koful oluşturamazlar.',
    difficulty: 3,
    xpValue: 25,
  },
  {
    id: 'biy-u2-t2-q6',
    topicId: 'biy-u2-t2',
    type: 'multiple_choice',
    questionText: 'Hücre zarının yapısını açıklayan güncel bilimsel model aşağıdakilerden hangisidir?',
    options: ['Birim zar modeli', 'Akıcı Mozaik Zar Modeli', 'Sandviç modeli', 'Statik çift katman modeli'],
    correctAnswer: 1,
    explanation: 'Singer ve Nicolson tarafından önerilen Akıcı Mozaik Zar Modeli, çift katlı fosfolipit tabakasında yüzen proteinleri açıklar.',
    difficulty: 1,
    xpValue: 10,
  },

  // biy-u2-t3 to biy-u3-t4: Organeller and Canlılar Dünyası
  {
    id: 'biy-u2-t3-q1',
    topicId: 'biy-u2-t3',
    type: 'multiple_choice',
    questionText: 'Hücre içi sindirimden sorumlu olan ve hidrolitik (sindirim) enzimleri içeren tek zarlı organel hangisidir?',
    options: ['Mitokondri', 'Lizozom', 'Ribozom', 'Sentrozom'],
    correctAnswer: 1,
    explanation: 'Lizozom hücresel atıkları ve fagositozla alınan maddeleri parçalar; patlaması durumunda otoliz gerçekleşir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u2-t3-q2',
    topicId: 'biy-u2-t3',
    type: 'true_false',
    questionText: 'Mitokondri ve kloroplast organellerinin kendilerine ait halkasal DNA, RNA ve ribozomları bulunur.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Endosimbiyoz teorisine göre mitokondri ve kloroplast ata prokaryotlardan köken aldığı için kendi genetik materyallerine sahiptir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u3-t1-q1',
    topicId: 'biy-u3-t1',
    type: 'multiple_choice',
    questionText: 'Biyolojik sınıflandırmada en küçük temel birim olan ve çiftleştiklerinde verimli (kısır olmayan) döller verebilen canlılar topluluğuna ne ad verilir?',
    options: ['Tür', 'Cins', 'Familya', 'Şube'],
    correctAnswer: 0,
    explanation: 'Tür (Species), ortak bir atadan gelen ve verimli yavru üretebilen bireyler grubudur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'biy-u3-t2-q1',
    topicId: 'biy-u3-t2',
    type: 'true_false',
    questionText: 'Bakterilerin hücre duvarı peptidoglikan yapılıdır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Bakteriler peptidoglikan, arkeler psödopeptidoglikan, bitkiler selüloz, mantarlar kitin hücre duvarına sahiptir.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'biy-u3-t4-q1',
    topicId: 'biy-u3-t4',
    type: 'multiple_choice',
    questionText: 'Virüslerin biyolojik özellikleri ile ilgili aşağıdakilerden hangisi doğrudur?',
    options: ['Hücresel yapıya ve ribozoma sahiptirler.', 'Zorunlu hücre içi parazitidirler; canlı hücre dışında kristalleşirler.', 'Hem DNA hem de RNA molekülünü aynı anda bulundururlar.', 'Antibiyotik tedavisiyle kolayca yok edilirler.'],
    correctAnswer: 1,
    explanation: 'Virüsler enzim sistemleri ve ribozomları olmadığı için sadece canlı bir konak hücre içinde çoğalabilirler; antibiyotiklerden etkilenmezler.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    "id": "biy-u2-t1-q1",
    "topicId": "biy-u2-t1",
    "type": "multiple_choice",
    "questionText": "Aşağıdakilerden hangisi Hücre Teorisi'nin temel ilkelerinden biri değildir?",
    "options": [
      "Tüm canlılar bir ya da birden fazla hücreden oluşur.",
      "Hücreler, canlıların yapısal ve işlevsel temel birimidir.",
      "Bütün hücrelerde çekirdek zarı ve mitokondri bulunmak zorundadır.",
      "Tüm hücreler var olan bir hücrenin bölünmesiyle meydana gelir."
    ],
    "correctAnswer": 2,
    "explanation": "Bakteri ve arkeler gibi prokaryot hücrelerde çekirdek zarı ve zarlı organeller (mitokondri vb.) bulunmaz.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u2-t1-q2",
    "topicId": "biy-u2-t1",
    "type": "multiple_choice",
    "questionText": "Zarla çevrili belirgin bir çekirdeği ve zarlı organelleri bulunmayan, genetik materyali sitoplazmada çıplak halde bulunan hücre türü hangisidir?",
    "options": [
      "Ökaryot hücre",
      "Prokaryot hücre",
      "Bitki hücresi",
      "Mantar hücresi"
    ],
    "correctAnswer": 1,
    "explanation": "Bakteriler ve arkeler prokaryot hücre yapısına sahiptir; organel olarak sadece ribozom bulundururlar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u2-t1-q3",
    "topicId": "biy-u2-t1",
    "type": "true_false",
    "questionText": "Hem prokaryot hem de ökaryot tüm canlı hücrelerde hücre zarı, sitoplazma, ribozom ve genetik materyal (DNA/RNA) ortak olarak bulunur.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Hücre zarı, sitoplazma, DNA ve protein sentezleyen ribozom hücresel yaşamın evrensel ortak bileşenleridir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u2-t1-q4",
    "topicId": "biy-u2-t1",
    "type": "multiple_choice",
    "questionText": "Bitki hücresi ile hayvan hücresi karşılaştırıldığında aşağıdakilerden hangisi yalnızca gelişmiş bitki hücrelerinde bulunur?",
    "options": [
      "Mitokondri",
      "Selüloz hücre duvarı ve kloroplast",
      "Ribozom",
      "Hücre zarı"
    ],
    "correctAnswer": 1,
    "explanation": "Hücre duvarı ve kloroplast bitkilere özgüdür; hayvan hücrelerinde hücre duvarı bulunmaz.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u2-t3-q3",
    "topicId": "biy-u2-t3",
    "type": "multiple_choice",
    "questionText": "Hücrede salgı maddelerinin üretilmesi, paketlenmesi ve salgılanmasından sorumlu üst üste dizilmiş yassı keseciklerden oluşan organel hangisidir?",
    "options": [
      "Golgi cisimciği",
      "Ribozom",
      "Peroksizom",
      "Sentrozom"
    ],
    "correctAnswer": 0,
    "explanation": "Golgi aygıtı protein ve lipitleri işleyip glikoprotein gibi moleküllere dönüştürerek veziküllerle salgılar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u2-t3-q4",
    "topicId": "biy-u2-t3",
    "type": "multiple_choice",
    "questionText": "Hücre bölünmesi sırasında iğ ipliklerini oluşturan ve hayvan hücrelerinde bulunan zarsız organel çifti hangisidir?",
    "options": [
      "Kloroplast",
      "Sentrozom (sentriyoller)",
      "Koful",
      "Lizozom"
    ],
    "correctAnswer": 1,
    "explanation": "Sentrozom mikrotübül yapılı iki sentriyolden oluşur ve hücre bölünmesinde kromozomların kutuplara çekilmesini sağlar.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u2-t4-q1",
    "topicId": "biy-u2-t4",
    "type": "multiple_choice",
    "questionText": "Ökaryot hücre çekirdeğinde ribozomların alt birimlerinin ve rRNA'nın sentezlendiği yoğun bölgeye ne ad verilir?",
    "options": [
      "Çekirdek zarı (Karyoteka)",
      "Çekirdekçik (Nukleolus)",
      "Kromatin iplik",
      "Sentromer"
    ],
    "correctAnswer": 1,
    "explanation": "Çekirdekçik rRNA sentezi ve ribozomal proteinlerin birleştirilerek ribozom alt birimlerinin üretildiği merkezdir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u2-t4-q2",
    "topicId": "biy-u2-t4",
    "type": "true_false",
    "questionText": "Bölünme evresinde olmayan bir ökaryot hücrede DNA ve histon proteinlerinden oluşan ipliksi ağ yapısına \"kromatin\" denir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Hücre bölünmesi başlarken kromatin iplikler kısalıp kalınlaşarak belirgin kromozomlara dönüşür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u2-t4-q3",
    "topicId": "biy-u2-t4",
    "type": "multiple_choice",
    "questionText": "Çok hücreli bir canlıda basitten karmaşığa doğru hücresel organizasyon basamakları hangi seçenekte doğru sıralanmıştır?",
    "options": [
      "Hücre -> Organ -> Doku -> Sistem -> Organizma",
      "Hücre -> Doku -> Organ -> Sistem -> Organizma",
      "Doku -> Hücre -> Sistem -> Organ -> Organizma",
      "Organizma -> Sistem -> Organ -> Doku -> Hücre"
    ],
    "correctAnswer": 1,
    "explanation": "Benzer hücreler dokuları, dokular organları, organlar sistemleri, sistemler de organizmayı oluşturur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u2-t4-q4",
    "topicId": "biy-u2-t4",
    "type": "multiple_choice",
    "questionText": "Çekirdek zarı (karyoteka) üzerinde bulunan porlar (geçitler) ile hücre zarındaki porlar karşılaştırıldığında çekirdek porları hakkında hangisi doğrudur?",
    "options": [
      "Hücre zarı porlarından çok daha geniştir, RNA ve protein gibi büyük polimerlerin geçişine izin verir.",
      "Hücre zarı porlarından daha küçüktür.",
      "Sadece su moleküllerinin geçişine izin verir.",
      "DNA molekülünün sitoplazmaya çıkmasını sağlar."
    ],
    "correctAnswer": 0,
    "explanation": "Çekirdek porları ribozom alt birimleri ve RNA'ların sitoplazmaya geçebileceği büyüklüktedir; ancak DNA çekirdekten dışarı çıkamaz.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u3-t1-q2",
    "topicId": "biy-u3-t1",
    "type": "multiple_choice",
    "questionText": "Kökenleri (orijinleri) aynı, görevleri benzer veya farklı olabilen organlara ne ad verilir ve doğal sınıflandırmada temel alınır?",
    "options": [
      "Analog organlar",
      "Homolog organlar",
      "Kör organlar",
      "Yapay organlar"
    ],
    "correctAnswer": 1,
    "explanation": "İnsanın kolu, balinanın yüzgeci ve kuşun kanadı homolog organdır; evrimsel akrabalığı ve filogenetik sınıflandırmayı kanıtlar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u3-t1-q3",
    "topicId": "biy-u3-t1",
    "type": "multiple_choice",
    "questionText": "Sınıflandırma basamaklarında \"Tür\"den \"Âlem\"e doğru gidildikçe aşağıdaki özelliklerden hangisi gerçekleşir?",
    "options": [
      "Birey sayısı ve çeşitlilik artar, ortak gen benzerliği azalır",
      "Akrabalık derecesi artar",
      "Ortak özellikler çoğalır",
      "Protein benzerliği maksimum olur"
    ],
    "correctAnswer": 0,
    "explanation": "Türden âleme çıkıldıkça canlı sayısı ve çeşitlilik artar, ancak benzerlik ve genetik akrabalık azalır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u3-t1-q4",
    "topicId": "biy-u3-t1",
    "type": "true_false",
    "questionText": "İkili adlandırma (Binomial nomenclature) kuralına göre \"Pinus nigra\" (Karaçam) adlandırmasındaki ilk kelime \"Pinus\" canlının cins adını belirtir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "İlk kelime cins (Genus) adıdır ve büyük harfle başlar; ikinci kelime ise tanımlayıcı sıfattır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u3-t2-q2",
    "topicId": "biy-u3-t2",
    "type": "multiple_choice",
    "questionText": "Bakterilerin olumsuz çevre koşullarında (aşırı sıcaklık, kuraklık) hayatta kalabilmek için oluşturdukları koruyucu dayanıklı yapıya ne ad verilir?",
    "options": [
      "Kapsül",
      "Endospor",
      "Plazmit",
      "Mezozom"
    ],
    "correctAnswer": 1,
    "explanation": "Endospor bir üreme şekli değil, metabolizmanın minimuma indirildiği bir hayatta kalma (savunma) adaptasyonudur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u3-t2-q3",
    "topicId": "biy-u3-t2",
    "type": "multiple_choice",
    "questionText": "Okyanus diplerindeki hidrotermal bacalarda, yanardağ kraterlerinde veya aşırı tuzlu göllerde (ekstrem koşullarda) yaşayabilen prokaryot canlılar grubu hangisidir?",
    "options": [
      "Arkeler (Archaea)",
      "Mantarlar",
      "Bitkiler",
      "Hayvanlar"
    ],
    "correctAnswer": 0,
    "explanation": "Arkeler zorlu ve ekstrem çevre şartlarında özel hücre zarı ve enzim yapıları sayesinde yaşayabilen mikroskobik canlılardır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u3-t2-q4",
    "topicId": "biy-u3-t2",
    "type": "true_false",
    "questionText": "Bakteriler arasında plazmit aracılığıyla gen aktarımını sağlayan ve antibiyotik direncinin yayılmasına yol açan olaya \"konjugasyon\" denir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Konjugasyonda iki bakteri arasında sitoplazmik köprü kurulur ve tek yönlü gen transferi yapılır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u3-t3-q1",
    "topicId": "biy-u3-t3",
    "type": "multiple_choice",
    "questionText": "Hem kloroplast bulundurarak ışıkta fotosentez yapabilen (üretici) hem de karanlıkta dışarıdan besin alabilen (tüketici) kamçılı tek hücreli protista hangisidir?",
    "options": [
      "Amip",
      "Öglena",
      "Paramesyum",
      "Plazmodyum"
    ],
    "correctAnswer": 1,
    "explanation": "Öglena kamçısı, göz lekesi (stigma) ve kloroplastı olan hem ototrof hem heterotrof tek hücreli ökaryottur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u3-t3-q2",
    "topicId": "biy-u3-t3",
    "type": "multiple_choice",
    "questionText": "Mantarlar âlemi (Fungi) ile ilgili aşağıdakilerden hangisi yanlıştır?",
    "options": [
      "Hücre duvarları kitin yapılıdır.",
      "Depo polisakkaritleri glikojendir.",
      "Fotosentez yaparak kendi besinlerini üretirler.",
      "Ayrıştırıcı (saprofit) veya parazit olarak beslenirler."
    ],
    "correctAnswer": 2,
    "explanation": "Mantarlar kloroplast bulundurmazlar ve asla fotosentez yapamazlar; tamamı heterotroftur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u3-t3-q3",
    "topicId": "biy-u3-t3",
    "type": "true_false",
    "questionText": "Bitkiler âleminin tüm üyeleri selüloz hücre duvarına sahip, nişasta depolayan çok hücreli ototrof ökaryotlardır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Bitkiler selüloz çeperli, klorofilli ve nişasta depolayan üretici canlılardır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u3-t3-q4",
    "topicId": "biy-u3-t3",
    "type": "multiple_choice",
    "questionText": "Tatlı sularda yaşayan tek hücreli protistlerde (amip, öglena, paramesyum) hücre içine giren fazla suyu dışarı pompalayan organel hangisidir?",
    "options": [
      "Besin kofulu",
      "Kontraktil (vurgan) koful",
      "Lizozom",
      "Mitokondri"
    ],
    "correctAnswer": 1,
    "explanation": "Kontraktil koful ATP harcayarak fazla suyu dışarı atar ve hücrenin hemoliz olup patlamasını önler.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u3-t4-q2",
    "topicId": "biy-u3-t4",
    "type": "multiple_choice",
    "questionText": "Vücutları kıllarla örtülü olan, yavrularını sütle besleyen ve akciğerlerinde alveol bulunduran omurgalı sınıfı hangisidir?",
    "options": [
      "Kuşlar",
      "Sürüngenler",
      "Memeliler",
      "İki yaşamlılar (Amfibiler)"
    ],
    "correctAnswer": 2,
    "explanation": "Süt bezleri, kıl örtüsü, diyafram kası ve alveollü akciğer yalnızca memelilere (Mammalia) ait özelliklerdir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u3-t4-q3",
    "topicId": "biy-u3-t4",
    "type": "true_false",
    "questionText": "Virüsler antibiyotik tedavisiyle yok edilemez çünkü hücresel yapıları, ribozomları ve metabolik enzim sistemleri yoktur.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Antibiyotikler bakteriyel hücre duvarı ve enzimlerini hedefler; virüslerde hücre duvarı olmadığı için antibiyotik etki etmez.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u3-t4-q4",
    "topicId": "biy-u3-t4",
    "type": "multiple_choice",
    "questionText": "Aşağıdaki omurgasız hayvan gruplarından hangisi tür sayısı bakımından hayvanlar âleminin en geniş grubunu oluşturur?",
    "options": [
      "Süngerler",
      "Yumuşakçalar",
      "Eklem bacaklılar (Böcekler vb.)",
      "Derisi dikenliler"
    ],
    "correctAnswer": 2,
    "explanation": "Böcekleri de içeren eklem bacaklılar (Arthropoda) kitin dış iskeletleri ve adaptasyon yetenekleriyle yeryüzündeki en zengin gruptur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u4-t1-q1",
    "topicId": "biy-u4-t1",
    "type": "multiple_choice",
    "questionText": "Mitoz bölünmenin hangi evresinde kromozomlar hücrenin ekvatoral düzleminde tek sıra halinde yan yana dizilir ve karyotip analizi yapılır?",
    "options": [
      "Profaz",
      "Metafaz",
      "Anafaz",
      "Telofaz"
    ],
    "correctAnswer": 1,
    "explanation": "Metafazda kromozomlar en belirgin ve düzenli hallerini alır; ekvatoral düzlemde dizilirler.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u4-t1-q2",
    "topicId": "biy-u4-t1",
    "type": "multiple_choice",
    "questionText": "Mitozun anafaz evresinde gerçekleşen en temel hücresel olay hangisidir?",
    "options": [
      "Çekirdek zarının erimesi",
      "Kardeş kromatitlerin ayrılarak zıt kutuplara çekilmesi",
      "DNA replikasyonu",
      "Ara lamel oluşumu"
    ],
    "correctAnswer": 1,
    "explanation": "Anafaz evresinde sentromer bölünmesi gerçekleşir ve kardeş kromatitler zıt kutuplara çekilerek bağımsız kromozom olur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u4-t1-q3",
    "topicId": "biy-u4-t1",
    "type": "true_false",
    "questionText": "Bitki hücrelerinde sitokinez (sitoplazma bölünmesi) boğumlanma ile değil, Golgi aygıtının ürettiği ara lamel (orta plak) oluşumuyla gerçekleşir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Bitkilerde sert selüloz hücre duvarı boğumlanmayı engeller; içeriden dışarıya doğru ara lamel örülür.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u4-t1-q4",
    "topicId": "biy-u4-t1",
    "type": "multiple_choice",
    "questionText": "Patatesin yumru gövdesinden, çileğin sürünücü gövdesinden yeni bitkilerin gelişmesi hangi eşeysiz üreme çeşididir?",
    "options": [
      "Sporla üreme",
      "Vejetatif üreme",
      "Tomurcuklanma",
      "Rejenerasyon"
    ],
    "correctAnswer": 1,
    "explanation": "Gelişmiş bitkilerin dal, yaprak, kök veya gövde gibi vejetatif kısımlarından yeni birey oluşumu vejetatif üremedir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u4-t2-q1",
    "topicId": "biy-u4-t2",
    "type": "multiple_choice",
    "questionText": "Mayoz bölünmenin Profaz I evresinde homolog kromozomların kardeş olmayan kromatitleri arasında parça değişimi olayına ne ad verilir?",
    "options": [
      "Krossing-over",
      "Sinapsis",
      "Tetrat",
      "Sentromer ayrılması"
    ],
    "correctAnswer": 0,
    "explanation": "Krossing-over, genetik çeşitliliğin (rekombinasyon) ortaya çıkmasını sağlayan temel mekanizmadır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u4-t2-q2",
    "topicId": "biy-u4-t2",
    "type": "multiple_choice",
    "questionText": "Mayoz bölünme sonucunda 2n = 46 kromozomlu bir üreme ana hücresinden kaç hücre oluşur ve oluşan yavru hücrelerin kromozom sayısı ne olur?",
    "options": [
      "2 hücre - 46 kromozom",
      "4 hücre - 23 kromozom",
      "4 hücre - 46 kromozom",
      "2 hücre - 23 kromozom"
    ],
    "correctAnswer": 1,
    "explanation": "Mayoz bölünme sonucunda kromozom sayısı yarıya inmiş (n = 23) 4 adet haploit gamet hücresi meydana gelir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u4-t2-q3",
    "topicId": "biy-u4-t2",
    "type": "true_false",
    "questionText": "Mayoz bölünme ve döllenme olayları, nesiller boyunca tür içi kromozom sayısının sabit kalmasını sağlar.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Gamet oluşumunda kromozom yarıya iner (n), döllenmeyle tekrar iki katına çıkar (2n); böylece kromozom sayısı tür içinde sabit kalır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u4-t2-q4",
    "topicId": "biy-u4-t2",
    "type": "multiple_choice",
    "questionText": "Mayoz I'in anafaz I evresinde rastgele gerçekleşen hangi olay genetik çeşitliliğin temel nedenlerinden biridir?",
    "options": [
      "Homolog kromozomların bağımsız olarak kutuplara çekilmesi",
      "Çekirdekçiğin yeniden oluşması",
      "Hücre zarının erimesi",
      "Kardeş kromatitlerin ayrılması"
    ],
    "correctAnswer": 0,
    "explanation": "Homolog kromozomların rastgele ve bağımsız kutuplara dağılması kalıtsal çeşitliliğin en önemli kaynağıdır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u4-t3-q1",
    "topicId": "biy-u4-t3",
    "type": "multiple_choice",
    "questionText": "Mitoz ve mayoz bölünme arasındaki farklarla ilgili aşağıdakilerden hangisi yanlıştır?",
    "options": [
      "Mitozda 2, mayozda 4 yeni hücre oluşur.",
      "Mitozda kromozom sayısı sabit kalırken, mayozda yarıya iner.",
      "Mitozda krossing-over ve tetrat görülür.",
      "Mitoz vücut hücrelerinde gerçekleşirken, mayoz üreme ana hücrelerinde görülür."
    ],
    "correctAnswer": 2,
    "explanation": "Krossing-over, tetrat ve sinapsis olayları sadece mayozun Profaz I evresinde görülür; mitozda görülmez.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u4-t3-q2",
    "topicId": "biy-u4-t3",
    "type": "true_false",
    "questionText": "Mitoz bölünme tek hücrelilerde üremeyi, çok hücrelilerde ise büyüme, gelişme ve doku onarımını sağlar.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Yaraların iyileşmesi, saç ve tırnak uzaması gibi olaylar mitoz bölünmeyle sağlanır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u4-t3-q3",
    "topicId": "biy-u4-t3",
    "type": "multiple_choice",
    "questionText": "Mitoz bölünme ile mayoz bölünmenin ortak özelliği aşağıdakilerden hangisidir?",
    "options": [
      "Kromozom sayısının değişmemesi",
      "Bölünme öncesinde interfaz evresinde DNA replikasyonu gerçekleşmesi",
      "Dört yavru hücre oluşması",
      "Homolog kromozom ayrılması"
    ],
    "correctAnswer": 1,
    "explanation": "Her iki bölünme öncesinde de interfaz evresinde DNA kendini bir kez eşler (replikasyon).",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u4-t3-q4",
    "topicId": "biy-u4-t3",
    "type": "multiple_choice",
    "questionText": "2n = 16 kromozomlu bir hücre art arda 3 mitoz bölünme geçirirse oluşan hücre sayısı ve kromozom sayısı ne olur?",
    "options": [
      "6 hücre - 8 kromozom",
      "8 hücre - 16 kromozom",
      "16 hücre - 16 kromozom",
      "8 hücre - 8 kromozom"
    ],
    "correctAnswer": 1,
    "explanation": "Hücre sayısı = 2^n = 2³ = 8 hücre. Mitozda kromozom sayısı değişmediğinden her hücre 16 kromozomludur.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u5-t1-q1",
    "topicId": "biy-u5-t1",
    "type": "multiple_choice",
    "questionText": "Besin zincirinde inorganik maddelerden organik besin üreten (fotosentez yapan) ve piramidin tabanında yer alan canlılar grubu hangisidir?",
    "options": [
      "Birincil tüketiciler (Otçullar)",
      "Üreticiler (Ototroflar)",
      "Ayrıştırıcılar (Saprofitler)",
      "İkincil tüketiciler (Etçiller)"
    ],
    "correctAnswer": 1,
    "explanation": "Yeşil bitkiler, algler ve siyanobakteriler gibi ototrof üreticiler ekosisteme enerjinin girdiği ilk basamaktır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u5-t1-q2",
    "topicId": "biy-u5-t1",
    "type": "multiple_choice",
    "questionText": "Bir besin piramidinde üreticilerden son tüketicilere doğru (aşağıdan yukarıya) çıkıldıkça hangisi gerçekleşir?",
    "options": [
      "Aktarılan enerji miktarı azalır (yaklaşık %10 kuralı)",
      "Biyolojik birikim (zehir miktarı) azalır",
      "Toplam biyokütle artar",
      "Birey sayısı hızla artar"
    ],
    "correctAnswer": 0,
    "explanation": "Her trofik basamakta enerjinin yaklaşık %90'ı ısı ve metabolizmada kaybolur, sadece %10'u üst basamağa aktarılır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u5-t1-q3",
    "topicId": "biy-u5-t1",
    "type": "true_false",
    "questionText": "Ayrıştırıcılar (bakteri ve mantarlar), besin zincirinin tüm basamaklarında görev yapar ve organik atıkları inorganik minerallere çevirirler.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Ayrıştırıcılar ölü organizmaları parçalayarak besin döngüsünün devamlılığını sağlar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u5-t1-q4",
    "topicId": "biy-u5-t1",
    "type": "multiple_choice",
    "questionText": "Besin zincirinde yer alan bir DDT veya ağır metal kirleticinin en yüksek konsantrasyonda biriktiği basamak hangisidir?",
    "options": [
      "Üreticiler (Bitkiler)",
      "Otçul hayvanlar",
      "Piramidin en tepesindeki son tüketici yırtıcılar",
      "Toprak bakterileri"
    ],
    "correctAnswer": 2,
    "explanation": "Biyolojik birikim besin zincirinde yukarı doğru katlanarak artar; en üst basamaktaki yırtıcı canlılarda maksimuma ulaşır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u5-t2-q1",
    "topicId": "biy-u5-t2",
    "type": "multiple_choice",
    "questionText": "Atmosferdeki serbest azotu (N₂) toprağa bağlayarak bitkilerin kullanabileceği nitrat tuzlarına dönüştüren canlı grubu hangisidir?",
    "options": [
      "Baklagil köklerindeki Rhizobium bakterileri ve siyanobakteriler",
      "Kuşlar ve memeliler",
      "Parazit mantarlar",
      "Böcekler"
    ],
    "correctAnswer": 0,
    "explanation": "Azot bağlayıcı bakteriler (fiksasyon) gaz halindeki azotu amonyum ve nitrata dönüştürerek besin zincirine sokar.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u5-t2-q2",
    "topicId": "biy-u5-t2",
    "type": "true_false",
    "questionText": "Fotosentez atmosferdeki karbondioksiti (CO₂) tüketirken; hücresel solunum ve fosil yakıt yanması atmosfere CO₂ verir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Karbon döngüsü fotosentez ile solunum/yanma süreçlerinin karşılıklı dengesi üzerine kuruludur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u5-t2-q3",
    "topicId": "biy-u5-t2",
    "type": "multiple_choice",
    "questionText": "Topraktaki azotlu bileşiklerin denitrifikasyon bakterileri tarafından tekrar serbest gaz (N₂) haline getirilerek atmosfere verilmesi sürecine ne ad verilir?",
    "options": [
      "Nitrifikasyon",
      "Denitrifikasyon",
      "Fosil yakıtlaşma",
      "Kemosentez"
    ],
    "correctAnswer": 1,
    "explanation": "Denitrifikasyon olayı topraktaki fazla azotu atmosfere geri döndürerek azot döngüsünü tamamlar.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "biy-u5-t2-q4",
    "topicId": "biy-u5-t2",
    "type": "multiple_choice",
    "questionText": "Bir bölgedeki genlerin, türlerin ve ekosistemlerin çeşitliliğinin tümünü ifade eden kavram hangisidir?",
    "options": [
      "Popülasyon yoğunluğu",
      "Biyoçeşitlilik",
      "Trofik düzey",
      "Habitat"
    ],
    "correctAnswer": 1,
    "explanation": "Biyoçeşitlilik ekosistemlerin dengesi, direnci ve insanlığın geleceği için en değerli zenginliktir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u5-t3-q1",
    "topicId": "biy-u5-t3",
    "type": "multiple_choice",
    "questionText": "Bir bireyin ya da toplumun tükettiği doğal kaynakların üretilmesi ve oluşturduğu atıkların bertaraf edilmesi için gereken verimli toprak ve su alanına ne ad verilir?",
    "options": [
      "Karbon katsayısı",
      "Ekolojik ayak izi",
      "Biyolojik spektrum",
      "Besin piramidi"
    ],
    "correctAnswer": 1,
    "explanation": "Ekolojik ayak izi insanların doğa üzerindeki tüketim baskısını küresel hektar (kha) cinsinden ölçer.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u5-t3-q2",
    "topicId": "biy-u5-t3",
    "type": "true_false",
    "questionText": "Sürdürülebilirlik, gelecek nesillerin ihtiyaçlarını tehlikeye atmadan bugünün ihtiyaçlarını karşılayabilmektir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Sürdürülebilir kalkınma doğal kaynakların kendini yenileme kapasitesine saygı duyarak tasarruflu kullanılmasını hedefler.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u5-t3-q3",
    "topicId": "biy-u5-t3",
    "type": "multiple_choice",
    "questionText": "Fosil yakıt kullanımı, ulaşım ve elektrik tüketimi sonucu atmosfere doğrudan veya dolaylı salınan sera gazı miktarına ne ad verilir?",
    "options": [
      "Su ayak izi",
      "Karbon ayak izi",
      "Toprak izi",
      "Biyo-iz"
    ],
    "correctAnswer": 1,
    "explanation": "Karbon ayak izi karbondioksit eşdeğeri cinsinden hesaplanan kişisel veya kurumsal sera gazı salınımıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "biy-u5-t3-q4",
    "topicId": "biy-u5-t3",
    "type": "multiple_choice",
    "questionText": "Aşağıdakilerden hangisi biyoçeşitliliğin azalmasına neden olan insan kaynaklı faktörlerden biri değildir?",
    "options": [
      "Doğal yaşam alanlarının (habitat) tahrip edilmesi ve parçalanması",
      "Aşırı ve kaçak avlanma",
      "Milli parklar ve koruma alanları oluşturulması",
      "İstilacı yabancı türlerin ekosisteme sokulması"
    ],
    "correctAnswer": 2,
    "explanation": "Milli parklar ve koruma alanları biyoçeşitliliği koruyan ve artıran olumlu çevre politikalarıdır.",
    "difficulty": 1,
    "xpValue": 10
  }
];
