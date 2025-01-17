"use client";
import { colors } from "@/globalStyles";
import { useState } from "react";

export default function ToggleButtons() {
  const [hotSelected, setHotSelected] = useState(true);

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
        onClick={() => setHotSelected(true)}
      >
        Hot
      </button>
      <button
        className={`rounded-r-md border-solid border-2 w-16 h-12`}
        onClick={() => setHotSelected(false)}
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
