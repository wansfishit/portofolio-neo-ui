'use client'

import { useState, useEffect, useRef } from 'react'
import { GameController, ArrowLeft, ArrowUp, ArrowDown, Play } from '@phosphor-icons/react'

type GameType = 'menu' | 'snake' | 'tictactoe' | 'dino' | 'none'

interface TerminalGamesProps {
  onClose: () => void
}

export default function TerminalGames({ onClose }: TerminalGamesProps) {
  const [activeGame, setActiveGame] = useState<GameType>('menu')

  return (
    <div className="h-full flex flex-col justify-between" style={{ minHeight: '380px' }}>
      {activeGame === 'menu' && (
        <GameMenu onSelect={setActiveGame} onClose={onClose} />
      )}
      {activeGame === 'snake' && (
        <SnakeGame onBack={() => setActiveGame('menu')} />
      )}
      {activeGame === 'tictactoe' && (
        <TicTacToeGame onBack={() => setActiveGame('menu')} />
      )}
      {activeGame === 'dino' && (
        <DinoGame onBack={() => setActiveGame('menu')} />
      )}
    </div>
  )
}

// ── GAME MENU ──────────────────────────────────────────────────

function GameMenu({ onSelect, onClose }: { onSelect: (g: GameType) => void; onClose: () => void }) {
  return (
    <div className="flex flex-col justify-between h-full p-4 font-mono-brutal text-sm">
      <div>
        <div style={{ color: '#6a9955' }}>{'// SELECT SYSTEM SIMULATION'}</div>
        <div style={{ color: '#ffd700' }} className="mt-2 font-bold">🎮 GAME MENU:</div>
        
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => onSelect('snake')}
            className="w-full text-left p-3 border-[2px] hover:translate-x-1 hover:-translate-y-1 transition-transform"
            style={{
              borderColor: '#f5e642',
              background: 'rgba(245,230,66,0.05)',
              boxShadow: '4px 4px 0px #f5e642',
              color: '#f5e642'
            }}
          >
            1. 🐍 SNAKE (Ular Retro Neo)
          </button>
          
          <button
            onClick={() => onSelect('tictactoe')}
            className="w-full text-left p-3 border-[2px] hover:translate-x-1 hover:-translate-y-1 transition-transform"
            style={{
              borderColor: '#9cdcfe',
              background: 'rgba(156,220,254,0.05)',
              boxShadow: '4px 4px 0px #9cdcfe',
              color: '#9cdcfe'
            }}
          >
            2. 🤖 TIC-TAC-TOE VS BOT AI
          </button>

          <button
            onClick={() => onSelect('dino')}
            className="w-full text-left p-3 border-[2px] hover:translate-x-1 hover:-translate-y-1 transition-transform"
            style={{
              borderColor: '#28c840',
              background: 'rgba(40,200,64,0.05)',
              boxShadow: '4px 4px 0px #28c840',
              color: '#28c840'
            }}
          >
            3. 🦖 DINO RUN (Chrome Offline Dino)
          </button>
        </div>
      </div>

      <button
        onClick={onClose}
        className="mt-6 flex items-center justify-center gap-2 p-2 border-[2px] text-xs font-bold uppercase transition-all"
        style={{ borderColor: '#ff5f57', color: '#ff5f57', background: 'transparent' }}
      >
        <ArrowLeft size={14} weight="bold" />
        Exit to Profile JSON
      </button>
    </div>
  )
}

// ── SNAKE GAME ─────────────────────────────────────────────────

const GRID_SIZE = 14

