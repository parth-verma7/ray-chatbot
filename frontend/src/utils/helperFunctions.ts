export function formatTime(
  timestamp: number,
  isTimeAgo: boolean = false
): string {
  const date = new Date(timestamp);
  if (isTimeAgo) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days ago`;
    }
    if (hours > 0) {
      return `${hours} hours ago`;
    }
    if (minutes > 0) {
      return `${minutes} minutes ago`;
    }
    return `${seconds} seconds`;
  }
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleTimeString(undefined, options);
}

export const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e:any) {
    console.error(e);
    return false;
  }
};
