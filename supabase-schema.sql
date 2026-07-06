-- ============================================================
-- PORTFOLIO NEO BRUTALISM — Supabase SQL Schema
-- Run this in your Supabase SQL Editor
-- ============================================================
-- NOTE: This drops existing tables first to ensure clean setup.
-- Safe to run multiple times.
-- ============================================================


-- ============================================================
-- DROP EXISTING TABLES (clean slate)
-- ============================================================

DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;


-- ============================================================
-- 1. PROFILES TABLE
-- ============================================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Erwansyah',
  role TEXT NOT NULL DEFAULT 'Web Developer / Bot Developer / Automation Builder',
  about TEXT DEFAULT '',
  location TEXT DEFAULT 'Dabo Singkep, Indonesia',
  email TEXT DEFAULT 'pereman0813@gmail.com',
  github TEXT DEFAULT 'https://github.com/wansfishit',
  whatsapp TEXT DEFAULT '081378821654',
  telegram TEXT DEFAULT '@listnoo',
  instagram TEXT DEFAULT '@r1stno',
  cv_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Auth users can update profiles" ON profiles
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth users can insert profiles" ON profiles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- ============================================================
-- 2. SKILLS TABLE
-- ============================================================

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  sort_order INTEGER DEFAULT 0
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Auth users can manage skills" ON skills
  FOR ALL USING (auth.role() = 'authenticated');


-- ============================================================
-- 3. PROJECTS TABLE
-- ============================================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Auth users can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');


-- ============================================================
-- 4. SETTINGS TABLE
-- ============================================================

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read settings" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Auth users can manage settings" ON settings
  FOR ALL USING (auth.role() = 'authenticated');


-- ============================================================
-- SEED INITIAL DATA
-- ============================================================

-- Default profile
INSERT INTO profiles (name, role, about, location, email, github, whatsapp, telegram, instagram)
VALUES (
  'Erwansyah',
  'Web Developer / Bot Developer / Automation Builder',
  'Seorang developer muda dari Dabo Singkep, Indonesia. Siswa kelas 3 SMK di SMKN 1 Singkep jurusan DKV yang passionate di dunia web development, bot Telegram, dan automation. Suka bikin hal-hal otomatis yang bikin hidup lebih mudah.',
  'Dabo Singkep, Indonesia',
  'pereman0813@gmail.com',
  'https://github.com/wansfishit',
  '081378821654',
  '@listnoo',
  '@r1stno'
);

-- Default skills
INSERT INTO skills (name, category, sort_order) VALUES
  ('HTML', 'frontend', 1),
  ('CSS', 'frontend', 2),
  ('JavaScript', 'frontend', 3),
  ('Python', 'backend', 4),
  ('Telegram Bot Dev', 'automation', 5),
  ('Git & GitHub', 'tools', 6),
  ('Linux & VPS', 'tools', 7),
  ('API Integration', 'backend', 8),
  ('Automation Scripting', 'automation', 9);

-- Default projects
INSERT INTO projects (title, description, tech_stack, github_url, featured) VALUES
  (
    'Telegram Bot Automation',
    'Bot Telegram dengan sistem auto reply, command handler, dan integrasi API. Dibangun menggunakan Python dengan library python-telegram-bot.',
    ARRAY['Python', 'Telegram Bot API', 'python-telegram-bot'],
    'https://github.com/wansfishit',
    true
  ),
  (
    'Personal Web Portfolio',
    'Website portfolio personal dengan style Neo Brutalism. Dibangun dengan Next.js dan Supabase untuk sistem pengelolaan konten.',
    ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    'https://github.com/wansfishit',
    true
  ),
  (
    'Automation Tools',
    'Kumpulan skrip automation untuk berbagai task: file organizer, web scraper, dan scheduled job runner menggunakan Python.',
    ARRAY['Python', 'Bash', 'Linux', 'Cron'],
    'https://github.com/wansfishit',
    false
  );

-- Default settings
INSERT INTO settings (key, value) VALUES
  ('accent_color', 'yellow'),
  ('theme_mode', 'light');
