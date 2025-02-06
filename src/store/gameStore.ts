import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PowerUp {
  type: 'speed' | 'shield' | 'ghost' | 'shrink'
  duration: number
  active: boolean
}

interface GameState {
  score: number
  isPlaying: boolean
  isPaused: boolean
  currentLevel: number
  lives: number
  highScore: number
  powerUps: PowerUp[]
  activeEffects: string[]
  setScore: (score: number) => void
  startGame: () => void
  endGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  incrementLevel: () => void
  decrementLives: () => void
  activatePowerUp: (type: PowerUp['type']) => void
  deactivatePowerUp: (type: PowerUp['type']) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      score: 0,
      isPlaying: false,
      isPaused: false,
      currentLevel: 1,
      lives: 3,
      highScore: 0,
      powerUps: [],
      activeEffects: [],
      setScore: (score) => 
        set((state) => ({ 
          score,
          highScore: score > state.highScore ? score : state.highScore 
        })),
      startGame: () => 
        set({ 
          isPlaying: true,
          isPaused: false,
          score: 0,
          lives: 3,
          currentLevel: 1,
          powerUps: [],
          activeEffects: []
        }),
      endGame: () => set({ isPlaying: false, isPaused: false }),
      pauseGame: () => set({ isPaused: true }),
      resumeGame: () => set({ isPaused: false }),
      incrementLevel: () => 
        set((state) => ({ currentLevel: state.currentLevel + 1 })),
      decrementLives: () => 
        set((state) => ({ lives: state.lives - 1 })),
      activatePowerUp: (type) =>
        set((state) => ({
          powerUps: [...state.powerUps, { type, duration: 10, active: true }],
          activeEffects: [...state.activeEffects, type]
        })),
      deactivatePowerUp: (type) =>
        set((state) => ({
          powerUps: state.powerUps.filter(p => p.type !== type),
          activeEffects: state.activeEffects.filter(e => e !== type)
        }))
    }),
    {
      name: 'snake-game-storage'
    }
  )
) 