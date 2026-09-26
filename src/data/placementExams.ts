import { AssessmentQuestion, DiagnosticLevel, PlacementExamResult } from '@/types';

export const placementQuestions: AssessmentQuestion[] = [
  // MATEMATİK - Çoktan Seçmeli
  {
    id: 'pq-mat-1',
    subjectSlug: 'matematik',
    subjectName: 'Matematik',
    topicId: 'mat-u1-t1',
    topicName: 'Gerçek Sayı Kümeleri ve Aralıklar',
    type: 'multiple_choice',
    questionText: 'x bir gerçek sayı olmak üzere, |2x - 6| ≤ 4 eşitsizliğini sağlayan en küçük ve en büyük tam sayı değerlerinin toplamı kaçtır?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1,
    difficulty: 2,
    points: 10,
    rubric: {
      criteria: [
        { score: 10, label: 'Tam Puan', description: 'Doğru şıkkı tespit etme.' },
        { score: 0, label: '0 Puan', description: 'Yanlış seçenek.' }
      ],
      keyTerms: ['mutlak değer', 'eşitsizlik'],
      explanation: '-4 ≤ 2x - 6 ≤ 4 ifadesinden 2 ≤ 2x ≤ 10 ve 1 ≤ x ≤ 5 elde edilir. En küçük tam sayı 1, en büyük 5; toplamları 1 + 5 = 6 olur.'
    }
  },
  // MATEMATİK - Açık Uçlu (MEB Tarzı)
  {
    id: 'pq-mat-2',
    subjectSlug: 'matematik',
    subjectName: 'Matematik',
    topicId: 'mat-u2-t1',
    topicName: 'Önermeler ve Bileşik Önermeler',
    type: 'open_ended',
    questionText: 'p ve q birer önerme olmak üzere; "p ⇒ q" koşullu önermesinin karşıtı, tersi ve karşıt tersini tanımlayınız. Ayrıca bu koşullu önermenin hangi ifadeye denk olduğunu doğruluk tablosu veya cebirsel kural mantığıyla açıklayınız.',
    sampleAnswer: '1) Karşıtı: q ⇒ p\n2) Tersi: p\' ⇒ q\'\n3) Karşıt tersi: q\' ⇒ p\'\n"p ⇒ q" koşullu önermesi karşıt tersine (q\' ⇒ p\') mantıksal olarak daima denktir. Ayrıca bu önerme p\' ∨ q (p nin değili veya q) bileşik önermesine eş değerdir.',
    difficulty: 2,
    points: 15,
    rubric: {
      criteria: [
        { score: 15, label: 'Tam Puan (15/15)', description: 'Karşıt, ters ve karşıt tersi eksiksiz yazma; karşıt tersin denkliğini veya p\' v q özdeşliğini belirtme.' },
        { score: 10, label: 'Kısmi Başarılı (10/15)', description: 'Karşıt, ters ve karşıt tersi doğru tanımlayıp denklik gerekçesini eksik bırakma.' },
        { score: 5, label: 'Temel Düzey (5/15)', description: 'Yalnızca karşıt veya ters önermeden birini doğru ifade etme.' },
        { score: 0, label: 'Yetersiz (0/15)', description: 'Kavramsal açıklama bulunmamakta veya ilgisiz metin.' }
      ],
      keyTerms: ['karşıt', 'ters', 'karşıt ters', 'denk', 'değil'],
      explanation: 'Akademik mantık kazanımlarında koşullu önermenin karşıtı (q ⇒ p), tersi (p\' ⇒ q\') ve karşıt tersi (q\' ⇒ p\') olup bir koşullu önerme yalnızca kendi karşıt tersine (q\' ⇒ p\') ve (p\' ∨ q) ifadesine denktir.'
    }
  },

  // TÜRK DİLİ VE EDEBİYATI - Çoktan Seçmeli
  {
    id: 'pq-edb-1',
    subjectSlug: 'edebiyat',
    subjectName: 'Türk Dili ve Edebiyatı',
    topicId: 'edb-u2-t1',
    topicName: 'Hikâye (Öykü) Türü ve Unsurları',
    type: 'multiple_choice',
    questionText: 'Durum (Çehov tarzı) hikâyesi ile ilgili olarak aşağıda verilen yargılardan hangisi yanlıştır?',
    options: [
      'Olay örgüsünden ziyade günlük yaşamdan bir kesit aktarılır.',
      'Merak unsuru ve serim-düğüm-çözüm planı arka plandadır.',
      'Klasik Maupassant tarzı gibi beklenmedik çarpıcı bir sonla biter.',
      'Türk edebiyatındaki önemli temsilcileri Sait Faik Abasıyanık ve Memduh Şevket Esendal\'dır.'
    ],
    correctAnswer: 2,
    difficulty: 2,
    points: 10,
    rubric: {
      criteria: [
        { score: 10, label: 'Tam Puan', description: 'Doğru seçeneği bulma.' },
        { score: 0, label: '0 Puan', description: 'Yanlış seçenek.' }
      ],
      keyTerms: ['durum hikayesi', 'kesit'],
      explanation: 'Çarpıcı ve şaşırtıcı sonla bitmek durum hikâyesinin değil, olay (Maupassant) hikâyesinin temel karakteristiğidir. Durum hikâyesi açık uçlu biter.'
    }
  },
  // TÜRK DİLİ VE EDEBİYATI - Açık Uçlu (MEB Tarzı)
  {
    id: 'pq-edb-2',
    subjectSlug: 'edebiyat',
    subjectName: 'Türk Dili ve Edebiyatı',
    topicId: 'edb-u1-t2',
    topicName: 'İletişim ve Dilin İşlevleri',
    type: 'open_ended',
    questionText: 'Bir edebiyat öğretmeninin derste öğrencilerine "Milli edebiyat akımının dil anlayışını kavramak için Genç Kalemler dergisindeki Yeni Lisan makalesini dikkatle inceleyiniz." demesi durumunda, dilin hangi işlevde kullanıldığını belirtiniz ve bu işlevin temel özelliklerini açıklayınız.',
    sampleAnswer: 'Dil "alıcıyı harekete geçirme" işlevinde kullanılmıştır. Bu işlevde amaç dinleyicide veya okuyucuda bir davranış değişikliği meydana getirmek, ona bir emir, yönlendirme, rica veya çağrıda bulunmaktır. İletinin iletildiği kişi üzerinde bir eylem başlatması hedeflenir.',
    difficulty: 2,
    points: 15,
    rubric: {
      criteria: [
        { score: 15, label: 'Tam Puan (15/15)', description: '"Alıcıyı harekete geçirme" işlevini doğru adlandırıp davranış değişikliği / yönlendirme / eylem amacını açıklama.' },
        { score: 8, label: 'Kısmi Puan (8/15)', description: 'İşlev adını doğru yazıp özelliğini yetersiz açıklama veya tersi.' },
        { score: 0, label: 'Yetersiz (0/15)', description: 'Yanlış işlev veya alakasız açıklama.' }
      ],
      keyTerms: ['alıcıyı harekete geçirme', 'davranış', 'yönlendirme', 'emir', 'eylem'],
      explanation: 'Öğretmenin öğrencilere bir araştırma görevi vererek onları bir eyleme sevk etmesi dilin "alıcıyı harekete geçirme işlevi" kapsamındadır.'
    }
  },

  // FİZİK - Çoktan Seçmeli
  {
    id: 'pq-fiz-1',
    subjectSlug: 'fizik',
    subjectName: 'Fizik',
    topicId: 'fiz-u1-t2',
    topicName: 'Fiziksel Büyüklükler ve Birimler',
    type: 'multiple_choice',
    questionText: 'Aşağıda verilen fiziksel büyüklüklerden hangisi hem "skaler" hem de "türetilmiş" bir büyüklüktür?',
    options: ['Kuvvet', 'Hız', 'Sürat', 'Kütle'],
    correctAnswer: 2,
    difficulty: 2,
    points: 10,
    rubric: {
      criteria: [
        { score: 10, label: 'Tam Puan', description: 'Doğru seçeneği bulma.' },
        { score: 0, label: '0 Puan', description: 'Yanlış seçenek.' }
      ],
      keyTerms: ['skaler', 'türetilmiş', 'sürat'],
      explanation: 'Kütle temel ve skalerdir. Kuvvet ve hız vektörel ve türetilmiştir. Sürat ise yönsüz (skaler) olup yol/zaman formülünden türetilmiştir.'
    }
  },
  // FİZİK - Açık Uçlu (MEB Tarzı)
  {
    id: 'pq-fiz-2',
    subjectSlug: 'fizik',
    subjectName: 'Fizik',
    topicId: 'fiz-u2-t2',
    topicName: 'Dayanıklılık, Adezyon ve Kohezyon',
    type: 'open_ended',
    questionText: 'Bir kılcal cam boruya konulan suyun boru çeperlerinde yukarı doğru yükselirken, aynı boruya konulan civanın ise alçalması olayını "adezyon" ve "kohezyon" kuvvetleri bağlamında gerekçelendirerek açıklayınız.',
    sampleAnswer: 'Suda adezyon (farklı maddelerin molekülleri arasındaki çekim) kuvveti, kohezyon (aynı cins moleküller arasındaki çekim) kuvvetinden büyüktür (Adezyon > Kohezyon). Bu sebeple su cam boru yüzeyini ıslatır ve yukarı doğru tırmanır. Civada ise kohezyon kuvveti adezyon kuvvetinden çok daha büyüktür (Kohezyon > Adezyon). Bu sebeple civa molekülleri birbirine sıkıca tutunarak boruda alçalır ve dışbükey bir menisküs oluşturur.',
    difficulty: 3,
    points: 15,
    rubric: {
      criteria: [
        { score: 15, label: 'Tam Puan (15/15)', description: 'Hem su için Adezyon > Kohezyon ilişkisini hem de cıva için Kohezyon > Adezyon ilişkisini bilimsel olarak net açıklama.' },
        { score: 10, label: 'Kısmi Puan (10/15)', description: 'Kuvvetleri doğru kıyaslayıp menisküs veya ıslatma kavramını eksik bırakma.' },
        { score: 5, label: 'Temel Puan (5/15)', description: 'Yalnızca adezyon veya kohezyonun tanımını yapıp deneyle tam ilişkilendirememe.' },
        { score: 0, label: 'Yetersiz (0/15)', description: 'Hatalı veya ilgisiz açıklama.' }
      ],
      keyTerms: ['adezyon', 'kohezyon', 'büyük', 'ıslatma', 'çekim'],
      explanation: 'Kılcallık olayı adezyon ve kohezyon kuvvetlerinin büyüklük kıyaslamasıyla belirlenir. Adezyon > Kohezyon ise sıvı yükselir; Kohezyon > Adezyon ise sıvı alçalır.'
    }
  },

  // KİMYA - Çoktan Seçmeli
  {
    id: 'pq-kim-1',
    subjectSlug: 'kimya',
    subjectName: 'Kimya',
    topicId: 'kim-u1-t2',
    topicName: 'Kimyanın Alt Disiplinleri ve Meslekler',
    type: 'multiple_choice',
    questionText: 'Bir göldeki su numunesinin içerdiği ağır metallerin (kurşun, cıva) miktarını ve türünü laboratuvarda tespit etmek isteyen bir çevre mühendisi kimyanın hangi alt disiplininden öncelikle yararlanır?',
    options: ['Organik Kimya', 'Analitik Kimya', 'Fizikokimya', 'Biyokimya'],
    correctAnswer: 1,
    difficulty: 1,
    points: 10,
    rubric: {
      criteria: [
        { score: 10, label: 'Tam Puan', description: 'Doğru seçeneği bulma.' },
        { score: 0, label: '0 Puan', description: 'Yanlış seçenek.' }
      ],
      keyTerms: ['analitik kimya', 'nitel', 'nicel'],
      explanation: 'Maddelerin bileşenlerini nitel (ne olduğu) ve nicel (ne kadar olduğu) olarak tayin eden ana disiplin Analitik Kimyadır.'
    }
  },

  // BİYOLOJİ - Açık Uçlu (MEB Tarzı)
  {
    id: 'pq-biy-1',
    subjectSlug: 'biyoloji',
    subjectName: 'Biyoloji',
    topicId: 'biy-u1-t1',
    topicName: 'Canlıların Ortak Özellikleri',
    type: 'open_ended',
    questionText: 'Canlıların tümünde gerçekleşen "Homeostazi" kavramını tanımlayınız ve vücut sıcaklığı yükselen sağlıklı bir insanın terlemesi olayını bu kavramla ilişkilendirerek açıklayınız.',
    sampleAnswer: 'Homeostazi; dış çevredeki tüm değişimlere rağmen canlı organizmanın iç ortamını dengeli ve kararlı tutma yeteneğidir. Vücut sıcaklığı yükseldiğinde terleme mekanizması devreye girer; deriden buharlaşan su vücuttan ısı çekerek vücut sıcaklığını tekrar ideal seviyeye (yaklaşık 36.5-37°C) düşürür ve böylece iç denge (homeostazi) korunur.',
    difficulty: 2,
    points: 15,
    rubric: {
      criteria: [
        { score: 15, label: 'Tam Puan (15/15)', description: 'Homeostaziyi (kararlı/dengeli iç ortam) doğru tanımlayıp terleme ile sıcaklık düşüşü arasındaki bağlantıyı kurma.' },
        { score: 10, label: 'Kısmi Puan (10/15)', description: 'Tanımı yapıp terleme örneğini zayıf bağlama veya terlemeyi açıklayıp iç denge terimini net vurgulamama.' },
        { score: 0, label: 'Yetersiz (0/15)', description: 'Kavram dışı yanıt.' }
      ],
      keyTerms: ['homeostazi', 'iç denge', 'iç ortam', 'kararlı', 'sıcaklık', 'buharlaşma'],
      explanation: 'Homeostazi canlılığın vazgeçilmez ortak özelliğidir. Terleme olayı fiziksel buharlaşma ısısıyla vücut ısısını düşürerek iç kararlılığı sağlar.'
    }
  }
];

