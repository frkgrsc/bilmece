import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Play, Volume2, VolumeX, Clock, Coins, User, Globe, ShieldAlert, Swords, Award } from 'lucide-react';
import { HighScore } from '../types';
import audio from '../utils/audio';
import Achievements from './Achievements';

// Firebase Firestore imports
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../utils/firebase';

interface StartScreenProps {
  onStart: (nickname: string, timed: boolean, audioEnabled: boolean) => void;
  onStartDuel: (nickname: string, audioEnabled: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
  authError?: string | null;
  matchingError?: string | null;
}

export default function StartScreen({ onStart, onStartDuel, audioEnabled, setAudioEnabled, authError, matchingError }: StartScreenProps) {
  const [nickname, setNickname] = useState('');
  const [timed, setTimed] = useState(true);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  
  // Real-time globally synced leaderboards from Firebase
  const [activeTab, setActiveTab] = useState<'global' | 'local' | 'achievements'>('global');
  const [globalHighScores, setGlobalHighScores] = useState<HighScore[]>([]);
  const [loadingGlobal, setLoadingGlobal] = useState(true);

  useEffect(() => {
    const scores = localStorage.getItem('milyoner_highscores');
    if (scores) {
      try {
        setHighScores(JSON.parse(scores));
      } catch (e) {
        setHighScores([]);
      }
    }
  }, []);

  // Listen to the live Firestore world leaderboard
  useEffect(() => {
    setLoadingGlobal(true);
    const q = query(
      collection(db, 'highscores'),
      orderBy('prizeAmount', 'desc'),
      limit(25)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveScores: HighScore[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        let formattedDate = 'Yeni';
        if (data.createdAt) {
          try {
            // Convert Firebase Timestamp or fallback
            const dateVal = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
            formattedDate = dateVal.toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });
          } catch (e) {
            formattedDate = 'Yeni';
          }
        }
        liveScores.push({
          nickname: data.nickname || 'Gizemli Yarışmacı',
          prize: data.prize || '0 TL',
          prizeAmount: data.prizeAmount || 0,
          levelReached: data.levelReached || 0,
          date: formattedDate,
          walkedAway: data.walkedAway ?? true,
        });
      });
      setGlobalHighScores(liveScores);
      setLoadingGlobal(false);
    }, (error) => {
      console.warn("Could not load global scores (checking secure permissions). Setting debug fallback.", error);
      setLoadingGlobal(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = nickname.trim() || 'Yarışmacı';
    audio.enabled = audioEnabled;
    onStart(finalName, timed, audioEnabled);
  };

  const handleStartDuel = (e: React.MouseEvent) => {
    e.preventDefault();
    const finalName = nickname.trim() || 'Yarışmacı';
    audio.enabled = audioEnabled;
    onStartDuel(finalName, audioEnabled);
  };

  const toggleSound = () => {
    const newVal = !audioEnabled;
    setAudioEnabled(newVal);
    audio.enabled = newVal;
    if (newVal) {
      audio.playCorrect();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-white py-6 px-4">
      {/* Golden Stage Title Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 max-w-lg"
      >
        <div className="relative inline-block mb-3">
          <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full"></div>
          <div className="relative border-4 border-amber-400 bg-slate-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-2xl">
            <Coins className="w-12 h-12 text-amber-400 animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent uppercase drop-shadow-lg">
          Milyoner
        </h1>
        <p className="text-amber-100/70 text-sm md:text-base mt-2 font-light">
          Zorluk derecelerine göre kategorize edilmiş sorular ve klasik jokerlerle muazzam bir bilgi yarışı deneyimi!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-4xl">
        {/* Game Settings Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl"
        >
          <h2 className="text-xl font-semibold text-amber-300 mb-6 flex items-center gap-2">
            <Play className="w-5 h-5 text-amber-400" /> Yeni Yarışma Katılımı
          </h2>

          {matchingError && (
            <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-3.5 text-xs text-rose-200 mb-5 leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 block mb-0.5">Eşleşme Hatası</strong>
                <p className="text-slate-350 text-[11px] font-medium">{matchingError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleStart} className="space-y-6">
            {/* Nickname Input */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" /> Yarışmacı Adı
              </label>
              <input
                type="text"
                maxLength={20}
                placeholder="Örn: Ömer Faruk"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Timed Toggle */}
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-200 text-sm font-medium flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" /> Süreli Yarışma Modu
                </span>
                <span className="text-slate-400 text-xs">Her soru için 30 saniye süre sınırı bulunur</span>
              </div>
              <button
                type="button"
                onClick={() => setTimed(!timed)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                  timed ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    timed ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Sound Toggle */}
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-200 text-sm font-medium flex items-center gap-1.5">
                  {audioEnabled ? (
                    <Volume2 className="w-4 h-4 text-amber-400" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-400" />
                  )}
                  Ses Efektleri
                </span>
                <span className="text-slate-400 text-xs">Klasik yarışma seslerini sentezleyici ile çal</span>
              </div>
              <button
                type="button"
                onClick={toggleSound}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                  audioEnabled ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    audioEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Dual Mode Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                id="start-button-game"
                type="submit"
                className="w-full bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-sm py-4 px-4 rounded-xl shadow-md border border-amber-500/20 hover:border-amber-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4" /> Tek Oyunculu
              </button>
              
              <button
                type="button"
                onClick={handleStartDuel}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 hover:from-amber-500 hover:to-amber-400 font-bold text-sm py-4 px-4 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-amber-300/20 cursor-pointer"
              >
                <Swords className="w-4 h-4 animate-pulse" /> Çevrimiçi Düello
              </button>
            </div>
          </form>
        </motion.div>

        {/* High Score Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col h-[520px]"
        >
          <h2 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400 animate-bounce" /> Şeref Kürsüsü
          </h2>

          {/* Toggle Tab Row */}
          <div className="flex bg-slate-950 p-1 rounded-xl mb-4 border border-slate-800/60 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('global')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'global'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> Dünya
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('local')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'local'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Yerel
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'achievements'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Rozetler
            </button>
          </div>

          <div id="leaderboard-scores-container" className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            {activeTab === 'global' ? (
              <>
                {authError && (
                  <div className="bg-amber-950/40 border border-amber-900/60 rounded-xl p-3.5 text-xs text-amber-200 mb-3 space-y-1.5 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-bold text-amber-300">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                      Firebase Kimlik Doğrulama Uyarısı
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Yeni skorların online kaydedilebilmesi için projenizde <strong>Anonim (Anonymous)</strong> giriş yönteminin etkin olması gerekir. Lütfen Firebase Console üzerinden bu seçeneği etkinleştirin:
                    </p>
                    <div className="pt-1">
                      <a
                        href="https://console.firebase.google.com/project/gen-lang-client-0778065799/authentication/providers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded text-[10px] transition-all cursor-pointer"
                      >
                        Anonim Girişi Etkinleştir <Globe className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
                {loadingGlobal ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-500 h-full">
                    <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin mb-4" />
                    <p className="text-xs font-mono">Dünya kupası yükleniyor...</p>
                  </div>
                ) : globalHighScores.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-center h-full">
                    <Globe className="w-12 h-12 stroke-[1] mb-2 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-400">Küresel liderlik boş!</p>
                    <p className="text-xs text-slate-600 mt-1 max-w-[200px] mx-auto">Tarihin ilk online rekorunu kırmak için hemen yarışmayı başlatın!</p>
                  </div>
                ) : (
                  globalHighScores.map((score, index) => (
                    <div
                      key={`global-${index}`}
                      className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 hover:border-amber-500/35 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0
                              ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/30'
                              : index === 1
                              ? 'bg-slate-350 text-slate-950'
                              : index === 2
                              ? 'bg-amber-750 text-slate-100'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-slate-100 truncate max-w-[120px]">
                            {score.nickname}
                          </span>
                          <span className="text-slate-500 text-[10px]">
                            Cevap: {score.levelReached}. Soru ({score.walkedAway ? 'Çekildi' : 'Yandı'})
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-amber-400 text-sm block">
                          {score.prize}
                        </span>
                        <span className="text-[9px] text-slate-500">{score.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </>
            ) : activeTab === 'local' ? (
              highScores.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-center h-full">
                  <Trophy className="w-12 h-12 stroke-[1] mb-2 text-slate-600" />
                  <p className="text-sm font-semibold text-slate-400">Yerel rekor bulunamadı.</p>
                  <p className="text-xs text-slate-600 mt-1">İlk yarışmayı bitirerek bu cihaza adınızı yazdırın!</p>
                </div>
              ) : (
                highScores
                  .sort((a, b) => b.prizeAmount - a.prizeAmount)
                  .slice(0, 15)
                  .map((score, index) => (
                    <div
                      key={`local-${index}`}
                      className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 hover:border-amber-500/35 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0
                              ? 'bg-amber-400 text-slate-950'
                              : index === 1
                              ? 'bg-slate-300 text-slate-950'
                              : index === 2
                              ? 'bg-amber-750 text-slate-100'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-slate-100 truncate max-w-[120px]">
                            {score.nickname}
                          </span>
                          <span className="text-slate-500 text-[10px]">
                            Cevap: {score.levelReached}. Soru ({score.walkedAway ? 'Çekildi' : 'Yandı'})
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-amber-400 text-sm block">
                          {score.prize}
                        </span>
                        <span className="text-[9px] text-slate-500">{score.date}</span>
                      </div>
                    </div>
                  ))
              )
            ) : (
              <Achievements isEmbedded />
            )}
          </div>
        </motion.div>
      </div>

      {/* Rules / Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center gap-2 mt-8 text-center max-w-md"
      >
        <p className="text-[11px] text-slate-500 font-mono leading-relaxed">
          Önerilen baraj seviyeleri: 5. Soru (5.000 TL) ve 10. Soru (50.000 TL) Garanti ödüllerdir. Son karar sizindir!
        </p>
        <button
          onClick={() => {
            window.location.search = '?view=privacy';
          }}
          className="text-[10px] text-amber-500/80 hover:text-amber-400 font-bold underline cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Gizlilik Politikası (Privacy Policy)
        </button>
      </motion.div>
    </div>
  );
}
