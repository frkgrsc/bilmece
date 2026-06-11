import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Coins, 
  Target, 
  User, 
  UserX, 
  Swords, 
  ShieldAlert, 
  Lightbulb, 
  Crown, 
  Flag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Question, DuelRoom, DuelPlayer, PRIZE_LEVELS } from '../types';
import { 
  listenToDuelRoom, 
  updateDuelPlayerState, 
  resolveRoomQuestions, 
  setDuelWinner,
  setDuelDraw
} from '../utils/multiplayer';
import { auth } from '../utils/firebase';
import audio from '../utils/audio';

interface DuelQuizScreenProps {
  nickname: string;
  roomId: string;
  onDuelExit: () => void;
}

export default function DuelQuizScreen({ nickname, roomId, onDuelExit }: DuelQuizScreenProps) {
  const [room, setRoom] = useState<DuelRoom | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const myUid = auth.currentUser?.uid || '';

  // 1. Subscribe to the real-time Duel Room
  useEffect(() => {
    if (!roomId) return;
    
    const unsubscribe = listenToDuelRoom(
      roomId,
      (updatedRoom) => {
        setRoom(updatedRoom);
      },
      (err) => {
        console.error("Firestore room subscription failed:", err);
        setError("Oda güncellemeleri yüklenirken hata oluştu.");
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  // Extract players
  const me: DuelPlayer | undefined = room?.players[myUid];
  const opponentId = room ? Object.keys(room.players).find(id => id !== myUid) : undefined;
  const opponent: DuelPlayer | undefined = opponentId ? room?.players[opponentId] : undefined;

  // 2. Multi-player gameplay evaluation & Timer rule
  const questions: Question[] = room ? resolveRoomQuestions(room.questionIds) : [];
  const currentQuestion: Question | null = (me && !me.hasFailed && !me.walkedAway && me.levelReached <= 15)
    ? questions[me.levelReached - 1]
    : null;

  // Start timer when a new question arrives or state resets to idle
  useEffect(() => {
    if (currentQuestion && me && me.answerState === 'idle') {
      setSecondsLeft(30);
    }
  }, [currentQuestion, me?.levelReached, me?.answerState]);

  // Handle active countdown ticking
  useEffect(() => {
    const isMyTurnActive = currentQuestion && me && me.answerState === 'idle' && room?.status === 'playing';
    
    if (!isMyTurnActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        if (prev <= 11) {
          audio.playTick(); // Tick-tock tension at final 10 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [room?.status, currentQuestion, me?.answerState, me?.levelReached]);

  const handleTimeOut = async () => {
    if (!me || me.hasFailed || me.walkedAway) return;
    
    audio.playWrong();
    // Auto-fail due to timeout
    await updateDuelPlayerState(roomId, myUid, {
      answerState: 'failed',
      hasFailed: true,
      selectedOption: null
    });
  };

  // 3. Concurrency evaluator to trigger game-over & settle winner
  useEffect(() => {
    if (!room || room.status !== 'playing') return;

    const allPlayersList = Object.values(room.players);
    if (allPlayersList.length < 2) return; // Opponent has not fully synced or loaded in yet

    const checkIfFinished = (p: DuelPlayer) => p.hasFailed || p.walkedAway || p.levelReached > 15;
    const isMeFinished = me ? checkIfFinished(me) : false;
    const isOppFinished = opponent ? checkIfFinished(opponent) : false;

    // Settle winner details if both have concluded
    if (isMeFinished && isOppFinished) {
      const settleGameResult = async () => {
        const myPrize = me?.prizeAmount || 0;
        const oppPrize = opponent?.prizeAmount || 0;

        if (myPrize > oppPrize) {
          await setDuelWinner(
            roomId, 
            myUid, 
            me?.nickname || 'Yarışmacı', 
            `Düelloda daha yüksek ödül biriktirdi: ${me?.prizeWon}`
          );
          audio.playWin();
        } else if (oppPrize > myPrize) {
          await setDuelWinner(
            roomId, 
            opponentId || '', 
            opponent?.nickname || 'Rakip', 
            `Düelloda daha yüksek ödül biriktirdi: ${opponent?.prizeWon}`
          );
        } else {
          // Both finished with exact details
          await setDuelDraw(roomId, `Her iki oyuncu da eşit ödül kazandı: ${me?.prizeWon}`);
          audio.playWin();
        }
      };

      settleGameResult();
    }
  }, [room, me, opponent, roomId, myUid, opponentId]);

  // Answer submit logic
  const handleAnswerSubmit = async (option: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion || !me || me.answerState !== 'idle' || !room || room.status !== 'playing') return;

    // Put local player to selected pending state
    await updateDuelPlayerState(roomId, myUid, {
      selectedOption: option,
      answerState: 'selected'
    });

    audio.playTick();

    // Verify after 2 seconds suspense
    setTimeout(async () => {
      const isCorrect = option === currentQuestion.correctOption;

      if (isCorrect) {
        audio.playCorrect();
        const nextLevel = me.levelReached + 1;
        const prizeObj = PRIZE_LEVELS.find((p) => p.level === me.levelReached);
        
        const updates: Partial<DuelPlayer> = {
          levelReached: nextLevel,
          selectedOption: null,
          answerState: 'idle',
          score: me.score + 1,
          prizeWon: prizeObj?.display || '0 TL',
          prizeAmount: prizeObj?.amount || 0
        };

        // Gained the grand prize of 1 Million!
        if (me.levelReached === 15) {
          updates.levelReached = 16;
          updates.prizeWon = '1.000.000 TL';
          updates.prizeAmount = 1000000;
        }

        await updateDuelPlayerState(roomId, myUid, updates);
      } else {
        audio.playWrong();
        const failedPrize = calculateFailedPrizeValue(me.levelReached);
        await updateDuelPlayerState(roomId, myUid, {
          answerState: 'failed',
          hasFailed: true,
          prizeWon: failedPrize.display,
          prizeAmount: failedPrize.amount
        });
      }
    }, 2000);
  };

  // Safe reward calculation after failures
  const calculateFailedPrizeValue = (failedLevel: number): { amount: number; display: string } => {
    if (failedLevel >= 11) {
      const prizeObj = PRIZE_LEVELS.find((p) => p.level === 10);
      return { amount: prizeObj?.amount || 50000, display: prizeObj?.display || '50.000 TL' };
    } else if (failedLevel >= 6) {
      const prizeObj = PRIZE_LEVELS.find((p) => p.level === 5);
      return { amount: prizeObj?.amount || 5000, display: prizeObj?.display || '5.000 TL' };
    } else {
      return { amount: 0, display: '0 TL' };
    }
  };

  // Walk-away retirement action
  const handleWalkAway = async () => {
    if (!me || me.hasFailed || me.walkedAway) return;

    audio.playWin();
    const currentPrize = PRIZE_LEVELS.find((p) => p.level === me.levelReached - 1);
    const amountVal = currentPrize ? currentPrize.amount : 0;
    const displayVal = currentPrize ? currentPrize.display : '0 TL';

    await updateDuelPlayerState(roomId, myUid, {
      answerState: 'walked',
      walkedAway: true,
      prizeWon: displayVal,
      prizeAmount: amountVal
    });
  };

  // Helper labels for player states
  const getPlayerStatusLabel = (p?: DuelPlayer) => {
    if (!p) return 'Bağlanıyor...';
    if (p.walkedAway) return `Çekildi: ${p.prizeWon} 💰`;
    if (p.hasFailed) return `Yandı! (Elendi) ❌`;
    if (p.levelReached === 16) return `Miltoner Milyoner! 🏆`;
    if (p.answerState === 'selected') return 'Cevap verdi, bekliyor... ⚡';
    return `Soru ${p.levelReached}'da Düşünüyor...`;
  };

  const getPlayerProgressPercentage = (p?: DuelPlayer) => {
    if (!p) return 0;
    return Math.min(100, Math.max(0, ((p.levelReached - 1) / 15) * 100));
  };

  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 bg-slate-900 border border-rose-500/30 p-6 rounded-2xl text-center shadow-xl">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-3 animate-bounce" />
        <h3 className="font-bold text-lg text-rose-300">Sistem Hatası</h3>
        <p className="text-slate-400 text-xs mt-2 leading-relaxed">{error}</p>
        <button
          onClick={onDuelExit}
          className="mt-6 w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-bold py-3 px-4 rounded-xl transition-all cursor-pointer"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  // 4. Matches Screen Loader (Room waiting for second teammate)
  if (!room || room.status === 'waiting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh]">
        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-110"></div>
          <div className="relative w-36 h-36 bg-slate-950 border-4 border-amber-500/40 rounded-full flex items-center justify-center shadow-inner mx-auto">
            <Swords className="w-16 h-16 text-amber-400 animate-pulse" />
          </div>
          {/* Radar sweep lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-amber-500/20 rounded-full animate-ping pointer-events-none"></div>
        </div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent uppercase tracking-wider mb-2">
          Rakip Aranıyor...
        </h2>
        <p className="text-slate-400 text-xs text-center max-w-sm px-4 leading-relaxed font-mono">
          Eşit şartta düello ortamı için sunucu üzerinden aktif lobi aranıyor. Lütfen ayrılmayın...
        </p>

        {/* Lobbies micro details */}
        <div className="mt-8 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl text-center max-w-xs w-full">
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-amber-400 font-mono font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Lobi Rezervasyonu Açıldı
          </div>
          <p className="text-[11px] text-slate-500 truncate font-mono select-all">Oda ID: {roomId}</p>
        </div>

        <button
          onClick={onDuelExit}
          className="mt-8 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 text-xs py-2 px-5 rounded-xl border border-slate-800 transition-all cursor-pointer"
        >
          Eşleşmeyi İptal Et
        </button>
      </div>
    );
  }

  // 5. Duel Over Screen Settle Layout
  if (room.status === 'game_over') {
    const isMeWinner = room.winnerId === myUid;
    const isOppWinner = opponentId && room.winnerId === opponentId;
    const isDraw = room.winnerId === 'DRAW';

    return (
      <div className="max-w-2xl mx-auto my-6 text-white px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/80 border-2 border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative text-center overflow-hidden"
        >
          {/* Winner light splash background */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none"></div>

          {isMeWinner ? (
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-amber-500/10 border-4 border-amber-400 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-500/20">
                <Crown className="w-12 h-12 text-amber-400 animate-bounce" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent uppercase tracking-wider">
                DÜELLO KAZANILDI!
              </h1>
              <p className="text-slate-300 text-sm font-medium mt-1">Rakibinizi ezici bir skorla geride bıraktınız!</p>
            </div>
          ) : isOppWinner ? (
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-rose-500/15 border-4 border-rose-500/40 flex items-center justify-center mx-auto mb-4 shadow-xl">
                <UserX className="w-12 h-12 text-rose-400 animate-pulse" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-rose-400 to-rose-300 bg-clip-text text-transparent uppercase tracking-wider">
                DÜELLO KAYBEDİLDİ
              </h1>
              <p className="text-slate-300 text-sm font-medium mt-1">Bu seferlik şans rakibinizin yanındaydı...</p>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-slate-800/80 border-4 border-slate-600 flex items-center justify-center mx-auto mb-4">
                <Swords className="w-11 h-11 text-slate-300" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent uppercase tracking-wider">
                DÜELLO BERABERE!
              </h1>
              <p className="text-slate-300 text-sm font-medium mt-1">Her iki taraf da muhteşem bir strateji kurdu.</p>
            </div>
          )}

          <div className="mt-8 bg-slate-950/80 rounded-2xl border border-slate-800 p-5 max-w-lg mx-auto grid grid-cols-2 gap-4 relative z-10">
            {/* My Stats Box */}
            <div className="border-r border-slate-800/80 pr-2">
              <p className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wide">SEN (YOU)</p>
              <h3 className="font-bold text-slate-100 mt-1 truncate">{me?.nickname}</h3>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-slate-400">Skor: <strong className="text-slate-200">{me?.score} Doğru</strong></p>
                <p className="text-xs text-slate-400">Ödül: <strong className="text-amber-400">{me?.prizeWon}</strong></p>
                <p className="text-[10px] uppercase font-semibold mt-1">
                  {me?.walkedAway ? '💰 Çekildi' : me?.hasFailed ? '❌ Yandı' : '🏆 Tamamladı'}
                </p>
              </div>
            </div>

            {/* Opponent Stats Box */}
            <div className="pl-2">
              <p className="text-[10px] text-rose-400 font-mono font-bold uppercase tracking-wide">RAKİP (OPPONENT)</p>
              <h3 className="font-bold text-slate-100 mt-1 truncate">{opponent?.nickname}</h3>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-slate-400">Skor: <strong className="text-slate-200">{opponent?.score} Doğru</strong></p>
                <p className="text-xs text-slate-400">Ödül: <strong className="text-amber-400">{opponent?.prizeWon}</strong></p>
                <p className="text-[10px] uppercase font-semibold mt-1">
                  {opponent?.walkedAway ? '💰 Çekildi' : opponent?.hasFailed ? '❌ Yandı' : '🏆 Tamamladı'}
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-mono italic mt-6 leading-relaxed">
            Neden: {room.winnerReason}
          </p>

          <button
            onClick={onDuelExit}
            className="mt-8 w-full max-w-sm bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 hover:from-amber-500 hover:to-amber-400 font-bold py-4 px-6 rounded-xl shadow-lg transition-all border border-amber-300/10 cursor-pointer"
          >
            Lobi Ekranına Dön
          </button>
        </motion.div>
      </div>
    );
  }

  // 6. Active Live Duel Arena
  const isMeActionable = currentQuestion && me && me.answerState === 'idle';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[85vh] text-white p-4 max-w-7xl mx-auto w-full">
      {/* Live Duel Side Panel (Player Statuses Grid) */}
      <div className="xl:col-span-3 flex flex-col gap-4">
        {/* Your live info */}
        <div className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${
          me?.answerState === 'selected' 
            ? 'bg-slate-900/40 border-amber-500/20' 
            : me?.hasFailed 
            ? 'bg-rose-950/10 border-rose-900/40' 
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">
              🧑‍💻
            </div>
            <div className="truncate flex-1">
              <span className="text-[8.5px] uppercase font-mono font-bold text-amber-400 block tracking-wider">Masa 1 (Sen)</span>
              <h4 className="font-bold text-slate-100 text-sm truncate">{me?.nickname}</h4>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                style={{ width: `${getPlayerProgressPercentage(me)}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>Soru: {me?.levelReached ?? 1}/15</span>
              <span>Kasa: {me?.prizeWon}</span>
            </div>
            <div className="text-[11px] font-medium text-slate-300 bg-slate-950/60 p-1.5 rounded border border-slate-800/80 text-center">
              {getPlayerStatusLabel(me)}
            </div>
          </div>
        </div>

        {/* Opponent's live info */}
        <div className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${
          opponent?.answerState === 'selected'
            ? 'bg-slate-900/40 border-rose-500/20'
            : opponent?.hasFailed
            ? 'bg-rose-950/10 border-rose-900/40'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">
              🤖
            </div>
            <div className="truncate flex-1">
              <span className="text-[8.5px] uppercase font-mono font-bold text-rose-400 block tracking-wider">Masa 2 (Rakip)</span>
              <h4 className="font-bold text-slate-100 text-sm truncate">{opponent?.nickname || 'Bağlanıyor...'}</h4>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-400 transition-all duration-500 rounded-full"
                style={{ width: `${getPlayerProgressPercentage(opponent)}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>Soru: {opponent?.levelReached ?? 1}/15</span>
              <span>Kasa: {opponent?.prizeWon || '0 TL'}</span>
            </div>
            <div className="text-[11px] font-medium text-slate-350 bg-slate-950/60 p-1.5 rounded border border-slate-800/80 text-center">
              {getPlayerStatusLabel(opponent)}
            </div>
          </div>
        </div>

        {/* Stepper visual helper bar */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex-1 flex flex-col justify-between hidden xl:flex">
          <div>
            <h5 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-3 flex items-center gap-1">
              <Target className="w-3.5 h-3.5" /> Düello Konumları
            </h5>
            <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1">
              {PRIZE_LEVELS.map((p) => {
                const isMeHere = me?.levelReached === p.level;
                const isOppHere = opponent?.levelReached === p.level;
                
                return (
                  <div 
                    key={p.level}
                    className={`flex items-center justify-between p-1 rounded text-[10px] font-mono transition-all ${
                      isMeHere || isOppHere ? 'bg-slate-950/60 border border-slate-800/60' : 'opacity-55'
                    }`}
                  >
                    <span className="text-slate-500">{p.level}. Soru</span>
                    <div className="flex gap-1.5">
                      {isMeHere && <span className="bg-amber-500 text-slate-950 px-1 py-0.5 rounded font-bold uppercase text-[8px]">SEN</span>}
                      {isOppHere && <span className="bg-rose-500 text-slate-100 px-1 py-0.5 rounded font-bold uppercase text-[8px]">RAKİP</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={onDuelExit}
            className="w-full text-[10px] border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 py-2 rounded-lg font-bold uppercase transition-all cursor-pointer"
          >
            Düellodan Çekil (Pes Et)
          </button>
        </div>
      </div>

      {/* Main Game Arena */}
      <div className="xl:col-span-9 flex flex-col justify-between py-2">
        {/* Top Arena Header Status bar */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300">
              Online Düello Arenası
            </h3>
          </div>

          {secondsLeft > 0 && isMeActionable && (
            <div className="flex items-center gap-2 bg-slate-950 px-4 py-1.5 rounded-xl border border-slate-800 font-mono">
              <Clock className={`w-4 h-4 ${secondsLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-amber-400'}`} />
              <span className={`text-[15px] font-bold ${secondsLeft <= 10 ? 'text-rose-500' : 'text-slate-200'}`}>
                {secondsLeft}s
              </span>
            </div>
          )}
        </div>

        {/* Question Panel */}
        <div className="my-8 flex flex-col items-center flex-1 justify-center max-w-4xl mx-auto w-full">
          {me?.hasFailed || me?.walkedAway ? (
            /* SPECTOR/ELENDİN BANNER */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center max-w-lg shadow-2xl"
            >
              <UserX className="w-12 h-12 text-rose-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-rose-300">Yarışmanız Sona Erdi!</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Siz çekildiğiniz veya cevabınız yanlış olduğu için elendiniz. Düello sonucunu kapatmamak için şu anda rakibinizin kalan sorularını canlı takip ediyorsunuz.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-amber-400 bg-slate-950/60 p-2.5 rounded border border-slate-800/80 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span> CANLI YAYIN: Rakibiniz {opponent?.levelReached}. Soruda!
              </div>
            </motion.div>
          ) : currentQuestion ? (
            /* ACTIVE QUESTION SHOWING */
            <div className="w-full flex flex-col items-center">
              <div className="w-full relative mb-6">
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent top-1/2 -z-10"></div>
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900/90 border-2 border-slate-800 rounded-2xl px-6 py-6 md:px-8 shadow-2xl relative max-w-3xl mx-auto flex flex-col items-center text-center backdrop-blur-sm min-h-[140px] justify-center"
                >
                  <span className="absolute -top-3 px-3 py-1 bg-slate-950 border border-slate-800 text-amber-400 text-[10px] font-semibold rounded-full uppercase tracking-widest font-mono">
                    Soru Seviyesi {me?.levelReached} • {currentQuestion.category}
                  </span>

                  <h2 className="text-sm md:text-lg font-medium leading-relaxed text-slate-100 p-2 mt-2">
                    {currentQuestion.text}
                  </h2>
                </motion.div>
              </div>

              {/* Options grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                  const isSelected = me?.selectedOption === opt;
                  const isRevealedObj = me?.answerState === 'correct' || me?.answerState === 'failed';

                  let btnBorderColor = 'border-slate-800 hover:border-amber-500/50';
                  let btnBgColor = 'bg-slate-900/70 hover:bg-slate-900';
                  let btnTextColor = 'text-slate-100';

                  if (isSelected) {
                    if (me.answerState === 'selected') {
                      btnBorderColor = 'border-amber-400 shadow-lg shadow-amber-500/20';
                      btnBgColor = 'bg-amber-950/40';
                      btnTextColor = 'text-amber-300';
                    } else if (me.answerState === 'correct') {
                      btnBorderColor = 'border-emerald-500 shadow-lg shadow-emerald-500/20';
                      btnBgColor = 'bg-emerald-950/40';
                      btnTextColor = 'text-emerald-300';
                    } else if (me.answerState === 'failed') {
                      btnBorderColor = 'border-rose-500 shadow-lg shadow-rose-500/20';
                      btnBgColor = 'bg-rose-950/40';
                      btnTextColor = 'text-rose-300';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={me?.answerState !== 'idle'}
                      onClick={() => handleAnswerSubmit(opt)}
                      className={`w-full text-left rounded-xl border px-5 py-4 flex items-center gap-3 transition-all cursor-pointer group ${btnBorderColor} ${btnBgColor} ${btnTextColor}`}
                    >
                      <span className="font-bold font-mono text-amber-400 group-hover:scale-110 transition-transform">
                        {opt}:
                      </span>
                      <span className="text-sm font-medium">{currentQuestion.options[opt]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* CONCLUDING WAITING SCREEN */
            <div className="text-center p-8 bg-slate-900/40 border border-slate-800 rounded-2xl max-w-sm">
              <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-3 animate-spin" />
              <h3 className="font-bold text-slate-200">Bütün Sorular Tamamlandı!</h3>
              <p className="text-xs text-slate-400 mt-2">
                Siz tüm soruları başarıyla yanıtladınız. Lütfen rakibinizin de son vuruşlarını yapması için bekleyin. Düello kararı birazdan ilan edilecektir!
              </p>
            </div>
          )}
        </div>

        {/* Lower row controls */}
        <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            Kazandığınız Ödül: <strong className="text-amber-400">{me?.prizeWon}</strong>
          </p>

          <button
            onClick={handleWalkAway}
            disabled={!isMeActionable}
            className="bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900/60 text-slate-400 hover:text-rose-300 text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
          >
            <Flag className="w-3.5 h-3.5" /> Düellodan Çekil ({me?.prizeWon})
          </button>
        </div>
      </div>
    </div>
  );
}