// Helper to normalize Turkish text, casing, and mathematical expressions
export function normalizeAssessmentText(str: string): string {
  return str
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFC')
    .replace(/<=|=</g, '≤')
    .replace(/>=|=>/g, '≥')
    .replace(/!=/g, '≠')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim();
}

// Evaluates an open-ended student answer against key terms & criteria
export function evaluateOpenEndedAnswer(
  studentAnswer: string,
  question: AssessmentQuestion
): { score: number; label: string; feedback: string; matchedTerms: string[]; missingTerms: string[] } {
  const cleanAnswer = normalizeAssessmentText(studentAnswer);
  const rubric = question.rubric;

  if (!rubric || !rubric.keyTerms || cleanAnswer.length < 5) {
    return {
      score: 0,
      label: 'Yetersiz',
      feedback: 'Cevap alanı boş bırakılmış veya çok yetersiz. Örnek ideal çözümü inceleyiniz.',
      matchedTerms: [],
      missingTerms: rubric?.keyTerms || []
    };
  }

  const matchedTerms: string[] = [];
  const missingTerms: string[] = [];
  const compactAnswer = cleanAnswer.replace(/\s+/g, '');

  rubric.keyTerms.forEach((term) => {
    const cleanTerm = normalizeAssessmentText(term);
    const compactTerm = cleanTerm.replace(/\s+/g, '');
    if (
      cleanAnswer.includes(cleanTerm) ||
      (compactTerm.length >= 3 && compactAnswer.includes(compactTerm))
    ) {
      matchedTerms.push(term);
    } else {
      missingTerms.push(term);
    }
  });

  const matchRatio = matchedTerms.length / Math.max(1, rubric.keyTerms.length);
  const wordCount = cleanAnswer.split(/\s+/).length;

  let score = 0;
  let label = 'Yetersiz';
  let feedback = '';

  if (matchRatio >= 0.6 && wordCount >= 10) {
    score = question.points;
    label = 'Tam Puan';
    feedback = 'Tebrikler! Kazanım rubriğindeki tüm kritik kavramları ve bilimsel gerekçelendirmeyi başarıyla sundunuz.';
  } else if (matchRatio >= 0.25 || (wordCount >= 8 && matchedTerms.length >= 1)) {
    score = Math.round(question.points * 0.6);
    label = 'Kısmi Puan';
    feedback = `Kavramların bir kısmı doğru ifade edilmiş (${matchedTerms.join(', ')}). Ancak şu anahtar kavramlar eksik: ${missingTerms.join(', ')}.`;
  } else {
    score = Math.min(2, Math.round(question.points * 0.2));
    label = 'Geliştirilmeli';
    feedback = `Cevabınız temel puanlama rubriğini tam karşılamıyor. Aranan kavramlar: ${rubric.keyTerms.join(', ')}.`;
  }

  return { score, label, feedback, matchedTerms, missingTerms };
}

