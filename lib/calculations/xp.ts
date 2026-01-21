import { LEVEL_THRESHOLDS, XP_REWARDS } from '@/lib/constants';

export function calculateLevel(xp: number): number {
  let level = 1;
  for (const threshold of LEVEL_THRESHOLDS) {
    if (xp >= threshold.xp) {
      level = threshold.level;
    }
  }
  return level;
}

export function xpToNextLevel(currentLevel: number, currentXp: number): number {
  const currentThreshold = LEVEL_THRESHOLDS.find((t) => t.level === currentLevel)?.xp || 0;
  const nextThreshold = LEVEL_THRESHOLDS.find((t) => t.level === currentLevel + 1)?.xp || 0;
  return Math.max(0, nextThreshold - currentXp);
}

export function xpForLevel(level: number): number {
  const threshold = LEVEL_THRESHOLDS.find((t) => t.level === level);
  return threshold?.xp || 0;
}

export function getLevelProgress(currentXp: number, currentLevel: number): number {
  const currentLevelXP = xpForLevel(currentLevel);
  const nextLevelXP = xpForLevel(currentLevel + 1);
  const xpInCurrentLevel = currentXp - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;
  
  if (xpNeededForNext === 0) return 100;
  return Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100));
}

export function calculateXPReward(
  action: keyof typeof XP_REWARDS,
  multiplier: number = 1
): number {
  const baseXP = XP_REWARDS[action] || 0;
  return Math.round(baseXP * multiplier);
}

export function addXPMultipliers(baseXP: number, streakDays: number): number {
  let multiplier = 1;
  
  if (streakDays >= 7) multiplier += 0.1;
  if (streakDays >= 14) multiplier += 0.1;
  if (streakDays >= 30) multiplier += 0.2;
  if (streakDays >= 60) multiplier += 0.2;
  if (streakDays >= 100) multiplier += 0.3;
  
  return Math.round(baseXP * multiplier);
}

export function getLevelTitle(level: number): string {
  if (level < 5) return 'Novice';
  if (level < 10) return 'Beginner';
  if (level < 20) return 'Intermediate';
  if (level < 30) return 'Advanced';
  if (level < 40) return 'Expert';
  if (level < 50) return 'Master';
  if (level < 75) return 'Grandmaster';
  if (level < 100) return 'Legend';
  return 'Immortal';
}

export function getLevelEmoji(level: number): string {
  if (level < 5) return '🌱';
  if (level < 10) return '🌿';
  if (level < 20) return '🌳';
  if (level < 30) return '⭐';
  if (level < 40) return '💫';
  if (level < 50) return '🌟';
  if (level < 75) return '🏅';
  if (level < 100) return '🏆';
  return '👑';
}

export function getNextLevelReward(level: number): { title: string; reward: string } {
  const titles: Record<number, string> = {
    5: 'Beginner Badge',
    10: 'Rising Star',
    20: 'Achiever',
    30: 'Dedicated',
    40: 'Expert',
    50: 'Master',
    75: 'Grandmaster',
    100: 'Legend',
  };
  
  const rewards: Record<number, string> = {
    5: 'Profile customization unlock',
    10: 'New achievement category unlock',
    20: 'Special badge unlock',
    30: 'Golden border on profile',
    40: 'Custom theme unlock',
    50: 'Legendary avatar border',
    75: 'Mentor status',
    100: 'Immortal title',
  };
  
  return {
    title: titles[level] || 'Level up!',
    reward: rewards[level] || 'Keep going!',
  };
}
