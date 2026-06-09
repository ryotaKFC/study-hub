import LobbyChatCard from "./lobby-chat-card";
import LobbyTitle from "./lobby-detail-title";
import LobbyMemberCard from "./lobby-member-card";
import LobbyTimerCard from "./lobby-timer-card";

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
