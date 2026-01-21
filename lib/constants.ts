export const COLORS = {
  primary: {
    50: '#f0f4ff',
    100: '#e0e9ff',
    200: '#c7d6fe',
    300: '#a5b8fc',
    400: '#8293f8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  accent: {
    500: '#8b5cf6',
  },
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

export const CATEGORY_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f43f5e',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#06b6d4',
  '#3b82f6',
];

export const DEFAULT_CATEGORIES = [
  { name: 'Health', color: '#6366f1', icon: 'heart' },
  { name: 'Work', color: '#8b5cf6', icon: 'briefcase' },
  { name: 'Personal', color: '#ec4899', icon: 'user' },
  { name: 'Fitness', color: '#f97316', icon: 'activity' },
  { name: 'Learning', color: '#eab308', icon: 'book' },
  { name: 'Mindfulness', color: '#22c55e', icon: 'brain' },
];

export const XP_REWARDS = {
  habitCompletion: 10,
  streakDay: 5,
  newStreakRecord: 50,
  habitCreation: 20,
  challengeComplete: 200,
  achievementUnlock: 50,
  levelUpBonus: 100,
};

export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0 },
  { level: 2, xp: 100 },
  { level: 3, xp: 250 },
  { level: 4, xp: 500 },
  { level: 5, xp: 1000 },
  { level: 6, xp: 1800 },
  { level: 7, xp: 2900 },
  { level: 8, xp: 4300 },
  { level: 9, xp: 6000 },
  { level: 10, xp: 8000 },
  { level: 11, xp: 10500 },
  { level: 12, xp: 13500 },
  { level: 13, xp: 17000 },
  { level: 14, xp: 21000 },
  { level: 15, xp: 25500 },
  { level: 20, xp: 45000 },
  { level: 25, xp: 75000 },
  { level: 30, xp: 135000 },
  { level: 40, xp: 305000 },
  { level: 50, xp: 580000 },
  { level: 100, xp: 2900000 },
];

export const RATE_LIMITS = {
  api: { requests: 100, window: 60000 },
  createHabit: { requests: 10, window: 60000 },
  updateHabit: { requests: 20, window: 60000 },
  completeHabit: { requests: 30, window: 60000 },
  sendFriendRequest: { requests: 10, window: 3600000 },
  postComment: { requests: 20, window: 60000 },
  getLeaderboard: { requests: 30, window: 60000 },
};

export const CACHE_TTL = {
  short: 60,
  medium: 300,
  long: 3600,
  veryLong: 86400,
};

export const RESERVED_USERNAMES = [
  'admin',
  'api',
  'www',
  'mail',
  'support',
  'help',
  'about',
  'contact',
  'terms',
  'privacy',
  'faq',
];

export const WEEK_DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const WEEK_DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ACHIEVEMENT_RARITY = {
  common: { color: '#9ca3af', icon: '📝' },
  rare: { color: '#3b82f6', icon: '💎' },
  epic: { color: '#8b5cf6', icon: '🔮' },
  legendary: { color: '#f59e0b', icon: '🏆' },
};
