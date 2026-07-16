import type { Lobby } from "@/entities/lobby/types";

// biome-ignore lint/suspicious/noExplicitAny: Supabase DB response lacks type
export function convertDBLobbyToLobby(dbLobby: any[]): Lobby[] {
	// biome-ignore lint/suspicious/noExplicitAny: Supabase DB response lacks type
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
