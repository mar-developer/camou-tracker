-- ============================================
-- 003_default_categories.sql
-- Default categories that will be copied to new users
-- ============================================

-- ============================================
-- Default Categories Template Table
-- ============================================
CREATE TABLE default_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  icon TEXT
);

-- ============================================
-- Insert Default Categories
-- ============================================
INSERT INTO default_categories (name, color, icon) VALUES
('Health', '#6366f1', 'heart'),
('Work', '#8b5cf6', 'briefcase'),
('Personal', '#ec4899', 'user'),
('Fitness', '#f97316', 'activity'),
('Learning', '#eab308', 'book'),
('Mindfulness', '#22c55e', 'brain');

-- ============================================
-- Function to Copy Default Categories for New Users
-- ============================================
CREATE OR REPLACE FUNCTION copy_default_categories(user_uuid UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO categories (user_id, name, color, icon, is_default, created_at)
  SELECT 
    user_uuid,
    name,
    color,
    icon,
    TRUE,
    NOW()
  FROM default_categories;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Trigger to Auto-create Default Categories
-- ============================================
CREATE OR REPLACE TRIGGER on_new_user_create_categories
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION copy_default_categories(NEW.id);
