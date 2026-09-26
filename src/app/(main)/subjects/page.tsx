'use client';

import Link from 'next/link';
import { subjects } from '@/data/subjects';
import { AppIcon } from '@/components/ui/Icon';
import { BookOpen, ChevronRight, Layers } from 'lucide-react';
import { getUnitsForSubject } from '@/data/curriculum';
import { sounds } from '@/lib/sound';

export default function SubjectsPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 max-w-6xl mx-auto px-2">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#1cb0f6]">
            Akademik Program
          </span>
          <span className="text-xs font-bold text-[#777777] dark:text-[#94a3b8]">9. Sınıf Tüm Alanlar</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40">
            <BookOpen className="w-7 h-7 stroke-[2.5]" />
          </div>
          <span>Dersler ve Üniteler</span>
        </h1>
        <p className="mt-1 text-sm md:text-base text-[#777777] dark:text-[#94a3b8] font-semibold">
          Çalışmak istediğin dersi seç, üniteleri incele ve testleri çözerek seviyeni yükselt.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {subjects.map((subject) => {
          const units = getUnitsForSubject(subject.slug);
          const realUnitCount = units.length > 0 ? units.length : subject.unitCount;

          return (
            <Link
              key={subject.id}
              href={`/subjects/${subject.slug}`}
              onClick={() => sounds.playClick()}
              className="group"
            >
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 transition-all hover:bg-[#f7f7f7] dark:hover:bg-[#283a45] hover:border-[#d0d0d0] dark:hover:border-[#1cb0f6]/40 hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-2 shadow-sm">
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 shadow-sm group-hover:scale-105 transition-transform">
                      <AppIcon name={subject.icon} size={28} />
                    </div>
                    <span className="rounded-xl bg-[#f7f7f7] dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] px-3 py-1 text-xs font-black text-[#777777] dark:text-[#94a3b8]">
                      {realUnitCount} Ünite
                    </span>
                  </div>

                  <h2 className="mb-0.5 text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc] group-hover:text-[#1cb0f6] transition-colors">
                    {subject.name}
                  </h2>
                  <p className="mb-3 text-[11px] font-black uppercase tracking-wider text-[#1cb0f6]">
                    {subject.realmName}
                  </p>

                  <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8] line-clamp-2 leading-relaxed">
                    {subject.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e5e5e5] dark:border-[#334155] flex items-center justify-between">
                  <span className="text-xs font-black text-[#777777] dark:text-[#94a3b8] group-hover:text-[#1cb0f6] transition-colors">
                    Üniteleri Keşfet
                  </span>
                  <div className="p-1.5 rounded-xl bg-[#f7f7f7] dark:bg-[#0f172a] text-[#afafaf] dark:text-[#64748b] group-hover:bg-[#ddf4ff] dark:group-hover:bg-[#1cb0f6]/20 group-hover:text-[#1cb0f6] group-hover:translate-x-1 transition-all">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
