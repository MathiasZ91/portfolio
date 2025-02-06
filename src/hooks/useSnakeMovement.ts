import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '@store/gameStore'

export interface SnakeSegment {
  position: THREE.Vector3
  rotation: THREE.Euler
}

interface SnakeMovement {
  segments: SnakeSegment[]
  direction: THREE.Vector3
  speed: number
  length: number
}

export const useSnakeMovement = (foodPosition: THREE.Vector3, onCollectFood: () => void) => {
  const { isPlaying, isPaused, currentLevel, decrementLives, endGame } = useGameStore()
  const snakeRef = useRef<SnakeMovement>({
    segments: [],
    direction: new THREE.Vector3(1, 0, 0),
    speed: 5,
    length: 5
  })

  // Initialize snake
  useEffect(() => {
    resetSnake()
  }, [])

  const resetSnake = () => {
    snakeRef.current.segments = Array(5).fill(null).map((_, i) => ({
      position: new THREE.Vector3(-i, 0, 0),
      rotation: new THREE.Euler(0, 0, 0)
    }))
    snakeRef.current.direction.set(1, 0, 0)
    snakeRef.current.length = 5
  }

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPlaying || isPaused) return

      const { direction } = snakeRef.current
      switch (event.code) {
        case 'ArrowUp':
          if (direction.z === 1) return
          snakeRef.current.direction.set(0, 0, -1)
          break
        case 'ArrowDown':
          if (direction.z === -1) return
          snakeRef.current.direction.set(0, 0, 1)
          break
        case 'ArrowLeft':
          if (direction.x === 1) return
          snakeRef.current.direction.set(-1, 0, 0)
          break
        case 'ArrowRight':
          if (direction.x === -1) return
          snakeRef.current.direction.set(1, 0, 0)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isPaused])

  // Game loop
  useFrame((state, delta) => {
    if (!isPlaying || isPaused) return

    const { segments, direction, speed } = snakeRef.current
    const baseSpeed = speed + currentLevel * 0.5
    const movement = direction.clone().multiplyScalar(baseSpeed * delta)

    // Update head position
    const newHead = {
      position: segments[0].position.clone().add(movement),
      rotation: new THREE.Euler(0, Math.atan2(direction.x, direction.z), 0)
    }

    // Check boundaries
    if (Math.abs(newHead.position.x) > 10 || Math.abs(newHead.position.z) > 10) {
      decrementLives()
      resetSnake()
      return
    }

    // Check self-collision
    for (let i = 4; i < segments.length; i++) {
      if (newHead.position.distanceTo(segments[i].position) < 0.5) {
        decrementLives()
        resetSnake()
        return
      }
    }

    // Check food collision
    if (newHead.position.distanceTo(foodPosition) < 1) {
      snakeRef.current.length += 1
      onCollectFood()
    }

    // Update segments
    for (let i = segments.length - 1; i > 0; i--) {
      segments[i].position.copy(segments[i - 1].position)
      segments[i].rotation.copy(segments[i - 1].rotation)
    }
    segments[0].position.copy(newHead.position)
    segments[0].rotation.copy(newHead.rotation)

    // Add new segment if snake is growing
    if (segments.length < snakeRef.current.length) {
      segments.push({
        position: segments[segments.length - 1].position.clone(),
        rotation: segments[segments.length - 1].rotation.clone()
      })
    }
  })

  return snakeRef
} 