function SnakeGame({ onBack }: { onBack: () => void }) {
  const [snake, setSnake] = useState<[number, number][]>([[6, 6], [6, 7]])
  const [food, setFood] = useState<[number, number]>([3, 3])
  const [dir, setDir] = useState<[number, number]>([0, -1])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const directionRef = useRef(dir)

  useEffect(() => {
    directionRef.current = dir
  }, [dir])

  // Move snake logic
  useEffect(() => {
    if (gameOver || !isStarted) return

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0]
        const currentDir = directionRef.current
        const newHead: [number, number] = [
          (head[0] + currentDir[0] + GRID_SIZE) % GRID_SIZE,
          (head[1] + currentDir[1] + GRID_SIZE) % GRID_SIZE,
        ]

        // Self collision check
        if (prevSnake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        // Eat check
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((s) => s + 10)
          // Generate new food
          let newFood: [number, number]
          do {
            newFood = [
              Math.floor(Math.random() * GRID_SIZE),
              Math.floor(Math.random() * GRID_SIZE),
            ]
          } while (newSnake.some(([x, y]) => x === newFood[0] && y === newFood[1]))
          setFood(newFood)
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, 150 - Math.min(score * 2, 80))

    return () => clearInterval(interval)
  }, [food, gameOver, isStarted, score])

  // Key listeners
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isStarted) {
        if (e.key === ' ' || e.key === 'Enter') {
          setIsStarted(true)
          return
        }
      }
      const currentDir = directionRef.current
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDir[1] !== 1) setDir([0, -1])
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDir[1] !== -1) setDir([0, 1])
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDir[0] !== 1) setDir([-1, 0])
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDir[0] !== -1) setDir([1, 0])
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isStarted])

  const handleReset = () => {
    setSnake([[6, 6], [6, 7]])
    setFood([3, 3])
    setDir([0, -1])
    setScore(0)
    setGameOver(false)
    setIsStarted(false)
  }

  // Draw grid
  const cells = []
  for (let y = 0; y < GRID_SIZE; y++) {
    const row = []
    for (let x = 0; x < GRID_SIZE; x++) {
      const isSnake = snake.some(([sx, sy]) => sx === x && sy === y)
      const isHead = snake[0][0] === x && snake[0][1] === y
      const isFood = food[0] === x && food[1] === y

      let char = '·'
      let color = '#444444'

      if (isHead) {
        char = '█'
        color = '#00ff88'
      } else if (isSnake) {
        char = '▒'
        color = '#00cc66'
      } else if (isFood) {
        char = '★'
        color = '#f5e642'
      }

      row.push(
        <span key={x} style={{ color, transition: 'none' }} className="font-mono-brutal text-base leading-none">
          {char}
        </span>
      )
    }
    cells.push(
      <div key={y} className="flex gap-2 justify-center leading-none">
        {row}
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-between h-full p-2 font-mono-brutal text-xs">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b-[2px] border-[#333] pb-2 mb-2">
        <span style={{ color: '#00ff88' }}>🐍 SNAKE GAME</span>
        <span style={{ color: '#f5e642' }}>SCORE: {score}</span>
      </div>

      {/* Grid or States */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px]">
        {!isStarted && !gameOver && (
          <div className="absolute text-center bg-[#1e1e1e] p-4 border-[2px] border-[#444] z-10">
            <p style={{ color: '#ffd700' }} className="mb-2">READY TO PLAY</p>
            <p className="opacity-60 text-[10px] mb-4">Gunakan Keyboard WASD / Tombol Panah</p>
            <button
              onClick={() => setIsStarted(true)}
              className="px-4 py-1.5 border-[2px] font-bold text-xs uppercase"
              style={{ borderColor: '#00ff88', color: '#00ff88' }}
            >
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute text-center bg-[#1e1e1e] p-4 border-[2px] border-[#ff5f57] z-10">
            <p style={{ color: '#ff5f57' }} className="font-bold mb-2">GAME OVER</p>
            <p className="opacity-60 text-[10px] mb-4">Final Score: {score}</p>
            <button
              onClick={handleReset}
              className="px-4 py-1.5 border-[2px] font-bold text-xs uppercase"
              style={{ borderColor: '#f5e642', color: '#f5e642' }}
            >
              Try Again
            </button>
          </div>
        )}

        <div className="flex flex-col gap-1.5 select-none">{cells}</div>
      </div>

      {/* Mobile controls */}
      <div className="flex flex-col items-center gap-1 mt-2">
        <button
          onClick={() => {
            if (!isStarted) setIsStarted(true)
            if (directionRef.current[1] !== 1) setDir([0, -1])
          }}
          className="w-10 h-8 border-[2px] flex items-center justify-center"
          style={{ borderColor: '#333', background: '#111' }}
        >
          <ArrowUp size={16} />
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => {
              if (!isStarted) setIsStarted(true)
              if (directionRef.current[0] !== 1) setDir([-1, 0])
            }}
            className="w-10 h-8 border-[2px] flex items-center justify-center"
            style={{ borderColor: '#333', background: '#111' }}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => {
              if (!isStarted) setIsStarted(true)
              if (directionRef.current[1] !== -1) setDir([0, 1])
            }}
            className="w-10 h-8 border-[2px] flex items-center justify-center"
            style={{ borderColor: '#333', background: '#111' }}
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => {
              if (!isStarted) setIsStarted(true)
              if (directionRef.current[0] !== -1) setDir([1, 0])
            }}
            className="w-10 h-8 border-[2px] flex items-center justify-center"
            style={{ borderColor: '#333', background: '#111' }}
          >
            <Play size={16} className="rotate-0" />
          </button>
        </div>
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-3 py-1.5 border-[2px] border-[#333] text-center hover:bg-[#222]"
      >
        ← Back to Menu
      </button>
    </div>
  )
}

