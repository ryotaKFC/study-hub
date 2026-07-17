import type { Lobby } from "@/entities/lobby/types";
import { NavigationBar } from "@/widgets/navigation-bar/ui/navigation-bar";
import { StudyRoom } from "@/widgets/study-room/ui/study-room";

type LobbyDetailPageProps = {
	lobbyPromise: Promise<Lobby>;
};

export function LobbyDetailPage({ lobbyPromise }: LobbyDetailPageProps) {
	return (
		<main className="min-h-screen bg-emerald-50">
			<NavigationBar />
			<StudyRoom lobbyPromise={lobbyPromise} previewMode={false}></StudyRoom>
		</main>
	);
}
