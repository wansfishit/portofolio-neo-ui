'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  getProfile,
  updateProfile,
  getSkills,
  createSkill,
  deleteSkill,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSetting,
  upsertSetting,
} from '@/lib/data'
import type { Profile, Skill, Project } from '@/lib/types'
import {
  User,
  Code,
  FolderOpen,
  Palette,
  SignOut,
  Plus,
  Trash,
  FloppyDisk,
  ArrowSquareOut,
  Warning,
  CheckCircle,
  Sun,
  Moon,
  GithubLogo,
} from '@phosphor-icons/react'

type Tab = 'profile' | 'skills' | 'projects' | 'settings'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin/login')
      } else {
        setLoading(false)
      }
    })
  }, [router])

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div
        className="min-h-[100dvh] flex items-center justify-center"
        style={{ background: 'var(--brutal-bg-dark)' }}
      >
        <p className="font-mono-brutal text-[var(--brutal-accent)] text-sm animate-pulse uppercase tracking-widest">
          Loading...
        </p>
      </div>
    )
  }

  return (
    <div
      className="min-h-[100dvh] flex flex-col md:flex-row"
      style={{ background: 'var(--brutal-bg-dark)', color: 'var(--brutal-text-dark)' }}
    >
      {/* Sidebar */}
      <aside className="admin-sidebar flex-shrink-0 hidden md:flex flex-col" aria-label="Admin navigation">
        <div className="mb-8">
          <p className="font-mono-brutal text-[10px] uppercase tracking-widest opacity-40 mb-1">
            Portfolio CMS
          </p>
          <h1 className="font-bold text-xl">Admin Panel</h1>
        </div>

        <nav className="flex flex-col gap-1 flex-1" aria-label="Admin menu">
          {(
            [
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'skills', label: 'Skills', icon: Code },
              { id: 'projects', label: 'Projects', icon: FolderOpen },
              { id: 'settings', label: 'Settings', icon: Palette },
            ] as { id: Tab; label: string; icon: React.ComponentType<{ size: number; weight: string }> }[]
          ).map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 font-bold text-sm uppercase tracking-wide transition-all text-left ${
                  activeTab === item.id
                    ? 'bg-[var(--brutal-accent)] text-[var(--brutal-text)]'
                    : 'text-[var(--brutal-bg)] hover:bg-[rgba(255,253,240,0.1)]'
                }`}
                id={`admin-tab-${item.id}`}
                aria-selected={activeTab === item.id}
                aria-label={`${item.label} tab`}
              >
                <Icon size={18} weight="bold" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto pt-4 border-t-[2px] border-[rgba(255,253,240,0.1)] flex flex-col gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono-brutal opacity-60 hover:opacity-100 text-[var(--brutal-bg)] transition-opacity"
            id="admin-view-portfolio-link"
          >
            <ArrowSquareOut size={14} />
            View Portfolio
          </a>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono-brutal opacity-60 hover:opacity-100 text-[var(--brutal-accent-danger)] transition-opacity"
            id="admin-signout-btn"
            aria-label="Sign out"
          >
            <SignOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div
        className="md:hidden flex border-b-[3px]"
        style={{ borderColor: 'rgba(255,253,240,0.15)', background: 'var(--brutal-text)' }}
        role="tablist"
        aria-label="Admin navigation tabs"
      >
        {(
          [
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'skills', label: 'Skills', icon: Code },
            { id: 'projects', label: 'Projects', icon: FolderOpen },
            { id: 'settings', label: 'Settings', icon: Palette },
          ] as { id: Tab; label: string; icon: React.ComponentType<{ size: number; weight: string }> }[]
        ).map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[9px] font-bold uppercase tracking-wide transition-all ${
                activeTab === item.id
                  ? 'text-[var(--brutal-accent)]'
                  : 'text-[rgba(255,253,240,0.5)]'
              }`}
              role="tab"
              aria-selected={activeTab === item.id}
            >
              <Icon size={18} weight="bold" />
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Toast notification */}
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 brutal-toast flex items-center gap-2 brutal-animate-in`}
            style={{
              background: toast.type === 'success' ? 'var(--brutal-accent-secondary)' : 'var(--brutal-accent-danger)',
              color: '#fff',
            }}
            role="status"
            aria-live="polite"
          >
            {toast.type === 'success' ? (
              <CheckCircle size={18} weight="bold" />
            ) : (
              <Warning size={18} weight="bold" />
            )}
            {toast.msg}
          </div>
        )}

        {/* Tab panels */}
        {activeTab === 'profile' && <ProfileTab showToast={showToast} />}
        {activeTab === 'skills' && <SkillsTab showToast={showToast} />}
        {activeTab === 'projects' && <ProjectsTab showToast={showToast} />}
        {activeTab === 'settings' && <SettingsTab showToast={showToast} />}
      </main>
    </div>
  )
}

// ============================================================
// PROFILE TAB
// ============================================================

function ProfileTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error') => void }) {
  const [profile, setProfile] = useState<Partial<Profile>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getProfile().then((data) => {
      if (data) setProfile(data)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const ok = await updateProfile(profile)
    setSaving(false)
    if (ok) {
      showToast('Profile saved successfully!', 'success')
    } else {
      showToast('Failed to save profile.', 'error')
    }
  }

  const fields = [
    { key: 'name', label: 'Name', type: 'text', placeholder: 'Erwansyah' },
    { key: 'role', label: 'Role / Title', type: 'text', placeholder: 'Web Developer / Bot Developer' },
    { key: 'location', label: 'Location', type: 'text', placeholder: 'Dabo Singkep, Indonesia' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
    { key: 'github', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/username' },
    { key: 'whatsapp', label: 'WhatsApp', type: 'text', placeholder: '081378821654' },
    { key: 'telegram', label: 'Telegram (username)', type: 'text', placeholder: '@listnoo' },
    { key: 'instagram', label: 'Instagram (username)', type: 'text', placeholder: '@r1stno' },
    { key: 'cv_url', label: 'CV URL (optional)', type: 'url', placeholder: 'https://...' },
  ]

  return (
    <div className="max-w-xl">
      <AdminSectionHeader title="Edit Profile" icon={<User size={20} weight="bold" />} />

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`profile-${field.key}`} className="brutal-label" style={{ color: 'var(--brutal-text-dark)' }}>
              {field.label}
            </label>
            <input
              id={`profile-${field.key}`}
              type={field.type}
              placeholder={field.placeholder}
              value={(profile as Record<string, string>)[field.key] || ''}
              onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
              className="brutal-input"
              style={{
                background: 'rgba(255,253,240,0.05)',
                color: 'var(--brutal-text-dark)',
                borderColor: 'rgba(255,253,240,0.3)',
              }}
            />
          </div>
        ))}

        <div>
          <label htmlFor="profile-about" className="brutal-label" style={{ color: 'var(--brutal-text-dark)' }}>
            About Me
          </label>
          <textarea
            id="profile-about"
            placeholder="Tell the world about yourself..."
            value={profile.about || ''}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            className="brutal-textarea"
            style={{
              background: 'rgba(255,253,240,0.05)',
              color: 'var(--brutal-text-dark)',
              borderColor: 'rgba(255,253,240,0.3)',
              minHeight: '150px',
            }}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="brutal-btn brutal-btn-lg"
          id="profile-save-btn"
          aria-label="Save profile changes"
        >
          <FloppyDisk size={18} weight="bold" />
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  )
}

// ============================================================
// SKILLS TAB
// ============================================================

function SkillsTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error') => void }) {
  const [skills, setSkills] = useState<Skill[]>([])
  const [newSkill, setNewSkill] = useState({ name: '', category: 'general' })
  const [adding, setAdding] = useState(false)

  const loadSkills = useCallback(async () => {
    const data = await getSkills()
    setSkills(data)
  }, [])

  useEffect(() => { loadSkills() }, [loadSkills])

  const handleAdd = async () => {
    if (!newSkill.name.trim()) return
    setAdding(true)
    const result = await createSkill({ ...newSkill, sort_order: skills.length + 1 })
    setAdding(false)
    if (result) {
      setNewSkill({ name: '', category: 'general' })
      await loadSkills()
      showToast('Skill added!', 'success')
    } else {
      showToast('Failed to add skill.', 'error')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete skill "${name}"?`)) return
    const ok = await deleteSkill(id)
    if (ok) {
      await loadSkills()
      showToast('Skill deleted!', 'success')
    } else {
      showToast('Failed to delete skill.', 'error')
    }
  }

  const CATEGORIES = ['frontend', 'backend', 'automation', 'tools', 'general']

  return (
    <div className="max-w-2xl">
      <AdminSectionHeader title="Manage Skills" icon={<Code size={20} weight="bold" />} />

      {/* Add skill form */}
      <div
        className="p-4 mb-6 border-[3px] flex flex-col sm:flex-row gap-3"
        style={{ borderColor: 'var(--brutal-accent)', background: 'rgba(245,230,66,0.05)' }}
      >
        <input
          type="text"
          placeholder="Skill name (e.g. React, Docker)"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="brutal-input flex-1"
          style={{
            background: 'rgba(255,253,240,0.05)',
            color: 'var(--brutal-text-dark)',
            borderColor: 'rgba(255,253,240,0.3)',
          }}
          id="skill-name-input"
          aria-label="New skill name"
        />
        <select
          value={newSkill.category}
          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
          className="brutal-input"
          style={{
            background: '#0a0a0a',
            color: 'var(--brutal-text-dark)',
            borderColor: 'rgba(255,253,240,0.3)',
            width: 'auto',
          }}
          id="skill-category-select"
          aria-label="Skill category"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} style={{ background: '#0a0a0a' }}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          disabled={adding || !newSkill.name.trim()}
          className="brutal-btn"
          id="skill-add-btn"
          aria-label="Add skill"
        >
          <Plus size={16} weight="bold" />
          Add
        </button>
      </div>

      {/* Skills list */}
      <div className="flex flex-col gap-2">
        {skills.length === 0 ? (
          <p className="opacity-40 text-sm font-mono-brutal">No skills yet. Add your first one above!</p>
        ) : (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between px-4 py-3 border-[2px]"
              style={{ borderColor: 'rgba(255,253,240,0.15)', background: 'rgba(255,253,240,0.03)' }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono-brutal text-[10px] uppercase tracking-widest opacity-40 min-w-[70px]">
                  {skill.category}
                </span>
                <span className="font-bold text-sm">{skill.name}</span>
              </div>
              <button
                onClick={() => handleDelete(skill.id, skill.name)}
                className="text-[var(--brutal-accent-danger)] opacity-40 hover:opacity-100 transition-opacity p-1"
                aria-label={`Delete skill: ${skill.name}`}
              >
                <Trash size={16} weight="bold" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ============================================================
// PROJECTS TAB
// ============================================================

const EMPTY_PROJECT = {
  title: '',
  description: '',
  tech_stack: [] as string[],
  github_url: '',
  live_url: '',
  featured: false,
}

function ProjectsTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error') => void }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState<typeof EMPTY_PROJECT>({ ...EMPTY_PROJECT })
  const [techInput, setTechInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const loadProjects = useCallback(async () => {
    const data = await getProjects()
    setProjects(data)
  }, [])

  useEffect(() => { loadProjects() }, [loadProjects])

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setForm({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack || [],
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      featured: project.featured,
    })
    setTechInput('')
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    if (editingId) {
      const ok = await updateProject(editingId, form)
      if (ok) {
        showToast('Project updated!', 'success')
        setEditingId(null)
        setForm({ ...EMPTY_PROJECT })
        setShowForm(false)
      } else {
        showToast('Failed to update project.', 'error')
      }
    } else {
      const result = await createProject(form)
      if (result) {
        showToast('Project added!', 'success')
        setForm({ ...EMPTY_PROJECT })
        setShowForm(false)
      } else {
        showToast('Failed to add project.', 'error')
      }
    }
    setSaving(false)
    await loadProjects()
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete project "${title}"?`)) return
    const ok = await deleteProject(id)
    if (ok) {
      await loadProjects()
      showToast('Project deleted!', 'success')
    } else {
      showToast('Failed to delete.', 'error')
    }
  }

  const addTech = () => {
    const tech = techInput.trim()
    if (tech && !form.tech_stack.includes(tech)) {
      setForm({ ...form, tech_stack: [...form.tech_stack, tech] })
    }
    setTechInput('')
  }

  const removeTech = (tech: string) => {
    setForm({ ...form, tech_stack: form.tech_stack.filter((t) => t !== tech) })
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <AdminSectionHeader title="Manage Projects" icon={<FolderOpen size={20} weight="bold" />} inline />
        <button
          onClick={() => {
            setEditingId(null)
            setForm({ ...EMPTY_PROJECT })
            setShowForm(!showForm)
          }}
          className="brutal-btn brutal-btn-sm"
          id="project-add-btn"
          aria-label="Add new project"
        >
          <Plus size={14} weight="bold" />
          {showForm ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {/* Project form */}
      {showForm && (
        <div
          className="p-6 mb-6 border-[3px] brutal-animate-in flex flex-col gap-4"
          style={{ borderColor: 'var(--brutal-accent)', background: 'rgba(245,230,66,0.05)' }}
          aria-label="Project editor form"
        >
          <h3 className="font-bold uppercase tracking-wide text-sm">
            {editingId ? 'Edit Project' : 'New Project'}
          </h3>

          <div>
            <label htmlFor="project-title" className="brutal-label" style={{ color: 'var(--brutal-text-dark)' }}>
              Title
            </label>
            <input
              id="project-title"
              type="text"
              placeholder="Project title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="brutal-input"
              style={{ background: 'rgba(255,253,240,0.05)', color: 'var(--brutal-text-dark)', borderColor: 'rgba(255,253,240,0.3)' }}
            />
          </div>

          <div>
            <label htmlFor="project-desc" className="brutal-label" style={{ color: 'var(--brutal-text-dark)' }}>
              Description
            </label>
            <textarea
              id="project-desc"
              placeholder="Describe the project..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="brutal-textarea"
              style={{ background: 'rgba(255,253,240,0.05)', color: 'var(--brutal-text-dark)', borderColor: 'rgba(255,253,240,0.3)', minHeight: '100px' }}
            />
          </div>

          <div>
            <label className="brutal-label" style={{ color: 'var(--brutal-text-dark)' }}>
              Tech Stack
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. React, Python"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                className="brutal-input flex-1"
                style={{ background: 'rgba(255,253,240,0.05)', color: 'var(--brutal-text-dark)', borderColor: 'rgba(255,253,240,0.3)' }}
                id="project-tech-input"
                aria-label="Add tech stack item"
              />
              <button onClick={addTech} className="brutal-btn brutal-btn-sm" aria-label="Add tech">
                <Plus size={14} weight="bold" />
              </button>
            </div>
            {form.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tech_stack.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => removeTech(tech)}
                    className="brutal-tag brutal-tag-accent flex items-center gap-1 cursor-pointer hover:bg-[var(--brutal-accent-danger)] hover:border-[var(--brutal-accent-danger)] transition-colors"
                    aria-label={`Remove ${tech}`}
                  >
                    {tech} ×
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="project-github" className="brutal-label" style={{ color: 'var(--brutal-text-dark)' }}>
                GitHub URL
              </label>
              <input
                id="project-github"
                type="url"
                placeholder="https://github.com/..."
                value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                className="brutal-input"
                style={{ background: 'rgba(255,253,240,0.05)', color: 'var(--brutal-text-dark)', borderColor: 'rgba(255,253,240,0.3)' }}
              />
            </div>
            <div>
              <label htmlFor="project-live" className="brutal-label" style={{ color: 'var(--brutal-text-dark)' }}>
                Live URL
              </label>
              <input
                id="project-live"
                type="url"
                placeholder="https://..."
                value={form.live_url}
                onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                className="brutal-input"
                style={{ background: 'rgba(255,253,240,0.05)', color: 'var(--brutal-text-dark)', borderColor: 'rgba(255,253,240,0.3)' }}
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4"
              id="project-featured-check"
              aria-label="Mark as featured project"
            />
            <span className="font-bold text-sm uppercase tracking-wide">Featured Project</span>
          </label>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !form.title.trim()}
              className="brutal-btn"
              id="project-save-btn"
              aria-label="Save project"
            >
              <FloppyDisk size={16} weight="bold" />
              {saving ? 'Saving...' : editingId ? 'Update Project' : 'Save Project'}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); setForm({ ...EMPTY_PROJECT }) }}
              className="brutal-btn brutal-btn-outline"
              style={{ color: 'var(--brutal-text-dark)', borderColor: 'rgba(255,253,240,0.3)' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects list */}
      <div className="flex flex-col gap-3">
        {projects.length === 0 ? (
          <p className="opacity-40 text-sm font-mono-brutal">No projects yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="flex items-start justify-between p-4 gap-4 border-[2px]"
              style={{ borderColor: 'rgba(255,253,240,0.15)', background: 'rgba(255,253,240,0.03)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold text-sm">{project.title}</span>
                  {project.featured && (
                    <span
                      className="brutal-tag text-[9px]"
                      style={{ background: 'var(--brutal-accent)', color: 'var(--brutal-text)', borderColor: 'var(--brutal-accent)' }}
                    >
                      FEATURED
                    </span>
                  )}
                </div>
                <p className="text-xs opacity-50 line-clamp-1">{project.description}</p>
                {project.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tech_stack.map((t) => (
                      <span key={t} className="brutal-tag text-[9px]">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
                    <GithubLogo size={14} weight="bold" />
                  </a>
                )}
                <button
                  onClick={() => handleEdit(project)}
                  className="brutal-btn brutal-btn-sm"
                  style={{ padding: '0.3rem 0.7rem', fontSize: '0.7rem' }}
                  aria-label={`Edit ${project.title}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="text-[var(--brutal-accent-danger)] opacity-40 hover:opacity-100 transition-opacity p-1"
                  aria-label={`Delete ${project.title}`}
                >
                  <Trash size={16} weight="bold" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ============================================================
// SETTINGS TAB
// ============================================================

function SettingsTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error') => void }) {
  const [accent, setAccentState] = useState('yellow')
  const [darkMode, setDarkModeState] = useState(false)

  useEffect(() => {
    Promise.all([
      getSetting('accent_color'),
      getSetting('theme_mode'),
    ]).then(([accentVal, themeVal]) => {
      if (accentVal) setAccentState(accentVal)
      if (themeVal) setDarkModeState(themeVal === 'dark')
    })
    // Also read from localStorage for instant sync
    const la = localStorage.getItem('brutal_accent')
    const ld = localStorage.getItem('brutal_dark')
    if (la) setAccentState(la)
    if (ld) setDarkModeState(ld === 'true')
  }, [])

  const ACCENTS = [
    { key: 'yellow', label: 'Brutal Yellow', color: '#f5e642' },
    { key: 'green', label: 'Brutal Green', color: '#00ff88' },
    { key: 'red', label: 'Brutal Red', color: '#ff3b3b' },
    { key: 'teal', label: 'Brutal Teal', color: '#00c2a8' },
  ]

  const handleAccentChange = async (color: string) => {
    setAccentState(color)
    localStorage.setItem('brutal_accent', color)
    document.documentElement.setAttribute('data-accent', color)
    await upsertSetting('accent_color', color)
    showToast(`Accent changed to ${color}!`, 'success')
  }

  const handleThemeToggle = async () => {
    const newDark = !darkMode
    setDarkModeState(newDark)
    localStorage.setItem('brutal_dark', String(newDark))
    document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light')
    await upsertSetting('theme_mode', newDark ? 'dark' : 'light')
    showToast(`Theme set to ${newDark ? 'Dark' : 'Light'}!`, 'success')
  }

  return (
    <div className="max-w-lg">
      <AdminSectionHeader title="UI Settings" icon={<Palette size={20} weight="bold" />} />

      {/* Accent color */}
      <div className="mb-8">
        <p className="brutal-label mb-3" style={{ color: 'var(--brutal-text-dark)' }}>
          Accent Color
        </p>
        <div className="grid grid-cols-2 gap-3">
          {ACCENTS.map((a) => (
            <button
              key={a.key}
              onClick={() => handleAccentChange(a.key)}
              className={`flex items-center gap-3 p-3 border-[3px] font-bold text-sm transition-all ${
                accent === a.key ? 'border-[var(--brutal-accent)]' : 'border-[rgba(255,253,240,0.15)]'
              }`}
              style={{
                background: accent === a.key ? 'rgba(255,253,240,0.05)' : 'rgba(255,253,240,0.02)',
                boxShadow: accent === a.key ? '3px 3px 0px rgba(255,253,240,0.3)' : 'none',
              }}
              id={`settings-accent-${a.key}`}
              aria-pressed={accent === a.key}
              aria-label={`Set accent color to ${a.label}`}
            >
              <span
                className="w-6 h-6 border-[2px] border-[rgba(255,253,240,0.4)] flex-shrink-0"
                style={{ background: a.color }}
                aria-hidden="true"
              />
              {a.label}
              {accent === a.key && (
                <CheckCircle size={14} weight="fill" className="ml-auto text-[var(--brutal-accent)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dark mode toggle */}
      <div>
        <p className="brutal-label mb-3" style={{ color: 'var(--brutal-text-dark)' }}>
          Theme Mode
        </p>
        <button
          onClick={handleThemeToggle}
          className="flex items-center justify-between w-full p-4 border-[3px] transition-all"
          style={{
            borderColor: 'rgba(255,253,240,0.2)',
            background: 'rgba(255,253,240,0.03)',
            boxShadow: '3px 3px 0px rgba(255,253,240,0.15)',
          }}
          id="settings-theme-toggle"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          aria-pressed={darkMode}
        >
          <div className="flex items-center gap-3">
            {darkMode ? (
              <Moon size={20} weight="bold" className="text-[var(--brutal-accent)]" />
            ) : (
              <Sun size={20} weight="bold" className="text-[var(--brutal-accent)]" />
            )}
            <div className="text-left">
              <p className="font-bold text-sm">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
              <p className="text-[10px] opacity-40 font-mono-brutal">Click to toggle</p>
            </div>
          </div>
          <div
            className="w-12 h-6 border-[2px] border-[rgba(255,253,240,0.3)] relative"
            style={{ background: darkMode ? 'var(--brutal-accent)' : 'rgba(255,253,240,0.1)' }}
            aria-hidden="true"
          >
            <div
              className="absolute top-[2px] w-4 h-4 transition-all"
              style={{
                background: darkMode ? 'var(--brutal-text)' : 'rgba(255,253,240,0.5)',
                left: darkMode ? 'calc(100% - 18px)' : '2px',
              }}
            />
          </div>
        </button>
      </div>

      <div
        className="mt-6 p-4 border-[2px] text-xs font-mono-brutal"
        style={{ borderColor: 'rgba(255,253,240,0.1)', opacity: 0.5 }}
      >
        Theme settings are saved to Supabase and synced via localStorage.
        Changes apply immediately on this device.
      </div>
    </div>
  )
}



// ============================================================
// SHARED COMPONENT
// ============================================================


function AdminSectionHeader({
  title,
  icon,
  inline = false,
}: {
  title: string
  icon: React.ReactNode
  inline?: boolean
}) {
  if (inline) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-[var(--brutal-accent)]" aria-hidden="true">{icon}</span>
        <h2 className="font-bold text-lg uppercase tracking-wide">{title}</h2>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[var(--brutal-accent)]" aria-hidden="true">{icon}</span>
      <h2 className="font-bold text-lg uppercase tracking-wide">{title}</h2>
      <div className="flex-1 h-[2px]" style={{ background: 'rgba(255,253,240,0.1)' }} aria-hidden="true" />
    </div>
  )
}
