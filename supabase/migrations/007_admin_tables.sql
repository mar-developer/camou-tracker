-- ============================================
-- 007_admin_tables.sql
-- Admin panel tables and functions
-- ============================================

-- ============================================
-- Create Admin User Function
-- ============================================

-- Function to make a user an admin
CREATE OR REPLACE FUNCTION make_admin(user_uuid UUID, admin_role TEXT DEFAULT 'admin')
RETURNS void AS $$
BEGIN
  INSERT INTO admin_users (user_id, role, created_at)
  VALUES (user_uuid, admin_role, NOW())
  ON CONFLICT (user_id) DO UPDATE SET role = admin_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to remove admin from user
CREATE OR REPLACE FUNCTION remove_admin(user_uuid UUID)
RETURNS void AS $$
BEGIN
  DELETE FROM admin_users WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Audit Logging Functions
-- ============================================

-- Function to log admin action
CREATE OR REPLACE FUNCTION log_admin_action(
  admin_uuid UUID,
  action_name TEXT,
  target_type_param TEXT DEFAULT NULL,
  target_uuid UUID DEFAULT NULL,
  changes_data JSONB DEFAULT '{}'
)
RETURNS void AS $$
BEGIN
  INSERT INTO admin_audit_log (admin_id, action, target_type, target_id, changes, created_at)
  VALUES (admin_uuid, action_name, target_type_param, target_uuid, changes_data, NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- RLS for Admin Tables
-- ============================================

-- Enable RLS on admin tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view admin users
CREATE POLICY "Admins can view admin users" ON admin_users
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users
    )
  );

-- Only admins can insert admin users (for super_admin)
CREATE POLICY "Super admins can create admins" ON admin_users
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM admin_users WHERE role = 'super_admin'
    )
  );

-- Only admins can update admin users
CREATE POLICY "Admins can update admin users" ON admin_users
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users WHERE role = 'super_admin'
    )
  );

-- Only admins can delete admin users
CREATE POLICY "Super admins can delete admins" ON admin_users
  FOR DELETE USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users WHERE role = 'super_admin'
    )
  );

-- Only admins can view audit log
CREATE POLICY "Admins can view audit log" ON admin_audit_log
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users
    )
  );

-- Only admins can insert audit log (via function)
CREATE POLICY "Admins can insert audit log" ON admin_audit_log
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM admin_users
    )
  );

-- ============================================
-- RLS for Challenges and Achievements (Admin management)
-- ============================================

-- Enable RLS on challenges and achievements
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Admins can manage challenges
CREATE POLICY "Admins can manage challenges" ON challenges
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users
    )
  );

-- Admins can manage achievements
CREATE POLICY "Admins can manage achievements" ON achievements
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users
    )
  );

-- ============================================
-- RLS for Content Reports
-- ============================================

-- Admins can view all content reports
CREATE POLICY "Admins can view all content reports" ON content_reports
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users
    )
  );

-- Admins can update content reports
CREATE POLICY "Admins can update content reports" ON content_reports
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users
    )
  );

-- ============================================
-- Admin Analytics Views
-- ============================================

-- View for user stats
CREATE OR REPLACE VIEW admin_user_stats AS
SELECT 
  u.id as user_id,
  u.email,
  u.username,
  u.created_at as joined_at,
  COALESCE(ux.total_xp, 0) as total_xp,
  COALESCE(ux.level, 1) as level,
  COALESCE(ux.longest_streak, 0) as longest_streak,
  COALESCE(ux.total_completions, 0) as total_completions,
  (SELECT COUNT(*) FROM habits WHERE habits.user_id = u.id AND habits.active = TRUE) as active_habits,
  (SELECT COUNT(*) FROM habit_completions WHERE habit_completions.user_id = u.id) as total_habit_completions,
  (SELECT COUNT(*) FROM friendships WHERE friendships.user_id = u.id AND friendships.status = 'accepted') as friend_count,
  COALESCE(au.role, NULL) as admin_role
FROM auth.users u
LEFT JOIN user_xp ux ON ux.user_id = u.id
LEFT JOIN admin_users au ON au.user_id = u.id;

-- View for daily stats
CREATE OR REPLACE VIEW admin_daily_stats AS
SELECT 
  date(completed_at) as date,
  COUNT(DISTINCT user_id) as active_users,
  COUNT(*) as total_completions,
  COUNT(DISTINCT habit_id) as unique_habits_completed
FROM habit_completions
WHERE completed_at >= NOW() - INTERVAL '30 days'
GROUP BY date(completed_at)
ORDER BY date DESC;

-- View for habit stats
CREATE OR REPLACE VIEW admin_habit_stats AS
SELECT 
  c.id as category_id,
  c.name as category_name,
  c.color as category_color,
  COUNT(*) as habit_count,
  AVG(h.goal_days) as avg_goal_days
FROM habits h
JOIN categories c ON c.id = h.category_id
WHERE h.active = TRUE
GROUP BY c.id, c.name, c.color
ORDER BY habit_count DESC;

-- View for challenge stats
CREATE OR REPLACE VIEW admin_challenge_stats AS
SELECT 
  c.id as challenge_id,
  c.title,
  c.xp_reward,
  COUNT(cp.id) as participants,
  SUM(cp.completed::integer) as completions
FROM challenges c
LEFT JOIN challenge_participants cp ON cp.challenge_id = c.id
WHERE c.end_date >= NOW() - INTERVAL '90 days'
GROUP BY c.id, c.title, c.xp_reward
ORDER BY participants DESC;

-- ============================================
-- Grant necessary permissions
-- ============================================

-- Grant execute on functions to authenticated users
GRANT EXECUTE ON FUNCTION copy_default_categories TO authenticated;
GRANT EXECUTE ON FUNCTION generate_username_from_email TO authenticated;
GRANT EXECUTE ON FUNCTION check_username_available TO authenticated;
GRANT EXECUTE ON FUNCTION make_admin TO authenticated;
GRANT EXECUTE ON FUNCTION remove_admin TO authenticated;
GRANT EXECUTE ON FUNCTION log_admin_action TO authenticated;

-- Grant select on views
GRANT SELECT ON admin_user_stats TO authenticated;
GRANT SELECT ON admin_daily_stats TO authenticated;
GRANT SELECT ON admin_habit_stats TO authenticated;
GRANT SELECT ON admin_challenge_stats TO authenticated;
