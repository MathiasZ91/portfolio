import { useGameStore } from '@/stores/gameStore'
import { useKeyboardControls } from '@/hooks/useKeyboardControls'
import { ChineseHUD } from '../ui/ChineseHUD'
import { MainMenu } from '../ui/MainMenu'
import { PauseMenu } from '../ui/PauseMenu'
import { GameOverScreen } from '../ui/GameOverScreen'
import { Game2D } from './Game2D'

export const DragonSnakeContainer = () => {
  const { isPlaying, isPaused, lives } = useGameStore()
  useKeyboardControls()

  return (
    <div className="w-full h-screen bg-temple-gray">
      <div className="game-area w-full h-full transition-all duration-300">
        <Game2D />
        
        {isPlaying && <ChineseHUD />}
        {!isPlaying && lives > 0 && <MainMenu />}
        {isPlaying && isPaused && <PauseMenu />}
        {!isPlaying && lives === 0 && <GameOverScreen />}
      </div>
    </div>
  )
} 