export function GetRelativeTime(date: Date) {
     const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
        return `${diffSec} 秒前`;
    } else if (diffMin < 60) {
        return `${diffMin} 分前`;
    } else if (diffHour < 24) {
        return `${diffHour} 時間前`;
    } else  {
        return `${diffDay} 日前`;
    } 
}
