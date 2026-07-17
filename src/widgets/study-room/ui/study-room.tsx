import type { Lobby } from "@/entities/lobby/types";
import { LobbyProvider } from "../model/lobby-provider";
import LobbyChatCard from "./lobby-chat-card";
import LobbyTitle from "./lobby-detail-title";
import LobbyMemberCard from "./lobby-member-card";
import LobbyTimerCard from "./lobby-timer-card";

type StudyRoomProps = {
	lobbyPromise: Promise<Lobby>;
	previewMode: boolean;
};

export function StudyRoom({ lobbyPromise, previewMode }: StudyRoomProps) {
	return (
		<LobbyProvider lobbyPromise={lobbyPromise} previewMode={previewMode}>
			<div className="mx-5 sm:mx-14 my-7 space-y-5">
				<LobbyTitle />
				<LobbyTimerCard />
				<LobbyChatCard />
				<LobbyMemberCard />
			</div>
		</LobbyProvider>
	);
}
