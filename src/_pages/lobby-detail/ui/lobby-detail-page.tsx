import LobbyChatCard from "@/_pages/lobby-detail/ui/lobby-chat-card";
import LobbyTitle from "@/_pages/lobby-detail/ui/lobby-detail-title";
import LobbyMemberCard from "@/_pages/lobby-detail/ui/lobby-member-card";
import LobbyTimerCard from "@/_pages/lobby-detail/ui/lobby-timer-card";
import type { Lobby } from "@/entities/lobby/types";
import { NavigationBar } from "@/widgets/navigation-bar/ui/navigation-bar";
import { LobbyProvider } from "../model/lobby-provider";

type LobbyDetailPageProps = {
	lobbyPromise: Promise<Lobby>;
};

export function LobbyDetailPage({ lobbyPromise }: LobbyDetailPageProps) {
	return (
		<main className="min-h-screen bg-emerald-50">
			<NavigationBar />
			<LobbyProvider lobbyPromise={lobbyPromise} previewMode={false}>
				<div className="mx-5 sm:mx-14 my-7 space-y-5">
					<LobbyTitle />
					<LobbyTimerCard />
					<LobbyChatCard />
					<LobbyMemberCard />
				</div>
			</LobbyProvider>
		</main>
	);
}
