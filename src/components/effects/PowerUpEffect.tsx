import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Sparkles, Trail } from '@react-three/drei'

interface PowerUpEffectProps {
  type: string
  position: THREE.Vector3
}

export const PowerUpEffect = ({ type, position }: PowerUpEffectProps) => {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.02
    }
  })

  switch (type) {
    case 'speed':
      return (
        <Trail
          width={1}
          length={8}
          color={new THREE.Color(1, 0.5, 0)}
          attenuation={(t) => t * t}
        >
          <mesh position={position}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial emissive="orange" />
          </mesh>
        </Trail>
      )
    case 'shield':
      return (
        <group ref={ref} position={position}>
          <Sparkles
            count={20}
            scale={2}
            size={2}
            speed={0.5}
            color="#00ffff"
          />
        </group>
      )
    default:
      return null
  }
} 