// ── TIC TAC TOE VS BOT ─────────────────────────────────────────

type BoardState = ('X' | 'O' | null)[]

function TicTacToeGame({ onBack }: { onBack: () => void }) {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [botChat, setBotChat] = useState('Gue bot AI, coba kalahkan gue!')
  const [winner, setWinner] = useState<'X' | 'O' | 'Draw' | null>(null)

  const checkWinner = (b: BoardState) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
      [0, 4, 8], [2, 4, 6]             // Diagonal
    ]
    for (const [a, c, d] of lines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return b[a]
      }
    }
    if (b.every((cell) => cell !== null)) return 'Draw'
    return null
  }

  const makeBotMove = (currentBoard: BoardState) => {
    // 1. Check if Bot can win
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const copy = [...currentBoard]
        copy[i] = 'O'
        if (checkWinner(copy) === 'O') return i
      }
    }

    // 2. Check if Player can win (and block them)
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const copy = [...currentBoard]
        copy[i] = 'X'
        if (checkWinner(copy) === 'X') return i
      }
    }

    // 3. Middle cell
    if (currentBoard[4] === null) return 4

    // 4. Random available
    const available = currentBoard.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[]
    return available[Math.floor(Math.random() * available.length)]
  }

  const handleCellClick = (idx: number) => {
    if (board[idx] || winner || !isPlayerTurn) return

    const newBoard = [...board]
    newBoard[idx] = 'X'
    setBoard(newBoard)

    const nextWinner = checkWinner(newBoard)
    if (nextWinner) {
      setWinner(nextWinner)
      if (nextWinner === 'X') setBotChat('Waduh! Gue error, kok kalah... 💀')
      if (nextWinner === 'Draw') setBotChat('Seri! Algoritma kita seimbang. 🤖')
      return
    }

    setIsPlayerTurn(false)
    setBotChat('Sebentar... lagi kalkulasi moveset terbaik...')

    setTimeout(() => {
      const botIdx = makeBotMove(newBoard)
      if (botIdx !== undefined) {
        newBoard[botIdx] = 'O'
        setBoard(newBoard)
      }

      const finalWinner = checkWinner(newBoard)
      if (finalWinner) {
        setWinner(finalWinner)
        if (finalWinner === 'O') setBotChat('Hahaha! Terlalu gampang buat Bot AI. 😎')
        if (finalWinner === 'Draw') setBotChat('Seri! Lumayan juga skill lo.')
      } else {
        const insults = [
          'Gitu doang jalannya?',
          'Lagi mikir cara nge-counter lo...',
          'Udah terbaca semua polanya.',
          'Hampir saja, coba lagi.',
          'Bot script running smoothly!'
        ]
        setBotChat(insults[Math.floor(Math.random() * insults.length)])
        setIsPlayerTurn(true)
      }
    }, 800)
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setIsPlayerTurn(true)
    setBotChat('Game di-restart, coba lagi!')
  }

  return (
    <div className="flex flex-col justify-between h-full p-2 font-mono-brutal text-xs">
      <div className="flex justify-between items-center border-b-[2px] border-[#333] pb-2 mb-2">
        <span style={{ color: '#9cdcfe' }}>🤖 BOT VS PLAYER</span>
        <span style={{ color: '#888' }}>Tic-Tac-Toe</span>
      </div>

      {/* Bot Chat Box */}
      <div className="p-2 border-[2px] border-[#333] bg-[#111] mb-2 text-center" style={{ minHeight: '46px' }}>
        <span style={{ color: '#ffd700' }}>[ErwansyahBot]: </span>
        <span style={{ color: '#fff' }}>&quot;{botChat}&quot;</span>
      </div>

      {/* Board */}
      <div className="flex-1 flex items-center justify-center min-h-[180px]">
        <div className="grid grid-cols-3 gap-2" style={{ width: '180px', height: '180px' }}>
          {board.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              className="flex items-center justify-center text-lg font-bold border-[2px]"
              style={{
                borderColor: cell ? (cell === 'X' ? '#9cdcfe' : '#f5e642') : '#333',
                background: cell ? 'rgba(255,255,255,0.02)' : 'transparent',
                color: cell === 'X' ? '#9cdcfe' : cell === 'O' ? '#f5e642' : '#555',
              }}
            >
              {cell || '·'}
            </button>
          ))}
        </div>
      </div>

      {/* Winner Display & Reset */}
      {winner && (
        <div className="mt-2 text-center">
          <p className="font-bold text-sm" style={{ color: winner === 'X' ? '#00ff88' : winner === 'O' ? '#ff5f57' : '#ffd700' }}>
            {winner === 'X' && 'YOU WIN! 🎉'}
            {winner === 'O' && 'BOT WINS! 🤖'}
            {winner === 'Draw' && 'DRAW! 🤝'}
          </p>
          <button
            onClick={handleReset}
            className="mt-1 px-4 py-1 border-[2px] border-[#f5e642] text-[#f5e642] uppercase text-[10px]"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-3 py-1.5 border-[2px] border-[#333] text-center hover:bg-[#222]"
      >
        ← Back to Menu
      </button>
    </div>
  )
}

// ── DINO RUN GAME ──────────────────────────────────────────────

function DinoGame({ onBack }: { onBack: () => void }) {
  const [dinoY, setDinoY] = useState(0)
  const [dinoVelocity, setDinoVelocity] = useState(0)
  const [obstacles, setObstacles] = useState<number[]>([18, 28])
  const [clouds, setClouds] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 1 },
    { x: 22, y: 2 },
  ])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const dinoYRef = useRef(dinoY)
  const dinoVelocityRef = useRef(dinoVelocity)

  useEffect(() => {
    dinoYRef.current = dinoY
    dinoVelocityRef.current = dinoVelocity
  }, [dinoY, dinoVelocity])

  const jump = () => {
    if (dinoYRef.current === 0) {
      setDinoVelocity(1.6)
      setDinoY(0.1) // Lift off slightly to start physics loop
    }
  }

  // Physics and Game Loop
  useEffect(() => {
    if (!isStarted || gameOver) return

    const gameLoop = setInterval(() => {
      // 1. Gravity and Dino Movement
      setDinoY((y) => {
        let vel = dinoVelocityRef.current
        let nextY = y

        if (y > 0 || vel > 0) {
          vel -= 0.35 // Gravity pull
          nextY = y + vel
          if (nextY <= 0) {
            nextY = 0
            vel = 0
          }
        }
        setDinoVelocity(vel)
        return nextY
      })

      // 2. Obstacle movement
      setObstacles((prev) => {
        const next = prev.map((x) => x - 1).filter((x) => x >= -1)
        const maxDist = next.length > 0 ? Math.max(...next) : 0
        // Spawn a new cactus if last one is far enough
        if (maxDist < 15 && Math.random() > 0.4) {
          next.push(24 + Math.floor(Math.random() * 8))
        }
        return next
      })

      // 3. Cloud movement
      setClouds((prev) => {
        return prev.map((c) => ({
          ...c,
          x: c.x - 0.25 < 0 ? 23 : c.x - 0.25,
        }))
      })

      // 4. Increase score
      setScore((s) => s + 1)
    }, 100)

    return () => clearInterval(gameLoop)
  }, [isStarted, gameOver])

  // Collision detection check
  useEffect(() => {
    if (!isStarted || gameOver) return
    // Check if any obstacle is at index 2 (where dino is) and dino is low
    const isCollided = obstacles.some((x) => x === 2 && dinoYRef.current < 1.1)
    if (isCollided) {
      setGameOver(true)
    }
  }, [obstacles, isStarted, gameOver])

  // Spacebar/Jump Listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault()
        if (!isStarted) {
          setIsStarted(true)
        } else if (!gameOver) {
          jump()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isStarted, gameOver])

  const handleReset = () => {
    setDinoY(0)
    setDinoVelocity(0)
    setObstacles([18, 28])
    setClouds([
      { x: 10, y: 1 },
      { x: 22, y: 2 },
    ])
    setScore(0)
    setGameOver(false)
    setIsStarted(false)
  }

  // Draw Screen (24 cols x 6 rows)
  const COLS = 24
  const ROWS = 6
  const screenGrid: string[][] = Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(' '))

  // Draw Ground Line
  for (let x = 0; x < COLS; x++) {
    screenGrid[5][x] = '='
  }

  // Draw Clouds
  clouds.forEach((c) => {
    const cx = Math.floor(c.x)
    if (cx >= 0 && cx < COLS && c.y < ROWS) {
      screenGrid[c.y][cx] = '☁️'
    }
  })

  // Draw Obstacles
  obstacles.forEach((x) => {
    if (x >= 0 && x < COLS) {
      screenGrid[4][x] = '🌵'
    }
  })

  // Draw Dino (Y goes up from 0)
  const dinoRow = Math.max(0, Math.min(5, 4 - Math.floor(dinoY)))
  screenGrid[dinoRow][2] = gameOver ? '💥' : '🦖'

  return (
    <div className="flex flex-col justify-between h-full p-2 font-mono-brutal text-xs">
      <div className="flex justify-between items-center border-b-[2px] border-[#333] pb-2 mb-2">
        <span style={{ color: '#28c840' }}>🦖 DINO RUN</span>
        <span style={{ color: '#ffd700' }}>SCORE: {score}</span>
      </div>

      {/* Screen Area */}
      <div
        onClick={() => {
          if (!isStarted) setIsStarted(true)
          else if (!gameOver) jump()
        }}
        className="flex-1 flex flex-col justify-center items-center relative bg-[#111] border-[2px] border-[#333] cursor-pointer select-none"
        style={{ minHeight: '190px', padding: '10px 0' }}
      >
        {!isStarted && !gameOver && (
          <div className="absolute text-center bg-[#1e1e1e] p-4 border-[2px] border-[#444] z-10">
            <p style={{ color: '#ffd700' }} className="mb-2">READY TO RUN</p>
            <p className="opacity-60 text-[9px] mb-4">Space / Tap Screen to Jump</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsStarted(true)
              }}
              className="px-4 py-1.5 border-[2px] font-bold text-xs uppercase"
              style={{ borderColor: '#28c840', color: '#28c840' }}
            >
              Start Run
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute text-center bg-[#1e1e1e] p-4 border-[2px] border-[#ff5f57] z-10">
            <p style={{ color: '#ff5f57' }} className="font-bold mb-2">GAME OVER</p>
            <p className="opacity-60 text-[9px] mb-4">Score: {score}</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleReset()
              }}
              className="px-4 py-1.5 border-[2px] font-bold text-xs uppercase"
              style={{ borderColor: '#f5e642', color: '#f5e642' }}
            >
              Run Again
            </button>
          </div>
        )}

        {/* Render grid output as strings */}
        <div className="flex flex-col gap-[2px] w-full items-center font-mono-brutal text-sm leading-none whitespace-pre select-none">
          {screenGrid.map((row, rIdx) => (
            <div key={rIdx} className="flex h-[18px] items-center">
              {row.map((cell, cIdx) => {
                let color = '#555'
                if (cell === '🦖') color = '#28c840'
                if (cell === '🌵') color = '#ff5f57'
                if (cell === '💥') color = '#ff3b3b'
                if (cell === '☁️') color = '#888'
                if (cell === '=') color = '#444'

                return (
                  <span
                    key={cIdx}
                    style={{
                      color,
                      width: '12px',
                      textAlign: 'center',
                      display: 'inline-block',
                    }}
                  >
                    {cell}
                  </span>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Controller Guide / Button for mobile */}
      <div className="mt-2 text-center">
        <button
          onClick={() => {
            if (!isStarted) setIsStarted(true)
            else if (!gameOver) jump()
          }}
          className="w-full py-2 border-[2px] border-[#333] hover:bg-[#222] font-bold text-xs uppercase"
          style={{ color: '#ffd700' }}
        >
          ▲ TAP TO JUMP ▲
        </button>
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-3 py-1.5 border-[2px] border-[#333] text-center hover:bg-[#222]"
      >
        ← Back to Menu
      </button>
    </div>
  )
}

