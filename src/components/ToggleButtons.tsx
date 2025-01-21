"use client";
import { colors } from "@/globalStyles";
import { useEffect, useState } from "react";

export default function ToggleButtons() {
  const [hotSelected, setHotSelected] = useState(true);

  useEffect(() => {
    if (window.location.search.includes("new")) {
      setHotSelected(false);
    } else {
      setHotSelected(true);
    }
  }, []);

  return (
    <div>
      <button
        className="rounded-l-md border-solid border-2 w-16 h-12"
        style={{
          backgroundColor: `${
            hotSelected ? colors.primaryYellow : colors.primaryLime
          }`,
          color: colors.primaryDark,
          borderColor: colors.primaryYellow,
        }}
        onClick={() => {
          setHotSelected(true);
          if (typeof window !== "undefined") {
            window.location.search = "hot";
          }
        }}
      >
        Hot
      </button>
      <button
        className={`rounded-r-md border-solid border-2 w-16 h-12`}
        onClick={() => {
          setHotSelected(false);
          if (typeof window !== "undefined") {
            window.location.search = "new";
          }
        }}
        style={{
          backgroundColor: `${
            hotSelected ? colors.primaryLime : colors.primaryYellow
          }`,
          color: colors.primaryDark,
          borderColor: colors.primaryYellow,
        }}
      >
        New
      </button>
    </div>
  );
}
