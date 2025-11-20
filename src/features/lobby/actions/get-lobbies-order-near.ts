import { SupabaseClient } from "@supabase/supabase-js";
import { convertDBLobbyToLobby } from "../lib/convert-db-lobby-to-lobby";
import { Lobby } from "../types";

export async function fetchLobbiesOrderNear(
	supabase: SupabaseClient,
	lat: number,
	lng: number,
): Promise<Lobby[]> {
	const { data, error } = await supabase.rpc("lobbies_near", {
		user_lat: lat,
		user_lng: lng,
	});

	if (error) {
		console.error("ロビー取得失敗", error);
		throw error;
	}

	return convertDBLobbyToLobby(data);
}
