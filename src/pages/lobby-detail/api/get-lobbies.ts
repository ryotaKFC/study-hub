import type { SupabaseClient } from "@supabase/supabase-js";
import { convertDBLobbyToLobby } from "@/features/lobby/lib/convert-db-lobby-to-lobby";
import type { Lobby } from "@/features/lobby/types";

export async function getLobbies(
	supabase: SupabaseClient,
	isInSchoolFilter: boolean,
): Promise<Lobby[]> {
	if (isInSchoolFilter) {
		const { data, error } = await supabase
			.from("lobbies")
			.select("*")
			.eq("is_private", "false")
			.eq("is_in_school", "true")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("ロビーの取得に失敗", error);
			throw error;
		}

		return convertDBLobbyToLobby(data);
	} else {
		const { data, error } = await supabase
			.from("lobbies")
			.select("*")
			.eq("is_private", "false")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("ロビーの取得に失敗", error);
			throw error;
		}

		return convertDBLobbyToLobby(data);
	}
}
