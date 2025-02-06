import { useGameStore } from '@/stores/gameStore'

export const GameOver = () => {
  const { score, highScore, startGame } = useGameStore()

  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
      <h2 className="text-4xl mb-4 text-red-600 glow-text-red">
        <span className="font-chinese">游戏结束</span> (Game Over)
      </h2>
      <p className="text-2xl mb-2 text-gold glow-text">
        <span className="font-chinese">得分</span> (Score): {score}
      </p>
      <p className="text-2xl mb-6 text-gold glow-text">
        <span className="font-chinese">最高分</span> (High Score): {highScore}
      </p>
      <button
        onClick={startGame}
        className="px-6 py-3 bg-red-600 text-gold glow-text rounded-lg hover:bg-red-700 transition-colors"
      >
        <span className="font-chinese">再玩一次</span> (Play Again)
      </button>
    </div>
  )
} 