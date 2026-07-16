import LobbyChatCard from "@/_pages/lobby-detail/ui/lobby-chat-card";
import LobbyTitle from "@/_pages/lobby-detail/ui/lobby-detail-title";
import LobbyMemberCard from "@/_pages/lobby-detail/ui/lobby-member-card";
import LobbyTimerCard from "@/_pages/lobby-detail/ui/lobby-timer-card";

export function LobbyDetail() {
	return (
		<main className="mx-5 sm:mx-14 my-7 space-y-5">
			<LobbyTitle />
			<LobbyTimerCard />
			<LobbyChatCard />
			<LobbyMemberCard />
		</main>
	);
}