// Generates Diagnostic Placement Result from exam answers
export function calculateDiagnosticResult(
  questions: AssessmentQuestion[],
  answers: {
    questionId: string;
    selectedOption?: number | null;
    textAnswer?: string;
    awardedScore: number;
  }[],
  examType: 'karma' | 'multiple_choice' | 'open_ended' = 'karma'
): PlacementExamResult {
  let totalScore = 0;
  let maxPossibleScore = 0;

  const subjectBreakdown: Record<string, { name: string; score: number; total: number; missedTopics: string[] }> = {};

  questions.forEach((q) => {
    maxPossibleScore += q.points;
    if (!subjectBreakdown[q.subjectSlug]) {
      subjectBreakdown[q.subjectSlug] = {
        name: q.subjectName,
        score: 0,
        total: 0,
        missedTopics: []
      };
    }
    subjectBreakdown[q.subjectSlug].total += q.points;

    const answer = answers.find((a) => a.questionId === q.id);
    const awarded = answer ? answer.awardedScore : 0;
    totalScore += awarded;
    subjectBreakdown[q.subjectSlug].score += awarded;

    if (awarded < q.points * 0.6) {
      if (!subjectBreakdown[q.subjectSlug].missedTopics.includes(q.topicName)) {
        subjectBreakdown[q.subjectSlug].missedTopics.push(q.topicName);
      }
    }
  });

  const scaledScore = Math.min(100, Math.round((totalScore / Math.max(1, maxPossibleScore)) * 100));

  let level: DiagnosticLevel = 'beginner';
  let levelTitle = 'Başlangıç Düzeyi (Temel Farkındalık)';
  let levelDescription = 'Temel kavramlarda eksikleriniz bulunuyor. Konu anlatımlarını inceleyip alıştırma modunda temel testleri pekiştirmeniz önerilir.';

  if (scaledScore >= 85) {
    level = 'advanced';
    levelTitle = 'İleri Düzey (Yüksek Akademik Yetkinlik)';
    levelDescription = 'Tebrikler! Güncel lise akademik kazanımlarında üst düzey kavramsal hakimiyet ve analitik problem çözme becerisine sahipsiniz.';
  } else if (scaledScore >= 70) {
    level = 'competent';
    levelTitle = 'Yetkin Düzey (Kazanımlara Hakim)';
    levelDescription = 'Konu temelleriniz oldukça sağlam. Senaryolu açık uçlu yazılı sınavlarında birkaç detaya ve çok adımlı problemlere odaklanmanız sizi zirveye taşıyacaktır.';
  } else if (scaledScore >= 45) {
    level = 'developing';
    levelTitle = 'Gelişmekte Olan Düzey (Pekiştirme Aşaması)';
    levelDescription = 'Temel formülleri ve bilgileri hatırlıyorsunuz; ancak açık uçlu gerekçelendirme ve derinlemesine soru analizinde eksik kapatma rotasını takip etmelisiniz.';
  }

  const subjectScores = Object.entries(subjectBreakdown).map(([slug, data]) => ({
    subjectSlug: slug,
    subjectName: data.name,
    score: data.score,
    total: data.total,
    percentage: Math.round((data.score / Math.max(1, data.total)) * 100)
  }));

  // Build remediation plan
  const remediationPlan: PlacementExamResult['remediationPlan'] = [];
  questions.forEach((q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    if (!answer || answer.awardedScore < q.points * 0.7) {
      if (!remediationPlan.some((r) => r.topicId === q.topicId)) {
        remediationPlan.push({
          topicId: q.topicId,
          topicName: q.topicName,
          subjectSlug: q.subjectSlug,
          subjectName: q.subjectName,
          action: `${q.topicName} konusunda 1 ünite tekrarı ve 10 pekiştirme sorusu çözümü.`,
          priority: answer && answer.awardedScore === 0 ? 'high' : 'medium'
        });
      }
    }
  });

  // Fallback remediation if student did exceptionally well
  if (remediationPlan.length === 0) {
    remediationPlan.push({
      topicId: 'mat-u1-t1',
      topicName: 'Gerçek Sayılar & İleri Düzey Problem Analizi',
      subjectSlug: 'matematik',
      subjectName: 'Matematik',
      action: '2. Senaryo İleri Düzey Denemeleri ile derece hedefini güçlendir.',
      priority: 'low'
    });
  }

  return {
    id: `placement-${Date.now()}`,
    examDate: new Date().toISOString(),
    score: scaledScore,
    level,
    levelTitle,
    levelDescription,
    examType,
    subjectScores,
    remediationPlan
  };
}
