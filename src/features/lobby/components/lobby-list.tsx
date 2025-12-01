"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";
import { Lobby } from "../types";
import { LobbyCard } from "./lobby-list/card/lobby-card";
import { LobbyListController } from "./lobby-list-controller";

type LobbyListProps = {
	lobbiesPromise: Promise<Lobby[]>;
	isInSchoolFilter: boolean;
};

export default function LobbyList({
	lobbiesPromise,
	isInSchoolFilter,
}: LobbyListProps) {
	const lobbies = use(lobbiesPromise);
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleSchoolFilterChange() {
		const newFilterValue = !isInSchoolFilter;
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set("inSchool", newFilterValue.toString());
		router.replace(`/lobby/?${newParams.toString()}`);
	}

	// ロード画面だしたい

	return (
		<>
			<LobbyListController
				isInSchoolFilter={isInSchoolFilter}
				handleSchoolFilterChange={handleSchoolFilterChange}
			/>
			<div className="px-4 grid grid-cols-1 sm:px-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{lobbies?.map((lobby) => (
					<LobbyCard key={lobby.lobbyId} lobby={lobby} />
				))}
			</div>
		</>
	);
}
