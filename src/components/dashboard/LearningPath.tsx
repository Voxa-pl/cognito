'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Play,
  Lock,
  Trophy,
  BookOpen,
  ShieldCheck,
  Target,
  Sparkles,
  Star,
  Award,
} from 'lucide-react';
import { Unit, Topic } from '@/types';
import { getUnitsForSubject, getTopicsForUnit } from '@/data/curriculum';
import { subjects } from '@/data/subjects';
import { useUserStore } from '@/stores/useUserStore';
import { AppIcon } from '@/components/ui/Icon';
import { UnitGuideModal } from './UnitGuideModal';
import { ChestRewardModal } from './ChestRewardModal';
import { sounds } from '@/lib/sound';

interface LearningPathProps {
  subjectSlug: string;
}

// Unit theme palettes (Authentic Duolingo color rotation)
const unitColorPalettes = [
  {
    bg: 'bg-[#58cc02]',
    border: 'border-[#58a700]',
    shadow: '#58a700',
    lightBg: 'bg-[#e5f8d0]',
    textColor: 'text-[#58cc02]',
    accentColor: '#58cc02',
  },
  {
    bg: 'bg-[#1cb0f6]',
    border: 'border-[#1899d6]',
    shadow: '#1899d6',
    lightBg: 'bg-[#ddf4ff]',
    textColor: 'text-[#1cb0f6]',
    accentColor: '#1cb0f6',
  },
  {
    bg: 'bg-[#ff9600]',
    border: 'border-[#e68700]',
    shadow: '#e68700',
    lightBg: 'bg-[#fff0db]',
    textColor: 'text-[#ff9600]',
    accentColor: '#ff9600',
  },
  {
    bg: 'bg-[#ce82ff]',
    border: 'border-[#a560e8]',
    shadow: '#a560e8',
    lightBg: 'bg-[#f4e6ff]',
    textColor: 'text-[#ce82ff]',
    accentColor: '#ce82ff',
  },
  {
    bg: 'bg-[#ffc800]',
    border: 'border-[#e5a500]',
    shadow: '#e5a500',
    lightBg: 'bg-[#fff8db]',
    textColor: 'text-[#e5a500]',
    accentColor: '#ffc800',
  },
  {
    bg: 'bg-[#ff4b4b]',
    border: 'border-[#ea2b2b]',
    shadow: '#ea2b2b',
    lightBg: 'bg-[#ffdfe0]',
    textColor: 'text-[#ff4b4b]',
    accentColor: '#ff4b4b',
  },
];

// Winding curve horizontal offsets (S-curve snake)
const snakeOffsets = [0, -45, -70, -45, 0, 45, 70, 45];

