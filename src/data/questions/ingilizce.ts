import { Question } from '@/types';

export const ingilizceQuestions: Question[] = [
  // ing-u1-t1: Greetings and Introductions (5 questions)
  {
    id: 'ing-u1-t1-q1',
    topicId: 'ing-u1-t1',
    type: 'multiple_choice',
    questionText: 'Choose the correct option to complete the sentence: "Hello! My name is Sarah and I ___ from Canada."',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 0,
    explanation: 'Birinci tekil şahıs "I" öznesi için "to be" fiilinin Present çekimi "am" dir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u1-t1-q2',
    topicId: 'ing-u1-t1',
    type: 'multiple_choice',
    questionText: '"Where are you from?" sorusuna verilebilecek en uygun cevap hangisidir?',
    options: ['I am a student.', 'I am from Germany.', 'I am sixteen years old.', 'I like playing guitar.'],
    correctAnswer: 1,
    explanation: '"Where are you from?" memleket/ülke sorar; "I am from Germany" (Almanya\'danım) doğru yanıttır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u1-t1-q3',
    topicId: 'ing-u1-t1',
    type: 'true_false',
    questionText: '"She is from Spain. She is Spanish." cümlesinde ülke ve milliyet kullanımı dil bilgisi açısından doğrudur.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Spain ülke (İspanya), Spanish ise milliyettir (İspanyol); eşleştirme kusursuzdur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u1-t1-q4',
    topicId: 'ing-u1-t1',
    type: 'multiple_choice',
    questionText: 'Complete the dialogue:\nTom: "Nice to meet you, Alex!"\nAlex: "___"',
    options: ['Nice to meet you too!', 'You are welcome.', 'I am fine, thank you.', 'See you yesterday.'],
    correctAnswer: 0,
    explanation: '"Nice to meet you" (Tanıştığıma memnun oldum) ifadesine standart karşılık "Nice to meet you too" dur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u1-t1-q5',
    topicId: 'ing-u1-t1',
    type: 'multiple_choice',
    questionText: 'Which pronoun correctly completes: "David and Lisa are doctors. ___ work in a big hospital."',
    options: ['We', 'They', 'He', 'It'],
    correctAnswer: 1,
    explanation: 'David ve Lisa üçüncü çoğul şahıs oldukları için "They" (Onlar) zamiri kullanılır.',
    difficulty: 1,
    xpValue: 10,
  },

  // ing-u2-t1: Rooms, Furniture and Prepositions (5 questions)
  {
    id: 'ing-u2-t1-q1',
    topicId: 'ing-u2-t1',
    type: 'multiple_choice',
    questionText: 'Where do people usually cook food and prepare dinner?',
    options: ['In the bedroom', 'In the bathroom', 'In the kitchen', 'In the attic'],
    correctAnswer: 2,
    explanation: 'Yemek pişirme odası "kitchen" (mutfak) dır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u2-t1-q2',
    topicId: 'ing-u2-t1',
    type: 'multiple_choice',
    questionText: '"The cat is sleeping ___ the table." (Kedi masanın ALTINDA uyuyor). Boşluğa hangi edat gelmelidir?',
    options: ['under', 'between', 'opposite', 'in front of'],
    correctAnswer: 0,
    explanation: '"Under" bir şeyin altında anlamına gelir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u2-t1-q3',
    topicId: 'ing-u2-t1',
    type: 'true_false',
    questionText: '"There are three books on the desk." cümlesinde çoğul isim (three books) için "There are" kullanımı doğrudur.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Çoğul nesnelerde "There are", tekil nesnelerde "There is" kullanılır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u2-t1-q4',
    topicId: 'ing-u2-t1',
    type: 'multiple_choice',
    questionText: 'Aşağıdaki mobilya kelimelerinden hangisi oturma odasında (living room) bulunan bir "kanepe / koltuk" tur?',
    options: ['Sofa', 'Wardrobe', 'Cooker', 'Mirror'],
    correctAnswer: 0,
    explanation: '"Sofa" veya "couch" kanepe / koltuk anlamındadır. Wardrobe gardırop, cooker ocaktır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u2-t1-q5',
    topicId: 'ing-u2-t1',
    type: 'multiple_choice',
    questionText: '"The library is ___ the bank and the post office." (Kütüphane banka ile postane ARASINDADIR). Boşluğa ne gelmelidir?',
    options: ['next to', 'between', 'behind', 'above'],
    correctAnswer: 1,
    explanation: 'İki şeyin arasında olma durumunda "... between A and B" kalıbı kullanılır.',
    difficulty: 2,
    xpValue: 15,
  },

  // ing-u3-t2: Present Simple: Daily Routines (5 questions)
  {
    id: 'ing-u3-t2-q1',
    topicId: 'ing-u3-t2',
    type: 'multiple_choice',
    questionText: 'Choose the correct form: "Mark always ___ his teeth before going to bed."',
    options: ['brush', 'brushes', 'brushing', 'brushed'],
    correctAnswer: 1,
    explanation: 'Present Simple tensede üçüncü tekil şahıs (He/She/It - Mark) için fiil -s/-es takısı alır: brushes.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u3-t2-q2',
    topicId: 'ing-u3-t2',
    type: 'multiple_choice',
    questionText: 'Choose the correct negative sentence in Present Simple:',
    options: ['She don\'t likes horror films.', 'She doesn\'t like horror films.', 'She not like horror films.', 'She doesn\'t likes horror films.'],
    correctAnswer: 1,
    explanation: 'Üçüncü tekil şahısta olumsuzluk "doesn\'t" ile yapılır ve ana fiil yalın kalır (like).',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'ing-u3-t2-q3',
    topicId: 'ing-u3-t2',
    type: 'true_false',
    questionText: 'Sıklık zarfları (always, usually, often, never) kural olarak asıl fiilden önce, "be" fiilinden sonra gelir.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Örneğin: "He usually wakes up early" ve "He is always polite" cümlelerinde kural tam olarak görülür.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'ing-u3-t2-q4',
    topicId: 'ing-u3-t2',
    type: 'multiple_choice',
    questionText: '"How often do you play basketball?" sorusuna hangisi uygun bir cevaptır?',
    options: ['At 5 o\'clock', 'Twice a week', 'In the garden', 'Because I like it'],
    correctAnswer: 1,
    explanation: '"How often" ne sıklıkla sorusudur; "Twice a week" (Haftada iki kez) sıklık belirtir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u3-t2-q5',
    topicId: 'ing-u3-t2',
    type: 'multiple_choice',
    questionText: 'Complete the question: "___ your brother speak French?"',
    options: ['Do', 'Does', 'Is', 'Are'],
    correctAnswer: 1,
    explanation: '"Your brother" üçüncü tekil şahıs (he) olduğu için soru yardımcı fiili "Does" dır.',
    difficulty: 1,
    xpValue: 10,
  },

  // ing-u4-t1: Abilities: Can and Can't (5 questions)
  {
    id: 'ing-u4-t1-q1',
    topicId: 'ing-u4-t1',
    type: 'multiple_choice',
    questionText: 'Choose the sentence that expresses inability:',
    options: ['Cheetahs can run very fast.', 'Dolphins can swim in the ocean.', 'Penguins can\'t fly in the air.', 'Eagles can see long distances.'],
    correctAnswer: 2,
    explanation: '"Penguins can\'t fly" (Penguenler uçamaz) yetersizlik ve yapamama (inability) bildirir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u4-t1-q2',
    topicId: 'ing-u4-t1',
    type: 'true_false',
    questionText: '"Can" modal fiilinden sonra gelen fiil daima hiçbir ek almadan yalın halde (V1) kullanılır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Örneğin: "She can play piano" doğrudur; "can plays" veya "can to play" yanlıştır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u4-t1-q3',
    topicId: 'ing-u4-t1',
    type: 'multiple_choice',
    questionText: 'Complete: "Can you speak Spanish?" - "No, I ___."',
    options: ['can', 'can\'t', 'don\'t', 'am not'],
    correctAnswer: 1,
    explanation: 'Can ile sorulan olumsuz kısa cevap "No, I can\'t" dır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u4-t1-q4',
    topicId: 'ing-u4-t1',
    type: 'multiple_choice',
    questionText: 'Which animal CANNOT breathe underwater?',
    options: ['Shark', 'Goldfish', 'Whale', 'Trout'],
    correctAnswer: 2,
    explanation: 'Balinalar (Whale) memelidir ve solungaçları yoktur; su altında nefes alamaz, yüzeye çıkıp akciğer solunumu yaparlar.',
    difficulty: 2,
    xpValue: 15,
  },
  {
    id: 'ing-u4-t1-q5',
    topicId: 'ing-u4-t1',
    type: 'true_false',
    questionText: '"I can ride a horse, but I can\'t drive a car." cümlesi zıtlık bildiren doğru bir kullanımdır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: '"But" bağlacı ile yapabildiği eylem ile yapamadığı eylem kusursuz bağlanmıştır.',
    difficulty: 1,
    xpValue: 10,
  },

  // ing-u5-t2: Comparative Adjectives (5 questions)
  {
    id: 'ing-u5-t2-q1',
    topicId: 'ing-u5-t2',
    type: 'multiple_choice',
    questionText: 'Complete the comparison: "A train is ___ than a bicycle."',
    options: ['faster', 'fast', 'more fast', 'fastest'],
    correctAnswer: 0,
    explanation: 'Tek heceli sıfatlar sonuna "-er" takısı alır: fast -> faster than.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u5-t2-q2',
    topicId: 'ing-u5-t2',
    type: 'multiple_choice',
    questionText: 'Choose the correct comparative form for "expensive":',
    options: ['expensiver than', 'more expensive than', 'most expensive than', 'expensive than'],
    correctAnswer: 1,
    explanation: 'Çok heceli sıfatların önüne "more" gelir: more expensive than.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u5-t2-q3',
    topicId: 'ing-u5-t2',
    type: 'true_false',
    questionText: '"Good" sıfatının comparative (kıyaslama) hali "gooder" dır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 1,
    explanation: '"Good" düzensiz bir sıfattır ve comparative hali "better" dır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u5-t2-q4',
    topicId: 'ing-u5-t2',
    type: 'multiple_choice',
    questionText: '"Mount Everest is ___ than Mount Ağrı."',
    options: ['higher', 'more high', 'highest', 'high'],
    correctAnswer: 0,
    explanation: 'High tek hecelidir ve "higher" olur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u5-t2-q5',
    topicId: 'ing-u5-t2',
    type: 'multiple_choice',
    questionText: '"Bad" sıfatının irregular comparative biçimi hangisidir?',
    options: ['baddest', 'more bad', 'worse', 'badder'],
    correctAnswer: 2,
    explanation: 'Bad -> worse -> the worst düzensiz sıfat çekimidir.',
    difficulty: 2,
    xpValue: 15,
  },

  // ing-u7-t2 to ing-u8-t2: Past Simple & Advice
  {
    id: 'ing-u7-t2-q1',
    topicId: 'ing-u7-t2',
    type: 'multiple_choice',
    questionText: 'What is the past simple form of the irregular verb "go"?',
    options: ['goed', 'went', 'gone', 'going'],
    correctAnswer: 1,
    explanation: '"Go" fiilinin Past Simple (V2) hali "went" tir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u7-t2-q2',
    topicId: 'ing-u7-t2',
    type: 'true_false',
    questionText: '"We visited the Topkapı Palace yesterday." cümlesi geçmiş zamanda düzenli bir fiille kurulmuştur.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Visit fiili düzenlidir ve sonuna -ed alarak visited olmuştur.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u8-t2-q1',
    topicId: 'ing-u8-t2',
    type: 'multiple_choice',
    questionText: '"I have a terrible toothache." diyen birine verilecek en uygun tavsiye hangisidir?',
    options: ['You should eat cold ice cream.', 'You should see a dentist immediately.', 'You shouldn\'t brush your teeth.', 'You should drink fizzy drinks.'],
    correctAnswer: 1,
    explanation: 'Diş ağrısı çeken birine verilecek mantıklı tavsiye "Bir diş hekimine görünmelisin" dir.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    id: 'ing-u8-t2-q2',
    topicId: 'ing-u8-t2',
    type: 'true_false',
    questionText: '"Should" ve "shouldn\'t" kipleri birine tavsiye (advice) vermek için kullanılır.',
    options: ['Doğru', 'Yanlış'],
    correctAnswer: 0,
    explanation: 'Should / Shouldn\'t öneri ve tavsiye anlatır.',
    difficulty: 1,
    xpValue: 10,
  },
  {
    "id": "ing-u1-t2-q1",
    "topicId": "ing-u1-t2",
    "type": "multiple_choice",
    "questionText": "Complete the sentence: \"This is my brother. ___ name is Kerem.\"",
    "options": [
      "Her",
      "His",
      "Its",
      "Their"
    ],
    "correctAnswer": 1,
    "explanation": "Erkek tekil şahıs (\"brother\") için kullanılan iyelik sıfatı (possessive adjective) \"his\" dir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u1-t2-q2",
    "topicId": "ing-u1-t2",
    "type": "multiple_choice",
    "questionText": "Choose the correct question word: \"___ are you from?\" - \"I am from Turkey.\"",
    "options": [
      "Who",
      "What",
      "Where",
      "When"
    ],
    "correctAnswer": 2,
    "explanation": "Memleket veya yer sorarken \"Where\" (Nerede/Nereden) soru sözcüğü kullanılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u1-t2-q3",
    "topicId": "ing-u1-t2",
    "type": "true_false",
    "questionText": "\"This is Ayşe's notebook.\" cümlesindeki kesme işareti ve 's takısı (apostrophe + s) sahiplik bildirir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Tekil isimlerin sonuna gelen 's takısı \"-in / -ın\" sahiplik eki görevi görür (Ayşe'nin defteri).",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u1-t2-q4",
    "topicId": "ing-u1-t2",
    "type": "multiple_choice",
    "questionText": "Which question asks about someone's age?",
    "options": [
      "How are you?",
      "How old are you?",
      "Who are you?",
      "Where are you?"
    ],
    "correctAnswer": 1,
    "explanation": "Yaş sormak için \"How old are you?\" (Kaç yaşındasın?) kalıbı kullanılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u2-t2-q1",
    "topicId": "ing-u2-t2",
    "type": "multiple_choice",
    "questionText": "Complete the sentence: \"___ three books and a laptop on the desk.\"",
    "options": [
      "There is",
      "There are",
      "It is",
      "They are"
    ],
    "correctAnswer": 1,
    "explanation": "Çoğul öznelerden (\"three books\") önce \"There are\" (Vardır) kullanılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u2-t2-q2",
    "topicId": "ing-u2-t2",
    "type": "multiple_choice",
    "questionText": "Which direction phrase means \"Düz git\"?",
    "options": [
      "Turn left",
      "Turn right",
      "Go straight ahead",
      "Cross the street"
    ],
    "correctAnswer": 2,
    "explanation": "\"Go straight ahead\", yön tariflerinde \"dosdoğru ileri git\" anlamına gelir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u2-t2-q3",
    "topicId": "ing-u2-t2",
    "type": "true_false",
    "questionText": "Olumsuz cümlelerde ve soru cümlelerinde sayılamayan veya çoğul isimlerle \"any\" (hiç) kullanılır: \"Is there any milk in the fridge?\"",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Olumlu cümlelerde \"some\", soru ve olumsuzlarda \"any\" kuralı geçerlidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u2-t2-q4",
    "topicId": "ing-u2-t2",
    "type": "multiple_choice",
    "questionText": "\"The pharmacy is ___ the supermarket and the bank.\" (Eczane, süpermarket ile bankanın arasındadır)",
    "options": [
      "behind",
      "between",
      "under",
      "on"
    ],
    "correctAnswer": 1,
    "explanation": "İki şeyin arasında olma durumu \"between ... and ...\" edatıyla ifade edilir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u3-t1-q1",
    "topicId": "ing-u3-t1",
    "type": "multiple_choice",
    "questionText": "Which movie genre features space travel, aliens, and futuristic technology?",
    "options": [
      "Romantic comedy",
      "Science fiction (Sci-Fi)",
      "Western",
      "Musical"
    ],
    "correctAnswer": 1,
    "explanation": "Bilim kurgu (Science fiction), uzay, gelecek teknolojileri ve evreni konu alan film türüdür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u3-t1-q2",
    "topicId": "ing-u3-t1",
    "type": "multiple_choice",
    "questionText": "Complete the preference: \"I prefer animations ___ action movies.\"",
    "options": [
      "than",
      "to",
      "for",
      "with"
    ],
    "correctAnswer": 1,
    "explanation": "\"Prefer\" fiili ile bir şeyi diğerine tercih ederken \"prefer X to Y\" kalıbı kullanılır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "ing-u3-t1-q3",
    "topicId": "ing-u3-t1",
    "type": "true_false",
    "questionText": "\"I can't stand horror movies.\" ifadesi \"Korku filmlerine dayanamam / hiç sevmem\" anlamına gelir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "\"Can't stand\", bir şeyden aşırı derecede hoşlanmamayı ve tahammül edememeyi ifade eder.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u3-t1-q4",
    "topicId": "ing-u3-t1",
    "type": "multiple_choice",
    "questionText": "Which phrase expresses strong enthusiasm for a movie?",
    "options": [
      "I hate it.",
      "It is terrible.",
      "I am crazy about it!",
      "It is boring."
    ],
    "correctAnswer": 2,
    "explanation": "\"I am crazy about it!\" (Onun için deliriyorum / bayılıyorum), aşırı beğeniyi ifade eder.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u4-t2-q1",
    "topicId": "ing-u4-t2",
    "type": "multiple_choice",
    "questionText": "Complete: \"Listen! The baby ___ in the bedroom right now.\"",
    "options": [
      "cries",
      "is crying",
      "cried",
      "cry"
    ],
    "correctAnswer": 1,
    "explanation": "\"Right now\" ve \"Listen!\" konuşma anında devam eden şimdiki zamanı (Present Continuous: is crying) gösterir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u4-t2-q2",
    "topicId": "ing-u4-t2",
    "type": "multiple_choice",
    "questionText": "Choose the correct form: \"What are you doing at the moment?\" - \"I ___ an English quiz.\"",
    "options": [
      "solve",
      "am solving",
      "solves",
      "was solving"
    ],
    "correctAnswer": 1,
    "explanation": "Şimdiki zamanda \"I\" öznesiyle \"am + V-ing\" kullanılır: \"I am solving\".",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u4-t2-q3",
    "topicId": "ing-u4-t2",
    "type": "true_false",
    "questionText": "\"Know, like, believe, understand\" gibi durum bildiren fiiller (stative verbs) genellikle şimdiki zaman (-ing) eki almazlar.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Zihinsel ve duygusal durum fiilleri süreklilik bildirmez, \"I am knowing\" denmez, \"I know\" denir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "ing-u4-t2-q4",
    "topicId": "ing-u4-t2",
    "type": "multiple_choice",
    "questionText": "Which spelling of the \"-ing\" form of the verb \"run\" is correct?",
    "options": [
      "runing",
      "running",
      "runin",
      "runned"
    ],
    "correctAnswer": 1,
    "explanation": "Tek heceli, bir sesli bir sessizle biten fiillerde son harf çiftleşir: run -> running.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u5-t1-q1",
    "topicId": "ing-u5-t1",
    "type": "multiple_choice",
    "questionText": "Which adjective describes a person who likes sharing money and gifts with others?",
    "options": [
      "Stingy",
      "Generous (Cömert)",
      "Stubborn",
      "Selfish"
    ],
    "correctAnswer": 1,
    "explanation": "\"Generous\", başkalarına yardım etmeyi ve paylaşmayı seven cömert insanları tanımlar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u5-t1-q2",
    "topicId": "ing-u5-t1",
    "type": "multiple_choice",
    "questionText": "\"What does your teacher look like?\" sorusu neyi öğrenmek için sorulur?",
    "options": [
      "Öğretmenin hobilerini",
      "Öğretmenin fiziksel dış görünüşünü (boy, saç, göz rengi vb.)",
      "Öğretmenin karakterini",
      "Öğretmenin memleketini"
    ],
    "correctAnswer": 1,
    "explanation": "\"What does ... look like?\" dış görünüşü; \"What is ... like?\" ise kişilik ve karakteri sorar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u5-t1-q3",
    "topicId": "ing-u5-t1",
    "type": "true_false",
    "questionText": "\"Punctual\", randevularına ve derslerine daima tam zamanında gelen dakik kişileri niteleyen olumlu bir kişilik sıfatıdır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "\"Punctual\", dakik ve zamanına sadık anlamına gelir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u5-t1-q4",
    "topicId": "ing-u5-t1",
    "type": "multiple_choice",
    "questionText": "A person who never changes his mind easily is called ___.",
    "options": [
      "friendly",
      "stubborn (inatçı)",
      "clumsy",
      "outgoing"
    ],
    "correctAnswer": 1,
    "explanation": "\"Stubborn\", fikrini değiştirmeyen inatçı kişileri tanımlar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u6-t1-q1",
    "topicId": "ing-u6-t1",
    "type": "multiple_choice",
    "questionText": "In Japanese culture, what is the traditional greeting gesture instead of shaking hands?",
    "options": [
      "Kissing cheeks",
      "Bowing (Eğilerek selamlama)",
      "High five",
      "Waving hands"
    ],
    "correctAnswer": 1,
    "explanation": "Japon kültüründe saygı göstergesi olarak insanlar birbirini eğilerek (bowing) selamlar.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u6-t1-q2",
    "topicId": "ing-u6-t1",
    "type": "multiple_choice",
    "questionText": "In Turkish culture, which beverage is traditionally offered to guests as a symbol of hospitality and friendship?",
    "options": [
      "Turkish coffee and tea",
      "Lemonade only",
      "Hot chocolate",
      "Energy drink"
    ],
    "correctAnswer": 0,
    "explanation": "Türk kültüründe misafirlere çay ve Türk kahvesi ikram etmek geleneksel misafirperverliğin sembolüdür.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u6-t1-q3",
    "topicId": "ing-u6-t1",
    "type": "true_false",
    "questionText": "In many Asian cultures, it is customary to take off your shoes before entering someone's home.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Eve girerken ayakkabıları çıkarmak Asya ve Türk kültüründe temizliğin gereği ortak bir gelenektir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u6-t1-q4",
    "topicId": "ing-u6-t1",
    "type": "multiple_choice",
    "questionText": "Which traditional festival is celebrated with colorful powder throwing in India?",
    "options": [
      "Thanksgiving",
      "Holi Festival",
      "Carnival of Venice",
      "La Tomatina"
    ],
    "correctAnswer": 1,
    "explanation": "Holi Festivali (Renklerin Festivali), Hindistan'da baharın gelişini boyalar saçarak kutlayan gelenektir.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "ing-u6-t2-q1",
    "topicId": "ing-u6-t2",
    "type": "multiple_choice",
    "questionText": "You are in a library. Complete the rule: \"You ___ make noise here.\"",
    "options": [
      "must",
      "mustn't (yasaktır)",
      "have to",
      "should"
    ],
    "correctAnswer": 1,
    "explanation": "\"Mustn't\" kesin yasakları ifade eder; kütüphanede gürültü yapmak yasaktır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u6-t2-q2",
    "topicId": "ing-u6-t2",
    "type": "multiple_choice",
    "questionText": "Tomorrow is Sunday and there is no school. \"I ___ wake up early tomorrow.\"",
    "options": [
      "mustn't",
      "don't have to (zorunda değilim)",
      "must",
      "has to"
    ],
    "correctAnswer": 1,
    "explanation": "\"Don't have to\", bir zorunluluğun olmadığını (\"gerek yok\") anlatır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "ing-u6-t2-q3",
    "topicId": "ing-u6-t2",
    "type": "true_false",
    "questionText": "\"Drivers must stop when the traffic light is red.\" cümlesi yasal bir zorunluluğu doğru ifade eder.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Trafik kuralları uyulması zorunlu kurallardır ve \"must / have to\" ile ifade edilir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u6-t2-q4",
    "topicId": "ing-u6-t2",
    "type": "multiple_choice",
    "questionText": "Complete with the third person: \"Kerem has a test tomorrow, so he ___ study hard tonight.\"",
    "options": [
      "have to",
      "has to",
      "don't have to",
      "mustn't"
    ],
    "correctAnswer": 1,
    "explanation": "Üçüncü tekil şahıslarla (he/she/it) zorunluluk anlatırken \"has to\" kullanılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u7-t1-q1",
    "topicId": "ing-u7-t1",
    "type": "multiple_choice",
    "questionText": "Complete the sentence: \"Mustafa Kemal Atatürk ___ born in 1881 in Salonika.\"",
    "options": [
      "is",
      "was",
      "were",
      "are"
    ],
    "correctAnswer": 1,
    "explanation": "Geçmiş zamanda tekil üçüncü şahıslar için \"to be\" fiilinin geçmiş hali \"was\" dır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u7-t1-q2",
    "topicId": "ing-u7-t1",
    "type": "multiple_choice",
    "questionText": "Complete with the plural form: \"Where ___ you yesterday afternoon?\" - \"We ___ at the museum.\"",
    "options": [
      "was / were",
      "were / was",
      "were / were",
      "are / are"
    ],
    "correctAnswer": 2,
    "explanation": "\"You\" ve \"We\" özneleriyle geçmiş zamanda \"were\" kullanılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u7-t1-q3",
    "topicId": "ing-u7-t1",
    "type": "true_false",
    "questionText": "\"The weather was very sunny and hot yesterday.\" cümlesi geçmişteki bir hava durumunu doğru anlatır.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "\"Weather\" tekil sayılamayan bir isimdir ve geçmişte \"was\" alır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u7-t1-q4",
    "topicId": "ing-u7-t1",
    "type": "multiple_choice",
    "questionText": "Choose the correct negative sentence: \"I ___ at home last night; I was at the cinema.\"",
    "options": [
      "wasn't",
      "weren't",
      "didn't",
      "am not"
    ],
    "correctAnswer": 0,
    "explanation": "\"I\" öznesi için \"was not\" kısaltması \"wasn't\" dir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u7-t2-q3",
    "topicId": "ing-u7-t2",
    "type": "multiple_choice",
    "questionText": "What is the past simple form of the irregular verb \"buy\"?",
    "options": [
      "buyed",
      "bought",
      "brought",
      "boight"
    ],
    "correctAnswer": 1,
    "explanation": "\"Buy\" fiilinin V2 geçmiş zaman hali \"bought\" dur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u7-t2-q4",
    "topicId": "ing-u7-t2",
    "type": "multiple_choice",
    "questionText": "Complete: \"Did you ___ your homework yesterday?\" - \"Yes, I ___ it.\"",
    "options": [
      "finish / finished",
      "finished / finish",
      "finish / finish",
      "finishes / finished"
    ],
    "correctAnswer": 0,
    "explanation": "Did soru yardımcısından sonra fiil yalın kalır (finish), olumlu cevapta ise V2 (finished) kullanılır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "ing-u8-t1-q1",
    "topicId": "ing-u8-t1",
    "type": "multiple_choice",
    "questionText": "If someone has a high body temperature (39 °C), which health problem do they have?",
    "options": [
      "A broken leg",
      "A high fever (Yüksek ateş)",
      "A toothache",
      "A cut finger"
    ],
    "correctAnswer": 1,
    "explanation": "Yüksek vücut sıcaklığı ateş (fever) belirtisidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u8-t1-q2",
    "topicId": "ing-u8-t1",
    "type": "multiple_choice",
    "questionText": "\"I have a sore throat and I can't swallow.\" diyen birinin neresi ağrımaktadır?",
    "options": [
      "Midesi",
      "Boğazı",
      "Bileği",
      "Gözü"
    ],
    "correctAnswer": 1,
    "explanation": "\"Sore throat\", boğaz ağrısı ve iltihabını ifade eder.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u8-t1-q3",
    "topicId": "ing-u8-t1",
    "type": "true_false",
    "questionText": "Doktorun hastaya \"What's the matter with you?\" diye sorması \"Neyiniz var? / Şikayetiniz nedir?\" anlamına gelir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "Sağlık şikayetini sormak için standart İngilizce kalıp \"What is the matter with you?\" dur.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u8-t1-q4",
    "topicId": "ing-u8-t1",
    "type": "multiple_choice",
    "questionText": "Where do you go to buy prescribed medicine when you are sick?",
    "options": [
      "Bakery",
      "Pharmacy (Chemist's)",
      "Butcher",
      "Library"
    ],
    "correctAnswer": 1,
    "explanation": "İlaçlar eczaneden (pharmacy) temin edilir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u8-t2-q3",
    "topicId": "ing-u8-t2",
    "type": "multiple_choice",
    "questionText": "Complete: \"You look exhausted. You ___ go to bed early tonight.\"",
    "options": [
      "should",
      "shouldn't",
      "mustn't",
      "don't"
    ],
    "correctAnswer": 0,
    "explanation": "Yorgun görünen birine \"Erken yatmalısın\" tavsiyesi \"should\" ile verilir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u8-t2-q4",
    "topicId": "ing-u8-t2",
    "type": "multiple_choice",
    "questionText": "\"You have a bad cough. You ___ drink ice-cold water.\"",
    "options": [
      "should",
      "shouldn't",
      "can",
      "must"
    ],
    "correctAnswer": 1,
    "explanation": "Öksüren birine buzlu su içmemesi tavsiye edilir (\"shouldn't drink\").",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u9-t1-q1",
    "topicId": "ing-u9-t1",
    "type": "multiple_choice",
    "questionText": "Which phrase is used to make a suggestion followed by a bare verb (V1)?",
    "options": [
      "Let's (Hadi ... yapalım)",
      "How about",
      "What about",
      "Would you like"
    ],
    "correctAnswer": 0,
    "explanation": "\"Let's\" kalıbından sonra fiil ek almadan yalın halde gelir (ör: \"Let's play soccer\").",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u9-t1-q2",
    "topicId": "ing-u9-t1",
    "type": "multiple_choice",
    "questionText": "Complete the suggestion: \"___ we go to the cinema tonight?\"",
    "options": [
      "Shall",
      "Let's",
      "Why",
      "Are"
    ],
    "correctAnswer": 0,
    "explanation": "\"Shall we ...?\" (Gidelim mi / Yapalım mı?) soru şeklinde öneri sunma kalıbıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u9-t1-q3",
    "topicId": "ing-u9-t1",
    "type": "true_false",
    "questionText": "\"Why don't we have a picnic by the lake?\" cümlesi bir öneri (suggestion) cümlesidir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "\"Why don't we ...?\" (Neden piknik yapmıyoruz?) yaygın bir teklif kalıbıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u9-t1-q4",
    "topicId": "ing-u9-t1",
    "type": "multiple_choice",
    "questionText": "\"How about ___ pizza for dinner?\"",
    "options": [
      "eating",
      "eat",
      "ate",
      "eats"
    ],
    "correctAnswer": 0,
    "explanation": "\"How about / What about\" edatından sonra fiile \"-ing\" takısı gelir: \"eating\".",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "ing-u9-t2-q1",
    "topicId": "ing-u9-t2",
    "type": "multiple_choice",
    "questionText": "\"Would you like to come to my birthday party on Saturday?\" davetini kabul eden (accepting) ifade hangisidir?",
    "options": [
      "I'm sorry, but I have an exam.",
      "I'd love to, thanks! That sounds awesome!",
      "No way, I hate parties.",
      "I must study."
    ],
    "correctAnswer": 1,
    "explanation": "\"I'd love to, thanks!\" (Çok isterim, teşekkürler!) nazik bir kabul cümlesidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u9-t2-q2",
    "topicId": "ing-u9-t2",
    "type": "multiple_choice",
    "questionText": "Bir daveti mazeret bildirerek nazikçe reddeden (refusing with an excuse) ifade hangisidir?",
    "options": [
      "Sure, why not?",
      "I'd love to, but I have to help my parents.",
      "Count me in!",
      "Great idea!"
    ],
    "correctAnswer": 1,
    "explanation": "\"İsterdim ama aileme yardım etmek zorundayım\" ifadesi mazeretli nazik bir ret cümlesidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u9-t2-q3",
    "topicId": "ing-u9-t2",
    "type": "true_false",
    "questionText": "\"Count me in!\" ifadesi \"Beni de sayın / Ben de varım\" anlamına gelen olumlu bir kabul ifadesidir.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "\"Count me in\", bir etkinliğe katılacağını teyit eden samimi bir kabul deyimidir.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u9-t2-q4",
    "topicId": "ing-u9-t2",
    "type": "multiple_choice",
    "questionText": "A: \"Shall we study together?\" - B: \"___, but I have a doctor appointment.\"",
    "options": [
      "I'd love to",
      "I refuse",
      "I don't like you",
      "Never"
    ],
    "correctAnswer": 0,
    "explanation": "\"I'd love to, but...\" kalıbı kibar ret cümlelerinin standart başlangıcıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u10-t1-q1",
    "topicId": "ing-u10-t1",
    "type": "multiple_choice",
    "questionText": "A television program that provides factual information about nature, history, or science is called a ___.",
    "options": [
      "Soap opera",
      "Documentary (Belgesel)",
      "Reality show",
      "Cartoon"
    ],
    "correctAnswer": 1,
    "explanation": "Belgesel (Documentary) gerçek olayları ve doğayı anlatan öğretici TV programıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u10-t1-q2",
    "topicId": "ing-u10-t1",
    "type": "multiple_choice",
    "questionText": "A program in which contestants answer questions to win money or prizes is a ___.",
    "options": [
      "Quiz show (Yarışma programı)",
      "Weather forecast",
      "News",
      "Sitcom"
    ],
    "correctAnswer": 0,
    "explanation": "Quiz show bilgi yarışması programıdır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u10-t1-q3",
    "topicId": "ing-u10-t1",
    "type": "true_false",
    "questionText": "\"The news\" programı dünyadaki ve ülkedeki güncel olayları bildiren haber bültenidir ve İngilizcede tekil fiil alır (\"The news is on at 8 PM\").",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "\"News\" sonunda s olsa da sayılamayan tekil bir isimdir ve tekil fiille kullanılır.",
    "difficulty": 2,
    "xpValue": 15
  },
  {
    "id": "ing-u10-t1-q4",
    "topicId": "ing-u10-t1",
    "type": "multiple_choice",
    "questionText": "The handheld device used to change television channels from a distance is called a ___.",
    "options": [
      "Keyboard",
      "Remote control (Uzaktan kumanda)",
      "Screen",
      "Antenna"
    ],
    "correctAnswer": 1,
    "explanation": "Televizyon kumandası İngilizcede \"remote control\" olarak adlandırılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u10-t2-q1",
    "topicId": "ing-u10-t2",
    "type": "multiple_choice",
    "questionText": "We use \"be going to\" to express:",
    "options": [
      "Past regrets",
      "Pre-planned future intentions and decisions",
      "Things happening right now",
      "General truths"
    ],
    "correctAnswer": 1,
    "explanation": "\"Be going to\" önceden planlanmış niyetleri ve kararları anlatır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u10-t2-q2",
    "topicId": "ing-u10-t2",
    "type": "multiple_choice",
    "questionText": "\"Look at those dark black clouds! It ___ rain.\"",
    "options": [
      "is going to",
      "rains",
      "rained",
      "was raining"
    ],
    "correctAnswer": 0,
    "explanation": "Şu anki görsel kanıta (kara bulutlar) dayalı kesin gelecek tahminlerinde \"be going to\" kullanılır.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u10-t2-q3",
    "topicId": "ing-u10-t2",
    "type": "true_false",
    "questionText": "\"I am going to visit my grandparents in Izmir next weekend.\" cümlesi önceden planlanmış bir gelecek niyetini doğru ifade eder.",
    "options": [
      "Doğru",
      "Yanlış"
    ],
    "correctAnswer": 0,
    "explanation": "\"Am going to visit\", geleceğe yönelik planlı bir ziyareti kusursuz ifade eder.",
    "difficulty": 1,
    "xpValue": 10
  },
  {
    "id": "ing-u10-t2-q4",
    "topicId": "ing-u10-t2",
    "type": "multiple_choice",
    "questionText": "Complete the question: \"What ___ you going to do after graduation?\"",
    "options": [
      "is",
      "are",
      "do",
      "did"
    ],
    "correctAnswer": 1,
    "explanation": "\"You\" öznesi ile soru oluşturulurken \"are you going to\" yapısı kullanılır.",
    "difficulty": 1,
    "xpValue": 10
  }
];
