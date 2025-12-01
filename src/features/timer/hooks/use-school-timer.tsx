import { useEffect, useState } from "react";
import schoolTime from "../jsons/school-time.json";
import { formattedTime } from "../lib/formatted-time";

function parseTimeToTodayDate(time: string): Date {
	const [hour, minute] = time.split(":").map(Number);
	const now = new Date();
	now.setHours(hour, minute, 0, 0);
	return now;
}

export function useSchoolTimer(): {
	timer: string;
	isStudyTime: boolean;
} {
	const [seconds, setSeconds] = useState(0);
	const [isStudyTime, setIsStudyTime] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();

			for (const period of schoolTime) {
				const start = parseTimeToTodayDate(period.start);
				const end = parseTimeToTodayDate(period.end);

				if (now >= start && now < end) {
					// end time - current time ?
					const countdownSeconds = Math.floor(
						(end.getTime() - now.getTime()) / 1000,
					);
					setSeconds(countdownSeconds);

					setIsStudyTime(period.isStudyTime === "true");
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	});

	return { timer: formattedTime(seconds), isStudyTime };
}