export function LearningPath({ subjectSlug }: LearningPathProps) {
  const user = useUserStore((state) => state.user);
  const topicProgress = useUserStore((state) => state.topicProgress);
  const claimedChests = useUserStore((state) => state.claimedChests);
  const claimChest = useUserStore((state) => state.claimChest);

  const [activeGuideUnit, setActiveGuideUnit] = useState<Unit | null>(null);
  const [activeChest, setActiveChest] = useState<{ id: string; gems: number; xp: number } | null>(null);

  const subject = subjects.find((s) => s.slug === subjectSlug) || subjects[0];
  const units = getUnitsForSubject(subjectSlug);

  // Global counter across all nodes to keep track of active node
  let hasFoundActive = false;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-2">
      {units.map((unit, unitIdx) => {
        const topics = getTopicsForUnit(unit.id);
        const palette = unitColorPalettes[unitIdx % unitColorPalettes.length];

        // Check if all topics in this unit are completed
        const unitCompleted = topics.length > 0 && topics.every(
          (t) => (topicProgress[t.id]?.masteryLevel || 0) >= 70
        );

        return (
          <div key={unit.id} className="w-full flex flex-col items-center mb-16">
            {/* Unit Header Card (Duolingo Style Banner) */}
            <div
              className={`w-full rounded-3xl p-5 sm:p-6 text-white shadow-lg border-b-6 ${palette.bg} ${palette.border} mb-12 relative overflow-hidden`}
            >
              {/* Subtle background decoration */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center justify-between gap-4 relative z-10">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-white/80 block">
                    ÜNİTE {unit.orderIndex}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                    {unit.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-white/90 mt-1 max-w-md">
                    {subject.name} programında {topics.length} kritik konuyu tamamla ve ustalığını kanıtla.
                  </p>
                </div>

                {/* Guidebook Button */}
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveGuideUnit(unit);
                  }}
                  className="flex items-center gap-2 rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 px-3.5 sm:px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white border-2 border-white/30 backdrop-blur-sm transition-all shrink-0 cursor-pointer shadow-sm"
                  title="Ünite Rehberi"
                >
                  <BookOpen className="w-4 h-4 stroke-[2.5]" />
                  <span className="hidden sm:inline">REHBER</span>
                </button>
              </div>
            </div>

            {/* Winding Snake Path for Unit Topics */}
            <div className="relative flex flex-col items-center w-full gap-9 sm:gap-11">
              {topics.map((topic, topicIdx) => {
                const mastery = topicProgress[topic.id]?.masteryLevel || 0;
                const isTopicCompleted = mastery >= 70;

                let nodeStatus: 'completed' | 'active' | 'locked' = 'locked';

                if (isTopicCompleted) {
                  nodeStatus = 'completed';
                } else if (!hasFoundActive) {
                  nodeStatus = 'active';
                  hasFoundActive = true;
                } else {
                  nodeStatus = 'locked';
                }

                // Calculate winding offset
                const offsetIdx = (unitIdx * 4 + topicIdx) % snakeOffsets.length;
                const offsetPx = snakeOffsets[offsetIdx];

                // Milestone chest placement (after topic 2 in larger units)
                const showChestAfter = topicIdx === 1 && topics.length >= 3;
                const chestId = `chest-${unit.id}`;
                const isChestClaimed = claimedChests.includes(chestId);
                const isChestUnlocked = isTopicCompleted;

                return (
                  <div key={topic.id} className="flex flex-col items-center w-full">
                    {/* Node Container with S-Curve translation */}
                    <div
                      style={{
                        transform: `translateX(${offsetPx}px)`,
                        transition: 'transform 0.3s ease',
                      }}
                      className="flex flex-col items-center"
                    >
                      {/* 3D Round Bouncy Node */}
                      <div className="relative group">
                        {/* Completed Node */}
                        {nodeStatus === 'completed' && (
                          <Link
                            href={`/quiz/${topic.id}`}
                            onClick={() => sounds.playClick()}
                            className="node-3d flex h-18 w-18 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#ffc800] border-4 border-[#ffe066] shadow-[0_6px_0_#e5a500] text-white hover:scale-105 active:scale-95 transition-all"
                            title={`${topic.name} (Tekrar Çöz)`}
                          >
                            <Check className="w-9 h-9 sm:w-10 sm:h-10 stroke-[3.5] text-white drop-shadow-sm" />
                            {/* Golden stars around completed node */}
                            <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#e5a500] shadow-md border-2 border-[#ffc800]">
                              <Star className="w-3.5 h-3.5 fill-[#ffc800] text-[#ffc800]" />
                            </div>
                          </Link>
                        )}

                        {/* Current Active Node */}
                        {nodeStatus === 'active' && (
                          <div className="relative flex flex-col items-center">
                            {/* Bouncy "BAŞLA" Speech Bubble */}
                            <div className="absolute -top-11 z-20 speech-bubble-bounce">
                              <div
                                className={`relative px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white rounded-xl shadow-md border-b-2 ${palette.bg} ${palette.border}`}
                              >
                                BAŞLA
                                {/* Pointer arrow */}
                                <div
                                  className={`absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 ${palette.bg}`}
                                />
                              </div>
                            </div>

                            <Link
                              href={`/quiz/${topic.id}`}
                              onClick={() => sounds.playClick()}
                              style={
                                {
                                  '--node-shadow': palette.shadow,
                                } as React.CSSProperties
                              }
                              className={`node-3d node-active-pulse flex h-20 w-20 sm:h-22 sm:w-22 items-center justify-center rounded-full text-white border-4 border-white/60 shadow-[0_8px_0_${palette.shadow}] ${palette.bg} hover:scale-105 active:scale-95 transition-all`}
                              title={`${topic.name} (Başla)`}
                            >
                              <Play className="w-9 h-9 sm:w-10 sm:h-10 fill-white text-white translate-x-0.5" />
                            </Link>
                          </div>
                        )}

                        {/* Locked Node */}
                        {nodeStatus === 'locked' && (
                          <div
                            className="node-3d node-locked flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-[#e5e5e5] dark:bg-[#1e293b] border-4 border-[#f0f0f0] dark:border-[#334155] shadow-[0_6px_0_#cecece] dark:shadow-[0_6px_0_#0f172a] text-[#afafaf] dark:text-[#64748b] cursor-not-allowed"
                            title="Önceki konuları tamamla"
                          >
                            <Lock className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                          </div>
                        )}
                      </div>

                      {/* Topic Label */}
                      <div className="mt-2.5 flex flex-col items-center text-center max-w-[190px]">
                        <span className="text-xs sm:text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc] line-clamp-1">
                          {topic.name}
                        </span>
                        <span className="text-[10px] font-bold text-[#777777] dark:text-[#94a3b8]">
                          {nodeStatus === 'completed'
                            ? 'Kazanım Kavrandı (%100)'
                            : nodeStatus === 'active'
                            ? `+${topic.xpReward} XP`
                            : 'Kilitli'}
                        </span>
                      </div>
                    </div>

                    {/* Milestone Academic Checkpoint (Ara Değerlendirme İstasyonu) */}
                    {showChestAfter && (
                      <div
                        style={{
                          transform: `translateX(${snakeOffsets[(offsetIdx + 1) % snakeOffsets.length]}px)`,
                        }}
                        className="my-4 flex flex-col items-center"
                      >
                        <button
                          onClick={() => {
                            if (isChestUnlocked && !isChestClaimed) {
                              sounds.playClick();
                              setActiveChest({ id: chestId, gems: 25, xp: 50 });
                            }
                          }}
                          disabled={!isChestUnlocked || isChestClaimed}
                          className={`node-3d flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-2xl border-4 transition-all ${
                            isChestClaimed
                              ? 'bg-[#e5f8d0] dark:bg-[#58cc02]/20 border-[#58cc02] shadow-[0_4px_0_#3f9600] text-[#58cc02] cursor-default'
                              : isChestUnlocked
                              ? 'bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-[#1cb0f6] shadow-[0_6px_0_#1899d6] text-[#1cb0f6] animate-pulse cursor-pointer'
                              : 'bg-[#e5e5e5] dark:bg-[#1e293b] border-[#f0f0f0] dark:border-[#334155] shadow-[0_4px_0_#cecece] dark:shadow-[0_4px_0_#0f172a] text-[#afafaf] dark:text-[#64748b] cursor-not-allowed'
                          }`}
                          title={isChestClaimed ? 'Kazanım Doğrulandı' : isChestUnlocked ? 'Kazanım Kontrol Noktası' : 'Önceki konuları tamamla'}
                        >
                          {isChestClaimed ? (
                            <ShieldCheck className="w-8 h-8 stroke-[3] text-[#58cc02]" />
                          ) : (
                            <Target className="w-8 h-8 stroke-[2.5]" />
                          )}

                          {/* "KONTROL" Badge if ready */}
                          {isChestUnlocked && !isChestClaimed && (
                            <div className="absolute -top-3 rounded-full bg-[#1cb0f6] px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-md">
                              ONAY
                            </div>
                          )}
                        </button>
                        <span className="mt-1 text-[10px] font-bold text-[#777777] dark:text-[#94a3b8]">
                          {isChestClaimed ? 'Kazanım Onaylandı' : isChestUnlocked ? '+50 XP Onayla' : 'Ara Kontrol'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Unit Final Challenge Node: Academic Evaluation & Certification */}
              <div
                style={{
                  transform: `translateX(0px)`,
                }}
                className="mt-4 flex flex-col items-center"
              >
                <div className="relative group">
                  <Link
                    href={`/quiz/${topics[0]?.id || 'mixed'}`}
                    onClick={() => sounds.playClick()}
                    className={`node-3d flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl border-4 transition-all ${
                      unitCompleted
                        ? 'bg-gradient-to-b from-[#ffc800] to-[#ffa500] border-[#ffe066] shadow-[0_8px_0_#d48800] text-white hover:scale-105 active:scale-95'
                        : hasFoundActive
                        ? 'bg-[#fff8e1] dark:bg-[#1e293b] border-[#ffe066] dark:border-[#ffc800]/50 shadow-[0_6px_0_#e5a500] dark:shadow-[0_6px_0_#b78103] text-[#ff9600] hover:scale-105 active:scale-95'
                        : 'bg-[#e5e5e5] dark:bg-[#1e293b] border-[#f0f0f0] dark:border-[#334155] shadow-[0_6px_0_#cecece] dark:shadow-[0_6px_0_#0f172a] text-[#afafaf] dark:text-[#64748b] cursor-not-allowed'
                    }`}
                    title="Ünite Bitirme Değerlendirme Sınavı"
                  >
                    <Trophy className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
                    {unitCompleted && (
                      <div className="absolute -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#58cc02] text-white shadow-md border-2 border-white">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </Link>
                </div>

                <div className="mt-2 text-center">
                  <span className="text-xs sm:text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc] block">
                    Ünite {unit.orderIndex} Değerlendirme Sınavı
                  </span>
                  <span className="text-[10px] font-bold text-[#777777] dark:text-[#94a3b8]">
                    {unitCompleted ? 'Başarı Sertifikası Kazanıldı!' : 'Final Testi (+100 XP)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Guidebook Modal */}
      <UnitGuideModal
        unit={activeGuideUnit}
        isOpen={!!activeGuideUnit}
        onClose={() => setActiveGuideUnit(null)}
      />

      {/* Milestone Chest Reward Modal */}
      <ChestRewardModal
        isOpen={!!activeChest}
        chestId={activeChest?.id || ''}
        gemReward={activeChest?.gems || 25}
        xpReward={activeChest?.xp || 50}
        onClaim={() => {
          if (activeChest) {
            claimChest(activeChest.id, activeChest.gems, activeChest.xp);
            setActiveChest(null);
          }
        }}
        onClose={() => setActiveChest(null)}
      />
    </div>
  );
}
