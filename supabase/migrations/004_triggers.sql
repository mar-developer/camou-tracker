-- ============================================
-- 004_triggers.sql
-- Database triggers for auto-updates
-- ============================================

-- ============================================
-- Update updated_at Timestamp
-- ============================================

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to tables that need updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_habits_updated_at
  BEFORE UPDATE ON habits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_xp_updated_at
  BEFORE UPDATE ON user_xp
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_privacy_settings_updated_at
  BEFORE UPDATE ON privacy_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_preferences_updated_at
  BEFORE UPDATE ON email_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_friendships_updated_at
  BEFORE UPDATE ON friendships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_reports_updated_at
  BEFORE UPDATE ON content_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- User XP Updates on Habit Completion
-- ============================================

-- Function to add XP when habit is completed
CREATE OR REPLACE FUNCTION add_xp_on_completion()
RETURNS TRIGGER AS $$
DECLARE
  habit_rec RECORD;
  xp_reward INTEGER := 10; -- Base XP for habit completion
  current_streak INTEGER;
BEGIN
  -- Get habit details
  SELECT * INTO habit_rec
  FROM habits
  WHERE id = NEW.habit_id;
  
  -- Calculate streak
  WITH completions AS (
    SELECT completed_at
    FROM habit_completions
    WHERE habit_id = NEW.habit_id
    AND user_id = NEW.user_id
    ORDER BY completed_at DESC
    LIMIT 30
  )
  SELECT COUNT(*) INTO current_streak
  FROM completions
  WHERE completed_at >= NOW() - INTERVAL '1 day';
  
  -- Apply streak multiplier
  IF current_streak >= 7 THEN xp_reward := xp_reward * 1.1; END IF;
  IF current_streak >= 14 THEN xp_reward := xp_reward * 1.1; END IF;
  IF current_streak >= 30 THEN xp_reward := xp_reward * 1.2; END IF;
  IF current_streak >= 60 THEN xp_reward := xp_reward * 1.2; END IF;
  IF current_streak >= 100 THEN xp_reward := xp_reward * 1.3; END IF;
  
  -- Update user XP
  INSERT INTO user_xp (user_id, total_xp, level, xp_to_next_level, longest_streak, total_completions, updated_at)
  VALUES (
    NEW.user_id,
    (SELECT COALESCE(total_xp, 0) FROM user_xp WHERE user_id = NEW.user_id) + ROUND(xp_reward),
    (SELECT COALESCE(level, 1) FROM user_xp WHERE user_id = NEW.user_id),
    (SELECT xp_to_next_level FROM user_xp WHERE user_id = NEW.user_id),
    GREATEST(
      (SELECT COALESCE(longest_streak, 0) FROM user_xp WHERE user_id = NEW.user_id),
      current_streak
    ),
    (SELECT COALESCE(total_completions, 0) FROM user_xp WHERE user_id = NEW.user_id) + 1,
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_xp = user_xp.total_xp + ROUND(xp_reward),
    longest_streak = GREATEST(user_xp.longest_streak, current_streak),
    total_completions = user_xp.total_completions + 1,
    updated_at = NOW();
  
  -- Add activity feed entry
  INSERT INTO activity_feed (user_id, habit_id, activity_type, metadata, created_at)
  VALUES (
    NEW.user_id,
    NEW.habit_id,
    'completed',
    jsonb_build_object(
      'streak', current_streak,
      'xp', ROUND(xp_reward)
    ),
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for habit completions
CREATE TRIGGER on_habit_completion_add_xp
  AFTER INSERT ON habit_completions
  FOR EACH ROW EXECUTE FUNCTION add_xp_on_completion();

-- ============================================
-- Check for Achievement Unlocks
-- ============================================

-- Function to check and unlock achievements
CREATE OR REPLACE FUNCTION check_achievements_on_xp()
RETURNS TRIGGER AS $$
DECLARE
  user_level INTEGER;
BEGIN
  -- Get user's level
  SELECT level INTO user_level
  FROM user_xp
  WHERE user_id = NEW.user_id;
  
  -- Check for level achievements
  IF user_level >= 5 THEN
    INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
    SELECT NEW.user_id, id, NOW()
    FROM achievements
    WHERE id = (
      SELECT id FROM achievements
      WHERE requirement->>'type' = 'level'
      AND (requirement->>'level')::integer <= user_level
      AND NOT EXISTS (
        SELECT 1 FROM user_achievements
        WHERE user_id = NEW.user_id
        AND achievement_id = achievements.id
      )
      LIMIT 1
    )
    ON CONFLICT DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for XP updates to check achievements
CREATE TRIGGER on_xp_update_check_achievements
  AFTER UPDATE ON user_xp
  FOR EACH ROW EXECUTE FUNCTION check_achievements_on_xp();
