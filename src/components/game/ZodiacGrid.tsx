import * as THREE from 'three'
import { useGameStore } from '@store/gameStore'

export const ZodiacGrid = () => {
  const currentLevel = useGameStore((state) => state.currentLevel)
  const gridSize = 20 + currentLevel * 2 // Grid grows with level

  return (
    <group>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial
          color="#2a1810"
          metalness={0.2}
          roughness={0.8}
        >
          <gridHelper
            args={[gridSize, gridSize, '#8B4513', '#8B4513']}
            position={[0, 0.01, 0]}
          />
        </meshStandardMaterial>
      </mesh>

      {/* Grid border */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[gridSize + 1, 1, gridSize + 1]} />
        <meshStandardMaterial
          color="#8B4513"
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
} 