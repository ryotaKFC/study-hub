import type { Lobby } from "@/features/lobby/types";
import { LobbyProvider } from "@/pages/lobby-detail/model/lobby-provider";
import { LobbyDetail } from "@/pages/lobby-detail/ui/lobby-detail";

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

export function BackgroundPreviewLobby() {
	return (
		<div className="absolute inset-0 mt-7 -z-10 opacity-60 pointer-events-none blur-sm overflow-hidden">
			<LobbyProvider lobbyPromise={previewLobbyPromise} previewMode={true}>
				<LobbyDetail />
			</LobbyProvider>
		</div>
	);
}
