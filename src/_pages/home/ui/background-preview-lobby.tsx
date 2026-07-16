import { LobbyDetailPage } from "@/_pages/lobby-detail/ui/lobby-detail-page";
import type { Lobby } from "@/entities/lobby/types";

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
			<LobbyDetailPage lobbyPromise={previewLobbyPromise} previewMode={true} />
		</div>
	);
}
