import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  life: number
}

interface CollectParticlesProps {
  position: THREE.Vector3
  color: string
}

export const CollectParticles = ({ position, color }: CollectParticlesProps) => {
  const particles = useRef<Particle[]>([])
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    // Create particles
    particles.current = Array(20).fill(null).map(() => ({
      position: position.clone(),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2,
        (Math.random() - 0.5) * 2
      ),
      life: 1
    }))
  }, [position])

  useFrame((state, delta) => {
    particles.current.forEach((particle) => {
      particle.position.add(particle.velocity.multiplyScalar(delta))
      particle.velocity.y -= delta * 2 // gravity
      particle.life -= delta
    })

    particles.current = particles.current.filter((p) => p.life > 0)
  })

  return (
    <group ref={groupRef}>
      {particles.current.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={particle.life}
          />
        </mesh>
      ))}
    </group>
  )
} 