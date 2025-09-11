"use client"

import { useLobby } from "../_context/LobbyProviders";

export default function LobbyTitle() {
    const { lobby } = useLobby();

    return (
        <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            🏠 ロビー  「{lobby.name}」 #{lobby.id}
        </h1>
    )
}
