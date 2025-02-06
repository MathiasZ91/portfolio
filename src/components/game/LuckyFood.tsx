import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface LuckyFoodProps {
  position: THREE.Vector3
  type: 'fortune' | 'power' | 'bonus'
  onCollect: () => void
}

export const LuckyFood = ({ position, type, onCollect }: LuckyFoodProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const rotationSpeed = 1

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  const getColor = () => {
    switch (type) {
      case 'fortune': return 'imperial-gold'
      case 'power': return 'jade-green'
      case 'bonus': return 'chinese-red'
      default: return 'white'
    }
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
      onClick={onCollect}
    >
      <octahedronGeometry args={[0.5]} />
      <meshStandardMaterial
        color={getColor()}
        metalness={0.7}
        roughness={0.2}
        emissive={getColor()}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
} 