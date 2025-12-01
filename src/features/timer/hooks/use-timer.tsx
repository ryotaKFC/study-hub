"use client";

import { useEffect, useState } from "react";
import { Lobby } from "@/features/lobby/types";
import schoolTime from "../jsons/school-time.json";
import { formattedTime } from "../lib/formatted-time";
import { parseTimeToTodayDate } from "../lib/parseTimeToTodayDate";

export function useTimer(lobby: Lobby): {
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
			const now = new Date();
			const currentTime = Math.floor(now.getTime() / 1000);

			if (lobby.isInSchool) {
				// 学校モードの場合
				const totalElapsedTime = currentTime - lobbyStartTime;
				const timeWithInCycle = totalElapsedTime % (studySec + breakSec);

				if (timeWithInCycle < studySec) {
					setIsStudyTime(true);
					setSeconds(studySec - timeWithInCycle);
				} else {
					setIsStudyTime(false);
					setSeconds(studySec + breakSec - timeWithInCycle);
				}
			} else {
				// 通常モードの場合
				for (const period of schoolTime) {
					const now = new Date();
					const start = parseTimeToTodayDate(period.start);
					const end = parseTimeToTodayDate(period.end);

					if (now >= start && now < end) {
						const countdownSeconds = Math.floor(
							(end.getTime() - now.getTime()) / 1000,
						);
						setSeconds(countdownSeconds);
						setIsStudyTime(period.isStudyTime === "true");
					}
				}
			}
		});

		return () => clearInterval(interval);
	}, [breakSec, lobby.isInSchool, lobbyStartTime, studySec]);

	return { time: formattedTime(seconds), isStudyTime };
}
