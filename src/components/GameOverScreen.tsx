import { motion } from 'motion/react';
import { Trophy, RefreshCw, Award, Sparkles, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';
import { HighScore } from '../types';

interface GameOverScreenProps {
  nickname: string;
  prizeWon: string;
  levelReached: number;
  walkedAway: boolean;
  onRestart: () => void;
  failedOnQuestionText?: string;
  isPerfectWin: boolean;
}

export default function GameOverScreen({
  nickname,
  prizeWon,
  levelReached,
  walkedAway,
  onRestart,
  failedOnQuestionText,
  isPerfectWin,
}: GameOverScreenProps) {
  const dateStr = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-white py-8 px-4 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-slate-900 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative text-center"
      >
        {isPerfectWin ? (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full"></div>
              <span className="relative bg-amber-400 border-4 border-amber-300 rounded-full w-20 h-20 flex items-center justify-center shadow-2xl text-4xl">
                🏆
              </span>
            </div>
          </div>
        ) : (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <span className="bg-slate-800 border-4 border-slate-700 rounded-full w-16 h-16 flex items-center justify-center shadow-2xl text-3xl">
              {walkedAway ? '💰' : '📉'}
            </span>
          </div>
        )}

        <div className="pt-8">
          {isPerfectWin ? (
            <div>
              <span className="text-xs uppercase tracking-widest bg-amber-500/15 text-amber-400 font-bold border border-amber-500/20 px-3 py-1 rounded-full inline-block mb-3 animate-pulse">
                Mükemmel Seviye
              </span>
              <h2 className="text-3xl font-extrabold text-amber-300 tracking-tight">KAZANDINIZ SAVERİ!</h2>
              <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
                Tüm soruları başarıyla bularak rüya zirve olan Milyoner unvanına ulaştınız!
              </p>
            </div>
          ) : walkedAway ? (
            <div>
              <span className="text-xs uppercase tracking-widest bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/20 px-3 py-1 rounded-full inline-block mb-3">
                Akıllıca Çekilme
              </span>
              <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Tebrikler, Çekildiniz!</h2>
              <p className="text-slate-300 text-xs mt-1">
                Riskli seviyede akıllıca bir karar vererek ödülünüzü korudunuz.
              </p>
            </div>
          ) : (
            <div>
              <span className="text-xs uppercase tracking-widest bg-rose-500/15 text-rose-400 font-bold border border-rose-500/20 px-3 py-1 rounded-full inline-block mb-3">
                Elendiniz
              </span>
              <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Yarışma Sona Erdi</h2>
              {failedOnQuestionText && (
                <p className="text-slate-500 text-xs mt-2 italic px-4 max-w-md mx-auto">
                  Kapandığınız Soru: "{failedOnQuestionText.substring(0, 100)}..."
                </p>
              )}
            </div>
          )}
        </div>

        {/* Big Prize Visualizer Card */}
        <div className="my-8 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>

          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">
            Toplam Kazanılan Ödül
          </p>
          <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent transform hover:scale-[1.02] transition-transform">
            {prizeWon}
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-900 mt-5 pt-4">
            <div className="text-center border-r border-slate-900/65">
              <span className="block text-[10px] text-slate-500">Ulaşılan Soru Seviyesi</span>
              <span className="font-bold text-amber-500 text-sm">{levelReached} / 15</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] text-slate-500">Katılım Durumu</span>
              <span className="font-bold text-slate-200 text-sm">
                {isPerfectWin ? 'Milyoner' : walkedAway ? 'Çekildi' : 'Yandı'}
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Section */}
        <div className="border border-amber-500/25 rounded-xl bg-slate-950/40 p-5 mb-8 text-center relative font-serif">
          <Sparkles className="w-5 h-5 text-amber-500/50 absolute top-3 left-3" />
          <Sparkles className="w-5 h-5 text-amber-500/50 absolute bottom-3 right-3" />

          <h4 className="text-[11px] uppercase tracking-widest text-amber-200/60 mb-2">
            Milyoner Başarı Belgesi
          </h4>
          <p className="text-xs text-slate-400 leading-normal mb-3 max-w-sm mx-auto">
            Sayın <strong className="text-slate-100 font-sans font-medium">{nickname}</strong>,<br />
            Milyoner Bilgi Yarışması'nda büyük bir cesaret ve bilgi birikimi sergileyerek üstün seviyede mücadele etmiştir.
          </p>

          <div className="flex items-center justify-center gap-1 text-[9px] text-slate-500 font-mono mt-2 uppercase">
            <Calendar className="w-3.5 h-3.5" /> {dateStr}
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 hover:from-amber-500 hover:to-amber-400 font-bold text-sm py-4 px-6 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Yeniden Yarış
        </button>
      </motion.div>
    </div>
  );
}
