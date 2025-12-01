"use client";

import { Lobby } from "../types";

export function useLobbyList(
	lobbiesInitial: Lobby[],
	isInSchoolFilter: boolean,
) {
	const lobbies = lobbiesInitial.filter((lobby) =>
		isInSchoolFilter ? lobby.isInSchool : true,
	);

	return { lobbies };
}
