import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { ZodiacGrid } from '@components/game/ZodiacGrid'
import { ZodiacSnake } from '@components/game/ZodiacSnake'
import { LuckyFood } from '@components/game/LuckyFood'
import { CollectParticles } from '@components/effects/CollectParticles'
import { useGameStore } from '@store/gameStore'

export const ChineseZodiacScene = () => {
  const { isPlaying, score, setScore, incrementLevel } = useGameStore()
  const [foodPosition, setFoodPosition] = useState(new THREE.Vector3())
  const [foodType, setFoodType] = useState<'fortune' | 'power' | 'bonus'>('fortune')
  const [showParticles, setShowParticles] = useState(false)
  const particlesTimeout = useRef<NodeJS.Timeout>()

  const generateNewFoodPosition = () => {
    // Ensure food doesn't spawn too close to walls
    const x = Math.floor(Math.random() * 16 - 8)
    const z = Math.floor(Math.random() * 16 - 8)
    return new THREE.Vector3(x, 0.5, z)
  }

  const generateFoodType = () => {
    const rand = Math.random()
    if (rand < 0.7) return 'fortune'
    if (rand < 0.9) return 'power'
    return 'bonus'
  }

  useEffect(() => {
    setFoodPosition(generateNewFoodPosition())
  }, [])

  const handleCollectFood = () => {
    const points = foodType === 'fortune' ? 100 : 
                  foodType === 'power' ? 200 : 500

    setScore(score + points)
    setFoodPosition(generateNewFoodPosition())
    setFoodType(generateFoodType())
    setShowParticles(true)
    
    if (score > 0 && score % 1000 === 0) {
      incrementLevel()
    }

    if (particlesTimeout.current) {
      clearTimeout(particlesTimeout.current)
    }
    particlesTimeout.current = setTimeout(() => {
      setShowParticles(false)
    }, 1000)
  }

  return (
    <>
      <fog attach="fog" args={['#2a1810', 10, 50]} />
      <ZodiacGrid />
      <ZodiacSnake foodPosition={foodPosition} onCollectFood={handleCollectFood} />
      <LuckyFood
        position={foodPosition}
        type={foodType}
        onCollect={handleCollectFood}
      />
      {showParticles && (
        <CollectParticles
          position={foodPosition}
          color={
            foodType === 'fortune' ? '#FFD700' :
            foodType === 'power' ? '#00A86B' : '#DE2910'
          }
        />
      )}
    </>
  )
} 