import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '@/stores/gameStore'

export const Game2D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snakeRef = useRef<{ x: number; y: number }[]>([])
  const foodRef = useRef<{ x: number; y: number } | null>(null)
  const gameLoopRef = useRef<number>()
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const foodColorRef = useRef<string>('#FF0000')
  const speedRef = useRef<number>(150) // Starting speed (slower)
  const flashTimeoutRef = useRef<number>()
  const [isFlashing, setIsFlashing] = useState(false)
  const [heartLost, setHeartLost] = useState<number | null>(null)
  const [bgIndex, setBgIndex] = useState(0)
  
  // Revert to previous darker but visible backgrounds
  const backgrounds = [
    'linear-gradient(to bottom right, #1a0f0f, #2d1f1f)',
    'linear-gradient(to bottom right, #1f1a0f, #2d261f)',
    'linear-gradient(to bottom right, #0f1a1a, #1f2d2d)',
    'linear-gradient(to bottom right, #1a0f1a, #2d1f2d)',
    'linear-gradient(to bottom right, #0f1a0f, #1f2d1f)',
    'linear-gradient(to bottom right, #1a1a0f, #2d2d1f)',
  ]

  const {  
    isPlaying, 
    score, 
    setScore, 
    direction, 
    setDirection,
    lives,
    decrementLives,
    endGame 
  } = useGameStore()

  // Prevent arrow key scrolling
  useEffect(() => {
    const preventArrowScroll = (e: KeyboardEvent) => {
      if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }
    }
    
    window.addEventListener('keydown', preventArrowScroll)
    return () => window.removeEventListener('keydown', preventArrowScroll)
  }, [])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, direction, setDirection])

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = 800
    canvas.height = 600
    contextRef.current = canvas.getContext('2d')
  }, [])

  // Add function to generate random color
  const getRandomColor = () => {
    const colors = [
      '#FF0000', // Red
      '#FF8C00', // Orange
      '#FFD700', // Gold
      '#32CD32', // Lime
      '#00FFFF', // Cyan
      '#8A2BE2', // Blue Violet
      '#FF69B4', // Hot Pink
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Add flash effect when eating food
  const flashScreen = () => {
    setIsFlashing(true)
    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current)
    }
    flashTimeoutRef.current = window.setTimeout(() => {
      setIsFlashing(false)
    }, 100) // Flash duration
  }

  // Add heart loss animation
  const animateHeartLoss = () => {
    setHeartLost(lives)
    setTimeout(() => setHeartLost(null), 500) // Heart flash duration
  }

  // Update speed based on score
  const updateSpeed = () => {
    // Start at 150ms, decrease by 5ms for each food eaten, minimum 50ms
    const newSpeed = Math.max(50, 150 - Math.floor(score / 10) * 5)
    speedRef.current = newSpeed
    
    // Restart game loop with new speed
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
      gameLoopRef.current = window.setInterval(() => {
        updateGame()
        drawGame()
      }, speedRef.current)
    }
  }

  // Update background when eating food
  const changeBackground = () => {
    setBgIndex((prev) => (prev + 1) % backgrounds.length)
  }

  // Game logic
  useEffect(() => {
    if (!contextRef.current) return

    const GRID_SIZE = 20
    const SNAKE_SPEED = 150

    if (isPlaying && !snakeRef.current.length) {
      snakeRef.current = [
        { x: Math.floor(800 / GRID_SIZE / 2), y: Math.floor(600 / GRID_SIZE / 2) },
      ]
    }

    if (isPlaying && !foodRef.current) {
      foodRef.current = generateFood()
    }

    function generateFood() {
      const newFood = {
        x: Math.floor(Math.random() * (800 / GRID_SIZE)),
        y: Math.floor(Math.random() * (600 / GRID_SIZE))
      }
      // Change food color when generating new food
      foodColorRef.current = getRandomColor()
      
      if (snakeRef.current.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        return generateFood()
      }
      return newFood
    }

    function checkCollisionWithSelf(head: { x: number; y: number }) {
      return snakeRef.current.some((segment, index) => 
        index !== 0 && segment.x === head.x && segment.y === head.y
      )
    }

    function updateGame() {
      if (!isPlaying || !foodRef.current) return

      const newHead = {
        x: snakeRef.current[0].x + direction.x,
        y: snakeRef.current[0].y + direction.y
      }

      if (
        newHead.x < 0 ||
        newHead.x >= 800 / GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= 600 / GRID_SIZE ||
        checkCollisionWithSelf(newHead)
      ) {
        animateHeartLoss()
        decrementLives()
        
        if (lives <= 1) {
          endGame()
          return
        }
        
        snakeRef.current = [
          { x: Math.floor(800 / GRID_SIZE / 2), y: Math.floor(600 / GRID_SIZE / 2) }
        ]
        setDirection({ x: 1, y: 0 })
        foodRef.current = generateFood()
        // Reset speed when losing a life
        speedRef.current = 150
        return
      }

      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        setScore(score + 10)
        foodRef.current = generateFood()
        changeBackground()
        flashScreen()
        updateSpeed()
      } else {
        snakeRef.current.pop()
      }

      snakeRef.current.unshift(newHead)
    }

    function drawGame() {
      if (!contextRef.current || !foodRef.current) return

      const ctx = contextRef.current
      // Clear with transparent background to show gradient
      ctx.clearRect(0, 0, 800, 600)

      // Draw snake
      ctx.fillStyle = '#90EE90'
      snakeRef.current.forEach(segment => {
        ctx.fillRect(
          segment.x * GRID_SIZE,
          segment.y * GRID_SIZE,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        )
      })

      // Draw food with brighter red and glow effect
      ctx.fillStyle = '#FF0000'
      ctx.shadowColor = '#FF0000'
      ctx.shadowBlur = 10
      ctx.fillRect(
        foodRef.current.x * GRID_SIZE,
        foodRef.current.y * GRID_SIZE,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      )
      ctx.shadowBlur = 0 // Reset shadow for next draw
    }

    // Clear existing game loop before starting new one
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
    }

    if (isPlaying) {
      gameLoopRef.current = window.setInterval(() => {
        updateGame()
        drawGame()
      }, SNAKE_SPEED)
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [isPlaying, score, setScore, direction, setDirection, lives, decrementLives, endGame, bgIndex])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <div className="text-xl mb-2 text-gold glow-text">
          <span className="font-chinese">得分</span> (Score): {score}
        </div>
        <div className="text-xl mb-2 text-gold glow-text">
          <span className="font-chinese">生命</span> (Lives): {
            Array.from({ length: lives }).map((_, i) => (
              <span key={i} className={`transition-all ${
                heartLost === lives && i === lives - 1 
                  ? 'animate-heartLoss' 
                  : ''
              }`}>
                ❤️
              </span>
            ))
          }
        </div>
      </div>
      <div 
        className="cyber-border cyber-corner"
        style={{
          background: backgrounds[bgIndex],
          transition: 'background 1s ease-in-out'
        }}
      >
        <canvas
          ref={canvasRef}
          className="mx-auto"
        />
      </div>
    </div>
  )
} 