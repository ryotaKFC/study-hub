import { SupabaseClient } from "@supabase/supabase-js";
import { convertDBLobbyToLobby } from "../lib/convert-db-lobby-to-lobby";
import { Lobby } from "../types";

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
