'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Lock, EnvelopeSimple, Eye, EyeSlash, Warning } from '@phosphor-icons/react/dist/ssr'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center p-4"
      style={{
        background: 'var(--brutal-text)',
        backgroundImage:
          'linear-gradient(rgba(255,253,240,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,253,240,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="w-full max-w-sm brutal-animate-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 mb-4 border-[3px] border-[var(--brutal-accent)]"
            style={{ background: 'var(--brutal-accent)', boxShadow: '5px 5px 0px rgba(255,253,240,0.3)' }}
            aria-hidden="true"
          >
            <Lock size={28} weight="bold" className="text-[var(--brutal-text)]" />
          </div>
          <h1
            className="brutal-section-title text-[var(--brutal-bg)]"
            style={{ fontSize: '2rem' }}
          >
            Admin Panel
          </h1>
          <p className="font-mono-brutal text-xs text-[var(--brutal-bg)] opacity-40 mt-2 uppercase tracking-widest">
            Erwansyah Portfolio CMS
          </p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleLogin}
          className="p-6 md:p-8 border-[3px] flex flex-col gap-5"
          style={{
            background: 'var(--brutal-bg)',
            borderColor: 'var(--brutal-accent)',
            boxShadow: '8px 8px 0px var(--brutal-accent)',
          }}
          id="admin-login-form"
          aria-label="Admin login form"
        >
          {/* Error alert */}
          {error && (
            <div
              className="flex items-center gap-2 p-3 border-[3px] border-[var(--brutal-accent-danger)] font-bold text-sm"
              style={{ background: 'rgba(255,59,59,0.1)' }}
              role="alert"
            >
              <Warning size={18} weight="bold" className="text-[var(--brutal-accent-danger)] flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="brutal-label">
              Email
            </label>
            <div className="relative">
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                className="brutal-input pr-10"
                autoComplete="email"
                aria-required="true"
              />
              <EnvelopeSimple
                size={18}
                weight="bold"
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40"
                aria-hidden="true"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="brutal-label">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="brutal-input pr-10"
                autoComplete="current-password"
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeSlash size={18} weight="bold" />
                ) : (
                  <Eye size={18} weight="bold" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="brutal-btn brutal-btn-lg w-full justify-center mt-2"
            id="admin-login-btn"
            aria-label="Sign in to admin panel"
          >
            {loading ? (
              <span className="font-mono-brutal">Signing in...</span>
            ) : (
              <>
                <Lock size={18} weight="bold" />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-4 font-mono-brutal text-xs opacity-30 text-[var(--brutal-bg)]">
          <a href="/" className="hover:opacity-60 transition-opacity">
            ← Back to portfolio
          </a>
        </p>
      </div>
    </div>
  )
}
