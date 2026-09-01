export default function Icon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const paths: Record<string, string> = {
    pin: "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    home: "m3 10 9-7 9 7v10H3Z M9 20v-7h6v7",
    arrow: "M5 12h14m-5-5 5 5-5 5",
    plus: "M12 5v14M5 12h14",
    spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z",
    shield: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z m-4 6 3 3 5-6",
    chat: "M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z",
    trend: "m3 17 6-6 4 4 8-10m-6 0h6v6",
    clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M12 7v5l3 2",
    up: "m6 14 6-6 6 6",
    down: "m6 10 6 6 6-6",
    close: "m6 6 12 12M6 18 18 6",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.chat} />
    </svg>
  );
}
