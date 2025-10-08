"use client"

import { useLobbies } from "./use-lobbies";
import { LobbyCard } from "./components/card/lobby-card";
import { LobbiesController } from "./components/lobbies-controller";


export default function Lobbies() {
    const {lobbies, isLoading, isGeolocationGranted, enableNearbyLobbyMode} = useLobbies();
    if (isLoading) return <p>ロード中...</p>
    
    return (
        <>
            <LobbiesController isGeolocationGranted={isGeolocationGranted} handleSwitchChange={enableNearbyLobbyMode} />
            <div className="px-4 grid grid-cols-1 sm:px-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {lobbies?.map((lobby) => (
                    <LobbyCard key={lobby.id} lobby={lobby} />
                ))}
            </div>
        </>
    )
}
