"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { creationLobySchema } from "../schemas";
import { Lobby, LobbyCreationDate } from "../types";

export async function createLobby(
	supabase: SupabaseClient,
	lobbyData: LobbyCreationDate,
): Promise<Lobby | null> {
	const validLobby = creationLobySchema.safeParse(lobbyData);
	if (!validLobby.success) {
		console.error("Invalid lobby data", validLobby.error);
		return null;
	}

	const { data, error } = await supabase
		.from("lobbies")
		.insert([
			{
				lobby_name: validLobby.data.lobbyName,
				study_min: validLobby.data.studyMin,
				break_min: validLobby.data.breakMin,
				start_time: new Date(),
				is_private: validLobby.data.isPrivate,
			},
		])
		.select("*")
		.single();

	if (error) {
		console.error("ロビーの作成に失敗しました", error);
		throw error;
	}

	return data as Lobby;
}
