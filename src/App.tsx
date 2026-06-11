import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import GameOverScreen from './components/GameOverScreen';
import PhoneFriendDialog from './components/PhoneFriendDialog';
import AudienceDialog from './components/AudienceDialog';
import DuelQuizScreen from './components/DuelQuizScreen';
import SplashScreen from './components/SplashScreen';
import { findOrCreateDuelRoom, leaveDuelRoom } from './utils/multiplayer';
import { QUESTIONS_POOL } from './data/questions';
import { Question, Joker, JokerType, PRIZE_LEVELS, AnswerState, HighScore, PhoneFriendSuggestion } from './types';
import audio from './utils/audio';
import { Volume2, VolumeX, Sparkles, AlertCircle, Phone, Users, Swords } from 'lucide-react';

// Firebase imports
import { signInAnonymously } from 'firebase/auth';
import { doc, getDocFromServer, collection, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, OperationType, handleFirestoreError } from './utils/firebase';

export default function App() {
  // Brand Splash indicator
  const [showSplash, setShowSplash] = useState(true);

  // Game lifecycle states
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [nickname, setNickname] = useState('Yarışmacı');
  const [timed, setTimed] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Multiplayer duels state
  const [isDuelActive, setIsDuelActive] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchedRoomId, setMatchedRoomId] = useState<string | null>(null);
  const [matchingError, setMatchingError] = useState<string | null>(null);

  // Sign in anonymously and verify Firestore network access on boot
  useEffect(() => {
    signInAnonymously(auth)
      .then((userCred) => {
        console.log("Logged in anonymously as UID:", userCred.user.uid);
      })
      .catch((err) => {
        console.error("Anonymous authentication failed:", err);
        if (err && typeof err === 'object' && 'code' in err) {
          setAuthError(err.code as string);
        } else if (err instanceof Error) {
          setAuthError(err.message);
        } else {
          setAuthError(String(err));
        }
      });

    async function verifyNetwork() {
      try {
        await getDocFromServer(doc(db, 'test-connection', 'boot-test'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration: Client is offline.");
        }
      }
    }
    verifyNetwork();
  }, []);

  // Active game data states
  const [level, setLevel] = useState(1); // 1 to 15
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]); // 15 selected questions (one per level)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  // Answering flow states
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [revealingIndex, setRevealingIndex] = useState(0);

  // Joker lifelines
  const [jokers, setJokers] = useState<Joker[]>([
    { id: 'fiftyFifty', label: '50:50', used: false, isUnlocked: true },
    { id: 'phoneFriend', label: 'Telefon', used: false, isUnlocked: true },
    { id: 'audience', label: 'Seyirci', used: false, isUnlocked: true },
    { id: 'switchQuestion', label: 'Değiştir', used: false, isUnlocked: false }, // Unlocked after level 7
  ]);
  const [removedOptions, setRemovedOptions] = useState<string[]>([]);

  // Overlay modals
  const [activeJokerModal, setActiveJokerModal] = useState<'phone' | 'audience' | null>(null);
  const [phoneSuggestion, setPhoneSuggestion] = useState<PhoneFriendSuggestion | null>(null);

  // Walked away status
  const [walkedAway, setWalkedAway] = useState(false);

  // Track past questions seen in switch question to avoid picking the exact same one
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);

  // Initialize selected set on game start
  const generateGameQuestions = (): Question[] => {
    const selected: Question[] = [];
    const usedIds: string[] = [];

    for (let l = 1; l <= 15; l++) {
      const candidates = QUESTIONS_POOL.filter((q) => q.level === l);
      if (candidates.length > 0) {
        const randomCandidate = candidates[Math.floor(Math.random() * candidates.length)];
        selected.push(randomCandidate);
        usedIds.push(randomCandidate.id);
      }
    }
    setUsedQuestionIds(usedIds);
    return selected;
  };

  const handleStartGame = (name: string, isTimed: boolean, isAudio: boolean) => {
    setNickname(name);
    setTimed(isTimed);
    setAudioEnabled(isAudio);
    audio.enabled = isAudio;

    // Reset game parameters
    setLevel(1);
    const questions = generateGameQuestions();
    setGameQuestions(questions);
    setCurrentQuestion(questions[0]);
    setSelectedOption(null);
    setAnswerState('idle');
    setRemovedOptions([]);
    setJokers([
      { id: 'fiftyFifty', label: '50:50', used: false, isUnlocked: true },
      { id: 'phoneFriend', label: 'Telefon', used: false, isUnlocked: true },
      { id: 'audience', label: 'Seyirci', used: false, isUnlocked: true },
      { id: 'switchQuestion', label: 'Değiştir', used: false, isUnlocked: true }, // Simple unlocked for gameplay fun
    ]);
    setWalkedAway(false);
    setIsGameOver(false);
    setIsStarted(true);

    audio.startSuspense();
  };

  const handleStartDuel = async (name: string, isAudio: boolean) => {
    const finalName = name.trim() || 'Yarışmacı';
    setNickname(finalName);
    setAudioEnabled(isAudio);
    audio.enabled = isAudio;
    setIsMatching(true);
    setMatchingError(null);

    try {
      audio.playTick();
      const roomId = await findOrCreateDuelRoom(finalName);
      setMatchedRoomId(roomId);
      setIsDuelActive(true);
      setIsMatching(false);
    } catch (err) {
      console.error("Matchmaking failed:", err);
      setMatchingError("Lobilere bağlanırken bir hata oluştu.");
      setIsMatching(false);
    }
  };

  const handleDuelExit = async () => {
    if (matchedRoomId && auth.currentUser) {
      try {
        await leaveDuelRoom(matchedRoomId, auth.currentUser.uid);
      } catch (err) {
        console.error("Failed to leave duel room:", err);
      }
    }
    setIsDuelActive(false);
    setMatchedRoomId(null);
    setIsStarted(false);
    setIsGameOver(false);
    setLevel(1);
    setCurrentQuestion(null);
  };

  const handleWalkAway = () => {
    saveHighScore(true, level);
    setWalkedAway(true);
    setIsGameOver(true);
    audio.stopSuspense();
    audio.playWin();
  };

  // Safe reward calculation after elenme/yanma
  const calculateFinalPrize = (walkedAway: boolean, finalLevel: number): { amount: number; display: string } => {
    if (walkedAway) {
      // Last answered correct question prize
      const milestone = PRIZE_LEVELS.find((p) => p.level === finalLevel - 1);
      return {
        amount: milestone ? milestone.amount : 0,
        display: milestone ? milestone.display : '0 TL',
      };
    } else {
      // Dropdown back to guaranteed levels
      if (finalLevel >= 11) {
        const prizeObj = PRIZE_LEVELS.find((p) => p.level === 10); // Milestone 2 (50.000 TL)
        return { amount: prizeObj?.amount || 50000, display: prizeObj?.display || '50.000 TL' };
      } else if (finalLevel >= 6) {
        const prizeObj = PRIZE_LEVELS.find((p) => p.level === 5); // Milestone 1 (5.000 TL)
        return { amount: prizeObj?.amount || 5000, display: prizeObj?.display || '5.000 TL' };
      } else {
        return { amount: 0, display: '0 TL' };
      }
    }
  };

  const saveHighScore = async (isWalked: boolean, finalLevel: number) => {
    const finalPrize = calculateFinalPrize(isWalked, finalLevel);
    const dateStr = new Date().toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newRecord: HighScore = {
      nickname,
      prize: finalPrize.display,
      prizeAmount: finalPrize.amount,
      levelReached: finalLevel - 1,
      date: dateStr,
      walkedAway: isWalked,
    };

    const currentScores = localStorage.getItem('milyoner_highscores');
    let scoresList: HighScore[] = [];
    if (currentScores) {
      try {
        scoresList = JSON.parse(currentScores);
      } catch (e) {
        scoresList = [];
      }
    }
    scoresList.push(newRecord);
    localStorage.setItem('milyoner_highscores', JSON.stringify(scoresList));

    // Save online in Firebase Firestore
    try {
      if (!auth.currentUser) {
        console.warn("Attempting to save score before anonymous log-in is complete.");
        return;
      }
      const highscoresCol = collection(db, 'highscores');
      const newScoreRef = doc(highscoresCol);
      await setDoc(newScoreRef, {
        nickname: nickname.trim().substring(0, 20) || 'Yarışmacı',
        prize: finalPrize.display,
        prizeAmount: finalPrize.amount,
        levelReached: Math.min(15, Math.max(0, finalLevel - 1)),
        walkedAway: isWalked,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
      console.log("Global scoreboard write completed successfully! Doc ID:", newScoreRef.id);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'highscores');
    }
  };

  const handleUseJoker = (jokerId: JokerType) => {
    if (!currentQuestion) return;

    // Set joker as used
    setJokers((prev) =>
      prev.map((j) => (j.id === jokerId ? { ...j, used: true } : j))
    );

    if (jokerId === 'fiftyFifty') {
      const correct = currentQuestion.correctOption;
      const wrongOptions = (['A', 'B', 'C', 'D'] as const).filter((opt) => opt !== correct);
      
      // Shuffle wrong options and eliminate 2 of them
      const shuffledWrong = [...wrongOptions].sort(() => Math.random() - 0.5);
      const toRemove = shuffledWrong.slice(0, 2);
      setRemovedOptions(toRemove);
      audio.playTick();
    } else if (jokerId === 'phoneFriend') {
      // Fire Phone dialog
      setActiveJokerModal('phone');
    } else if (jokerId === 'audience') {
      // Fire Audience dialog
      setActiveJokerModal('audience');
    } else if (jokerId === 'switchQuestion') {
      // Find candidate questions of the same level that haven't been used yet
      const candidates = QUESTIONS_POOL.filter(
        (q) => q.level === level && !usedQuestionIds.includes(q.id)
      );

      let replacement: Question;
      if (candidates.length > 0) {
        replacement = candidates[Math.floor(Math.random() * candidates.length)];
      } else {
        // Fallback to any of the same level
        const sameLevel = QUESTIONS_POOL.filter((q) => q.level === level && q.id !== currentQuestion.id);
        replacement = sameLevel.length > 0 ? sameLevel[0] : currentQuestion;
      }

      setRemovedOptions([]);
      setCurrentQuestion(replacement);
      setGameQuestions((prev) => {
        const copy = [...prev];
        copy[level - 1] = replacement;
        return copy;
      });
      setUsedQuestionIds((prev) => [...prev, replacement.id]);
      audio.playCorrect();
    }
  };

  const handleAnswerSubmit = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion) return;

    // Handle sudden Timeouts where option can be null
    if (!option) {
      setAnswerState('wrong');
      audio.playWrong();
      audio.stopSuspense();
      setTimeout(() => {
        saveHighScore(false, level);
        setIsGameOver(true);
      }, 2500);
      return;
    }

    setSelectedOption(option);
    setAnswerState('selected');

    // Suspense timing for a real show vibe before revealing
    setTimeout(() => {
      const isCorrect = option === currentQuestion.correctOption;

      if (isCorrect) {
        setAnswerState('correct');
        audio.playCorrect();

        setTimeout(() => {
          if (level === 15) {
            // PERFECT GAME WINNER (1 MİLYON TL!)
            saveHighScore(true, 16); // Level 16 index tricks the prize calculators to 1.000.000 TL
            setIsGameOver(true);
            audio.stopSuspense();
          } else {
            // Keep going to next level
            const nextLevel = level + 1;
            setLevel(nextLevel);
            setCurrentQuestion(gameQuestions[nextLevel - 1]);
            setSelectedOption(null);
            setRemovedOptions([]);
            setAnswerState('idle');
          }
        }, 3500);
      } else {
        // Wrong answer
        setAnswerState('wrong');
        audio.playWrong();
        audio.stopSuspense();

        setTimeout(() => {
          setAnswerState('revealed');
          setTimeout(() => {
            saveHighScore(false, level);
            setIsGameOver(true);
          }, 3200);
        }, 1500);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setIsStarted(false);
    setIsGameOver(false);
    setLevel(1);
    setCurrentQuestion(null);
    setSelectedOption(null);
    setAnswerState('idle');
    setRemovedOptions([]);
    setMaximizeVolumeAndSynth();
  };

  const setMaximizeVolumeAndSynth = () => {
    audio.enabled = audioEnabled;
  };

  const toggleGlobalAudio = () => {
    const newVal = !audioEnabled;
    setAudioEnabled(newVal);
    audio.enabled = newVal;
    if (newVal) {
      audio.playTick();
    }
  };

  const finalPrizeWon = calculateFinalPrize(walkedAway || level === 16, level).display;

  return (
    <div className="min-h-screen bg-radial from-slate-900 via-slate-950 to-black font-sans relative overflow-x-hidden pt-3 pb-8">
      {/* Background Ambience Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      {/* Embedded Ambient Volume Switch & Title in Header */}
      {!showSplash && (
        <header className="max-w-7xl mx-auto px-4 py-2 border-b border-slate-900 flex justify-between items-center relative z-10 mb-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleRestart}>
            <span className="font-bold text-sm tracking-tight bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent uppercase">
              Milyoner Bilgi Yarışması
            </span>
          </div>

          <button
            onClick={toggleGlobalAudio}
            className="text-slate-400 hover:text-amber-400 p-2 rounded-xl bg-slate-900/60 border border-slate-800 transition-all flex items-center gap-1.5 text-xs cursor-pointer"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">Ses {audioEnabled ? 'Açık' : 'Kapalı'}</span>
          </button>
        </header>
      )}

      {/* Main Container */}
      <main className="relative z-10 px-4">
        <AnimatePresence mode="wait">
          {showSplash ? (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SplashScreen onComplete={() => setShowSplash(false)} />
            </motion.div>
          ) : isMatching ? (
            <motion.div
              key="matching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[70vh]"
            >
              <div className="relative mb-6 text-center">
                <div className="w-24 h-24 bg-slate-950 border-2 border-amber-500/30 rounded-full flex items-center justify-center shadow-xl">
                  <Swords className="w-10 h-10 text-amber-400 animate-bounce" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-amber-200">Eşleşme Yapılıyor...</h2>
              <p className="text-slate-400 text-xs mt-2 font-mono">Sunucudan boş düello odası ayrılıyor... Lütfen bekleyin.</p>
            </motion.div>
          ) : isDuelActive && matchedRoomId ? (
            <motion.div
              key="duel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DuelQuizScreen
                nickname={nickname}
                roomId={matchedRoomId}
                onDuelExit={handleDuelExit}
              />
            </motion.div>
          ) : !isStarted ? (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StartScreen
                onStart={handleStartGame}
                onStartDuel={handleStartDuel}
                audioEnabled={audioEnabled}
                setAudioEnabled={setAudioEnabled}
                authError={authError}
                matchingError={matchingError}
              />
            </motion.div>
          ) : isGameOver ? (
            <motion.div
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GameOverScreen
                nickname={nickname}
                prizeWon={finalPrizeWon}
                levelReached={level}
                walkedAway={walkedAway || level === 16}
                onRestart={handleRestart}
                failedOnQuestionText={currentQuestion?.text}
                isPerfectWin={level === 16}
              />
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {currentQuestion && (
                <QuizScreen
                  nickname={nickname}
                  question={currentQuestion}
                  level={level}
                  jokers={jokers}
                  timed={timed}
                  onAnswer={handleAnswerSubmit}
                  onUseJoker={handleUseJoker}
                  onWalkAway={handleWalkAway}
                  removedOptions={removedOptions}
                  answerState={answerState}
                  selectedOption={selectedOption}
                  revealingIndex={revealingIndex}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* JOKER MODAL OVERLAYS */}
      <AnimatePresence>
        {activeJokerModal === 'phone' && currentQuestion && (
          <div className="z-50 relative">
            {!phoneSuggestion ? (
              <PhoneFriendDialog
                question={currentQuestion}
                onClose={() => setActiveJokerModal(null)}
                onSelectFriend={(suggestion) => {
                  setPhoneSuggestion(suggestion);
                  audio.playTick();
                }}
              />
            ) : (
              <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-slate-900 border-2 border-amber-500/40 w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
                >
                  <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Phone className="w-5 h-5 text-amber-400 animate-pulse" /> Aramanın Sonucu
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{phoneSuggestion.avatar}</span>
                    <div>
                      <h4 className="font-bold text-slate-100">{phoneSuggestion.friendName}</h4>
                      <p className="text-[10px] text-slate-500">{phoneSuggestion.profession}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 mb-5">
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{phoneSuggestion.message}"
                    </p>
                  </div>

                  {phoneSuggestion.guess !== 'bilmiyorum' && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-3 rounded-lg text-center font-bold text-xs">
                      İpucu Tahmini: {phoneSuggestion.guess} Şıkkı • Eminlik Oranı: %{phoneSuggestion.confidence}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setActiveJokerModal(null);
                      setPhoneSuggestion(null);
                    }}
                    className="mt-6 w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-200 font-bold py-3 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    Anladım, Teşekkürler!
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {activeJokerModal === 'audience' && currentQuestion && (
          <AudienceDialog
            question={currentQuestion}
            removedOptions={removedOptions}
            onClose={() => setActiveJokerModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
