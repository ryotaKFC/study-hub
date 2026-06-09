import type { Lobby } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertDBLobbyToLobby(dbLobby: any[]): Lobby[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const formattedLobby: Lobby[] = dbLobby.map((lobby: any) => ({
		lobbyId: lobby.lobby_id,
		lobbyName: lobby.lobby_name,
		startTime: lobby.start_time,
		studyMin: lobby.study_min,
		breakMin: lobby.break_min,
		isPrivate: lobby.is_private,
		isInSchool: lobby.is_in_school,
		lastActivityAt: lobby.last_activity_at,
		memberCount: lobby.member_count,
	}));
	return formattedLobby;
}
