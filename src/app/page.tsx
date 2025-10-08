import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LobbyPreview } from "@/features/lobby/detail/components/lobby-preview"


export default function Page() {
  return (
    <div className="relative min-h-screen">
        <div className="absolute inset-0 mt-7 -z-10 opacity-30 pointer-events-none blur-sm overflow-hidden">
          <LobbyPreview />
        </div>
      <Navigation />
      <main>
        <HeroSection />
      </main>
    </div>
  )
}
