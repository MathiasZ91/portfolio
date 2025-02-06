import { useGameStore } from '@/stores/gameStore'
import { useState } from 'react'

export const MainMenu = () => {
  const { startGame, highScore } = useGameStore()
  const [selectedOption, setSelectedOption] = useState(0)
  const menuOptions = ['Start Game', 'Settings', 'Exit']

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedOption((prev) => (prev > 0 ? prev - 1 : menuOptions.length - 1))
        break
      case 'ArrowDown':
        setSelectedOption((prev) => (prev < menuOptions.length - 1 ? prev + 1 : 0))
        break
      case 'Enter':
        if (selectedOption === 0) startGame()
        break
    }
  }

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1 className="text-6xl mb-4 font-bold text-red-600 font-chinese glow-text-red">蛇年</h1>
      <h2 className="text-4xl mb-8 text-yellow-500 glow-text">Year of the Snake</h2>
      <div className="text-xl mb-8 text-gold glow-text">
        <span className="font-chinese">最高分</span> (High Score): {highScore}
      </div>
      <div className="flex flex-col gap-4">
        {menuOptions.map((option, index) => (
          <button
            key={option}
            onClick={() => {
              if (index === 0) startGame()
            }}
            className={`px-8 py-2 rounded-lg text-xl transition-colors ${
              selectedOption === index
                ? 'bg-red-600 text-gold glow-text'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="absolute bottom-4 text-sm text-gray-400">
        Created by Mathias Zeibig 2025 ©
      </div>
    </div>
  )
} 