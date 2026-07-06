import { Student, Code, Robot, Lightning } from '@phosphor-icons/react/dist/ssr'
import type { Profile } from '@/lib/types'

interface AboutProps {
  profile: Profile | null
}

export default function About({ profile }: AboutProps) {
  const about =
    profile?.about ||
    'Seorang developer muda dari Dabo Singkep, Indonesia. Siswa kelas 3 SMK di SMKN 1 Singkep jurusan DKV yang passionate di dunia web development, bot Telegram, dan automation.'

  const stats = [
    { icon: Student, label: 'Status', value: 'SMKN 1 Singkep', sub: 'Kelas 3 DKV' },
    { icon: Code, label: 'Focus', value: 'Web Dev', sub: '+ Bot + Automation' },
    { icon: Robot, label: 'Specialty', value: 'AI Smart Bots', sub: 'LLM & OpenAI API' },
    { icon: Lightning, label: 'Approach', value: 'Automate', sub: 'Everything Possible' },
  ]

  return (
    <section id="about" className="brutal-section" aria-labelledby="about-heading">
      <div className="brutal-container">
        {/* Section header */}
        <div className="flex items-end gap-4 mb-12">
          <h2 id="about-heading" className="brutal-section-title">
            About Me
          </h2>
          <div
            className="flex-1 h-[4px] bg-[var(--brutal-text)] mb-2 hidden md:block"
            aria-hidden="true"
          />
          <span className="font-mono-brutal text-xs font-bold uppercase tracking-widest opacity-40 mb-2 hidden md:block">
            01
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: about text */}
          <div>
            <div
              className="brutal-card p-6 md:p-8 mb-6"
              style={{ background: 'var(--brutal-accent)' }}
            >
              <p className="text-base md:text-lg font-semibold leading-relaxed text-[var(--brutal-text)]">
                {about}
              </p>
            </div>

            <div className="brutal-card p-6">
              <p className="font-mono-brutal text-xs font-bold uppercase tracking-widest opacity-50 mb-3">
                Education
              </p>
              <p className="font-bold text-lg">SMKN 1 Singkep</p>
              <p className="opacity-70 text-sm mt-1">
                Jurusan Desain Komunikasi Visual (DKV) · Kelas 3
              </p>
              <p className="opacity-50 text-xs mt-1 font-mono-brutal">Dabo Singkep, Kepulauan Riau</p>
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={i}
                  className="brutal-card p-5 flex flex-col gap-2"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <Icon size={24} weight="bold" className="text-[var(--brutal-text)] opacity-60" aria-hidden="true" />
                  <div>
                    <p className="font-mono-brutal text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">
                      {stat.label}
                    </p>
                    <p className="font-bold text-base leading-tight">{stat.value}</p>
                    <p className="text-xs opacity-60 mt-0.5">{stat.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
