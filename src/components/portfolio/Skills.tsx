'use client'

import type { Skill } from '@/lib/types'

interface SkillsProps {
  skills: Skill[]
}

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  automation: 'Automation',
  tools: 'Tools & DevOps',
  general: 'General',
}

const CATEGORY_COLORS: Record<string, string> = {
  frontend: 'var(--brutal-accent)',
  backend: 'var(--brutal-accent-secondary)',
  automation: '#ff3b3b',
  tools: '#a855f7',
  general: 'var(--brutal-bg)',
}

export default function Skills({ skills }: SkillsProps) {
  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  const categories = Object.keys(grouped)

  return (
    <section
      id="skills"
      className="brutal-section"
      style={{ background: 'var(--brutal-text)', color: 'var(--brutal-bg)' }}
      aria-labelledby="skills-heading"
    >
      <div className="brutal-container">
        {/* Section header */}
        <div className="flex items-end gap-4 mb-12">
          <h2
            id="skills-heading"
            className="brutal-section-title"
            style={{ color: 'var(--brutal-bg)' }}
          >
            Skills
          </h2>
          <div
            className="flex-1 h-[4px] mb-2 hidden md:block"
            style={{ background: 'var(--brutal-bg)' }}
            aria-hidden="true"
          />
          <span
            className="font-mono-brutal text-xs font-bold uppercase tracking-widest mb-2 hidden md:block"
            style={{ color: 'var(--brutal-bg)', opacity: 0.4 }}
          >
            02
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16 opacity-40">
            <p className="font-mono-brutal text-sm">No skills added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat} aria-label={`${CATEGORY_LABELS[cat] || cat} skills`}>
                {/* Category header */}
                <div
                  className="px-3 py-2 mb-3 inline-block"
                  style={{
                    background: CATEGORY_COLORS[cat] || 'var(--brutal-accent)',
                    border: '2px solid var(--brutal-bg)',
                    color: cat === 'general' ? 'var(--brutal-text)' : 'var(--brutal-text)',
                    boxShadow: '3px 3px 0px rgba(255,253,240,0.3)',
                  }}
                >
                  <span className="font-bold text-xs uppercase tracking-widest">
                    {CATEGORY_LABELS[cat] || cat}
                  </span>
                </div>

                {/* Skills list */}
                <div className="flex flex-col gap-2">
                  {grouped[cat].map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-3 px-4 py-3 font-bold"
                      style={{
                        border: '2px solid rgba(255,253,240,0.2)',
                        background: 'rgba(255,253,240,0.05)',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = CATEGORY_COLORS[cat] || 'var(--brutal-accent)'
                        e.currentTarget.style.color = 'var(--brutal-text)'
                        e.currentTarget.style.transform = 'translate(-2px, -2px)'
                        e.currentTarget.style.boxShadow = '4px 4px 0px rgba(255,253,240,0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,253,240,0.05)'
                        e.currentTarget.style.color = 'var(--brutal-bg)'
                        e.currentTarget.style.transform = 'translate(0, 0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <span
                        className="w-2 h-2 flex-shrink-0"
                        style={{ background: CATEGORY_COLORS[cat] || 'var(--brutal-accent)' }}
                        aria-hidden="true"
                      />
                      <span className="font-mono-brutal text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Marquee strip */}
        <div
          className="mt-16 py-4 overflow-hidden border-t-[3px] border-b-[3px]"
          style={{ borderColor: 'rgba(255,253,240,0.2)' }}
          aria-hidden="true"
        >
          <div
            className="flex gap-8 font-mono-brutal text-xs font-bold uppercase tracking-widest opacity-30 whitespace-nowrap"
            style={{
              animation: 'scroll-marquee 20s linear infinite',
            }}
          >
            {(['Web Development', 'Python', 'Telegram Bots', 'Automation', 'Linux & VPS', 'Git & GitHub', 'API Integration', 'HTML CSS JS', 'Web Development', 'Python', 'Telegram Bots', 'Automation', 'Linux & VPS', 'Git & GitHub', 'API Integration', 'HTML CSS JS']).map((item, i) => (
              <span key={i} className="flex-shrink-0">
                {item} &nbsp;·
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
