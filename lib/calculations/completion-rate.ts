import { addDays, getStartOfWeek, getEndOfMonth, isSameDay } from '@/lib/utils';
import { Habit, HabitCompletion } from '@/lib/types';

export interface CompletionStats {
  totalDue: number;
  totalCompleted: number;
  completionRate: number;
  completedDays: Date[];
  missedDays: Date[];
}

export function calculateCompletionRate(
  habits: Habit[],
  completions: HabitCompletion[],
  startDate: Date,
  endDate: Date
): CompletionStats {
  const stats: CompletionStats = {
    totalDue: 0,
    totalCompleted: 0,
    completionRate: 0,
    completedDays: [],
    missedDays: [],
  };
  
  for (const habit of habits) {
    if (!habit.active) continue;
    
    let currentDate = new Date(startDate);
    currentDate.setHours(0, 0, 0, 0);
    
    while (currentDate <= endDate) {
      const isDue = isHabitDueOnDate(habit, currentDate);
      
      if (isDue) {
        stats.totalDue++;
        
        const completed = completions.some((c) => {
          const completionDate = new Date(c.completed_at);
          return c.habit_id === habit.id && isSameDay(completionDate, currentDate);
        });
        
        if (completed) {
          stats.totalCompleted++;
          stats.completedDays.push(new Date(currentDate));
        } else if (currentDate <= new Date()) {
          stats.missedDays.push(new Date(currentDate));
        }
      }
      
      currentDate = addDays(currentDate, 1);
    }
  }
  
  stats.completionRate = stats.totalDue > 0
    ? Math.round((stats.totalCompleted / stats.totalDue) * 100)
    : 0;
  
  return stats;
}

function isHabitDueOnDate(habit: Habit, date: Date): boolean {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[date.getDay()];
  
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

export function calculateWeeklyCompletionRates(
  habits: Habit[],
  completions: HabitCompletion[],
  weeks: number = 4
): Array<{ week: number; rate: number; completed: number; due: number }> {
  const results: Array<{ week: number; rate: number; completed: number; due: number }> = [];
  
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  for (let i = 0; i < weeks; i++) {
    const weekEnd = addDays(today, -i * 7);
    const weekStart = addDays(weekEnd, -6);
    weekStart.setHours(0, 0, 0, 0);
    
    const weekCompletions = completions.filter((c) => {
      const completionDate = new Date(c.completed_at);
      return completionDate >= weekStart && completionDate <= weekEnd;
    });
    
    const stats = calculateCompletionRate(habits, weekCompletions, weekStart, weekEnd);
    
    results.push({
      week: weeks - i,
      rate: stats.completionRate,
      completed: stats.totalCompleted,
      due: stats.totalDue,
    });
  }
  
  return results.reverse();
}

export function calculateMonthlyCompletionRates(
  habits: Habit[],
  completions: HabitCompletion[],
  months: number = 6
): Array<{ month: string; year: number; rate: number; completed: number; due: number }> {
  const results: Array<{ month: string; year: number; rate: number; completed: number; due: number }> = [];
  
  const today = new Date();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 0; i < months; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);
    
    const monthCompletions = completions.filter((c) => {
      const completionDate = new Date(c.completed_at);
      return completionDate >= monthStart && completionDate <= monthEnd;
    });
    
    const stats = calculateCompletionRate(habits, monthCompletions, monthStart, monthEnd);
    
    results.push({
      month: monthNames[date.getMonth()],
      year: date.getFullYear(),
      rate: stats.completionRate,
      completed: stats.totalCompleted,
      due: stats.totalDue,
    });
  }
  
  return results.reverse();
}

export function getCompletionRateColor(rate: number): string {
  if (rate >= 90) return '#10b981';
  if (rate >= 70) return '#3b82f6';
  if (rate >= 50) return '#f59e0b';
  return '#ef4444';
}

export function getCompletionRateLabel(rate: number): string {
  if (rate === 100) return 'Perfect';
  if (rate >= 90) return 'Excellent';
  if (rate >= 70) return 'Good';
  if (rate >= 50) return 'Fair';
  return 'Needs Improvement';
}

export function calculateConsecutivePerfectDays(
  completions: HabitCompletion[],
  habits: Habit[]
): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let consecutiveDays = 0;
  let currentDate = today;
  
  while (true) {
    const dayStart = new Date(currentDate);
    const dayEnd = new Date(currentDate);
    dayEnd.setHours(23, 59, 59, 999);
    
    const dayCompletions = completions.filter((c) => {
      const completionDate = new Date(c.completed_at);
      return completionDate >= dayStart && completionDate <= dayEnd;
    });
    
    const dayHabits = habits.filter((h) => h.active && isHabitDueOnDate(h, currentDate));
    const completedHabits = dayHabits.filter((h) => dayCompletions.some((c) => c.habit_id === h.id));
    
    if (dayHabits.length > 0 && completedHabits.length === dayHabits.length) {
      consecutiveDays++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (currentDate < today) {
      break;
    } else {
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }
  
  return consecutiveDays;
}
