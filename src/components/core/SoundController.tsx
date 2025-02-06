import { useEffect } from 'react'
import { useGameStore } from '@store/gameStore'
import { useSettingsStore } from '@store/settingsStore'
import { useSoundEffects } from '@hooks/useSoundEffects'

export const SoundController = () => {
  const { isPlaying, isPaused, lives } = useGameStore()
  const { musicVolume, sfxVolume } = useSettingsStore()
  const { playSound, stopSound } = useSoundEffects()

  useEffect(() => {
    if (isPlaying && !isPaused) {
      playSound('bgMusic')
    } else {
      stopSound('bgMusic')
    }
  }, [isPlaying, isPaused])

  useEffect(() => {
    const sounds = ['collect', 'powerUp', 'crash', 'levelUp', 'gameOver'] as const
    sounds.forEach(sound => {
      useSoundEffects.current[sound].volume(sfxVolume)
    })
    useSoundEffects.current.bgMusic.volume(musicVolume)
  }, [musicVolume, sfxVolume])

  return null
} 