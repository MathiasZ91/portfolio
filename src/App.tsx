import { Game2D } from '@/components/core/Game2D'
import { MainMenu } from '@/components/ui/MainMenu'
import { GameOver } from '@/components/ui/GameOver'
import { Banner } from '@/components/ui/Banner'
import { ParticleEffect } from '@/components/effects/Particles'
import { useGameStore } from '@/stores/gameStore'

export default function App() {
  const { isPlaying, lives } = useGameStore()

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      <div className="cyber-background" />
      <ParticleEffect />
      <div className="cyber-grid" />
      <div className="relative z-10 flex flex-col h-full w-full">
        <Banner />
        <main className="flex-1 flex items-center justify-center">
          <div className="container flex items-center justify-center">
            {!isPlaying && lives > 0 && <MainMenu />}
            {isPlaying && <Game2D />}
            {lives === 0 && <GameOver />}
          </div>
        </main>
      </div>
    </div>
  )
}