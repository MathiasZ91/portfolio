import { useGameStore } from '@store/gameStore'

export const ChineseHUD = () => {
  const { score, lives, currentLevel, highScore } = useGameStore()

  return (
    <div className="absolute top-0 left-0 w-full p-4 font-chinese text-imperial-gold">
      <div className="flex justify-between max-w-3xl mx-auto">
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <span className="text-sm">分数</span>
            <span className="text-2xl">{score}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm">最高分</span>
            <span className="text-2xl">{highScore}</span>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <span className="text-sm">等级</span>
            <span className="text-2xl">{currentLevel}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm">生命</span>
            <div className="flex gap-1">
              {Array.from({ length: lives }).map((_, i) => (
                <span key={i} className="text-2xl">❤️</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 