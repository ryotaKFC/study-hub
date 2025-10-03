"use client"

import { Card } from "@/components/ui/card";
import { usePomodoroTimer } from "@/features/lobby/hooks/use-pomodoro-timer";
import { Lobby } from "@/features/lobby/types/lobby";

type Props = {
    lobby: Lobby,
}

export function LobbyNowMode({lobby}: Props) {
    const {isStudyTime} = usePomodoroTimer(lobby)

    return (
        <Card className={`text-sm font-bold p-1 rounded-sm ${isStudyTime ? "bg-red-100/50" : "bg-lime-100/50"}`}>
            {isStudyTime ? "勉強中" : "休憩中"}
        </Card>
    )
}
