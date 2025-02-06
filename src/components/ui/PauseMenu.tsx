import { useGameStore } from '@store/gameStore'

export const PauseMenu = () => {
  const { score, resumeGame, endGame } = useGameStore()

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
      <div className="text-center font-chinese">
        <h2 className="text-4xl mb-6 text-imperial-gold">
          暂停
          <span className="block text-xl mt-1">Paused</span>
        </h2>

        <div className="mb-8 text-jade-green">
          <span className="text-sm">当前分数</span>
          <div className="text-3xl">{score}</div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={resumeGame}
            className="px-6 py-3 text-xl bg-jade-green hover:bg-jade-green/80 
                       text-white rounded-lg transition-colors"
          >
            继续游戏
            <span className="block text-sm">Resume</span>
          </button>

          <button
            onClick={endGame}
            className="px-6 py-3 text-xl bg-chinese-red hover:bg-chinese-red/80 
                       text-white rounded-lg transition-colors"
          >
            退出游戏
            <span className="block text-sm">Exit</span>
          </button>
        </div>
      </div>
    </div>
  )
} 