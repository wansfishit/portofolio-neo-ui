'use client'

import Link from 'next/link'
import { useState } from 'react'
import { List, X } from '@phosphor-icons/react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="brutal-nav no-print" id="main-nav" aria-label="Main navigation">
      <div className="brutal-container flex items-center justify-between w-full">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono-brutal font-bold text-lg text-[var(--brutal-bg)] tracking-tight hover:text-[var(--brutal-accent)] transition-colors"
          aria-label="Erwansyah — Home"
        >
          &lt;erwan /&gt;
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-[var(--brutal-bg)] hover:bg-[var(--brutal-accent)] hover:text-[var(--brutal-text)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[var(--brutal-bg)] hover:text-[var(--brutal-accent)] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          id="mobile-menu-toggle"
        >
          {menuOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 bg-[var(--brutal-text)] border-b-[3px] border-[var(--brutal-border)] z-50"
          id="mobile-menu"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-6 py-4 text-sm font-bold uppercase tracking-wider text-[var(--brutal-bg)] border-b border-[var(--brutal-bg)] border-opacity-20 hover:bg-[var(--brutal-accent)] hover:text-[var(--brutal-text)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
