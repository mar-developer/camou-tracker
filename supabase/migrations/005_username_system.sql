-- ============================================
-- 005_username_system.sql
-- Username system for users
-- ============================================

-- ============================================
-- Add Username to auth.users
-- ============================================

-- First, check if column exists and add if not
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users'
    AND column_name = 'username'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN username TEXT UNIQUE;
    ALTER TABLE auth.users ADD COLUMN avatar_color TEXT DEFAULT '#6366f1';
  END IF;
END $$;

-- ============================================
-- Function to Generate Username from Email
-- ============================================
CREATE OR REPLACE FUNCTION generate_username_from_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Only set username if not provided
  IF NEW.username IS NULL OR NEW.username = '' THEN
    NEW.username := split_part(NEW.email, '@', 1) || '_' || substr(md5(random()::text), 1, 6);
  END IF;
  
  -- Generate random avatar color if not provided
  IF NEW.avatar_color IS NULL OR NEW.avatar_color = '' THEN
    NEW.avatar_color := (ARRAY['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#06b6d4'])[floor(random() * 6 + 1)];
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Create Index on Username for Fast Lookups
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_username ON auth.users(username);

-- ============================================
-- Trigger for New Users
-- ============================================
CREATE TRIGGER on_auth_user_generate_username
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.username IS NULL OR NEW.username = '')
  EXECUTE FUNCTION generate_username_from_email();

-- ============================================
-- Function to Update Username
-- ============================================
CREATE OR REPLACE FUNCTION update_user_username(user_uuid UUID, new_username TEXT)
RETURNS void AS $$
BEGIN
  UPDATE auth.users
  SET username = new_username
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Function to Validate Username Availability
-- ============================================
CREATE OR REPLACE FUNCTION check_username_available(check_username TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  username_exists BOOLEAN;
  reserved BOOLEAN;
BEGIN
  -- Check if username exists
  SELECT EXISTS(
    SELECT 1 FROM auth.users
    WHERE username = check_username
  ) INTO username_exists;
  
  -- Check if username is reserved
  SELECT check_username IN (
    'admin', 'api', 'www', 'mail', 'support', 'help',
    'about', 'contact', 'terms', 'privacy', 'faq'
  ) INTO reserved;
  
  -- Return TRUE if available (not exists and not reserved)
  RETURN NOT username_exists AND NOT reserved;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
