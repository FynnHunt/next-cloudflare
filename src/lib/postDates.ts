export function parsePostDate(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  if (typeof value === "string" && !value.trim()) return null;

  // Posts normally use milliseconds; also accept serialized date strings.
  const numeric = Number(value);
  const timestamp = Number.isNaN(numeric) && typeof value === "string"
    ? Date.parse(value)
    : numeric;

  return Number.isFinite(timestamp) && !Number.isNaN(new Date(timestamp).getTime())
    ? timestamp
    : null;
}

export function comparePostDatesNewestFirst(
  a: { date?: unknown },
  b: { date?: unknown },
): number {
  const first = parsePostDate(a.date);
  const second = parsePostDate(b.date);
  if (first === null) return second === null ? 0 : 1;
  if (second === null) return -1;
  return second - first;
}
