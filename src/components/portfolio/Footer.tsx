import { GithubLogo, Heart } from '@phosphor-icons/react/dist/ssr'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="border-t-[4px] border-[var(--brutal-border)] py-8"
      style={{ background: 'var(--brutal-text)', color: 'var(--brutal-bg)' }}
      aria-label="Site footer"
    >
      <div className="brutal-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono-brutal text-sm opacity-70">
          <span>© {currentYear} Erwansyah.</span>
          <span className="opacity-40">·</span>
          <span className="flex items-center gap-1">
            Built with <Heart size={14} weight="fill" className="text-[var(--brutal-accent-danger)]" aria-hidden="true" /> & Next.js
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/wansfishit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono-brutal text-sm font-bold hover:text-[var(--brutal-accent)] transition-colors"
            aria-label="GitHub profile"
          >
            <GithubLogo size={16} weight="bold" />
            @wansfishit
          </a>
        </div>
      </div>
    </footer>
  )
}
