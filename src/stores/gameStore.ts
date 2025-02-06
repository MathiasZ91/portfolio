import { create } from 'zustand'

interface GameState {
  isPlaying: boolean
  lives: number
  score: number
  highScore: number
  direction: { x: number; y: number }
  setDirection: (direction: { x: number; y: number }) => void
  setScore: (score: number) => void
  startGame: () => void
  endGame: () => void
  decrementLives: () => void
}

export const useGameStore = create<GameState>((set) => ({
  isPlaying: false,
  lives: 3,
  score: 0,
  highScore: 0,
  direction: { x: 1, y: 0 },
  
  setDirection: (direction) => set({ direction }),
  
  setScore: (score) => set((state) => ({ 
    score,
    highScore: score > state.highScore ? score : state.highScore 
  })),
  
  startGame: () => set({ 
    isPlaying: true, 
    score: 0, 
    lives: 3,
    direction: { x: 1, y: 0 }
  }),
  
  endGame: () => set({ isPlaying: false }),
  
  decrementLives: () => set((state) => ({ lives: state.lives - 1 }))
})) 