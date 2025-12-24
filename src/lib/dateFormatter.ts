export function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diffMs = Math.max(0, now - timestamp);
  const diffSeconds = Math.floor(diffMs / 1000);

  const units = [
    { label: "yr", seconds: 60 * 60 * 24 * 365 },
    { label: "mo", seconds: 60 * 60 * 24 * 30 },
    { label: "d",  seconds: 60 * 60 * 24 },
    { label: "hr", seconds: 60 * 60 },
    { label: "min", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diffSeconds / unit.seconds);
    if (value >= 1) {
      return `${value}${unit.label} ago`;
    }
  }

  return "just now";
}
