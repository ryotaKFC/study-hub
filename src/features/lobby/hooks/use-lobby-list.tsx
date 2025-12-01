"use client";

import { useEffect, useState } from "react";
import { Lobby } from "../types";

export function useLobbyList(
	lobbiesInitial: Lobby[],
	isInSchoolFilter: boolean,
) {
	const [lobbies, setLobbies] = useState<Lobby[]>(lobbiesInitial);

	// フィルターの状態が変わったときにロビーリストを更新
	useEffect(() => {
		setLobbies(
			lobbiesInitial.filter((lobby) =>
				isInSchoolFilter ? lobby.isInSchool : true,
			),
		);
	}, [isInSchoolFilter, lobbiesInitial]);

	return { lobbies };
}
