'use client'

import {useState, useEffect} from 'react';
import { Lobby } from "../hooks/useLobby";

type Props = {
    lobby: Lobby
    setIsStudyTime: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Timer({ lobby, setIsStudyTime } : Props) {
    // const studyTime = (lobby?.study_min ?? 0) * 60;
    const studyTime = lobby.study_min * 60;
    const breakTime = (lobby?.break_min ?? 0) * 60;
    const lobbyStartTime = Math.floor(new Date(lobby?.start_time ?? 0).getTime() / 1000);
    console.log(studyTime);
    
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
        <h1 className='p-7 text-center text-8xl bg-emerald-100 rounded-xl text-emerald-900'>
            {formatedTime(seconds)}
        </h1>
    );
}
