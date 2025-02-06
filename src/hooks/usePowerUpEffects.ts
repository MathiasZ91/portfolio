import { useEffect } from 'react'
import { useGameStore } from '@store/gameStore'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const usePowerUpEffects = (snakeRef: React.RefObject<THREE.Group>) => {
  const { powerUps, deactivatePowerUp } = useGameStore()

  useFrame((state, delta) => {
    powerUps.forEach(powerUp => {
      if (!powerUp.active) return

      // Update power-up durations
      powerUp.duration -= delta
      if (powerUp.duration <= 0) {
        deactivatePowerUp(powerUp.type)
      }
    })
  })

  return {
    hasEffect: (type: string) => powerUps.some(p => p.type === type && p.active),
    getRemainingTime: (type: string) => 
      powerUps.find(p => p.type === type)?.duration || 0
  }
} 