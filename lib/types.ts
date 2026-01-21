export interface User {
  id: string;
  email: string;
  username: string;
  avatar_color: string;
  created_at: Date;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon: string;
  is_default: boolean;
  created_at: Date;
}

export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  category_id?: string;
  frequency: HabitFrequency;
  custom_days?: string[];
  reminder_time?: string;
  reminder_enabled: boolean;
  goal_days: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  category?: Category;
  completions?: HabitCompletion[];
  streak?: number;
  xp_earned?: number;
}

export interface HabitCompletion {
  id: string;
  habit_id: string;
  user_id: string;
  completed_at: Date;
  note?: string;
}

export interface UserSettings {
  user_id: string;
  timezone: string;
  notification_enabled: boolean;
  theme: 'light' | 'dark' | 'system';
  first_day_of_week: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserXP {
  user_id: string;
  total_xp: number;
  level: number;
  xp_to_next_level: number;
  longest_streak: number;
  total_completions: number;
  updated_at: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: any;
  xp_reward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  created_at: Date;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: Date;
  achievement?: Achievement;
}

export type ShareType = 'public' | 'friends' | 'private';

export interface HabitShare {
  id: string;
  habit_id: string;
  user_id: string;
  share_type: ShareType;
  shared_at: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  requirement: any;
  xp_reward: number;
  xp_participation: number;
  max_participants?: number;
  created_at: Date;
}

export interface ChallengeParticipant {
  id: string;
  challenge_id: string;
  user_id: string;
  progress: any;
  completed: boolean;
  completed_at?: Date;
  joined_at: Date;
  user?: User;
}

export type ActivityType = 'completed' | 'streak' | 'level_up' | 'achievement' | 'joined_challenge';

export interface ActivityFeed {
  id: string;
  user_id: string;
  habit_id?: string;
  activity_type: ActivityType;
  metadata: any;
  created_at: Date;
  user?: User;
  habit?: Habit;
}

export interface ActivityComment {
  id: string;
  activity_id: string;
  user_id: string;
  comment: string;
  created_at: Date;
  user?: User;
}

export interface Friend {
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: Date;
  updated_at: Date;
  friend?: User;
}

export interface PrivacySettings {
  user_id: string;
  profile_visibility: 'public' | 'friends' | 'private';
  show_completions: boolean;
  show_streaks: boolean;
  show_level: boolean;
  allow_friend_requests: boolean;
  leaderboard_visibility: 'public' | 'friends' | 'none';
  created_at: Date;
  updated_at: Date;
}

export interface EmailPreferences {
  user_id: string;
  monthly_summary: boolean;
  weekly_summary: boolean;
  daily_reminders: boolean;
  updated_at: Date;
}

export interface AdminUser {
  user_id: string;
  role: 'admin' | 'moderator' | 'super_admin';
  created_at: Date;
}

export interface AdminAuditLog {
  id: string;
  admin_id: string;
  action: string;
  target_type?: string;
  target_id?: string;
  changes: any;
  created_at: Date;
  admin?: User;
}

export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed';

export interface ContentReport {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  reported_content_type?: string;
  reported_content_id?: string;
  reason: string;
  status: ReportStatus;
  admin_notes?: string;
  created_at: Date;
  updated_at: Date;
  reporter?: User;
  reported_user?: User;
}

export interface LeaderboardEntry {
  user_id: string;
  username: string;
  avatar_color: string;
  xp: number;
  level: number;
  longest_streak: number;
  completions: number;
  rank: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalHabits: number;
  totalCompletions: number;
  pendingReports: number;
  activeChallenges: number;
}

export interface RateLimitConfig {
  requests: number;
  window: number;
}
