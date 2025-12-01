export function parseTimeToTodayDate(time: string): Date {
	const [hour, minute] = time.split(":").map(Number);
	const now = new Date();
	now.setHours(hour, minute, 0, 0);
	return now;
}
