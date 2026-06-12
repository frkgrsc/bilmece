import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Crown } from 'lucide-react';
import audio from '../utils/audio';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'logo' | 'brand' | 'finished'>('logo');

  useEffect(() => {
    // Elegant incremental progress loading
    const totalDuration = 3200; // 3.2 seconds
    const intervalTime = 40;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, (currentStep / steps) * 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setPhase('finished');
        setTimeout(() => {
          onComplete();
        }, 600); // final exit buffer
      }
    }, intervalTime);

    // Play subtle tick or sound trigger if audio is initialized
    // (Note: browsers block immediate autoplay before interaction, but we try a gentle tick)
    try {
      const handleUserInteraction = () => {
        audio.playTick();
        window.removeEventListener('click', handleUserInteraction);
      };
      window.addEventListener('click', handleUserInteraction);
    } catch (e) {
      // Ignored
    }

    return () => {
      clearInterval(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 overflow-hidden select-none">
      {/* Background radial soft light blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/5 to-blue-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-slate-900/40 blur-[90px] rounded-full"></div>
      </div>

      {/* Cyber/Modern grid mask in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#090d16_1px,transparent_1px),linear-gradient(to_bottom,#090d16_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_60%,transparent_100%)] opacity-45 pointer-events-none"></div>

      {/* Main Animated Display Card */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Animated Trophy / Logo Holder */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-8"
        >
          {/* Rotating metallic outer gold circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
            className="w-24 h-24 rounded-full border border-dashed border-amber-500/35 flex items-center justify-center p-1.5"
          >
            {/* Glowing inner premium shield */}
            <div className="w-full h-full rounded-full bg-slate-950/90 border-2 border-amber-400/40 shadow-inner flex items-center justify-center relative shadow-lg shadow-amber-500/10">
              <Trophy className="w-9 h-9 text-amber-400 stroke-[1.5] animate-pulse" />
              <div className="absolute -top-1 -right-1 bg-yellow-400/10 border border-yellow-400/30 p-1 rounded-full">
                <Sparkles className="w-3" />
              </div>
            </div>
          </motion.div>

          {/* Golden ring pulse waves */}
          <div className="absolute inset-0 border border-amber-500/20 rounded-full scale-125 animate-ping pointer-events-none opacity-40"></div>
        </motion.div>

        {/* Title Group with cinematic slide revealed letters */}
        <div className="space-y-2 mb-10 overflow-hidden">
          <motion.h1
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.25em] bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 bg-clip-text text-transparent filter drop-shadow-sm font-sans"
          >
            MİLYONER
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[11px] sm:text-xs uppercase font-medium tracking-[0.45em] text-cyan-400/80 font-mono"
          >
            Bilgi Yarışması
          </motion.p>
        </div>

        {/* Progress Bar & Loader Panel */}
        <div className="w-64 max-w-full space-y-3 mb-16">
          <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-900 relative">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-600 via-yellow-400 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(234,179,8,0.4)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-1">
            <span>Sorgulanıyor...</span>
            <span className="text-amber-400/90">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Brand footer indicator - Powered By Else Studio (Moved to direct child of outer screen container for perfect bottom alignment) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] text-slate-500 font-mono tracking-[0.35em] font-medium uppercase opacity-80">
          Powered By
        </span>
        <div className="flex items-center px-4 py-1.5 bg-slate-900/40 rounded-full border border-slate-900/50 shadow-sm backdrop-blur-md">
          <span className="text-xs font-semibold text-slate-200 tracking-widest font-mono uppercase">
            Else STUDIO
          </span>
        </div>
      </motion.div>
    </div>
  );
}
