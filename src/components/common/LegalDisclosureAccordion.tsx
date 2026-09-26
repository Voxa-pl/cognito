'use client';

import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, FileText, Scale } from 'lucide-react';

interface LegalSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: string | React.ReactNode;
}

const legalSections: LegalSection[] = [
  {
    id: 'privacy',
    title: 'Gizlilik Politikası & KVKK Aydınlatma Metni',
    icon: ShieldCheck,
    content: (
      <div className="space-y-2">
        <p>
          Cognito (&quot;Platform&quot;), 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili mevzuat uyarınca kullanıcılarının veri güvenliği ve mahremiyetini en üst seviyede tutmayı taahhüt eder.
        </p>
        <p>
          Platformumuzda şifreler hiçbir zaman düz metin olarak saklanmaz. Kimlik doğrulama işlemleri Google OAuth 2.0 ve Supabase şifreli belirteç altyapısı üzerinden gerçekleştirilir. Öğrenme analitiği, quiz sonuçları ve hata defteri kayıtları yalnızca kişiselleştirilmiş pedagojik telafi algoritmalarını beslemek üzere güvenli veritabanlarında şifreli olarak barındırılır. Kullanıcılar diledikleri an hesaplarını ve çalışma verilerini profil ayarları üzerinden kalıcı olarak sıfırlama veya silme hakkına sahiptir.
        </p>
      </div>
    ),
  },
  {
    id: 'terms',
    title: 'Kullanım Koşulları & Akademik Dürüstlük',
    icon: FileText,
    content: (
      <div className="space-y-2">
        <p>
          Cognito üzerinde sunulan tüm soru modelleri, bilişsel basamak analizleri, aralıklı tekrar matrisleri ve etkileşimli içerikler bireysel akademik gelişim ve pekiştirme amacıyla hazırlanmıştır.
        </p>
        <p>
          Platformun ticari amaçlarla kopyalanması, soru havuzunun yetkisiz kazınması (scraping) veya tersine mühendislik uygulanması yasaktır. Düello ve klan sisteminde akademik dürüstlük, saygılı rekabet ve yapıcı iş birliği kuralları esastır. Platform yönetimi hile veya kural ihlali tespit edilen hesaplarda sıralamayı sıfırlama hakkını saklı tutar.
        </p>
      </div>
    ),
  },
  {
    id: 'compliance',
    title: 'Akademik Uyumluluk ve Yasal Referans (MEB Kazanım Bildirimi)',
    icon: Scale,
    content: (
      <div className="space-y-2">
        <p>
          Cognito, Türkiye lise öğrenim standartları ve Milli Eğitim Bakanlığı güncel kazanım hedefleriyle tam uyumlu bilişsel bir akademik hazırlık ve öğrenme platformudur. İçerik yapısı ve soru modelleri resmi kazanım çerçeveleri referans alınarak pedagojik prensiplerle tasarlanmıştır. Platform bağımsız bir eğitim teknolojisi girişimi olup KVKK ve gizlilik haklarınıza tam saygı gösterir.
        </p>
      </div>
    ),
  },
];

interface LegalDisclosureAccordionProps {
  className?: string;
  compact?: boolean;
}

export function LegalDisclosureAccordion({
  className = '',
  compact = false,
}: LegalDisclosureAccordionProps) {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSectionId((current) => (current === id ? null : id));
  };

  return (
    <section
      aria-label="Yasal Bilgilendirme ve Gizlilik"
      className={`w-full max-w-4xl mx-auto select-none ${className}`}
    >
      <div className="rounded-2xl border border-slate-200 dark:border-[#334155]/60 bg-white/60 dark:bg-[#1e293b]/40 backdrop-blur-xs p-3 sm:p-4 text-[#64748b] dark:text-[#94a3b8] transition-colors">
        {/* Discreet Header / Prompt */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200/80 dark:border-[#334155]/40">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#94a3b8] dark:text-[#64748b]">
            Yasal &bull; Gizlilik &bull; Akademik Referans
          </span>
          <span className="text-[10px] font-semibold text-[#94a3b8] dark:text-[#64748b]">
            KVKK &bull; 2026-2027
          </span>
        </div>

        {/* Accordion Items */}
        <div className="space-y-1.5">
          {legalSections.map((section) => {
            const isOpen = openSectionId === section.id;
            const Icon = section.icon;

            return (
              <div
                key={section.id}
                className="rounded-xl border border-slate-200/60 dark:border-[#334155]/40 bg-slate-50/50 dark:bg-[#0f172a]/40 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-[11px] sm:text-xs font-bold text-[#475569] dark:text-[#94a3b8] hover:text-[#1cb0f6] dark:hover:text-[#38bdf8] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#1cb0f6] shrink-0" />
                    <span>{section.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1cb0f6]' : 'text-[#94a3b8]'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3 pt-1 text-[11px] leading-relaxed text-[#64748b] dark:text-[#94a3b8] border-t border-slate-200/50 dark:border-[#334155]/30">
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quiet Copyright Footnote */}
        <div className="pt-2.5 mt-2 text-center border-t border-slate-200/60 dark:border-[#334155]/40 text-[10px] font-medium text-[#94a3b8] dark:text-[#64748b]">
          Cognito &copy; 2026 &bull; Bilişsel ve Akademik Öğrenme Platformu &bull; Tüm Hakları Saklıdır
        </div>
      </div>
    </section>
  );
}

export default LegalDisclosureAccordion;
