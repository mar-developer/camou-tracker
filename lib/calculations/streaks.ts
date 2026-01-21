import { Habit } from '@/lib/types';
import { WEEK_DAYS } from '@/lib/constants';
import { startOfDay, differenceInCalendarDays } from 'date-fns';

export function isHabitDueToday(habit: Habit, date: Date = new Date()): boolean {
  const dayName = WEEK_DAYS[date.getDay()];
  
  switch (habit.frequency) {
    case 'daily':
      return true;
    case 'weekly':
      return dayName === 'monday';
    case 'custom':
      return habit.custom_days?.includes(dayName) || false;
    default:
      return false;
  }
}

export function calculateStreak(
  completions: Date[],
  habit: Habit,
  today: Date = new Date()
): number {
  if (completions.length === 0) return 0;
  
  const todayStart = startOfDay(today);
  
  const sorted = completions
    .sort((a, b) => b.getTime() - a.getTime())
    .filter((completion) => {
      const completionDate = new Date(completion);
      const dayName = WEEK_DAYS[completionDate.getDay()];
      
      switch (habit.frequency) {
        case 'daily':
          return true;
        case 'weekly':
          return dayName === 'monday';
        case 'custom':
          return habit.custom_days?.includes(dayName) || false;
        default:
          return false;
      }
    });
  
  if (sorted.length === 0) return 0;
  
  let streak = 0;
  let currentDate = todayStart;
  
  for (const completion of sorted) {
    const completionDate = startOfDay(new Date(completion));
    
    const diffDays = differenceInCalendarDays(currentDate, completionDate);
    
    if (diffDays >= 0 && diffDays <= 1) {
      streak++;
      currentDate = completionDate;
    } else if (diffDays > 1) {
      break;
    }
  }
  
  return streak;
}

export function calculateLongestStreak(
  completions: Date[],
  habit: Habit
): number {
  if (completions.length === 0) return 0;
  
  const sorted = completions.sort((a, b) => a.getTime() - b.getTime());
  
  let longestStreak = 0;
  let currentStreak = 0;
  let lastDate: Date | null = null;
  
  for (const completion of sorted) {
    const completionDate = new Date(completion);
    
    if (!lastDate) {
      currentStreak = 1;
    } else {
      const diffDays = differenceInCalendarDays(lastDate, completionDate);
      
      if (diffDays <= 7) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
    
    lastDate = completionDate;
    longestStreak = Math.max(longestStreak, currentStreak);
  }
  
  return longestStreak;
}

export function getStreakProgress(
  currentStreak: number,
  goal: number
): number {
  if (goal === 0) return 100;
  return Math.min(100, Math.round((currentStreak / goal) * 100));
}

export function getNextMilestone(currentStreak: number): number {
  const milestones = [7, 14, 30, 60, 90, 100, 180, 365];
  for (const milestone of milestones) {
    if (currentStreak < milestone) {
      return milestone;
    }
  }
  return currentStreak + 30;
}

export function getDaysUntilMilestone(
  currentStreak: number,
  lastCompletedDate: Date
): number {
  const nextMilestone = getNextMilestone(currentStreak);
  const daysNeeded = nextMilestone - currentStreak;
  return daysNeeded;
}

export function getStreakEmoji(streak: number): string {
  if (streak === 0) return '💪';
  if (streak < 7) return '🔥';
  if (streak < 14) return '⚡';
  if (streak < 30) return '💎';
  if (streak < 60) return '🌟';
  if (streak < 100) return '🏆';
  if (streak < 365) return '👑';
  return '🚀';
}
