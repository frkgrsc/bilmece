import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, BarChart3 } from 'lucide-react';
import { Question } from '../types';

interface AudienceDialogProps {
  question: Question;
  removedOptions: string[]; // Options eliminated by 50:50
  onClose: () => void;
}

export default function AudienceDialog({ question, removedOptions, onClose }: AudienceDialogProps) {
  const [votes, setVotes] = useState<Record<'A' | 'B' | 'C' | 'D', number>>({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });

  useEffect(() => {
    const correct = question.correctOption;
    const level = question.level;

    // Remaining options that are NOT eliminated
    const activeOptions = (['A', 'B', 'C', 'D'] as const).filter(
      (opt) => !removedOptions.includes(opt)
    );

    let distribution: Record<'A' | 'B' | 'C' | 'D', number> = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    };

    // Correct answer probability decreases as level rises
    let correctAnswerWeight = 85; // Default for low levels
    if (level <= 5) {
      correctAnswerWeight = 80 + Math.floor(Math.random() * 15); // 80% to 95%
    } else if (level <= 10) {
      correctAnswerWeight = 50 + Math.floor(Math.random() * 20); // 50% to 70%
    } else {
      correctAnswerWeight = 25 + Math.floor(Math.random() * 25); // 25% to 50%
    }

    // Active wrong options
    const wrongActiveOptions = activeOptions.filter((opt) => opt !== correct);

    if (wrongActiveOptions.length === 0) {
      // If none, correct gets 100% (shouldn't happen in 50:50, there's always at least one wrong options)
      distribution[correct] = 100;
    } else {
      let remainingPct = 100 - correctAnswerWeight;
      distribution[correct] = correctAnswerWeight;

      // Distribute the remaining votes randomly between active wrong options
      if (wrongActiveOptions.length === 1) {
        distribution[wrongActiveOptions[0]] = remainingPct;
      } else {
        // Distribute randomly
        const val1 = Math.floor(Math.random() * remainingPct);
        const val2 = remainingPct - val1;
        
        if (wrongActiveOptions.length === 2) {
          distribution[wrongActiveOptions[0]] = val1;
          distribution[wrongActiveOptions[1]] = val2;
        } else {
          // All 3 wrong options active
          const val3 = Math.floor(Math.random() * val2);
          distribution[wrongActiveOptions[0]] = val1;
          distribution[wrongActiveOptions[1]] = val3;
          distribution[wrongActiveOptions[2]] = val2 - val3;
        }
      }
    }

    setVotes(distribution);
  }, [question, removedOptions]);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border-2 border-amber-500/40 w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-6 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
          <Users className="w-8 h-8 text-amber-400 animate-pulse" />
          <div>
            <h3 className="text-lg font-bold text-amber-400">Seyirci Jokeri Sonuçları</h3>
            <p className="text-xs text-slate-400">Seyircilerin oylama dağılımı grafikteki gibidir.</p>
          </div>
        </div>

        {/* Bar Visualizer */}
        <div className="space-y-4 my-6">
          {(['A', 'B', 'C', 'D'] as const).map((key) => {
            const isEliminated = removedOptions.includes(key);
            const value = votes[key];

            return (
              <div key={key} className={isEliminated ? 'opacity-30' : ''}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-200">
                    {key} Şıkkı {isEliminated ? '(Elenmiş)' : ''}
                  </span>
                  <span className="text-amber-400">{isEliminated ? '0' : value}%</span>
                </div>
                <div className="w-full bg-slate-950/80 rounded-full h-4 border border-slate-800 relative overflow-hidden">
                  {!isEliminated && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${
                        key === question.correctOption && value > 35
                          ? 'from-amber-600 to-amber-400'
                          : 'from-blue-600 to-cyan-500'
                      }`}
                    ></motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-slate-500 text-center italic font-mono">
          Seyirci oylama doğruluğu, baraj turları geçildikçe değişkenlik gösterebilir.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-200 font-bold py-3 px-4 rounded-xl transition-all cursor-pointer"
        >
          Yarışma Alanına Geri Dön
        </button>
      </motion.div>
    </div>
  );
}
