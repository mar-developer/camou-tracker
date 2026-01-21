-- ============================================
-- 002_rls_policies.sql
-- Row Level Security policies for all tables
-- ============================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_xp ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE privacy_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Categories RLS
-- ============================================
-- Users can view their own categories
CREATE POLICY "Users can view own categories" ON categories
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own categories
CREATE POLICY "Users can insert own categories" ON categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own categories
CREATE POLICY "Users can update own categories" ON categories
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own categories
CREATE POLICY "Users can delete own categories" ON categories
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Habits RLS
-- ============================================
-- Users can view their own habits
CREATE POLICY "Users can view own habits" ON habits
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own habits
CREATE POLICY "Users can insert own habits" ON habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own habits
CREATE POLICY "Users can update own habits" ON habits
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own habits (soft delete via active = FALSE)
CREATE POLICY "Users can delete own habits" ON habits
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Habit Completions RLS
-- ============================================
-- Users can view their own completions
CREATE POLICY "Users can view own habit completions" ON habit_completions
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own completions
CREATE POLICY "Users can insert own habit completions" ON habit_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own completions
CREATE POLICY "Users can update own habit completions" ON habit_completions
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own completions
CREATE POLICY "Users can delete own habit completions" ON habit_completions
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- User Settings RLS
-- ============================================
-- Users can view their own settings
CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own settings
CREATE POLICY "Users can insert own settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own settings
CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own settings
CREATE POLICY "Users can delete own settings" ON user_settings
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- User XP RLS
-- ============================================
-- Users can view their own XP
CREATE POLICY "Users can view own XP" ON user_xp
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own XP
CREATE POLICY "Users can insert own XP" ON user_xp
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own XP
CREATE POLICY "Users can update own XP" ON user_xp
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own XP
CREATE POLICY "Users can delete own XP" ON user_xp
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- User Achievements RLS
-- ============================================
-- Users can view their own achievements
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own achievements
CREATE POLICY "Users can insert own achievements" ON user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own achievements
CREATE POLICY "Users can delete own achievements" ON user_achievements
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Habit Shares RLS
-- ============================================
-- Users can view their own shares
CREATE POLICY "Users can view own habit shares" ON habit_shares
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own shares
CREATE POLICY "Users can insert own habit shares" ON habit_shares
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own shares
CREATE POLICY "Users can update own habit shares" ON habit_shares
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own shares
CREATE POLICY "Users can delete own habit shares" ON habit_shares
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Friendships RLS
-- ============================================
-- Users can view their own friendships
CREATE POLICY "Users can view own friendships" ON friendships
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own friendship requests
CREATE POLICY "Users can insert own friendships" ON friendships
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update friendships where they are the user
CREATE POLICY "Users can update own friendships" ON friendships
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete friendships where they are the user
CREATE POLICY "Users can delete own friendships" ON friendships
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Privacy Settings RLS
-- ============================================
-- Users can view their own privacy settings
CREATE POLICY "Users can view own privacy settings" ON privacy_settings
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own privacy settings
CREATE POLICY "Users can insert own privacy settings" ON privacy_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own privacy settings
CREATE POLICY "Users can update own privacy settings" ON privacy_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own privacy settings
CREATE POLICY "Users can delete own privacy settings" ON privacy_settings
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Email Preferences RLS
-- ============================================
-- Users can view their own email preferences
CREATE POLICY "Users can view own email preferences" ON email_preferences
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own email preferences
CREATE POLICY "Users can insert own email preferences" ON email_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own email preferences
CREATE POLICY "Users can update own email preferences" ON email_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own email preferences
CREATE POLICY "Users can delete own email preferences" ON email_preferences
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Rate Limits RLS
-- ============================================
-- Users can view their own rate limits
CREATE POLICY "Users can view own rate limits" ON rate_limits
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own rate limits
CREATE POLICY "Users can insert own rate limits" ON rate_limits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own rate limits
CREATE POLICY "Users can update own rate limits" ON rate_limits
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own rate limits
CREATE POLICY "Users can delete own rate limits" ON rate_limits
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Public/Shared Tables (Achievements, Challenges)
-- ============================================
-- Achievements are public (anyone can view)
CREATE POLICY "Anyone can view achievements" ON achievements
  FOR SELECT USING (true);

-- Challenges are public (anyone can view)
CREATE POLICY "Anyone can view challenges" ON challenges
  FOR SELECT USING (true);

-- Challenge participants can view their participation
CREATE POLICY "Users can view own challenge participation" ON challenge_participants
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own challenge participation
CREATE POLICY "Users can insert own challenge participation" ON challenge_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own challenge participation
CREATE POLICY "Users can update own challenge participation" ON challenge_participants
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own challenge participation
CREATE POLICY "Users can delete own challenge participation" ON challenge_participants
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Activity Feed (Social)
-- ============================================
-- Activity feed visibility depends on privacy settings
CREATE POLICY "Users can view own activity" ON activity_feed
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view friends' activity" ON activity_feed
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM friendships
      WHERE friendships.user_id = auth.uid()
      AND friendships.friend_id = activity_feed.user_id
      AND friendships.status = 'accepted'
    )
  );

-- Users can insert their own activity
CREATE POLICY "Users can insert own activity" ON activity_feed
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Activity Comments
-- ============================================
-- Users can view comments on their own or friends' activity
CREATE POLICY "Users can view comments on accessible activity" ON activity_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM activity_feed
      WHERE activity_feed.id = activity_comments.activity_id
      AND (
        activity_feed.user_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM friendships
          WHERE friendships.user_id = auth.uid()
          AND friendships.friend_id = activity_feed.user_id
          AND friendships.status = 'accepted'
        )
      )
    )
  );

-- Users can insert comments on accessible activity
CREATE POLICY "Users can insert comments on accessible activity" ON activity_comments
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM activity_feed
      WHERE activity_feed.id = activity_comments.activity_id
      AND (
        activity_feed.user_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM friendships
          WHERE friendships.user_id = auth.uid()
          AND friendships.friend_id = activity_feed.user_id
          AND friendships.status = 'accepted'
        )
      )
    )
  );

-- Users can update their own comments
CREATE POLICY "Users can update own comments" ON activity_comments
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments" ON activity_comments
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Content Reports
-- ============================================
-- Users can view their own reports
CREATE POLICY "Users can view own content reports" ON content_reports
  FOR SELECT USING (auth.uid() = reporter_id);

-- Users can insert their own reports
CREATE POLICY "Users can insert own content reports" ON content_reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Users can update their own reports
CREATE POLICY "Users can update own content reports" ON content_reports
  FOR UPDATE USING (auth.uid() = reporter_id);

-- ============================================
-- Admin Tables
-- ============================================
-- Admin audit log - only admins can view
CREATE POLICY "Admins can view audit log" ON admin_audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Only admins can insert audit log entries
CREATE POLICY "Admins can insert audit log" ON admin_audit_log
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );
