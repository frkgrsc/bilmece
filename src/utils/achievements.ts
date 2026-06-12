export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
  badgeColor: string; // Tailwind gradient classes
  unlockedAt?: string;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'İlk Adım',
    description: 'Milyoner arenasına adım attınız ve ilk yarışmanızı başarıyla tamamladınız.',
    icon: '🚀',
    tier: 'bronze',
    badgeColor: 'from-amber-700 to-amber-900 text-slate-100 border-amber-800'
  },
  {
    id: 'novice',
    title: 'Çırak Yolcu',
    description: 'Yarışmada ilk barajı zorlayarak 1.000 TL değerine ulaştınız.',
    icon: '🌱',
    tier: 'bronze',
    badgeColor: 'from-slate-700 to-slate-800 text-slate-200 border-slate-600'
  },
  {
    id: 'milestone_1',
    title: 'Garantici',
    description: '5. soruyu doğru cevaplayarak ilk garanti ödül barajı olan 5.000 TL\'ye ulaştınız.',
    icon: '🛡️',
    tier: 'silver',
    badgeColor: 'from-slate-400 to-slate-500 text-slate-950 border-slate-400 font-medium'
  },
  {
    id: 'expert',
    title: 'Bilinçli Bilge',
    description: '15.000 TL değerindeki 7. soru barajını başarıyla aştınız.',
    icon: '🧠',
    tier: 'silver',
    badgeColor: 'from-zinc-400 to-slate-600 text-white border-zinc-500'
  },
  {
    id: 'milestone_2',
    title: 'Büyük Baraj Fatihi',
    description: '10. soruyu doğru cevaplayarak ikinci garanti ödül barajı olan 50.000 TL\'ye ulaştınız.',
    icon: '💎',
    tier: 'gold',
    badgeColor: 'from-yellow-500 via-amber-400 to-yellow-600 text-slate-950 border-yellow-400 font-bold'
  },
  {
    id: 'genius_level',
    title: 'Deha Seviyesi',
    description: 'Yarım milyon değerindeki 14. soruya kadar ulaştınız.',
    icon: '⚡',
    tier: 'platinum',
    badgeColor: 'from-cyan-500 via-sky-400 to-indigo-600 text-white border-cyan-300 font-bold'
  },
  {
    id: 'millionaire',
    title: 'Milyoner!',
    description: 'Tebrikler! 15 sorunun tamamını bilerek 1 Milyon TL\'lik nihai zirveye ulaştınız!',
    icon: '👑',
    tier: 'legendary',
    badgeColor: 'from-amber-400 via-yellow-300 to-yellow-500 text-slate-950 border-yellow-200 font-extrabold animate-pulse'
  },
  {
    id: 'smart_retreat',
    title: 'Akıllıca Çekilme',
    description: 'Seviye 8 veya üzerinde, risk almak yerine ödülünüzü koruyup çekildiniz.',
    icon: '💰',
    tier: 'silver',
    badgeColor: 'from-emerald-500 via-teal-400 to-emerald-600 text-slate-950 border-emerald-300 font-semibold'
  },
  {
    id: 'pure_mind',
    title: 'Yalın Zihin',
    description: 'Hiçbir joker yardımı almadan en az 7. soruya kadar ilerlediniz.',
    icon: '🧘',
    tier: 'platinum',
    badgeColor: 'from-purple-500 to-indigo-600 text-white border-purple-400'
  },
  {
    id: 'speed_challenger',
    title: 'Zamana Meydan Okuyan',
    description: 'Süreli yarışma modunda en az 10soru bildiniz.',
    icon: '⏱️',
    tier: 'gold',
    badgeColor: 'from-rose-500 via-orange-400 to-amber-500 text-white border-rose-400'
  }
];

export function getUnlockedAchievements(): Achievement[] {
  try {
    const saved = localStorage.getItem('milyoner_unlocked_achievements');
    if (!saved) return [];
    return JSON.parse(saved);
  } catch (error) {
    console.error('Error reading achievements:', error);
    return [];
  }
}

export interface CheckConditions {
  levelReached: number; // 1 to 16 (16 is perfect game)
  walkedAway: boolean;
  timed: boolean;
  jokersUsed: string[];
}

export function checkAndUnlockAchievements(conditions: CheckConditions): {
  newlyUnlocked: Achievement[];
  totalUnlocked: Achievement[];
} {
  const alreadyUnlocked = getUnlockedAchievements();
  const unlockedIds = new Set(alreadyUnlocked.map((a) => a.id));
  const newlyUnlocked: Achievement[] = [];
  const nowStr = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const checkAndAdd = (id: string) => {
    if (!unlockedIds.has(id)) {
      const match = ALL_ACHIEVEMENTS.find((a) => a.id === id);
      if (match) {
        const item: Achievement = {
          ...match,
          unlockedAt: nowStr
        };
        newlyUnlocked.push(item);
        alreadyUnlocked.push(item);
        unlockedIds.add(id);
      }
    }
  };

  const actualCorrectCount = conditions.levelReached - 1;

  // 1. First Step (completed first game)
  checkAndAdd('first_step');

  // 2. Novice (reached level >= 3, i.e. solved at least 2 questions)
  if (conditions.levelReached >= 3) {
    checkAndAdd('novice');
  }

  // 3. Milestone 1 (reached level >= 6, solved level 5)
  if (conditions.levelReached >= 6) {
    checkAndAdd('milestone_1');
  }

  // 4. Expert (reached level >= 8, solved level 7)
  if (conditions.levelReached >= 8) {
    checkAndAdd('expert');
  }

  // 5. Milestone 2 (reached level >= 11, solved level 10)
  if (conditions.levelReached >= 11) {
    checkAndAdd('milestone_2');
  }

  // 6. Genius Level (reached level >= 15, solved level 14)
  if (conditions.levelReached >= 15) {
    checkAndAdd('genius_level');
  }

  // 7. Millionaire (perfect win, level 16)
  if (conditions.levelReached === 16) {
    checkAndAdd('millionaire');
  }

  // 8. Smart retreat (walked away at level >= 9, i.e. solved level 8)
  if (conditions.walkedAway && conditions.levelReached >= 9) {
    checkAndAdd('smart_retreat');
  }

  // 9. Pure Mind (No jokers used, reached level >= 8)
  if (conditions.jokersUsed.length === 0 && conditions.levelReached >= 8) {
    checkAndAdd('pure_mind');
  }

  // 10. Speed challenger (timed and levelReached >= 11)
  if (conditions.timed && conditions.levelReached >= 11) {
    checkAndAdd('speed_challenger');
  }

  if (newlyUnlocked.length > 0) {
    try {
      localStorage.setItem('milyoner_unlocked_achievements', JSON.stringify(alreadyUnlocked));
    } catch (e) {
      console.error('Error saving achievements:', e);
    }
  }

  return {
    newlyUnlocked,
    totalUnlocked: alreadyUnlocked
  };
}
