import type { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";

export async function joinLobby(
	supabase: SupabaseClient,
	realtimeChannel: RealtimeChannel,
	lobbyId: string,
): Promise<void> {
	const memberCount = Object.keys(realtimeChannel.presenceState()).length;
	const { error } = await supabase
		.from("lobbies")
		.update({ member_count: memberCount, last_activity_at: new Date() })
		.eq("lobby_id", lobbyId);

	if (error) {
		console.error("error", error);
		throw error;
	}
}
