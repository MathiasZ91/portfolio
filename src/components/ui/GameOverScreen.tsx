import { useGameStore } from '@store/gameStore'

export const GameOverScreen = () => {
  const { score, highScore, startGame } = useGameStore()

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
      <div className="text-center font-chinese">
        <h2 className="text-4xl mb-6 text-chinese-red">
          游戏结束
          <span className="block text-xl mt-1">Game Over</span>
        </h2>

        <div className="mb-8">
          <div className="text-jade-green">
            <span className="text-sm">最终分数</span>
            <div className="text-3xl">{score}</div>
          </div>
          <div className="text-imperial-gold mt-4">
            <span className="text-sm">最高分</span>
            <div className="text-3xl">{highScore}</div>
          </div>
        </div>

        <button
          onClick={startGame}
          className="px-8 py-4 text-2xl bg-chinese-red hover:bg-chinese-red/80 
                     text-white rounded-lg transition-colors
                     border-2 border-imperial-gold"
        >
          重新开始
          <span className="block text-sm">Play Again</span>
        </button>
      </div>
    </div>
  )
} 