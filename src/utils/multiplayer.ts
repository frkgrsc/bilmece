import { 
  collection, 
  query, 
  where, 
  limit, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  runTransaction,
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth, OperationType, handleFirestoreError } from './firebase';
import { DuelRoom, DuelPlayer, Question } from '../types';
import { QUESTIONS_POOL } from '../data/questions';

/**
 * Generates 15 question IDs for a fair room duel match (one per level)
 */
export function generateRoomQuestionIds(): string[] {
  const selectedIds: string[] = [];
  for (let l = 1; l <= 15; l++) {
    const candidates = QUESTIONS_POOL.filter((q) => q.level === l);
    if (candidates.length > 0) {
      const randomQ = candidates[Math.floor(Math.random() * candidates.length)];
      selectedIds.push(randomQ.id);
    }
  }
  return selectedIds;
}

/**
 * Finds all Questions fully populated based on a list of IDs
 */
export function resolveRoomQuestions(questionIds: string[]): Question[] {
  return questionIds.map(id => {
    const found = QUESTIONS_POOL.find(q => q.id === id);
    if (!found) {
      // Fallback if question was deleted or not found
      return QUESTIONS_POOL[0];
    }
    return found;
  });
}

/**
 * Matches the user into an existing waiting room, or creates a new one.
 * Uses a safe Firestore transaction to prevent race conditions.
 */
export async function findOrCreateDuelRoom(nickname: string): Promise<string> {
  const currentUserId = auth.currentUser?.uid;
  if (!currentUserId) {
    throw new Error("Yarışmacının kimliği doğrulanmadı. Lütfen giriş yapın.");
  }

  const initialPlayerState: DuelPlayer = {
    userId: currentUserId,
    nickname: nickname.trim().substring(0, 20) || 'Düellocu',
    levelReached: 1,
    selectedOption: null,
    answerState: 'idle',
    hasFailed: false,
    walkedAway: false,
    score: 0,
    prizeWon: '0 TL',
    prizeAmount: 0,
    lastActive: Date.now()
  };

  let snapshot;
  try {
    // 1. Scan for rooms in status 'waiting'
    const waitingQuery = query(
      collection(db, 'rooms'),
      where('status', '==', 'waiting'),
      limit(5)
    );
    snapshot = await getDocs(waitingQuery);
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'rooms');
    throw err;
  }
  
  // Shuffle the rooms we found to prevent multiple concurrent seekers from stepping on the same lobby
  const waitingRooms = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as any));
  const randomLobby = waitingRooms.length > 0 
    ? waitingRooms[Math.floor(Math.random() * waitingRooms.length)] 
    : null;

  if (randomLobby) {
    const lobbyDocRef = doc(db, 'rooms', randomLobby.id);
    
    // Try to join using a transaction
    try {
      const success = await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(lobbyDocRef);
        if (!docSnap.exists()) return false;
        
        const data = docSnap.data() as DuelRoom;
        
        // Stop if room is no longer waiting, or we are already in it, or is full
        if (data.status !== 'waiting') return false;
        if (data.players[currentUserId]) return false;
        if (Object.keys(data.players).length >= 2) return false;

        // Populate player updates
        const updatedPlayers = { ...data.players };
        updatedPlayers[currentUserId] = initialPlayerState;

        transaction.update(lobbyDocRef, {
          players: updatedPlayers,
          status: 'playing', // Start duel match immediately!
          updatedAt: serverTimestamp()
        });
        return true;
      });

      if (success) {
        console.log(`Successfully matched as Player 2 into room: ${randomLobby.id}`);
        return randomLobby.id;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `rooms/${randomLobby.id}`);
      throw err;
    }
  }

  // 2. Either no rooms found or transaction failed/competed, so make a new room
  const roomsColRef = collection(db, 'rooms');
  const newRoomRef = doc(roomsColRef);
  const newRoomId = newRoomRef.id;

  const questionIds = generateRoomQuestionIds();

  const newRoomData: DuelRoom = {
    id: newRoomId,
    status: 'waiting',
    questionIds,
    players: {
      [currentUserId]: initialPlayerState
    },
    winnerId: null,
    winnerNickname: null,
    winnerReason: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  try {
    await setDoc(newRoomRef, newRoomData as any);
    console.log(`Created a new duel lobby: ${newRoomId}, waiting for opponent.`);
    return newRoomId;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `rooms/${newRoomId}`);
    throw err;
  }
}

/**
 * Updates a player's field in the players map of a room
 */
export async function updateDuelPlayerState(
  roomId: string,
  userId: string,
  updates: Partial<DuelPlayer>
): Promise<void> {
  try {
    const roomSnapRef = doc(db, 'rooms', roomId);
    const updateObj: Record<string, any> = {};
    
    // Use Firestore dot notation to only modify the specified nested field of the specific player
    Object.entries(updates).forEach(([key, val]) => {
      updateObj[`players.${userId}.${key}`] = val;
    });
    
    updateObj['updatedAt'] = serverTimestamp();

    await updateDoc(roomSnapRef, updateObj);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `rooms/${roomId}`);
  }
}

/**
 * End standard room duel match and sets winner if necessary
 */
export async function setDuelWinner(
  roomId: string,
  winnerId: string,
  winnerNickname: string,
  reason: string
): Promise<void> {
  try {
    const roomSnapRef = doc(db, 'rooms', roomId);
    await updateDoc(roomSnapRef, {
      status: 'game_over',
      winnerId,
      winnerNickname,
      winnerReason: reason,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `rooms/${roomId}`);
  }
}

/**
 * Set duel draw if both players completed under tie circumstances
 */
export async function setDuelDraw(roomId: string, reason: string): Promise<void> {
  try {
    const roomSnapRef = doc(db, 'rooms', roomId);
    await updateDoc(roomSnapRef, {
      status: 'game_over',
      winnerId: 'DRAW',
      winnerNickname: 'Beraberlik',
      winnerReason: reason,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `rooms/${roomId}`);
  }
}

/**
 * Removes a player from the room and deletes the room if zero players are left.
 */
export async function leaveDuelRoom(roomId: string, userId: string): Promise<void> {
  try {
    const roomSnapRef = doc(db, 'rooms', roomId);
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(roomSnapRef);
      if (!docSnap.exists()) return;

      const data = docSnap.data() as DuelRoom;
      const updatedPlayers = { ...data.players };
      
      if (updatedPlayers[userId]) {
        delete updatedPlayers[userId];
      }

      const remainingPlayersCount = Object.keys(updatedPlayers).length;

      if (remainingPlayersCount === 0) {
        // No players left, safe to erase the room document entirely
        transaction.delete(roomSnapRef);
        console.log(`Room ${roomId} has no active players. Completely deleted.`);
      } else {
        // Still has some players, just update the players mapping
        transaction.update(roomSnapRef, {
          players: updatedPlayers,
          updatedAt: serverTimestamp()
        });
        console.log(`User ${userId} left room ${roomId}. ${remainingPlayersCount} player(s) left.`);
      }
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `rooms/${roomId}`);
  }
}

/**
 * Subscribes to real-time events in a duel room
 */
export function listenToDuelRoom(
  roomId: string,
  onUpdate: (room: DuelRoom) => void,
  onError: (err: any) => void
): () => void {
  const roomSnapRef = doc(db, 'rooms', roomId);
  return onSnapshot(
    roomSnapRef,
    (docSnap) => {
      if (docSnap.exists()) {
        onUpdate({ id: docSnap.id, ...docSnap.data() } as DuelRoom);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, `rooms/${roomId}`);
      onError(err);
    }
  );
}
