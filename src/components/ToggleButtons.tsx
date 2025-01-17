"use client";
import { colors } from "@/globalStyles";
import { useState } from "react";

export default function ToggleButtons() {
  const [hotSelected, setHotSelected] = useState(true);

  return (
    <div>
      <button
        className={`rounded-l-sm border-solid border-2 border-${
          colors.primaryYellow
        } bg-${
          hotSelected ? colors.primaryYellow : colors.primaryLime
        } w-16 h-12 text-${colors.primaryDark}`}
        onClick={() => setHotSelected(true)}
      >
        Hot
      </button>
      <button
        className={`rounded-r-sm border-solid border-2 border-${
          colors.primaryYellow
        } bg-${
          hotSelected ? colors.primaryLime : colors.primaryYellow
        } w-16 h-12 text-${colors.primaryDark}`}
        onClick={() => setHotSelected(false)}
      >
        New
      </button>
    </div>
  );
}
