import { SupabaseClient } from "@supabase/supabase-js";

export async function joinLobby(
	supabase: SupabaseClient,
	lobbyId: string,
	memberCount: number,
): Promise<void> {
	const { error } = await supabase
		.from("lobbies")
		.update({ memberCount: memberCount, lastActivityAt: new Date() })
		.eq("id", lobbyId);

	if (error) {
		console.error("error", error);
		throw error;
	}
}
