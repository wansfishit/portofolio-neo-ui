import { supabase } from './supabase'
import type { Profile, Skill, Project, Setting } from './types'

// ==================== PROFILE ====================

export async function getProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }
  return data
}

export async function updateProfile(profile: Partial<Profile>): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .update({ ...profile, updated_at: new Date().toISOString() })
    .neq('id', '00000000-0000-0000-0000-000000000000') // update all rows (only one exists)

  if (error) {
    console.error('Error updating profile:', error)
    return false
  }
  return true
}

// ==================== SKILLS ====================

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching skills:', error)
    return []
  }
  return data || []
}

export async function createSkill(skill: Omit<Skill, 'id'>): Promise<Skill | null> {
  const { data, error } = await supabase
    .from('skills')
    .insert(skill)
    .select()
    .single()

  if (error) {
    console.error('Error creating skill:', error)
    return null
  }
  return data
}

export async function deleteSkill(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting skill:', error)
    return false
  }
  return true
}

// ==================== PROJECTS ====================

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  return data || []
}

export async function createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    return null
  }
  return data
}

export async function updateProject(id: string, project: Partial<Project>): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)

  if (error) {
    console.error('Error updating project:', error)
    return false
  }
  return true
}

export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    return false
  }
  return true
}

// ==================== SETTINGS ====================

export async function getSettings(): Promise<Setting[]> {
  const { data, error } = await supabase
    .from('settings')
    .select('*')

  if (error) {
    console.error('Error fetching settings:', error)
    return []
  }
  return data || []
}

export async function getSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error) return null
  return data?.value || null
}

export async function upsertSetting(key: string, value: string): Promise<boolean> {
  const { error } = await supabase
    .from('settings')
    .upsert({ key, value }, { onConflict: 'key' })

  if (error) {
    console.error('Error upserting setting:', error)
    return false
  }
  return true
}

// ==================== SEED DATA ====================

export async function seedInitialData(): Promise<void> {
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .limit(1)

  if (!existingProfile || existingProfile.length === 0) {
    await supabase.from('profiles').insert({
      name: 'Erwansyah',
      role: 'Web Developer / Bot Developer / Automation Builder',
      about: 'Seorang developer muda dari Dabo Singkep, Indonesia. Siswa kelas 3 SMK di SMKN 1 Singkep jurusan DKV yang passionate di dunia web development, bot Telegram, dan automation. Suka bikin hal-hal otomatis yang bikin hidup lebih mudah.',
      location: 'Dabo Singkep, Indonesia',
      email: 'pereman0813@gmail.com',
      github: 'https://github.com/wansfishit',
      whatsapp: '081378821654',
      telegram: '@listnoo',
      instagram: '@r1stno',
      cv_url: null,
    })
  }

  // Check if skills exist
  const { data: existingSkills } = await supabase
    .from('skills')
    .select('id')
    .limit(1)

  if (!existingSkills || existingSkills.length === 0) {
    await supabase.from('skills').insert([
      { name: 'HTML', category: 'frontend', sort_order: 1 },
      { name: 'CSS', category: 'frontend', sort_order: 2 },
      { name: 'JavaScript', category: 'frontend', sort_order: 3 },
      { name: 'Python', category: 'backend', sort_order: 4 },
      { name: 'Telegram Bot Dev', category: 'automation', sort_order: 5 },
      { name: 'Git & GitHub', category: 'tools', sort_order: 6 },
      { name: 'Linux & VPS', category: 'tools', sort_order: 7 },
      { name: 'API Integration', category: 'backend', sort_order: 8 },
      { name: 'Automation Scripting', category: 'automation', sort_order: 9 },
    ])
  }

  // Check if projects exist
  const { data: existingProjects } = await supabase
    .from('projects')
    .select('id')
    .limit(1)

  if (!existingProjects || existingProjects.length === 0) {
    await supabase.from('projects').insert([
      {
        title: 'Telegram Bot Automation',
        description: 'Bot Telegram dengan sistem auto reply, command handler, dan integrasi API. Dibangun menggunakan Python dengan library python-telegram-bot.',
        tech_stack: ['Python', 'Telegram Bot API', 'python-telegram-bot'],
        github_url: 'https://github.com/wansfishit',
        live_url: null,
        featured: true,
      },
      {
        title: 'Personal Web Portfolio',
        description: 'Website portfolio personal dengan style Neo Brutalism. Dibangun dengan Next.js dan Supabase untuk sistem pengelolaan konten.',
        tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
        github_url: 'https://github.com/wansfishit',
        live_url: null,
        featured: true,
      },
      {
        title: 'Automation Tools',
        description: 'Kumpulan skrip automation untuk berbagai task: file organizer, web scraper, dan scheduled job runner menggunakan Python.',
        tech_stack: ['Python', 'Bash', 'Linux', 'Cron'],
        github_url: 'https://github.com/wansfishit',
        live_url: null,
        featured: false,
      },
    ])
  }

  // Default settings
  const { data: existingSettings } = await supabase
    .from('settings')
    .select('key')

  if (!existingSettings || existingSettings.length === 0) {
    await supabase.from('settings').insert([
      { key: 'accent_color', value: 'yellow' },
      { key: 'theme_mode', value: 'light' },
    ])
  }
}
