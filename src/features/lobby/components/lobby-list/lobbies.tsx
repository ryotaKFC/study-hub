"use client";

import { Loading } from "@/components/loading";
import { useLobbies } from "../../hooks/use-lobbies";
import { LobbyCard } from "./card/lobby-card";
import { LobbiesController } from "./lobbies-controller";

export default function Lobbies() {
	const {
		lobbies,
		isLoading,
		isGeolocationGranted,
		enableNearbyLobbyMode,
		fetchNearbyOrAllLobbies,
	} = useLobbies();
	if (isLoading) return <Loading />;

	return (
		<>
			<LobbiesController
				isGeolocationGranted={isGeolocationGranted}
				handleSwitchChange={enableNearbyLobbyMode}
				handleUpdateButton={fetchNearbyOrAllLobbies}
			/>
			<div className="px-4 grid grid-cols-1 sm:px-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{lobbies?.map((lobby) => (
					<LobbyCard key={lobby.id} lobby={lobby} />
				))}
			</div>
		</>
	);
}
