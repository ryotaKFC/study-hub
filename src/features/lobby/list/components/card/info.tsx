"use client"

import { Lobby } from "@/features/lobby/types/lobby";


type Props = {
    lobby: Lobby;
}

export default function LobbyInfo({lobby}: Props) {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <p>勉強時間</p>
                <p>{lobby.studyMin} 分</p>
            </div>
            <div className="flex justify-between">
                <p>休憩時間</p>
                <p>{lobby.breakMin} 分</p>
            </div>
            <div className="flex justify-between">
                <p>開始時刻</p>
                <p>{new Date(lobby.startTime).toLocaleString()}</p>
            </div>
        </div>
    )
}
