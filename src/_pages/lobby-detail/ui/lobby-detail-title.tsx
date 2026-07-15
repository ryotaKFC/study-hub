"use client";

import { useLobby } from "@/_pages/lobby-detail/model/lobby-provider";

export default function LobbyTitle() {
	const { lobby } = useLobby();

	return (
		<h1 className="text-center font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3 mt-24 text-2xl sm:text-4xl">
			🏠「{lobby.lobbyName}」
		</h1>
	);
}
