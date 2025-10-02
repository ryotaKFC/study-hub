"use client"

import { Lobby } from "@/features/lobby/types/lobby";
import { useEffect, useState } from "react";


export function usePomodoroTimer(lobby: Lobby) {
    const [isStudyTime, setIsStudyTime] = useState(true);

    const [seconds, setSeconds] = useState(0);

    const lobbyStartTime = Math.floor(new Date(lobby.startTime).getTime() / 1000);
    const studySec = lobby.studyMin * 60;
    const breakSec = lobby.breakMin * 60;
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const totalElapsedTime = currentTime - lobbyStartTime ;
            const timeWithInCycle = totalElapsedTime % (studySec + breakSec);
            if (timeWithInCycle < studySec){
                setIsStudyTime(true);
                setSeconds(studySec - timeWithInCycle);
            } else {
                setIsStudyTime(false);
                setSeconds((studySec + breakSec) - timeWithInCycle);
            }
        }, 1000);
        return () => clearInterval(interval);
    })

    function formattedTime(second: number) {
        const min = Math.floor(second / 60);
        const sec = second % 60;

        const minStr = min.toString().padStart(2, "0");
        const secStr = sec.toString().padStart(2, "0");

        return minStr + ":" + secStr;
    }

    return {time: formattedTime(seconds), isStudyTime };

}
