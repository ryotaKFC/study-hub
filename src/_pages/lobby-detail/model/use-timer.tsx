"use client";

import { useEffect, useState } from "react";
import schoolTime from "@/_pages/lobby-detail/config/school-time.json";
import { formattedTime } from "@/_pages/lobby-detail/lib/formatted-time";
import { parseTimeToTodayDate } from "@/_pages/lobby-detail/lib/parseTimeToTodayDate";
import type { Lobby } from "@/entities/lobby/types";

export function useTimer(lobby: Lobby): {
	time: string;
	isStudyTime: boolean;
} {
	const [isStudyTime, setIsStudyTime] = useState(false);
	const [seconds, setSeconds] = useState(0);

	const lobbyStartTime = Math.floor(new Date(lobby.startTime).getTime() / 1000);
	const studySec = lobby.studyMin * 60;
	const breakSec = lobby.breakMin * 60;

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const currentTime = Math.floor(now.getTime() / 1000);

			if (lobby.isInSchool) {
				// 学校ロビーの場合
				for (const period of schoolTime) {
					const now = new Date();
					const start = parseTimeToTodayDate(period.start);
					const end = parseTimeToTodayDate(period.end);
					const newIsStudyTime = period.isStudyTime === "true";

					if (now >= start && now < end) {
						const countdownSeconds = Math.floor(
							(end.getTime() - now.getTime()) / 1000,
						);
						setSeconds(countdownSeconds);
						if (isStudyTime !== newIsStudyTime) setIsStudyTime(newIsStudyTime);
					}
				}
			} else {
				// 通常ロビーの場合
				const totalElapsedTime = currentTime - lobbyStartTime;
				const timeWithInCycle = totalElapsedTime % (studySec + breakSec);

				if (timeWithInCycle < studySec) {
					if (!isStudyTime) setIsStudyTime(true);
					setSeconds(studySec - timeWithInCycle);
				} else {
					if (isStudyTime) setIsStudyTime(false);
					setSeconds(studySec + breakSec - timeWithInCycle);
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [breakSec, isStudyTime, lobby.isInSchool, lobbyStartTime, studySec]);

	return { time: formattedTime(seconds), isStudyTime };
}
