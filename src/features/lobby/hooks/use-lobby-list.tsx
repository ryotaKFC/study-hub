"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { convertDBLobbyToLobby } from "../lib/convert-db-lobby-to-lobby";
import { Lobby } from "../types";

export function useLobbyList(
	lobbiesInitial: Lobby[],
	isInSchoolFilter: boolean,
) {
	const supabaseClient = createClient();
	const [lobbies, setLobbies] = useState<Lobby[]>(lobbiesInitial);

	// 購読処理
	useEffect(() => {
		const channel = supabaseClient
			.channel("public:lobbies")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "lobbies",
					filter: "isPrivate=eq.false",
				},
				(payload) => {
					const newLobby = convertDBLobbyToLobby([payload.new])[0];
					if (!isInSchoolFilter || newLobby.isInSchool) {
						setLobbies((prev) => [newLobby, ...prev]);
					}
				},
			)
			.subscribe();

		return () => {
			supabaseClient.removeChannel(channel);
		};
	}, [isInSchoolFilter, setLobbies, supabaseClient]);

	return { lobbies };
}
