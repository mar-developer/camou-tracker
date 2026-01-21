-- ============================================
-- 006_achievements_seed.sql
-- Pre-populate achievements
-- ============================================

-- ============================================
-- Streak Achievements
-- ============================================
INSERT INTO achievements (name, description, icon, requirement, xp_reward, rarity) VALUES
('First Steps', 'Complete your first habit', 'flag', '{"type": "first_completion"}', 50, 'common'),
('On Fire', '7 day streak', 'flame', '{"type": "streak", "days": 7}', 100, 'common'),
('Consistent', '14 day streak', 'bolt', '{"type": "streak", "days": 14}', 150, 'common'),
('Unstoppable', '30 day streak', 'zap', '{"type": "streak", "days": 30}', 300, 'rare'),
('Dedicated', '60 day streak', 'star', '{"type": "streak", "days": 60}', 500, 'rare'),
('Legend', '100 day streak', 'crown', '{"type": "streak", "days": 100}', 1000, 'legendary');

-- ============================================
-- Completion Achievements
-- ============================================
INSERT INTO achievements (name, description, icon, requirement, xp_reward, rarity) VALUES
('Habit Builder', 'Complete 50 habits', 'hammer', '{"type": "total_completions", "count": 50}', 100, 'common'),
('Achiever', 'Complete 100 habits', 'award', '{"type": "total_completions", "count": 100}', 200, 'common'),
('Master', 'Complete 500 habits', 'medal', '{"type": "total_completions", "count": 500}', 500, 'rare'),
('Elite', 'Complete 1000 habits', 'trophy', '{"type": "total_completions", "count": 1000}', 1000, 'epic'),
('Immortal', 'Complete 2000 habits', 'gem', '{"type": "total_completions", "count": 2000}', 2000, 'legendary');

-- ============================================
-- Time-based Achievements
-- ============================================
INSERT INTO achievements (name, description, icon, requirement, xp_reward, rarity) VALUES
('Early Bird', 'Complete habit before 8 AM (10 times)', 'sun', '{"type": "time", "before": "08:00", "count": 10}', 100, 'common'),
('Night Owl', 'Complete habit after 10 PM (10 times)', 'moon', '{"type": "time", "after": "22:00", "count": 10}', 100, 'common'),
('Weekend Warrior', 'Complete all habits on weekend', 'calendar', '{"type": "weekend_perfect"}', 150, 'rare'),
('Perfect Week', '100% completion rate for a week', 'star', '{"type": "completion_rate", "days": 7, "rate": 100}', 200, 'rare');

-- ============================================
-- Level Achievements
-- ============================================
INSERT INTO achievements (name, description, icon, requirement, xp_reward, rarity) VALUES
('Rising Star', 'Reach level 5', 'sparkle', '{"type": "level", "level": 5}', 200, 'common'),
('Apprentice', 'Reach level 10', 'star-half', '{"type": "level", "level": 10}', 400, 'common'),
('Journeyman', 'Reach level 20', 'star', '{"type": "level", "level": 20}', 800, 'rare'),
('Expert', 'Reach level 30', 'star', '{"type": "level", "level": 30}', 1200, 'rare'),
('Master', 'Reach level 40', 'award', '{"type": "level", "level": 40}', 1600, 'epic'),
('Grandmaster', 'Reach level 50', 'crown', '{"type": "level", "level": 50}', 2000, 'epic'),
('Legend', 'Reach level 75', 'crown', '{"type": "level", "level": 75}', 3000, 'legendary'),
('Immortal', 'Reach level 100', 'crown', '{"type": "level", "level": 100}', 5000, 'legendary');

-- ============================================
-- Social Achievements
-- ============================================
INSERT INTO achievements (name, description, icon, requirement, xp_reward, rarity) VALUES
('Social Butterfly', 'Have 10 friends', 'users', '{"type": "friends", "count": 10}', 150, 'common'),
('Networker', 'Have 25 friends', 'users', '{"type": "friends", "count": 25}', 300, 'rare'),
('Influencer', 'Have 50 friends', 'user-plus', '{"type": "friends", "count": 50}', 500, 'rare'),
('Community Leader', 'Have 100 friends', 'users', '{"type": "friends", "count": 100}', 1000, 'epic');

-- ============================================
-- Challenge Achievements
-- ============================================
INSERT INTO achievements (name, description, icon, requirement, xp_reward, rarity) VALUES
('Challenge Accepted', 'Join first challenge', 'target', '{"type": "first_challenge"}', 100, 'common'),
('Contender', 'Join 5 challenges', 'target', '{"type": "challenges_joined", "count": 5}', 200, 'common'),
('Champion', 'Complete a challenge', 'trophy', '{"type": "challenge_complete"}', 300, 'rare'),
('Legendary Champion', 'Complete 10 challenges', 'trophy', '{"type": "challenges_completed", "count": 10}', 1000, 'legendary');

-- ============================================
-- Habit Count Achievements
-- ============================================
INSERT INTO achievements (name, description, icon, requirement, xp_reward, rarity) VALUES
('Collector', 'Create 5 habits', 'layers', '{"type": "habit_count", "count": 5}', 100, 'common'),
('Organizer', 'Create 10 habits', 'folder', '{"type": "habit_count", "count": 10}', 200, 'common'),
('Master Planner', 'Create 25 habits', 'folder-plus', '{"type": "habit_count", "count": 25}', 500, 'rare'),
('Habit Architect', 'Create 50 habits', 'layers', '{"type": "habit_count", "count": 50}', 1000, 'epic');

-- ============================================
-- Streak Milestone Achievements
-- ============================================
INSERT INTO achievements (name, description, icon, requirement, xp_reward, rarity) VALUES
('First Week', 'Complete habit for 7 days straight', 'flame', '{"type": "consecutive_days", "days": 7}', 150, 'common'),
('Two Weeks', 'Complete habit for 14 days straight', 'fire', '{"type": "consecutive_days", "days": 14}', 250, 'common'),
('Monthly Master', 'Complete habit for 30 days straight', 'zap', '{"type": "consecutive_days", "days": 30}', 500, 'rare'),
('Quarterly Champion', 'Complete habit for 90 days straight', 'award', '{"type": "consecutive_days", "days": 90}', 1500, 'epic'),
('Half Year Hero', 'Complete habit for 180 days straight', 'medal', '{"type": "consecutive_days", "days": 180}', 3000, 'legendary');

-- ============================================
-- Special Achievements
-- ============================================
INSERT INTO achievements (name, description, icon, requirement, xp_reward, rarity) VALUES
('Perfectionist', 'Complete all habits in a day', 'star', '{"type": "perfect_day"}', 200, 'rare'),
('Early Riser', 'Complete 5 habits before 9 AM', 'sunrise', '{"type": "early_completion", "count": 5, "before": "09:00"}', 300, 'rare'),
('Night Shift', 'Complete 5 habits after 9 PM', 'moon', '{"type": "late_completion", "count": 5, "after": "21:00"}', 300, 'rare'),
('Category Master', 'Complete all habits in one category', 'layers', '{"type": "category_complete"}', 250, 'rare'),
('Streak Keeper', 'Maintain streak for 30 days', 'shield', '{"type": "maintain_streak", "days": 30}', 500, 'epic'),
('Century Club', 'Reach 100 day streak', 'crown', '{"type": "century"}', 5000, 'legendary');
