"use client";

import { useState } from "react";
import { useLobbyList } from "../hooks/use-lobby-list";
import { Lobby } from "../types";
import { LobbyCard } from "./lobby-list/card/lobby-card";
import { LobbyListController } from "./lobby-list-controller";

type LobbyListProps = {
	lobbiesInitial: Lobby[];
};

export default function LobbyList({ lobbiesInitial }: LobbyListProps) {
	const [isInSchoolFilter, setIsInSchoolFilter] = useState(false);
	const { lobbies } = useLobbyList(lobbiesInitial, isInSchoolFilter);

	return (
		<>
			<LobbyListController
				isInSchoolFilter={isInSchoolFilter}
				handleSwitchChange={() => setIsInSchoolFilter((prev) => !prev)}
			/>
			<div className="px-4 grid grid-cols-1 sm:px-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{lobbies?.map((lobby) => (
					<LobbyCard key={lobby.lobbyId} lobby={lobby} />
				))}
			</div>
		</>
	);
}
