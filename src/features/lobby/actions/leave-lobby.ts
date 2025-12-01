import { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";

export async function leaveLobby(
	supabase: SupabaseClient,
	realtimeChannel: RealtimeChannel,
	lobbyId: string,
): Promise<void> {
	const memberCount = Object.keys(realtimeChannel.presenceState()).length;
	const { error } = await supabase
		.from("lobbies")
		.update({ memberCount: memberCount, lastActivityAt: new Date() })
		.eq("lobby_id", lobbyId);

	if (error) {
		console.error("error", error);
		throw error;
	}
}
