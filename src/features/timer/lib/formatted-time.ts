export function formattedTime(second: number) {
	const min = Math.floor(second / 60);
	const sec = second % 60;

	const minStr = min.toString().padStart(2, "0");
	const secStr = sec.toString().padStart(2, "0");

	return minStr + ":" + secStr;
}
