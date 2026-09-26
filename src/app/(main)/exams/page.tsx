'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Sparkles,
  Ticket,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldAlert,
  ChevronRight,
  BarChart3,
  Layers,
  Flame,
  Award,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { examScenarios } from '@/data/examScenarios';
import { subjects } from '@/data/subjects';
import { AppIcon } from '@/components/ui/Icon';
import { TicketPurchaseModal } from '@/components/exams/TicketPurchaseModal';
import { sounds } from '@/lib/sound';

export default function ExamsHubPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const placementExamResults = useUserStore((state) => state.placementExamResults);
  const claimWeeklyTicket = useUserStore((state) => state.claimWeeklyTicket);
  const usePlacementTicket = useUserStore((state) => state.usePlacementTicket);

  const [activeTab, setActiveTab] = useState<'placement' | 'scenarios'>('placement');
  const [selectedSubjectSlug, setSelectedSubjectSlug] = useState('matematik');
  const [selectedExamType, setSelectedExamType] = useState<'karma' | 'open_ended' | 'multiple_choice'>('karma');
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  const ticketsCount = user?.placementTickets ?? 1;

  // Check if weekly claim is eligible
  const isWeeklyEligible = (() => {
    if (!user?.lastWeeklyClaimDate) return true;
    const now = Date.now();
    const lastClaim = new Date(user.lastWeeklyClaimDate).getTime();
    return now - lastClaim >= 7 * 24 * 60 * 60 * 1000;
  })();

  const handleClaimWeekly = () => {
    sounds.playClick();
    const res = claimWeeklyTicket();
    setToastMessage({
      type: res.success ? 'success' : 'info',
      text: res.message,
    });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleStartPlacementExam = () => {
    sounds.playClick();
    if (ticketsCount <= 0) {
      setToastMessage({
        type: 'error',
        text: 'Seviye belirleme sınavı biletiniz bulunmuyor. Haftalık ücretsiz hakkınızı alabilir veya bilet satın alabilirsiniz.',
      });
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }
    const success = usePlacementTicket();
    if (success) {
      router.push(`/exams/placement?type=${selectedExamType}`);
    }
  };

  const latestPlacement = placementExamResults && placementExamResults.length > 0 ? placementExamResults[0] : null;

  const currentScenarios = examScenarios.filter((sc) => sc.subjectSlug === selectedSubjectSlug);

  return (
    <div className="container max-w-6xl mx-auto px-2 py-4 pb-24 space-y-8">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2.5 rounded-2xl bg-[#1e293b] text-white px-5 py-3.5 shadow-2xl border-2 border-[#334155] animate-in fade-in slide-in-from-top-4 duration-200">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#58cc02]" />
          ) : toastMessage.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-[#ff4b4b]" />
          ) : (
            <Sparkles className="w-5 h-5 text-[#1cb0f6]" />
          )}
          <span className="text-xs sm:text-sm font-black tracking-wide">
            {toastMessage.text}
          </span>
        </div>
      )}

      <TicketPurchaseModal
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
      />

      {/* Header Banner */}
      <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#1cb0f6]">
                2026-2027 Akademik Standartlar
              </span>
              <span className="rounded-full bg-[#e5f8d0] dark:bg-[#58cc02]/20 border border-[#bcf087] dark:border-[#58cc02]/40 px-3 py-1 text-xs font-black text-[#58cc02]">
                Resmi Ölçme & Değerlendirme
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40">
                <GraduationCap className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span>Sınav & Seviye Merkezi</span>
            </h1>
            <p className="text-[#777777] dark:text-[#94a3b8] text-xs sm:text-sm font-semibold max-w-2xl leading-relaxed">
              Çoktan seçmeli ve açık uçlu analitik sorularla seviyenizi teşhis edin; 1. ve 2. Dönem ortak yazılı senaryolarıyla gerçek sınav simülasyonu yaşayın.
            </p>
          </div>

          {/* Ticket Balance & Weekly Free Claim Widget */}
          <div className="rounded-2xl border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 bg-[#ddf4ff]/50 dark:bg-[#1cb0f6]/10 p-4 sm:p-5 flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#1cb0f6]" />
                <span className="text-xs font-black uppercase text-[#1899d6] dark:text-[#38bdf8]">
                  Sınav Hakkınız
                </span>
              </div>
              <span className="text-lg font-black text-[#1cb0f6]">
                {ticketsCount} Bilet
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleClaimWeekly}
                disabled={!isWeeklyEligible}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isWeeklyEligible
                    ? 'btn-duo btn-duo-green text-white shadow-sm'
                    : 'bg-[#e5e5e5] dark:bg-[#334155] text-[#777777] dark:text-[#94a3b8] cursor-not-allowed opacity-75'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isWeeklyEligible ? 'Haftalık Ücretsiz Hakkı Al' : 'Haftalık Hak Alındı'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setPurchaseModalOpen(true);
                }}
                className="w-full py-2 px-3 rounded-xl text-xs font-black text-[#1cb0f6] bg-white dark:bg-[#1e293b] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 hover:bg-[#ddf4ff] dark:hover:bg-[#1cb0f6]/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>XP veya Krediyle Bilet Al</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-8 pt-6 border-t border-[#e5e5e5] dark:border-[#334155] flex gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('placement');
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-b-4 transition-all cursor-pointer ${
              activeTab === 'placement'
                ? 'bg-[#1cb0f6] border-[#1899d6] border-b-[#168ec7] text-white shadow-md'
                : 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Seviye Belirleme Sınavı</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('scenarios');
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-b-4 transition-all cursor-pointer ${
              activeTab === 'scenarios'
                ? 'bg-[#1cb0f6] border-[#1899d6] border-b-[#168ec7] text-white shadow-md'
                : 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Akademik Ortak Yazılı Senaryoları</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SEVİYE BELİRLEME SINAVI */}
      {activeTab === 'placement' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Exam Configuration & Launch Card */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffc800]/20 text-[#ffc800]">
                <Award className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  Akademik Seviye Teşhis & Eksik Analizi
                </h2>
                <p className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold">
                  Sınav formatını seçip seviyenizi net olarak belirleyin.
                </p>
              </div>
            </div>

            {/* Exam Format Picker */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {[
                {
                  id: 'karma',
                  title: 'Karma Sınav Formatı',
                  badge: 'Kapsamlı Model',
                  desc: 'Çoktan seçmeli sorular ve gerekçelendirmeli açık uçlu maddeler.',
                },
                {
                  id: 'open_ended',
                  title: 'Yalnızca Açık Uçlu Sınav',
                  badge: 'Yazılı Simülasyonu',
                  desc: 'Cevaplarınızı yazarak girdiğiniz ve analitik puanlama rubriğiyle analiz edilen format.',
                },
                {
                  id: 'multiple_choice',
                  title: 'Yalnızca Test (Çoktan Seçmeli)',
                  badge: 'Hızlı Tarama',
                  desc: 'Temel kavram ve uygulama kazanımlarını hızlıca ölçen 4 seçenekli test.',
                },
              ].map((format) => {
                const isSelected = selectedExamType === format.id;
                return (
                  <button
                    key={format.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedExamType(format.id as any);
                    }}
                    className={`p-4 rounded-2xl border-2 border-b-4 text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#1cb0f6] border-b-[#1899d6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20'
                        : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] bg-[#f7f7f7] dark:bg-[#0f172a] hover:bg-[#efefef] dark:hover:bg-[#1e293b]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#1cb0f6] bg-white dark:bg-[#1e293b] px-2 py-0.5 rounded-md border border-[#84d8ff] dark:border-[#1cb0f6]/40">
                          {format.badge}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#1cb0f6]" />}
                      </div>
                      <h3 className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc] mt-1">
                        {format.title}
                      </h3>
                      <p className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold mt-1">
                        {format.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Start Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                Sınavı başlatmak <strong>1 Bilet</strong> harcar. (Mevcut Bakiye: {ticketsCount} Bilet)
              </div>

              <button
                onClick={handleStartPlacementExam}
                className="btn-duo btn-duo-green px-8 py-3.5 rounded-2xl text-sm font-black text-white flex items-center justify-center gap-2 shadow-md w-full sm:w-auto cursor-pointer"
              >
                <span>SEVİYE BELİRLEME SINAVINI BAŞLAT</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Latest Diagnostic Report & Personalized Remediation Plan */}
          {latestPlacement && (
            <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5e5] dark:border-[#334155] pb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#afafaf] dark:text-[#64748b]">
                    En Son Sınav Teşhisi ({new Date(latestPlacement.examDate).toLocaleDateString('tr-TR')})
                  </span>
                  <h2 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-2 mt-0.5">
                    <span>{latestPlacement.levelTitle}</span>
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 text-[#1cb0f6] font-black text-base">
                    %{latestPlacement.score} Başarı
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-[#666666] dark:text-[#cbd5e1] leading-relaxed">
                {latestPlacement.levelDescription}
              </p>

              {/* Subject Breakdown Bars */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8]">
                  Branş Bazında Kazanım Dağılımı
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {latestPlacement.subjectScores.map((sub) => (
                    <div
                      key={sub.subjectSlug}
                      className="p-3.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a]"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                          {sub.subjectName}
                        </span>
                        <span className="text-xs font-black text-[#1cb0f6]">
                          %{sub.percentage} ({sub.score}/{sub.total} Puan)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#e5e5e5] dark:bg-[#334155] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#1cb0f6]"
                          style={{ width: `${Math.max(5, sub.percentage)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalized Remediation Plan */}
              {latestPlacement.remediationPlan && latestPlacement.remediationPlan.length > 0 && (
                <div className="pt-4 border-t border-[#e5e5e5] dark:border-[#334155] space-y-3">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#ff9600]" />
                    <h3 className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                      Kişiselleştirilmiş Eksik Kapatma Rotası
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {latestPlacement.remediationPlan.map((plan, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-[#ff9600] bg-[#fff0db] dark:bg-[#ff9600]/20 px-2 py-0.5 rounded-md border border-[#ffb74d] dark:border-[#ff9600]/30">
                              Öncelik: {plan.priority === 'high' ? 'Yüksek' : 'Orta'}
                            </span>
                            <span className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                              {plan.topicName}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                            {plan.action}
                          </p>
                        </div>

                        <Link
                          href={`/quiz/${plan.topicId}`}
                          onClick={() => sounds.playClick()}
                          className="btn-duo btn-duo-blue px-4 py-2 rounded-xl text-xs font-black text-white shrink-0 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Pekiştir</span>
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AKADEMİK ORTAK SINAV SENARYOLARI */}
      {activeTab === 'scenarios' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Subject Switcher */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm">
            <div className="text-[11px] font-black uppercase tracking-wider text-[#afafaf] dark:text-[#64748b] mb-3">
              Akademik Branş Senaryolarını Seçin
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {subjects.map((sub) => {
                const isSelected = sub.slug === selectedSubjectSlug;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedSubjectSlug(sub.slug);
                    }}
                    className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black whitespace-nowrap transition-all border-2 border-b-4 cursor-pointer ${
                      isSelected
                        ? 'bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-[#1cb0f6] border-b-[#1899d6] text-[#1cb0f6]'
                        : 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
                    }`}
                  >
                    <AppIcon name={sub.icon} size={15} />
                    <span>{sub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scenarios List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentScenarios.map((sc) => (
              <div
                key={sc.id}
                className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-7 shadow-sm flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-0.5 text-[11px] font-black uppercase text-[#1cb0f6]">
                      Senaryo {sc.scenarioNumber}: {sc.difficultyLevel}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-black text-[#ff9600]">
                      <Clock className="w-3.5 h-3.5" />
                      {sc.durationMinutes} Dakika
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc] mb-2 leading-snug">
                    {sc.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8] leading-relaxed mb-5">
                    {sc.description}
                  </p>

                  {/* Cognitive Distribution Table */}
                  <div className="space-y-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#afafaf] dark:text-[#64748b]">
                      Kazanım & Bilişsel Düzey Tablosu
                    </span>
                    <div className="space-y-1.5">
                      {sc.distribution.map((dist, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-xl bg-[#f7f7f7] dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] flex items-center justify-between text-xs"
                        >
                          <span className="text-[#3c3c3c] dark:text-[#f8fafc] font-semibold truncate max-w-[280px]">
                            {dist.learningOutcome}
                          </span>
                          <span className="font-black text-[#1cb0f6] shrink-0 text-[11px] px-2 py-0.5 rounded-md bg-[#ddf4ff] dark:bg-[#1cb0f6]/20">
                            {dist.cognitiveLevel}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e5e5e5] dark:border-[#334155] flex items-center justify-between gap-4">
                  <div className="text-xs font-black text-[#58cc02]">
                    {sc.questions.length} Soru / {sc.totalPoints} Puan
                  </div>

                  <Link
                    href={`/exams/scenario/${sc.id}`}
                    onClick={() => sounds.playClick()}
                    className="btn-duo btn-duo-blue px-6 py-3 rounded-2xl text-xs font-black text-white flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Sınavı Başlat</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
