"use client";

import { useEffect, useState } from "react";
import { Lobby } from "@/features/lobby/types";
import { formattedTime } from "../lib/formatted-time";

export function usePomodoroTimer(lobby: Lobby): {
	time: string;
	isStudyTime: boolean;
} {
	const [isStudyTime, setIsStudyTime] = useState(true);
	const [seconds, setSeconds] = useState(0);

	const lobbyStartTime = Math.floor(new Date(lobby.startTime).getTime() / 1000);
	const studySec = lobby.studyMin * 60;
	const breakSec = lobby.breakMin * 60;

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = Math.floor(Date.now() / 1000);
			const totalElapsedTime = currentTime - lobbyStartTime;
			const timeWithInCycle = totalElapsedTime % (studySec + breakSec);
			if (timeWithInCycle < studySec) {
				setIsStudyTime(true);
				setSeconds(studySec - timeWithInCycle);
			} else {
				setIsStudyTime(false);
				setSeconds(studySec + breakSec - timeWithInCycle);
			}
		}, 1000);
		return () => clearInterval(interval);
	});

	return { time: formattedTime(seconds), isStudyTime };
}
