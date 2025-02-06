import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  musicVolume: number
  sfxVolume: number
  setMusicVolume: (volume: number) => void
  setSfxVolume: (volume: number) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      musicVolume: 0.5,
      sfxVolume: 0.7,
      setMusicVolume: (volume) => set({ musicVolume: volume }),
      setSfxVolume: (volume) => set({ sfxVolume: volume })
    }),
    {
      name: 'snake-settings'
    }
  )
) 