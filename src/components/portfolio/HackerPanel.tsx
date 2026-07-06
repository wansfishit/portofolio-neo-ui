'use client'

import { useEffect, useRef, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────

type AnimMode = 'scramble' | 'typewriter' | 'matrix' | 'ascii' | 'combined'

interface HackerPanelProps {
  mode?: AnimMode
}

// ── ASCII Art Frames ───────────────────────────────────────────

const ASCII_FRAMES = [
  // Frame 1: simple face
  [
    '  ██████████  ',
    '█▓          ▓█',
    '█  ●      ●  █',
    '█            █',
    '█  ▄██████▄  █',
    '█▓          ▓█',
    '  ██████████  ',
  ],
  // Frame 2: wink
  [
    '  ██████████  ',
    '█▓          ▓█',
    '█  ●      —  █',
    '█            █',
    '█  ▄██████▄  █',
    '█▓          ▓█',
    '  ██████████  ',
  ],
  // Frame 3: thinking
  [
    '  ██████████  ',
    '█▓          ▓█',
    '█  ◉      ◉  █',
    '█      ▲     █',
    '█    ▄███▄   █',
    '█▓          ▓█',
    '  ██████████  ',
  ],
]

const SCRAMBLE_CHARS = '!@#$%^&*<>?/\\|[]{}=+-_~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'

const TYPEWRITER_LINES = [
  '> initializing portfolio...',
  '> loading skills...',
  '> status: SMKN 1 Singkep',
  '> role: Web Developer',
  '> role: Bot Developer',
  '> role: Automation Builder',
  '> stack: HTML CSS JS Python',
  '> location: Dabo Singkep',
  '> github: @wansfishit',
  '> status: AVAILABLE ✓',
  '> ready. awaiting input_',
]

// ── Scramble Text Hook ─────────────────────────────────────────

function useScramble(target: string, delay = 0) {
  const [text, setText] = useState('')
  useEffect(() => {
    let frame = 0
    const maxFrames = target.length * 3
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setText(
          target
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < Math.floor(frame / 3)) return target[i]
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            })
            .join('')
        )
        frame++
        if (frame > maxFrames) clearInterval(interval)
      }, 40)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(t)
  }, [target, delay])
  return text
}

// ── Scramble Panel ─────────────────────────────────────────────

function ScramblePanel() {
  const lines = [
    { text: 'ERWANSYAH', color: '#f5e642', size: '1.4rem' },
    { text: 'WEB DEV', color: '#9cdcfe', size: '1rem' },
    { text: 'BOT BUILDER', color: '#ce9178', size: '1rem' },
    { text: 'AUTOMATION', color: '#28c840', size: '1rem' },
    { text: '@WANSFISHIT', color: '#aaaaaa', size: '0.85rem' },
    { text: 'DABO SINGKEP', color: '#aaaaaa', size: '0.85rem' },
  ]

  return (
    <div className="flex flex-col gap-3 p-2">
      {lines.map((line, i) => (
        <ScrambleLine key={i} target={line.text} color={line.color} size={line.size} delay={i * 200} />
      ))}
      <div className="mt-2 flex items-center gap-2" style={{ color: '#444' }}>
        <span style={{ color: '#777' }}>$</span>
        <span style={{ color: '#f5e642', animation: 'brutal-blink 1s step-end infinite' }}>_</span>
      </div>
    </div>
  )
}

function ScrambleLine({ target, color, size, delay }: { target: string; color: string; size: string; delay: number }) {
  const text = useScramble(target, delay)
  // Loop every 6 seconds
  const [key, setKey] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div key={key} className="font-mono-brutal font-bold tracking-wider" style={{ color, fontSize: size }}>
      {text || target.replace(/./g, '?')}
    </div>
  )
}

// ── Typewriter Panel ───────────────────────────────────────────

