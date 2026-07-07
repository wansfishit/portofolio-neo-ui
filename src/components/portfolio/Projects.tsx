'use client'

import { useState, useEffect } from 'react'
import { GithubLogo, ArrowSquareOut, Star, GitFork } from '@phosphor-icons/react/dist/ssr'
import type { Project } from '@/lib/types'

interface ProjectsProps {
  projects?: Project[] // Made optional to prevent breaking parent calls
}

interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
}

export default function Projects({}: ProjectsProps) {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAllRepos, setShowAllRepos] = useState(false)

  useEffect(() => {
    async function fetchRepos() {
      try {
        // Fetch up to 30 repos to make "View All" instant and rate-limit safe
        const res = await fetch('https://api.github.com/users/wansfishit/repos?sort=updated&per_page=30')
        if (!res.ok) throw new Error('Failed to fetch repositories')
        const data = (await res.json()) as GithubRepo[]
        setRepos(data)
      } catch (err: any) {
        setError(err.message || 'Error fetching data')
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  return (
    <section id="projects" className="brutal-section" aria-labelledby="projects-heading">
      <div className="brutal-container">
        {/* Section header */}
        <div className="flex items-end gap-4 mb-12">
          <h2 id="projects-heading" className="brutal-section-title mb-0">
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

        {/* Live GitHub Feed Loader / Renderer */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-10 h-10 border-[4px] border-t-transparent animate-spin"
              style={{ borderColor: 'var(--brutal-text) var(--brutal-text) transparent transparent' }}
            />
            <span className="font-mono-brutal text-xs opacity-60">Syncing live repositories from GitHub...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16 border-[3px] border-[#ff5f57] bg-[rgba(255,95,87,0.03)] p-6 brutal-card">
            <p className="font-bold text-sm text-[#ff5f57] mb-2">Error Loading Live Feed</p>
            <p className="font-mono-brutal text-xs opacity-60">Please check your internet connection or try again later.</p>
          </div>
        ) : (
          <div className="brutal-animate-in">
            {/* Repos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(showAllRepos ? repos : repos.slice(0, 6)).map((repo) => (
                <article
                  key={repo.id}
                  className="brutal-card p-6 flex flex-col h-full justify-between group"
                  aria-label={`GitHub repo: ${repo.name}`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <GithubLogo size={16} weight="bold" className="opacity-75" />
                      <h3 className="font-bold text-base md:text-lg uppercase truncate leading-none" title={repo.name}>
                        {repo.name}
                      </h3>
                    </div>
                    
                    <p className="text-sm opacity-70 leading-relaxed mb-6 line-clamp-3 min-h-[60px]">
                      {repo.description || 'No description provided for this repository.'}
                    </p>
                  </div>

                  <div>
                    {/* Stats row */}
                    <div className="flex items-center gap-4 text-xs font-mono-brutal opacity-60 mb-5 pt-3 border-t border-[rgba(0,0,0,0.05)]">
                      {repo.language && (
                        <span className="brutal-tag text-[9px] px-1.5 py-0.5" style={{ background: 'var(--brutal-accent)', color: 'var(--brutal-text)' }}>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Star size={13} weight="fill" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GitFork size={13} weight="bold" />
                        {repo.forks_count}
                      </span>
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-btn brutal-btn-sm py-1.5 px-3 flex items-center justify-center gap-1.5 text-xs font-mono-brutal w-full"
                    >
                      <ArrowSquareOut size={14} weight="bold" />
                      View Repository
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* High-contrast View All button */}
            {repos.length > 6 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowAllRepos(!showAllRepos)}
                  className="brutal-btn font-mono-brutal text-xs font-bold uppercase hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  style={{
                    background: 'var(--brutal-accent)',
                    color: 'var(--brutal-text)',
                    border: '3px solid var(--brutal-border)',
                    boxShadow: '3px 3px 0px var(--brutal-border)',
                  }}
                  id="projects-view-all-btn"
                >
                  {showAllRepos ? 'Collapse Repositories ▲' : 'View All Repositories ▼'}
                </button>
              </div>
            )}
          </div>
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
