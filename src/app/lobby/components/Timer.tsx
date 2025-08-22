'use client'

import {useState, useEffect} from 'react';

export default function Timer() {
    const STUDY_TIME = 25 * 60;
    const BREAK_TIME = 5 * 60;

    const [seconds, setSeconds] = useState(STUDY_TIME);
    const [isStudyTime, setIsStudyTime] = useState(true);

    useEffect(() => {
        // 勉強⇔休憩　切替
        if (seconds <=0) {
            setSeconds(isStudyTime ? BREAK_TIME : STUDY_TIME);
            setIsStudyTime(isStudyTime ? false : true);
            return;
        }
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds -1);
        }, 1000);
        
        return () => clearInterval(interval);
    }, [seconds, isStudyTime, BREAK_TIME, STUDY_TIME]);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const remainingSeconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <h1 className='p-7 text-center text-8xl bg-emerald-100 rounded-xl text-emerald-900'>
            {formatTime(seconds)}
        </h1>
    );
}
