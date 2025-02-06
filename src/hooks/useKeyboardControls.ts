import { useEffect } from 'react'
import { useGameStore } from '@/stores/gameStore'

export const useKeyboardControls = () => {
  const { isPlaying, isPaused, setDirection } = useGameStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || isPaused) return

      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isPaused, setDirection])
} 