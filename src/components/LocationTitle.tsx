"use client";

import { useLocation } from "@/app/hooks/useLocation";
import { colors } from "@/globalStyles";

export default function LocationTitle() {
  const location = useLocation();

  return (
    <div className="truncate pb-1 text-2xl font-semibold leading-[1.15] tracking-wide md:text-4xl">
      {location.locationName ? (
        <>
          Spotted near
          <span style={{ color: colors.primaryYellow }}>
            {" "}
            {location.locationName}
          </span>
        </>
      ) : (
        "Spotted near you"
      )}
    </div>
  );
}
