import { useSettingsStore } from '@store/settingsStore'

interface SettingsMenuProps {
  onClose: () => void
}

export const SettingsMenu = ({ onClose }: SettingsMenuProps) => {
  const { musicVolume, sfxVolume, setMusicVolume, setSfxVolume } = useSettingsStore()

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-temple-gray/90 p-8 rounded-lg max-w-md w-full font-chinese">
        <h2 className="text-3xl text-imperial-gold mb-6">
          设置
          <span className="block text-xl mt-1">Settings</span>
        </h2>

        <div className="space-y-6">
          <div>
            <label className="text-white mb-2 block">
              音乐音量
              <span className="block text-sm">Music Volume</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={musicVolume}
              onChange={(e) => setMusicVolume(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white mb-2 block">
              音效音量
              <span className="block text-sm">SFX Volume</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full px-6 py-3 bg-chinese-red hover:bg-chinese-red/80 
                     text-white rounded-lg transition-colors"
        >
          关闭
          <span className="block text-sm">Close</span>
        </button>
      </div>
    </div>
  )
} 