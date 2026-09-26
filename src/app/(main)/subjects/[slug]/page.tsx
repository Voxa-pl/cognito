'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { subjects } from '@/data/subjects';
import { getUnitsForSubject } from '@/data/curriculum';
import { AppIcon } from '@/components/ui/Icon';
import { ArrowLeft, Layers, ChevronRight } from 'lucide-react';
import { sounds } from '@/lib/sound';

export default function SubjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);

  const subject = subjects.find((s) => s.slug === slug);

  if (!subject) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center gap-4">
        <h1 className="text-2xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">Ders Bulunamadı</h1>
        <button
          onClick={() => {
            sounds.playClick();
            router.push('/subjects');
          }}
          className="btn-duo btn-duo-green px-6 py-2.5 rounded-2xl text-sm font-black text-white"
        >
          Derslere Dön
        </button>
      </div>
    );
  }

  const units = getUnitsForSubject(slug);

  return (
    <div className="flex flex-col gap-6 pb-20 max-w-5xl mx-auto px-2">
      {/* Back button */}
      <Link
        href="/subjects"
        onClick={() => sounds.playClick()}
        className="btn-duo btn-duo-white flex w-fit items-center gap-2 text-xs font-black text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc] px-4 py-2 rounded-2xl dark:bg-[#1e293b] dark:border-[#334155] dark:border-b-[#283a45]"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Derslere Dön</span>
      </Link>

      {/* Subject Header Card */}
      <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-6 md:p-8 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 shadow-sm">
            <AppIcon name={subject.icon} size={32} />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#1cb0f6]">
              {subject.realmName}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight mt-0.5">
              {subject.name}
            </h1>
            <p className="text-sm font-semibold text-[#777777] dark:text-[#94a3b8] mt-1.5 leading-relaxed max-w-xl">
              {subject.description}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#f7f7f7] dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] px-3 py-1.5 text-xs font-black text-[#777777] dark:text-[#94a3b8]">
              <Layers className="w-4 h-4 text-[#1cb0f6]" />
              <span>{units.length > 0 ? units.length : subject.unitCount} Öğrenim Ünitesi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Units List */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
          Ders Üniteleri
        </h2>

        {units.length > 0 ? (
          <div className="space-y-3.5">
            {units.map((unit) => (
              <Link
                key={unit.id}
                href={`/subjects/${slug}/${unit.id}`}
                onClick={() => sounds.playClick()}
                className="block group"
              >
                <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-5 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-5 flex items-center justify-between transition-all hover:bg-[#f7f7f7] dark:hover:bg-[#283a45] hover:border-[#d0d0d0] dark:hover:border-[#475569] hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-2 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 group-hover:scale-105 transition-transform shadow-sm">
                      <AppIcon name={unit.icon} size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#1cb0f6] uppercase tracking-wider">
                          Ünite {unit.orderIndex}
                        </span>
                        <span className="text-[#cecece] dark:text-[#475569]">•</span>
                        <span className="text-xs font-bold text-[#777777] dark:text-[#94a3b8]">{unit.topicCount} Konu</span>
                      </div>
                      <h3 className="font-black text-base md:text-lg text-[#3c3c3c] dark:text-[#f8fafc] group-hover:text-[#1cb0f6] transition-colors mt-0.5">
                        {unit.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-[#f7f7f7] dark:bg-[#0f172a] text-[#afafaf] dark:text-[#64748b] group-hover:bg-[#ddf4ff] dark:group-hover:bg-[#1cb0f6]/20 group-hover:text-[#1cb0f6] group-hover:translate-x-1 transition-all">
                    <ChevronRight className="w-5 h-5 stroke-[3]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white dark:bg-[#1e293b] p-8 text-center border-2 border-[#e5e5e5] dark:border-[#334155]">
            <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc]">Bu dersin üniteleri hazırlanıyor.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
