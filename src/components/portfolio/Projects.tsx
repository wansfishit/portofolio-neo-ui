import { GithubLogo, ArrowSquareOut, Star } from '@phosphor-icons/react/dist/ssr'
import type { Project } from '@/lib/types'

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="brutal-section" aria-labelledby="projects-heading">
      <div className="brutal-container">
        {/* Section header */}
        <div className="flex items-end gap-4 mb-12">
          <h2 id="projects-heading" className="brutal-section-title">
            Projects
          </h2>
          <div
            className="flex-1 h-[4px] bg-[var(--brutal-text)] mb-2 hidden md:block"
            aria-hidden="true"
          />
          <span className="font-mono-brutal text-xs font-bold uppercase tracking-widest opacity-40 mb-2 hidden md:block">
            03
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 opacity-40">
            <p className="font-mono-brutal text-sm">No projects added yet.</p>
          </div>
        ) : (
          <>
            {/* Featured projects */}
            {featured.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {featured.map((project, i) => (
                  <ProjectCard key={project.id} project={project} featured />
                ))}
              </div>
            )}

            {/* Other projects */}
            {others.length > 0 && (
              <>
                <h3 className="font-mono-brutal text-xs font-bold uppercase tracking-widest opacity-40 mb-4 mt-8">
                  Other Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {others.map((project) => (
                    <ProjectCard key={project.id} project={project} featured={false} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* GitHub CTA */}
        <div
          className="mt-12 brutal-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ background: 'var(--brutal-accent)' }}
        >
          <div>
            <p className="font-bold text-lg uppercase tracking-wide">More on GitHub</p>
            <p className="text-sm opacity-70 mt-1">
              Check out all repositories and open source contributions
            </p>
          </div>
          <a
            href="https://github.com/wansfishit"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn brutal-btn-dark flex-shrink-0"
            id="projects-github-btn"
            aria-label="View GitHub profile"
          >
            <GithubLogo size={18} weight="bold" />
            @wansfishit
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <article
      className="brutal-card p-6 flex flex-col h-full group"
      aria-label={`Project: ${project.title}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {featured && (
            <Star
              size={14}
              weight="fill"
              className="text-[var(--brutal-accent)] flex-shrink-0"
              aria-label="Featured project"
            />
          )}
          <h3 className="font-bold text-base md:text-lg uppercase tracking-wide leading-tight">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm opacity-70 leading-relaxed flex-1 mb-6">
        {project.description}
      </p>

      {/* Action links */}
      {(project.github_url || project.live_url) && (
        <div className="flex flex-wrap gap-2.5 mb-6">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn brutal-btn-outline brutal-btn-sm py-1.5 px-3 flex items-center gap-1.5 text-xs font-mono-brutal"
              style={{ padding: '0.4rem 0.8rem', borderColor: 'var(--brutal-border)' }}
            >
              <GithubLogo size={14} weight="bold" />
              Source Code
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn brutal-btn-sm py-1.5 px-3 flex items-center gap-1.5 text-xs font-mono-brutal"
              style={{ padding: '0.4rem 0.8rem' }}
            >
              <ArrowSquareOut size={14} weight="bold" />
              Live Demo
            </a>
          )}
        </div>
      )}

      {/* Tech stack */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-[rgba(0,0,0,0.05)]">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="brutal-tag brutal-tag-accent text-[9px] px-2 py-0.5">
              {tech}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
