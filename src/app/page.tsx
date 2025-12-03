import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { LobbyDetail } from "@/features/lobby/components/lobby-detail";
import { LobbyProvider } from "@/features/lobby/providers/lobby-provider";
import { Lobby } from "@/features/lobby/types";

const previewLobbyPromise: Promise<Lobby> = Promise.resolve({
	lobbyId: "prev",
	lobbyName: "テストロビー",
	startTime: "2025-10-03T04:17:37.354Z",
	studyMin: 25,
	breakMin: 5,
	isPrivate: false,
	memberCount: 0,
	lastActivityAt: "",
	isInSchool: false,
});

export default function Page() {
	return (
		<div className="relative min-h-screen">
			<div className="absolute inset-0 mt-7 -z-10 opacity-60 pointer-events-none blur-sm overflow-hidden">
				<LobbyProvider lobbyPromise={previewLobbyPromise} previewMode={true}>
					<LobbyDetail />
				</LobbyProvider>
			</div>
			<Navigation />
			<main>
				<HeroSection />
			</main>
		</div>
	);
}
