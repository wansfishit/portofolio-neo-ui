// TypeScript types for the portfolio

export interface Profile {
  id: string
  name: string
  role: string
  about: string
  location: string
  email: string
  github: string
  whatsapp?: string
  telegram?: string
  instagram?: string
  cv_url: string | null
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  sort_order: number
}

export interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_url: string | null
  live_url: string | null
  featured: boolean
  created_at: string
}

export interface Setting {
  key: string
  value: string
}

export interface PortfolioData {
  profile: Profile | null
  skills: Skill[]
  projects: Project[]
  settings: Setting[]
}

export type AccentColor = 'yellow' | 'green' | 'red' | 'teal'
export type ThemeMode = 'light' | 'dark'
