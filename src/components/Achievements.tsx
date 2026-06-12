import React from 'react';
import { motion } from 'motion/react';
import { Award, Lock } from 'lucide-react';
import { ALL_ACHIEVEMENTS, getUnlockedAchievements } from '../utils/achievements';

interface AchievementsProps {
  onBack?: () => void;
  isEmbedded?: boolean;
}

export default function Achievements({ onBack, isEmbedded = false }: AchievementsProps) {
  const unlocked = getUnlockedAchievements();
  const unlockedIds = new Set(unlocked.map((a) => a.id));

  const totalCount = ALL_ACHIEVEMENTS.length;
  const unlockedCount = unlocked.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100) || 0;

  // Group achievements by tier
  const getTierBadge = (tier: string) => {
    let label = '';
    let classes = '';
    switch (tier) {
      case 'legendary':
        label = 'Efsanevi';
        classes = 'bg-amber-500/20 text-yellow-400 border border-amber-500/30 font-extrabold uppercase tracking-widest text-[8px] px-1.5 py-0.5 rounded';
        break;
      case 'platinum':
        label = 'Platin';
        classes = 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/25 font-semibold text-[8px] px-1.5 py-0.5 rounded';
        break;
      case 'gold':
        label = 'Altın';
        classes = 'bg-yellow-500/10 text-yellow-300 border border-yellow-550/25 font-semibold text-[8px] px-1.5 py-0.5 rounded';
        break;
      case 'silver':
        label = 'Gümüş';
        classes = 'bg-slate-400/10 text-slate-300 border border-slate-400/25 text-[8px] px-1.5 py-0.5 rounded';
        break;
      default:
        label = 'Bronz';
        classes = 'bg-amber-900/20 text-amber-300 border border-amber-900/30 text-[8px] px-1.5 py-0.5 rounded';
    }
    return <span className={classes}>{label}</span>;
  };

  const content = (
    <div className="flex flex-col h-full w-full">
      {/* Mini Progress / Stats Info */}
      <div className="bg-slate-950/80 border border-slate-800/50 rounded-xl p-3 mb-4 flex items-center justify-between gap-3 shadow-inner">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Başarı Durumu</span>
          <span className="text-xs font-black text-amber-400 font-mono mt-0.5">
            {unlockedCount} / {totalCount} Rozet ({percentage}%)
          </span>
        </div>
        <div className="flex-grow max-w-[120px] h-2 bg-slate-900/90 rounded-full overflow-hidden border border-slate-800/40 p-[1px]">
          <div 
            style={{ width: `${percentage}%` }}
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {percentage === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-slate-950/40 rounded-xl border border-dashed border-slate-850 my-auto">
          <Award className="w-9 h-9 text-slate-600 mb-2 stroke-[1]" />
          <p className="text-slate-400 text-xs font-semibold">Henüz rozet kazanılmadı.</p>
          <p className="text-slate-550 text-[10px] mt-1 max-w-[180px] leading-relaxed">
            Milyoner modlarında yarışarak unvanları ve özel başarı rozetlerini açın!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 overflow-visible">
          {ALL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedIds.has(ach.id);
            const userUnlockedObj = unlocked.find((u) => u.id === ach.id);

            return (
              <motion.div
                key={ach.id}
                whileHover={isUnlocked ? { scale: 1.01 } : {}}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 relative overflow-hidden ${
                  isUnlocked
                    ? 'bg-slate-950/70 border-slate-850 hover:border-amber-500/30 shadow-sm'
                    : 'bg-slate-950/30 border-slate-900/40 opacity-45 select-none'
                }`}
              >
                {/* Visual glow on unlock */}
                {isUnlocked && (ach.tier === 'legendary' || ach.tier === 'platinum') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none" />
                )}

                {/* Left Badge Icon container */}
                <div className="shrink-0">
                  {isUnlocked ? (
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${ach.badgeColor} flex items-center justify-center text-xl shadow-md border`}>
                      {ach.icon}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-900/90 border border-slate-850 text-slate-600 flex items-center justify-center">
                      <Lock className="w-4 h-4 stroke-[1.5]" />
                    </div>
                  )}
                </div>

                {/* Meta text details layout */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-xs font-extrabold tracking-wide ${isUnlocked ? 'text-slate-100' : 'text-slate-500'}`}>
                      {ach.title}
                    </span>
                    {getTierBadge(ach.tier)}
                  </div>
                  
                  <p className={`text-[10px] mt-1 leading-normal ${isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                    {ach.description}
                  </p>

                  {isUnlocked && userUnlockedObj?.unlockedAt && (
                    <div className="text-[7.5px] font-mono text-slate-500 mt-1 text-right uppercase tracking-wider">
                      Tarih: {userUnlockedObj.unlockedAt.split(' ')[0]}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <div className="w-full bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
      <div className="flex items-center gap-2 border-b border-slate-800/60 pb-4 mb-4">
        <Award className="w-5 h-5 text-amber-400" />
        <h2 className="text-lg font-bold text-amber-300">Yarışma Başarımları</h2>
      </div>
      
      {content}

      {onBack && (
        <div className="mt-5 flex justify-end border-t border-slate-850 pt-4">
          <button
            onClick={onBack}
            className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-450 hover:text-slate-100 font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer transition-all"
          >
            Yarışmaya Dön
          </button>
        </div>
      )}
    </div>
  );
}
