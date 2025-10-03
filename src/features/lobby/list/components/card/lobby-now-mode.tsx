"use client"

import { usePomodoroTimer } from "@/features/lobby/hooks/use-pomodoro-timer";
import { Lobby } from "@/features/lobby/types/lobby";

type Props = {
    lobby: Lobby,
}

export function NowMode({lobby}: Props) {
    const {isStudyTime} = usePomodoroTimer(lobby)
    return (
        <Card>
            {isStudyTime ? "勉強中" : "休憩中"}
        </Card>
    )
}
