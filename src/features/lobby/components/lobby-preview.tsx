"use client";

import { LobbyProvider } from "../providers/lobby-provider";
import { Lobby } from "../types";
import LobbyChatCard from "./lobby-chat-card";
import LobbyTitle from "./lobby-detail-title";
import LobbyMemberCard from "./lobby-member-card";
import LobbyTimerCard from "./lobby-timer-card";

const previewLobby: Lobby = {
	lobbyId: "prev",
	lobbyName: "テストロビー",
	startTime: "2025-10-03T04:17:37.354Z",
	studyMin: 25,
	breakMin: 5,
	isPrivate: false,
	memberCount: 0,
	lastActivityAt: "",
	isInSchool: false,
};

export function LobbyPreview() {
	return (
		<LobbyProvider lobby={previewLobby} previewMode={true}>
			<main className="mx-5 sm:mx-14 my-7 space-y-5">
				<LobbyTitle />
				<LobbyTimerCard />
				<LobbyChatCard />
				<LobbyMemberCard />
			</main>
		</LobbyProvider>
	);
}
