"use client"

import {useState, useEffect} from 'react';
import { useLobby } from '../../_context/LobbyProviders';

export default function Time() {
    const { lobby, setIsStudyTime } = useLobby();

    const studyTime = lobby.studyMin * 60;
    const breakTime = lobby.breakMin * 60;
    const lobbyStartTime = Math.floor(new Date(lobby.startTime).getTime() / 1000);
    
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const totalElapsedTime = currentTime - lobbyStartTime;
            const timeWithInCycle = totalElapsedTime % (studyTime + breakTime);
            if (timeWithInCycle < studyTime){
                setIsStudyTime(true);
                setSeconds(studyTime - timeWithInCycle);
            } else {
                setIsStudyTime(false);
                setSeconds((studyTime + breakTime) - timeWithInCycle);
            }
        }, 1000);
        return () => clearInterval(interval);
        
    }, [breakTime, lobbyStartTime, setIsStudyTime, studyTime]);

    function formatedTime(second: number) {
        const min = Math.floor(second / 60);
        const sec = second % 60;

        const minStr = min.toString().padStart(2, "0");
        const secStr = sec.toString().padStart(2, "0");

        return minStr + ":" + secStr;
    }
    return (
        <h1>
            {formatedTime(seconds)}
        </h1 >
    )
}   
