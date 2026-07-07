'use client'

import { useState } from 'react'
import { EnvelopeSimple, GithubLogo, MapPin, PaperPlaneTilt, WhatsappLogo, TelegramLogo, InstagramLogo } from '@phosphor-icons/react/dist/ssr'
import type { Profile } from '@/lib/types'

interface ContactProps {
  profile: Profile | null
}

export default function Contact({ profile }: ContactProps) {
  const email = profile?.email || 'pereman0813@gmail.com'
  const github = profile?.github || 'https://github.com/wansfishit'
  const location = profile?.location || 'Dabo Singkep, Indonesia'
  const whatsapp = profile?.whatsapp || '081378821654'
  const telegram = profile?.telegram || '@listnoo'
  const instagram = profile?.instagram || '@r1stno'

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // mailto fallback — no backend needed
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.open(`mailto:${email}?subject=${subject}&body=${body}`)
    setStatus('sent')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section
      id="contact"
      className="brutal-section"
      style={{ background: 'var(--brutal-bg)' }}
      aria-labelledby="contact-heading"
    >
      <div className="brutal-container">
        {/* Section header */}
        <div className="flex items-end gap-4 mb-12">
          <h2 id="contact-heading" className="brutal-section-title">
            Contact
          </h2>
          <div
            className="flex-1 h-[4px] bg-[var(--brutal-text)] mb-2 hidden md:block"
            aria-hidden="true"
          />
          <span className="font-mono-brutal text-xs font-bold uppercase tracking-widest opacity-40 mb-2 hidden md:block">
            04
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: contact info */}
          <div>
            <div
              className="brutal-card p-6 mb-6"
              style={{ background: 'var(--brutal-accent)' }}
            >
              <p className="font-bold text-lg leading-relaxed">
                Punya project seru atau mau kolaborasi? <br />
                Hit me up — gue selalu open!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${email}`}
                className="brutal-card p-4 flex items-center gap-4 hover:bg-[var(--brutal-accent)] transition-colors group"
                id="contact-email-link"
                aria-label="Send email"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-[3px] border-[var(--brutal-border)]"
                  aria-hidden="true"
                >
                  <EnvelopeSimple size={20} weight="bold" />
                </div>
                <div>
                  <p className="font-mono-brutal text-[10px] uppercase tracking-widest opacity-40 mb-0.5">
                    Email
                  </p>
                  <p className="font-bold text-xs truncate max-w-[150px]">{email}</p>
                </div>
              </a>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-card p-4 flex items-center gap-4 hover:bg-[var(--brutal-accent)] transition-colors"
                id="contact-github-link"
                aria-label="GitHub profile"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-[3px] border-[var(--brutal-border)]"
                  aria-hidden="true"
                >
                  <GithubLogo size={20} weight="bold" />
                </div>
                <div>
                  <p className="font-mono-brutal text-[10px] uppercase tracking-widest opacity-40 mb-0.5">
                    GitHub
                  </p>
                  <p className="font-bold text-sm">@{github.split('/').pop() || 'wansfishit'}</p>
                </div>
              </a>

              <a
                href={whatsapp.startsWith('0') ? 'https://wa.me/62' + whatsapp.slice(1) : 'https://wa.me/' + whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-card p-4 flex items-center gap-4 hover:bg-[var(--brutal-accent)] transition-colors"
                id="contact-wa-link"
                aria-label="WhatsApp contact"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-[3px] border-[var(--brutal-border)]"
                  aria-hidden="true"
                >
                  <WhatsappLogo size={20} weight="bold" />
                </div>
                <div>
                  <p className="font-mono-brutal text-[10px] uppercase tracking-widest opacity-40 mb-0.5">
                    WhatsApp
                  </p>
                  <p className="font-bold text-sm">{whatsapp}</p>
                </div>
              </a>

              <a
                href={`https://t.me/${telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-card p-4 flex items-center gap-4 hover:bg-[var(--brutal-accent)] transition-colors"
                id="contact-telegram-link"
                aria-label="Telegram username"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-[3px] border-[var(--brutal-border)]"
                  aria-hidden="true"
                >
                  <TelegramLogo size={20} weight="bold" />
                </div>
                <div>
                  <p className="font-mono-brutal text-[10px] uppercase tracking-widest opacity-40 mb-0.5">
                    Telegram
                  </p>
                  <p className="font-bold text-sm">{telegram}</p>
                </div>
              </a>

              <a
                href={`https://instagram.com/${instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-card p-4 flex items-center gap-4 hover:bg-[var(--brutal-accent)] transition-colors"
                id="contact-instagram-link"
                aria-label="Instagram profile"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-[3px] border-[var(--brutal-border)]"
                  aria-hidden="true"
                >
                  <InstagramLogo size={20} weight="bold" />
                </div>
                <div>
                  <p className="font-mono-brutal text-[10px] uppercase tracking-widest opacity-40 mb-0.5">
                    Instagram
                  </p>
                  <p className="font-bold text-sm">{instagram}</p>
                </div>
              </a>

              <div className="brutal-card p-4 flex items-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-[3px] border-[var(--brutal-border)]"
                  aria-hidden="true"
                >
                  <MapPin size={20} weight="bold" />
                </div>
                <div>
                  <p className="font-mono-brutal text-[10px] uppercase tracking-widest opacity-40 mb-0.5">
                    Location
                  </p>
                  <p className="font-bold text-xs">{location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="brutal-card p-6 md:p-8 flex flex-col gap-5"
              id="contact-form"
              aria-label="Contact form"
            >
              <div>
                <label htmlFor="contact-name" className="brutal-label">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="brutal-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="brutal-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="brutal-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="brutal-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  placeholder="Describe your project or question..."
                  className="brutal-textarea"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className="brutal-btn brutal-btn-lg w-full justify-center"
                disabled={status === 'sending'}
                id="contact-submit-btn"
                aria-label="Send message"
              >
                {status === 'sent' ? (
                  'Message Opened! ✓'
                ) : (
                  <>
                    <PaperPlaneTilt size={18} weight="bold" />
                    Send Message
                  </>
                )}
              </button>

              <p className="font-mono-brutal text-[10px] opacity-40 text-center">
                Opens your email client with the message pre-filled.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
