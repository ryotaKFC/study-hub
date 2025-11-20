"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { lobbySchema } from "../schemas";
import { Lobby, LobbyCreationDate } from "../types";

export async function insertLobby(
	supabase: SupabaseClient,
	lobbyData: LobbyCreationDate,
): Promise<Lobby | null> {
	const validLobby = lobbySchema.safeParse(lobbyData);
	if (!validLobby.success) {
		console.error("Invalid lobby data", validLobby.error);
		return null;
	}

	const { data, error } = await supabase
		.from("lobbies")
		.insert([
			{
				name: validLobby.data.lobbyName,
				studyMin: validLobby.data.studyMin,
				breakMin: validLobby.data.breakMin,
				startTime: new Date(),
				isPrivate: validLobby.data.isPrivate,
				location: validLobby.data.location,
				locationName: validLobby.data.locationName,
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
