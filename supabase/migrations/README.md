# HabitTracker Database Migrations

## Overview

This directory contains all SQL migrations for the HabitTracker database. Migrations should be run in numerical order in Supabase.

## Migration Order

Run these migrations in order in your Supabase SQL Editor:

1. **001_initial_schema.sql** - Core database tables
2. **002_rls_policies.sql** - Row Level Security policies
3. **003_default_categories.sql** - Default categories for new users
4. **004_triggers.sql** - Database triggers and automation
5. **005_username_system.sql** - Username system for users
6. **006_achievements_seed.sql** - Pre-populated achievements
7. **007_admin_tables.sql** - Admin panel tables and views

## Tables Created

### Core Tables
- `categories` - User-defined habit categories
- `habits` - User habits with settings
- `habit_completions` - Habit completion tracking
- `user_settings` - User preferences
- `user_xp` - XP and level tracking

### Gamification Tables
- `achievements` - Pre-defined achievements
- `user_achievements` - User unlocked achievements
- `challenges` - Challenges
- `challenge_participants` - Challenge participation

### Social Tables
- `friendships` - Friend connections
- `activity_feed` - Social activity
- `activity_comments` - Comments on activities
- `habit_shares` - Shared habits
- `privacy_settings` - Privacy preferences
- `email_preferences` - Email preferences

### Admin Tables
- `admin_users` - Admin accounts
- `admin_audit_log` - Admin action logs
- `content_reports` - Content moderation

### Utility Tables
- `default_categories` - Template for new user categories
- `rate_limits` - Rate limiting (fallback for Redis)

## Database Functions

### User Management
- `copy_default_categories(user_uuid)` - Copy default categories to new user
- `generate_username_from_email()` - Auto-generate username from email
- `check_username_available(username)` - Check if username is available
- `update_user_username(user_uuid, new_username)` - Update user username

### Admin Functions
- `make_admin(user_uuid, role)` - Promote user to admin
- `remove_admin(user_uuid)` - Remove admin status
- `log_admin_action(admin_uuid, action, target_type, target_id, changes)` - Log admin action

### XP & Achievements
- `add_xp_on_completion()` - Automatically add XP on habit completion
- `check_achievements_on_xp()` - Check for achievement unlocks

## Database Views

### Admin Analytics Views
- `admin_user_stats` - Comprehensive user statistics
- `admin_daily_stats` - Daily platform activity
- `admin_habit_stats` - Habit category statistics
- `admin_challenge_stats` - Challenge participation stats

## Automated Features

### Automatic Triggers

1. **New User Onboarding**
   - Auto-generates username from email
   - Generates random avatar color
   - Creates default user settings
   - Copies default categories

2. **XP System**
   - Automatically adds XP on habit completion
   - Calculates streak multipliers
   - Updates level based on XP
   - Tracks longest streak

3. **Achievement Tracking**
   - Automatically checks for new achievements
   - Unlocks achievements when criteria met

4. **Timestamp Updates**
   - Automatically updates `updated_at` columns

### Streak Multipliers

- 7+ days: +10% XP
- 14+ days: +10% XP (total +20%)
- 30+ days: +20% XP (total +40%)
- 60+ days: +20% XP (total +60%)
- 100+ days: +30% XP (total +90%)

## Row Level Security (RLS)

All tables have RLS policies ensuring:

- Users can only access their own data
- Admins can access all data
- Activity feed respects friendship status
- Habit sharing respects privacy settings

## Achievement Categories

### Streak Achievements (6)
- First Steps (1 completion)
- On Fire (7 days)
- Consistent (14 days)
- Unstoppable (30 days)
- Dedicated (60 days)
- Legend (100 days)

### Completion Achievements (5)
- Habit Builder (50 completions)
- Achiever (100 completions)
- Master (500 completions)
- Elite (1000 completions)
- Immortal (2000 completions)

### Time-based Achievements (4)
- Early Bird (before 8 AM)
- Night Owl (after 10 PM)
- Weekend Warrior (perfect weekend)
- Perfect Week (100% for a week)

### Level Achievements (8)
- Rising Star (level 5)
- Apprentice (level 10)
- Journeyman (level 20)
- Expert (level 30)
- Master (level 40)
- Grandmaster (level 50)
- Legend (level 75)
- Immortal (level 100)

### Social Achievements (4)
- Social Butterfly (10 friends)
- Networker (25 friends)
- Influencer (50 friends)
- Community Leader (100 friends)

### Challenge Achievements (4)
- Challenge Accepted (first challenge)
- Contender (5 challenges)
- Champion (complete a challenge)
- Legendary Champion (10 challenges)

### Habit Count Achievements (4)
- Collector (5 habits)
- Organizer (10 habits)
- Master Planner (25 habits)
- Habit Architect (50 habits)

### Special Achievements (6)
- Perfectionist (all habits in a day)
- Early Riser (5 before 9 AM)
- Night Shift (5 after 9 PM)
- Category Master (all in one category)
- Streak Keeper (maintain 30 days)
- Century Club (100 day streak)

**Total: 50 achievements**

## Setup Instructions

1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Run migrations in order (001, 002, 003, etc.)
4. Verify tables are created
5. Test triggers by creating a test user

## Notes

- All IDs are UUIDs
- All timestamps are in UTC
- All text is stored in plain text (not encrypted)
- RLS policies are enabled by default
- Soft delete is recommended (use `active = FALSE` instead of DELETE)
