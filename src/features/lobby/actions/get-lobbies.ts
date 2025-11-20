import { SupabaseClient } from "@supabase/supabase-js";
import { convertDBLobbyToLobby } from "../lib/convert-db-lobby-to-lobby";

export async function getLobbies(supabase: SupabaseClient) {
	const { data, error } = await supabase
		.from("lobbies")
		.select("*")
		.eq("isPrivate", "false")
		.order("createdAt", { ascending: false });

	if (error) {
		console.error("ロビーの取得に失敗", error);
		throw error;
	}

	return convertDBLobbyToLobby(data);
}
