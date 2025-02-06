import { usePowerUpEffects } from '@hooks/usePowerUpEffects'
import { useGameStore } from '@store/gameStore'

export const PowerUpIndicator = () => {
  const { activeEffects } = useGameStore()
  const { getRemainingTime } = usePowerUpEffects(null)

  return (
    <div className="absolute top-20 right-4 flex flex-col gap-2">
      {activeEffects.map(effect => (
        <div
          key={effect}
          className="bg-black/50 rounded-lg p-2 text-white font-chinese"
        >
          <div className="text-sm">
            {effect === 'speed' && '速度提升'}
            {effect === 'shield' && '护盾'}
            {effect === 'ghost' && '穿墙'}
            {effect === 'shrink' && '缩小'}
          </div>
          <div className="h-1 bg-gray-700 rounded-full mt-1">
            <div
              className="h-full bg-imperial-gold rounded-full transition-all"
              style={{
                width: `${(getRemainingTime(effect) / 10) * 100}%`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
} 