function TypewriterPanel() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [displayLines, setDisplayLines] = useState<string[]>([''])

  useEffect(() => {
    let lineIdx = 0
    let charIdx = 0
    const displayed: string[] = ['']

    const interval = setInterval(() => {
      const target = TYPEWRITER_LINES[lineIdx % TYPEWRITER_LINES.length]
      if (charIdx <= target.length) {
        displayed[lineIdx % 8] = target.slice(0, charIdx)
        setDisplayLines([...displayed])
        charIdx++
      } else {
        setTimeout(() => {
          lineIdx++
          charIdx = 0
          if (lineIdx % 8 === 0) {
            displayed.length = 0
            displayed.push('')
          } else {
            displayed.push('')
          }
        }, 600)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-1 p-2 overflow-hidden" style={{ maxHeight: '280px' }}>
      {displayLines.map((line, i) => (
        <div key={i} className="font-mono-brutal text-xs" style={{ color: i === displayLines.length - 1 ? '#f5e642' : '#6a9955' }}>
          {line}
          {i === displayLines.length - 1 && (
            <span style={{ animation: 'brutal-blink 0.7s step-end infinite' }}>▋</span>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Matrix Panel ───────────────────────────────────────────────

function MatrixPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const cols = Math.floor(canvas.width / 14)
    const drops = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(30, 30, 30, 0.07)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '13px JetBrains Mono, monospace'

      drops.forEach((y, i) => {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        const x = i * 14

        // Head char — bright yellow
        ctx.fillStyle = '#f5e642'
        ctx.fillText(char, x, y * 14)

        // Trail chars — green
        if (y > 1) {
          ctx.fillStyle = '#00c2a8'
          ctx.fillText(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)], x, (y - 1) * 14)
        }
        if (y > 2) {
          ctx.fillStyle = 'rgba(0,194,168,0.4)'
          ctx.fillText(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)], x, (y - 2) * 14)
        }

        if (y * 14 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
    }

    const id = setInterval(draw, 55)
    return () => clearInterval(id)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block', minHeight: '280px' }}
      aria-hidden="true"
    />
  )
}

// ── ASCII Panel ────────────────────────────────────────────────

function AsciiPanel() {
  const [frameIdx, setFrameIdx] = useState(0)
  const [glitchLine, setGlitchLine] = useState(-1)

  useEffect(() => {
    const id = setInterval(() => {
      setFrameIdx((f) => (f + 1) % ASCII_FRAMES.length)
      setGlitchLine(Math.floor(Math.random() * 7))
      setTimeout(() => setGlitchLine(-1), 120)
    }, 1800)
    return () => clearInterval(id)
  }, [])

  const frame = ASCII_FRAMES[frameIdx]

  return (
    <div className="flex flex-col items-center justify-center gap-1 p-3">
      {/* ASCII face */}
      <div className="font-mono-brutal text-sm leading-tight mb-4">
        {frame.map((line, i) => (
          <div
            key={i}
            style={{
              color: i === glitchLine ? '#ff3b3b' : '#f5e642',
              letterSpacing: '0.05em',
              textShadow: i === glitchLine ? '2px 0 #ff3b3b, -2px 0 #00c2a8' : 'none',
              transition: 'none',
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Info below art */}
      <div className="text-center font-mono-brutal" style={{ color: '#9cdcfe', fontSize: '0.7rem' }}>
        <div style={{ color: '#6a9955' }}>// ERWANSYAH.EXE</div>
        <div>STATUS: <span style={{ color: '#28c840' }}>ONLINE</span></div>
        <div>ROLE: <span style={{ color: '#ce9178' }}>DEVELOPER</span></div>
        <div style={{ color: '#f5e642', animation: 'brutal-blink 1s step-end infinite' }}>
          READY_
        </div>
      </div>
    </div>
  )
}

// ── Combined Panel ─────────────────────────────────────────────

function CombinedPanel() {
  const [phase, setPhase] = useState<'matrix' | 'ascii' | 'scramble'>('matrix')

  useEffect(() => {
    const phases: Array<'matrix' | 'ascii' | 'scramble'> = ['matrix', 'ascii', 'scramble']
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % phases.length
      setPhase(phases[i])
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full h-full" style={{ minHeight: '280px' }}>
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: phase === 'matrix' ? 1 : 0 }}
      >
        <MatrixPanel />
      </div>
      <div
        className="absolute inset-0 transition-opacity duration-700 flex items-center justify-center"
        style={{ opacity: phase === 'ascii' ? 1 : 0 }}
      >
        <AsciiPanel />
      </div>
      <div
        className="absolute inset-0 transition-opacity duration-700 flex items-center justify-center p-4"
        style={{ opacity: phase === 'scramble' ? 1 : 0 }}
      >
        <ScramblePanel />
      </div>
    </div>
  )
}

// ── Main HackerPanel ───────────────────────────────────────────

export default function HackerPanel({ mode = 'combined' }: HackerPanelProps) {
  const MODE_LABELS: Record<AnimMode, string> = {
    scramble: 'SCRAMBLE.EXE',
    typewriter: 'TYPEWRITER.EXE',
    matrix: 'MATRIX.EXE',
    ascii: 'ASCII.EXE',
    combined: 'HACKER.EXE',
  }

  return (
    <div
      className="overflow-hidden flex flex-col"
      style={{
        border: '3px solid #0a0a0a',
        boxShadow: '10px 10px 0px #0a0a0a',
        background: '#1e1e1e',
      }}
      aria-label="Hacker animation panel"
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
        style={{ background: '#111111', borderBottom: '2px solid #2a2a2a' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} aria-hidden="true" />
        <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} aria-hidden="true" />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} aria-hidden="true" />
        <span className="ml-3 font-mono-brutal text-xs" style={{ color: '#777777' }}>
          {MODE_LABELS[mode]}
        </span>
        <span
          className="ml-auto font-mono-brutal text-[10px] px-2 py-0.5"
          style={{ color: '#28c840', border: '1px solid #28c840', letterSpacing: '0.1em' }}
        >
          LIVE
        </span>
      </div>

      {/* Content */}
      <div className="flex-1" style={{ minHeight: '280px' }}>
        {mode === 'scramble' && <div className="h-full flex items-center p-4"><ScramblePanel /></div>}
        {mode === 'typewriter' && <div className="h-full flex items-start p-2 pt-4"><TypewriterPanel /></div>}
        {mode === 'matrix' && <MatrixPanel />}
        {mode === 'ascii' && <div className="h-full flex items-center justify-center"><AsciiPanel /></div>}
        {mode === 'combined' && <CombinedPanel />}
      </div>
    </div>
  )
}
