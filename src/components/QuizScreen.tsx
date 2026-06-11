import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Coins,
  Smile,
  LogOut,
  HelpCircle,
  Users,
  Phone,
  RefreshCw,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { Question, JokerType, Joker, PRIZE_LEVELS, AnswerState } from '../types';
import audio from '../utils/audio';

interface QuizScreenProps {
  nickname: string;
  question: Question;
  level: number;
  jokers: Joker[];
  timed: boolean;
  onAnswer: (option: 'A' | 'B' | 'C' | 'D') => void;
  onUseJoker: (jokerType: JokerType) => void;
  onWalkAway: () => void;
  removedOptions: string[];
  answerState: AnswerState;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  revealingIndex: number;
}

export default function QuizScreen({
  nickname,
  question,
  level,
  jokers,
  timed,
  onAnswer,
  onUseJoker,
  onWalkAway,
  removedOptions,
  answerState,
  selectedOption,
  revealingIndex,
}: QuizScreenProps) {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [showConfirmWalkAway, setShowConfirmWalkAway] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound effects & tracking
  useEffect(() => {
    // Reset timer on new question
    if (timed && answerState === 'idle') {
      setSecondsLeft(30);
    }
  }, [question, timed, answerState]);

  useEffect(() => {
    if (!timed || answerState !== 'idle') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Time out!
          handleTimeOut();
          return 0;
        }
        // Play ticking sound on last 10 seconds
        if (prev <= 11) {
          audio.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timed, answerState, question]);

  const handleTimeOut = () => {
    // Trigger wrong answer state automatically by raising time-out
    onAnswer(null as any); // Will be caught as wrong answer in parent
  };

  // Get next potential reward if they walk away
  const currentLevelPrize = PRIZE_LEVELS.find((p) => p.level === level - 1)?.display || '0 TL';
  const rewardIfCorrect = PRIZE_LEVELS.find((p) => p.level === level)?.display || '0 TL';

  return (
    <div id="quiz-screen-container" className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[85vh] text-white p-4 max-w-7xl mx-auto w-full">
      {/* Main Game Arena */}
      <div className="xl:col-span-9 flex flex-col justify-between py-2">
        {/* Top bar with player info, timer, jokers */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-md flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-amber-500/25">
              👑
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Yarışmacı</p>
              <h3 className="font-bold text-sm text-amber-200">{nickname}</h3>
            </div>
          </div>

          {/* Timed wheel indicator */}
          {timed && (
            <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              <Clock
                className={`w-5 h-5 ${
                  secondsLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-amber-400'
                }`}
              />
              <span
                className={`font-mono text-lg font-bold ${
                  secondsLeft <= 10 ? 'text-rose-500' : 'text-slate-200'
                }`}
              >
                {secondsLeft}s
              </span>
            </div>
          )}

          {/* Lifelines (Jokers) */}
          <div className="flex items-center gap-2">
            {jokers.map((joker) => {
              const isAvailable = !joker.used && (joker.id !== 'switchQuestion' || level >= 7);
              let icon = <HelpCircle className="w-4 h-4" />;
              if (joker.id === 'fiftyFifty') icon = <span className="font-bold text-xs">50%</span>;
              if (joker.id === 'phoneFriend') icon = <Phone className="w-4 h-4" />;
              if (joker.id === 'audience') icon = <Users className="w-4 h-4" />;
              if (joker.id === 'switchQuestion') icon = <RefreshCw className="w-4 h-4" />;

              return (
                <button
                  key={joker.id}
                  disabled={!isAvailable || answerState !== 'idle'}
                  onClick={() => onUseJoker(joker.id)}
                  title={
                    joker.id === 'switchQuestion' && level < 7
                      ? '7. Sorudan sonra açılır'
                      : joker.label
                  }
                  className={`w-11 h-11 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    joker.used
                      ? 'bg-slate-950 border-slate-900 text-slate-700 cursor-not-allowed line-through'
                      : !isAvailable
                      ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed opacity-40'
                      : 'bg-slate-900/90 border-amber-500/30 text-amber-400 hover:border-amber-400 hover:text-amber-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer'
                  }`}
                >
                  {icon}
                  <span className="text-[7.5px] mt-0.5 uppercase tracking-tighter">{joker.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question and choices box */}
        <div className="my-8 flex flex-col items-center flex-1 justify-center max-w-4xl mx-auto w-full">
          {/* Question Text Card */}
          <div className="w-full relative mb-6">
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent top-1/2 -z-10"></div>
            <motion.div
              key={question.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/90 border-2 border-slate-800 rounded-2xl px-6 py-6 md:px-8 shadow-2xl relative max-w-3xl mx-auto flex flex-col items-center text-center backdrop-blur-sm min-h-[140px] justify-center"
            >
              {/* Category label */}
              <span className="absolute -top-3 px-3 py-1 bg-slate-950 border border-slate-800 text-amber-400 text-[10px] font-semibold rounded-full uppercase tracking-widest font-mono">
                {question.category}
              </span>

              <h2 id="current-question-text" className="text-base md:text-xl font-medium leading-relaxed text-slate-100 p-2">
                {question.text}
              </h2>
            </motion.div>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
            {(['A', 'B', 'C', 'D'] as const).map((opt) => {
              const isEliminated = removedOptions.includes(opt);
              const isSelected = selectedOption === opt;

              let btnBorderColor = 'border-slate-800 hover:border-amber-500/50';
              let btnBgColor = 'bg-slate-900/70 hover:bg-slate-900';
              let btnTextColor = 'text-slate-100';

              if (isEliminated) {
                return <div key={opt} className="hidden md:block opacity-0 h-[64px]" />;
              }

              if (isSelected) {
                if (answerState === 'selected') {
                  btnBorderColor = 'border-amber-400 shadow-lg shadow-amber-500/20';
                  btnBgColor = 'bg-amber-950/40';
                  btnTextColor = 'text-amber-300';
                } else if (answerState === 'correct') {
                  btnBorderColor = 'border-emerald-500 shadow-lg shadow-emerald-500/20 animate-pulse';
                  btnBgColor = 'bg-emerald-950/40';
                  btnTextColor = 'text-emerald-300';
                } else if (answerState === 'wrong') {
                  btnBorderColor = 'border-rose-500 shadow-lg shadow-rose-500/20';
                  btnBgColor = 'bg-rose-950/40';
                  btnTextColor = 'text-rose-300';
                }
              }

              // Highlight true correct option if wrong selection revealed
              if (answerState === 'revealed' && question.correctOption === opt) {
                btnBorderColor = 'border-emerald-500 shadow-lg shadow-emerald-500/20';
                btnBgColor = 'bg-emerald-950/40';
                btnTextColor = 'text-emerald-300';
              }

              return (
                <button
                  key={opt}
                  disabled={answerState !== 'idle'}
                  onClick={() => onAnswer(opt)}
                  className={`w-full text-left rounded-xl border px-5 py-4 flex items-center gap-3 transition-all cursor-pointer group ${btnBorderColor} ${btnBgColor} ${btnTextColor}`}
                >
                  <span className="font-bold font-mono text-amber-400 group-hover:scale-110 transition-transform">
                    {opt}:
                  </span>
                  <span className="text-sm font-medium">{question.options[opt]}</span>
                </button>
              );
            })}
          </div>

          {/* Fun Fact / Explanation Dialogue after answering correctly or wrong */}
          {question.explanation && (answerState === 'correct' || answerState === 'revealed') && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl max-w-3xl w-full flex gap-3 text-sm text-slate-300 backdrop-blur-md"
            >
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-0.5">Biliyor muydunuz?</strong>
                <p className="text-xs text-slate-300 leading-relaxed">{question.explanation}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Lower row details & buttons */}
        <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            Soru {level} / 15 • Hedeflenen Ödül:{' '}
            <strong className="text-amber-400">{rewardIfCorrect}</strong>
          </p>

          <div className="flex gap-2">
            {/* Walk Away Dialog Trigger */}
            <button
              onClick={() => setShowConfirmWalkAway(true)}
              disabled={answerState !== 'idle'}
              className="bg-slate-950 hover:bg-slate-900 hover:text-white border border-slate-800 text-slate-400 text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <LogOut className="w-4 h-4" /> Çekil ({currentLevelPrize})
            </button>
          </div>
        </div>
      </div>

      {/* Level Ladder Sidebar */}
      <div className="xl:col-span-3">
        <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-md h-full flex flex-col justify-between shadow-2xl">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" /> Ödül Merdiveni
            </h3>

            <div className="space-y-1">
              {PRIZE_LEVELS.map((item) => {
                const isCurrent = item.level === level;
                const isPassed = item.level < level;
                const isMilestone = item.isMilestone;

                let rowBg = 'hover:bg-slate-950/20';
                let textColor = 'text-slate-400';
                let bulletColor = 'bg-slate-800';

                if (isCurrent) {
                  rowBg = 'bg-amber-500/20 border border-amber-500/50 scale-[1.02] shadow-lg';
                  textColor = 'text-amber-300 font-bold';
                  bulletColor = 'bg-amber-400';
                } else if (isPassed) {
                  textColor = 'text-slate-500 line-through';
                  bulletColor = 'bg-slate-700';
                }

                if (isMilestone && !isCurrent) {
                  textColor = isPassed ? 'text-emerald-400/50 line-through' : 'text-emerald-400 font-semibold';
                  bulletColor = 'bg-emerald-500/50';
                }

                return (
                  <div
                    key={item.level}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${rowBg}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${bulletColor}`}></span>
                      <span className={textColor}>Sorusu {item.level}</span>
                    </div>
                    <span className={textColor}>{item.display}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 mt-4 text-center">
            <span className="block text-[10px] text-zinc-500 font-mono">Milyoner Bilgi Yarışması v1.2</span>
          </div>
        </div>
      </div>

      {/* Walk Away Modal Confirmation */}
      <AnimatePresence>
        {showConfirmWalkAway && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border-2 border-amber-500/40 w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center"
            >
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-bold text-slate-100 mb-2">Çekilmek İstiyor musunuz?</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Şu ana kadar kazandığınız garanti miktar olan <strong className="text-amber-400">{currentLevelPrize}</strong> ile yarışmayı bitirmek üzeresiniz. Devam edip yanlış cevap verirseniz ödülünüz düşebilir!
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmWalkAway(false)}
                  className="flex-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-medium py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Yarışmaya Dön
                </button>
                <button
                  onClick={() => {
                    setShowConfirmWalkAway(false);
                    onWalkAway();
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs hover:from-amber-500 hover:to-amber-400 transition-all cursor-pointer"
                >
                  Ödülü Al ve Git
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
