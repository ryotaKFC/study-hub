"use client"

import React from "react"
import { Lobby } from "../../types/lobby"
import { LobbyProvider } from "../lobby-provider"
import LobbyTitle from "./lobby-title"
import Tips from "./lobby-tips"
import LobbyChat from "./lobby-chat"
import LobbyMember from "./lobby-member"
import LobbyTimer from "./lobby-timer"

const previewLobby: Lobby = {
    id: "prev",
    name: "テストロビー",
    startTime: "2025-10-03T04:17:37.354Z",
    studyMin: 25,
    breakMin: 5,
    isPrivate: false,
    location: {lat:0, lng:0},
    locationName: "テストロビー",
}

export function LobbyPreview() {
    return (
        <LobbyProvider lobby={previewLobby}>
            <main className="mx-5 sm:mx-14 my-7 space-y-5">
                <LobbyTitle />
                <LobbyTimer />
                <LobbyChat />
                <LobbyMember />
                <Tips />
            </main>
        </ LobbyProvider>
    )
}
