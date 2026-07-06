'use client'

import { useState } from 'react'
import { ArrowRight, GithubLogo, EnvelopeSimple, MapPin, Printer, GameController, WhatsappLogo, TelegramLogo, InstagramLogo } from '@phosphor-icons/react'
import type { Profile } from '@/lib/types'
import TerminalGames from './TerminalGames'

interface HeroProps {
  profile: Profile | null
}

export default function Hero({ profile }: HeroProps) {
  const name = profile?.name || 'Erwansyah'
  const role = profile?.role || 'Web Developer / Bot Developer / Automation Builder'
  const location = profile?.location || 'Dabo Singkep, Indonesia'
  const github = profile?.github || 'https://github.com/wansfishit'
  const email = profile?.email || 'pereman0813@gmail.com'
  const whatsapp = profile?.whatsapp || '081378821654'
  const telegram = profile?.telegram || '@listnoo'
  const instagram = profile?.instagram || '@r1stno'

  const [playMode, setPlayMode] = useState(false)

  const handlePrintCV = () => {
    window.print()
  }

  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,10,10,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="brutal-container relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left: Content ── */}
          <div className="brutal-animate-in">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 brutal-border-box px-3 py-1.5 mb-6 bg-[var(--brutal-accent)]">
              <span className="w-2 h-2 rounded-full bg-[var(--brutal-text)] animate-pulse" aria-hidden="true" />
              <span className="font-mono-brutal text-xs font-bold uppercase tracking-widest text-[var(--brutal-text)]">
                Available for Work
              </span>
            </div>

            {/* Name */}
            <h1 className="brutal-section-title mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}>
              {name}
            </h1>

            {/* Role */}
            <p className="font-mono-brutal text-base md:text-lg font-bold text-[var(--brutal-text)] mb-2 opacity-70 uppercase tracking-wider">
              {role}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 mb-8 text-sm font-semibold opacity-60">
              <MapPin size={16} weight="bold" />
              <span>{location}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#projects" className="brutal-btn brutal-btn-lg" id="hero-view-work-btn">
                View Work
                <ArrowRight size={18} weight="bold" />
              </a>
              <a href="#contact" className="brutal-btn brutal-btn-outline brutal-btn-lg" id="hero-contact-btn">
                Contact Me
              </a>
              <button
                onClick={handlePrintCV}
                className="brutal-btn brutal-btn-dark brutal-btn-lg no-print"
                id="hero-cv-btn"
              >
                <Printer size={18} weight="bold" />
                Export CV
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold text-xs font-mono-brutal hover:text-[var(--brutal-accent)] transition-colors"
                id="hero-github-link"
              >
                <GithubLogo size={18} weight="bold" />
                @{github.split('/').pop() || 'wansfishit'}
              </a>
              <span className="opacity-30 font-bold">|</span>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 font-bold text-xs font-mono-brutal hover:text-[var(--brutal-accent)] transition-colors"
                id="hero-email-link"
              >
                <EnvelopeSimple size={18} weight="bold" />
                {email}
              </a>
              <span className="opacity-30 font-bold">|</span>
              <a
                href={whatsapp.startsWith('0') ? 'https://wa.me/62' + whatsapp.slice(1) : 'https://wa.me/' + whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold text-xs font-mono-brutal hover:text-[var(--brutal-accent)] transition-colors"
                id="hero-wa-link"
              >
                <WhatsappLogo size={18} weight="bold" />
                {whatsapp}
              </a>
              <span className="opacity-30 font-bold">|</span>
              <a
                href={`https://t.me/${telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold text-xs font-mono-brutal hover:text-[var(--brutal-accent)] transition-colors"
                id="hero-telegram-link"
              >
                <TelegramLogo size={18} weight="bold" />
                {telegram}
              </a>
              <span className="opacity-30 font-bold">|</span>
              <a
                href={`https://instagram.com/${instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold text-xs font-mono-brutal hover:text-[var(--brutal-accent)] transition-colors"
                id="hero-instagram-link"
              >
                <InstagramLogo size={18} weight="bold" />
                {instagram}
              </a>
            </div>
          </div>

          {/* ── Right: Terminal code block ── */}
          <div
            className="overflow-hidden"
            style={{
              border: '3px solid #0a0a0a',
              boxShadow: '10px 10px 0px #0a0a0a',
            }}
            aria-label="Developer profile terminal"
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: '#111111', borderBottom: '2px solid #2a2a2a' }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} aria-hidden="true" />
              <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} aria-hidden="true" />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} aria-hidden="true" />
              <span className="ml-3 font-mono-brutal text-xs" style={{ color: '#777777' }}>
                ~/erwansyah/profile.json
              </span>
            </div>

            {/* Code body */}
            <div
              className="p-5 font-mono-brutal text-sm"
              style={{ background: '#1e1e1e', minHeight: '380px' }}
            >
              {playMode ? (
                <TerminalGames onClose={() => setPlayMode(false)} />
              ) : (
                <div className="flex flex-col justify-between h-full" style={{ minHeight: '380px' }}>
                  <div style={{ lineHeight: '1.9' }}>
                    {/* comment */}
                    <div style={{ color: '#6a9955' }}>{'// developer profile'}</div>
                    {/* opening */}
                    <div style={{ color: '#ffd700' }}>{'{'}</div>

                    {/* name */}
                    <div className="pl-5">
                      <span style={{ color: '#9cdcfe' }}>&quot;name&quot;</span>
                      <span style={{ color: '#d4d4d4' }}>: </span>
                      <span style={{ color: '#ce9178' }}>&quot;{name}&quot;</span>
                      <span style={{ color: '#4a4a4a' }}>,</span>
                    </div>

                    {/* role */}
                    <div className="pl-5">
                      <span style={{ color: '#9cdcfe' }}>&quot;role&quot;</span>
                      <span style={{ color: '#d4d4d4' }}>: [</span>
                    </div>
                    <div className="pl-10">
                      <span style={{ color: '#ce9178' }}>&quot;Web Developer&quot;</span>
                      <span style={{ color: '#4a4a4a' }}>,</span>
                    </div>
                    <div className="pl-10">
                      <span style={{ color: '#ce9178' }}>&quot;Bot Developer&quot;</span>
                      <span style={{ color: '#4a4a4a' }}>,</span>
                    </div>
                    <div className="pl-10">
                      <span style={{ color: '#ce9178' }}>&quot;Automation Builder&quot;</span>
                    </div>
                    <div className="pl-5">
                      <span style={{ color: '#d4d4d4' }}>]</span>
                      <span style={{ color: '#4a4a4a' }}>,</span>
                    </div>

                    {/* location */}
                    <div className="pl-5">
                      <span style={{ color: '#9cdcfe' }}>&quot;location&quot;</span>
                      <span style={{ color: '#d4d4d4' }}>: </span>
                      <span style={{ color: '#ce9178' }}>&quot;{location}&quot;</span>
                      <span style={{ color: '#4a4a4a' }}>,</span>
                    </div>

                    {/* status */}
                    <div className="pl-5">
                      <span style={{ color: '#9cdcfe' }}>&quot;status&quot;</span>
                      <span style={{ color: '#d4d4d4' }}>: </span>
                      <span style={{ color: '#f5e642' }}>&quot;SMKN 1 Singkep — Kelas 3 DKV&quot;</span>
                      <span style={{ color: '#4a4a4a' }}>,</span>
                    </div>

                    {/* focus */}
                    <div className="pl-5">
                      <span style={{ color: '#9cdcfe' }}>&quot;focus&quot;</span>
                      <span style={{ color: '#d4d4d4' }}>: [</span>
                    </div>
                    <div className="pl-10">
                      <span style={{ color: '#ce9178' }}>&quot;Web Development&quot;</span>
                      <span style={{ color: '#4a4a4a' }}>,</span>
                    </div>
                    <div className="pl-10">
                      <span style={{ color: '#ce9178' }}>&quot;Telegram Bots&quot;</span>
                      <span style={{ color: '#4a4a4a' }}>,</span>
                    </div>
                    <div className="pl-10">
                      <span style={{ color: '#ce9178' }}>&quot;Automation&quot;</span>
                    </div>
                    <div className="pl-5">
                      <span style={{ color: '#d4d4d4' }}>]</span>
                    </div>

                    {/* closing */}
                    <div style={{ color: '#ffd700' }}>{'}'}</div>
                  </div>

                  {/* prompt & play game button */}
                  <div className="mt-4 pt-3 border-t border-[#2a2a2a] flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <span style={{ color: '#777777' }}>$</span>
                      <span
                        className="inline-block w-2 h-[1em]"
                        style={{
                          background: '#f5e642',
                          animation: 'brutal-blink 1s step-end infinite',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    
                    <button
                      onClick={() => setPlayMode(true)}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold font-mono-brutal transition-all"
                      style={{
                        border: '2px solid #f5e642',
                        color: '#f5e642',
                        background: 'transparent',
                        cursor: 'pointer'
                      }}
                      id="terminal-play-game-btn"
                    >
                      <GameController size={14} weight="bold" />
                      PLAY GAMES
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 no-print"
        aria-hidden="true"
      >
        <span className="font-mono-brutal text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[2px] h-12 bg-[var(--brutal-text)]" />
      </div>
    </section>
  )
}

