"use client";

import React from "react";
import { Lobby } from "../../types";
import { LobbyProvider } from "../lobby-provider";
import LobbyChat from "./lobby-chat";
import LobbyMember from "./lobby-member";
import LobbyTimer from "./lobby-timer";
import Tips from "./lobby-tips";
import LobbyTitle from "./lobby-title";

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
				<LobbyTimer />
				<LobbyChat />
				<LobbyMember />
				<Tips />
			</main>
		</LobbyProvider>
	);
}
