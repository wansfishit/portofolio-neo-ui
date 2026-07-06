'use client'

import { useEffect, useState } from 'react'

// Theme manager — reads/writes localStorage and applies CSS data attributes
export function useTheme() {
  const [accent, setAccentState] = useState<string>('yellow')
  const [darkMode, setDarkModeState] = useState<boolean>(false)

  useEffect(() => {
    const savedAccent = localStorage.getItem('brutal_accent') || 'yellow'
    const savedDark = localStorage.getItem('brutal_dark') === 'true'
    setAccentState(savedAccent)
    setDarkModeState(savedDark)
    applyTheme(savedAccent, savedDark)
  }, [])

  const setAccent = (color: string) => {
    setAccentState(color)
    localStorage.setItem('brutal_accent', color)
    applyTheme(color, darkMode)
  }

  const setDarkMode = (dark: boolean) => {
    setDarkModeState(dark)
    localStorage.setItem('brutal_dark', String(dark))
    applyTheme(accent, dark)
  }

  return { accent, darkMode, setAccent, setDarkMode }
}

function applyTheme(accent: string, dark: boolean) {
  const root = document.documentElement
  root.setAttribute('data-accent', accent)
  root.setAttribute('data-theme', dark ? 'dark' : 'light')
}

// ThemeProvider component for portfolio page
export function ThemeInit() {
  useEffect(() => {
    const savedAccent = localStorage.getItem('brutal_accent') || 'yellow'
    const savedDark = localStorage.getItem('brutal_dark') === 'true'
    applyTheme(savedAccent, savedDark)
  }, [])

  return null
}
