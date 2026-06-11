export interface Question {
  id: string;
  level: number; // 1 to 15
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  category: string;
  explanation?: string; // Fun fact or explanation of the answer
}

export type JokerType = 'fiftyFifty' | 'phoneFriend' | 'audience' | 'switchQuestion';

export interface Joker {
  id: JokerType;
  label: string;
  used: boolean;
  isUnlocked: boolean; // E.g., switchQuestion might be unlocked after level 7
}

export type AnswerState = 'idle' | 'selected' | 'correct' | 'wrong' | 'revealed';

export interface HighScore {
  nickname: string;
  prize: string;
  prizeAmount: number;
  levelReached: number;
  date: string;
  walkedAway: boolean;
}

export const PRIZE_LEVELS = [
  { level: 15, amount: 1000000, display: '1.000.000 TL', isMilestone: true },
  { level: 14, amount: 500000, display: '500.000 TL', isMilestone: false },
  { level: 13, amount: 300000, display: '300.000 TL', isMilestone: false },
  { level: 12, amount: 200000, display: '200.000 TL', isMilestone: false },
  { level: 11, amount: 100000, display: '100.000 TL', isMilestone: false },
  { level: 10, amount: 50000, display: '50.000 TL', isMilestone: true }, // Milestone 2
  { level: 9, amount: 30000, display: '30.000 TL', isMilestone: false },
  { level: 8, amount: 20000, display: '20.000 TL', isMilestone: false },
  { level: 7, amount: 15000, display: '15.000 TL', isMilestone: false },
  { level: 6, amount: 10000, display: '10.000 TL', isMilestone: false },
  { level: 5, amount: 5000, display: '5.000 TL', isMilestone: true }, // Milestone 1
  { level: 4, amount: 3000, display: '3.000 TL', isMilestone: false },
  { level: 3, amount: 2000, display: '2.000 TL', isMilestone: false },
  { level: 2, amount: 1000, display: '1.000 TL', isMilestone: false },
  { level: 1, amount: 500, display: '500 TL', isMilestone: false },
];

export interface PhoneFriendSuggestion {
  friendName: string;
  profession: string;
  avatar: string;
  message: string;
  confidence: number; // 0 to 100
  guess: 'A' | 'B' | 'C' | 'D' | 'bilmiyorum';
}

export interface DuelPlayer {
  userId: string;
  nickname: string;
  levelReached: number; // 1 to 15
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  answerState: 'idle' | 'selected' | 'correct' | 'wrong' | 'walked' | 'failed';
  hasFailed: boolean;
  walkedAway: boolean;
  score: number; // Number of correct answers (0-15)
  prizeWon: string;
  prizeAmount: number;
  lastActive: number; // For heartbeat/presence checks
}

export type DuelRoomStatus = 'waiting' | 'starting' | 'playing' | 'game_over';

export interface DuelRoom {
  id: string;
  status: DuelRoomStatus;
  questionIds: string[]; // 15 question IDs
  players: {
    [userId: string]: DuelPlayer;
  };
  winnerId: string | null;
  winnerNickname: string | null;
  winnerReason: string | null;
  createdAt: any;
  updatedAt: any;
}

