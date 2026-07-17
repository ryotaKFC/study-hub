import type { SupabaseClient } from "@supabase/supabase-js";
import { convertDBLobbyToLobby } from "@/entities/lobby/lib/convert-db-lobby-to-lobby";
import type { Lobby } from "@/entities/lobby/types";

export async function fetchLobbyById(
	supabase: SupabaseClient,
	lobbyId: string,
): Promise<Lobby> {
	const { data, error } = await supabase
		.from("lobbies")
		.select("*")
		.eq("lobby_id", lobbyId)
		.single();

	if (error) {
		console.error(error);
		throw error;
	}

	return convertDBLobbyToLobby([data])[0];
}
