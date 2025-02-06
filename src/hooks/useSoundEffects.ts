import { useEffect, useRef } from 'react'
import { Howl } from 'howler'

interface SoundEffects {
  collect: Howl
  powerUp: Howl
  crash: Howl
  levelUp: Howl
  gameOver: Howl
  bgMusic: Howl
}

export const useSoundEffects = () => {
  const sounds = useRef<SoundEffects>({
    collect: new Howl({
      src: ['/sounds/collect.mp3'],
      volume: 0.5
    }),
    powerUp: new Howl({
      src: ['/sounds/powerup.mp3'],
      volume: 0.6
    }),
    crash: new Howl({
      src: ['/sounds/crash.mp3'],
      volume: 0.4
    }),
    levelUp: new Howl({
      src: ['/sounds/levelup.mp3'],
      volume: 0.7
    }),
    gameOver: new Howl({
      src: ['/sounds/gameover.mp3'],
      volume: 0.6
    }),
    bgMusic: new Howl({
      src: ['/sounds/background.mp3'],
      volume: 0.3,
      loop: true
    })
  })

  const playSound = (name: keyof SoundEffects) => {
    sounds.current[name].play()
  }

  const stopSound = (name: keyof SoundEffects) => {
    sounds.current[name].stop()
  }

  return { playSound, stopSound }
} 