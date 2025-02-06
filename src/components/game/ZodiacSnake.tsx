import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useSnakeMovement } from '@hooks/useSnakeMovement'
import { usePowerUpEffects } from '@hooks/usePowerUpEffects'
import { PowerUpEffect } from '@components/effects/PowerUpEffect'
import { useGameStore } from '@store/gameStore'

interface ZodiacSnakeProps {
  foodPosition: THREE.Vector3
  onCollectFood: () => void
}

export const ZodiacSnake = ({ foodPosition, onCollectFood }: ZodiacSnakeProps) => {
  const meshRef = useRef<THREE.Group>(null)
  const snakeRef = useSnakeMovement(foodPosition, onCollectFood)
  const { activeEffects } = useGameStore()
  const { hasEffect } = usePowerUpEffects(meshRef)

  return (
    <group ref={meshRef}>
      {snakeRef.current.segments.map((segment, index) => (
        <group key={index}>
          <mesh
            position={segment.position}
            rotation={segment.rotation}
          >
            <capsuleGeometry args={[0.3, 1, 4, 8]} />
            <meshStandardMaterial
              color={index === 0 ? 'gold' : 'red'}
              metalness={0.6}
              roughness={0.2}
              emissive={hasEffect('speed') ? 'orange' : 'black'}
              emissiveIntensity={hasEffect('speed') ? 0.5 : 0}
            />
          </mesh>
          {index === 0 && activeEffects.map(effect => (
            <PowerUpEffect
              key={effect}
              type={effect}
              position={segment.position}
            />
          ))}
        </group>
      ))}
    </group>
  )
} 