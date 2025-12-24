"use client";

import { useLocation } from "@/app/hooks/useLocation";
import { colors } from "@/globalStyles";

export default function LocationTitle() {
  const location = useLocation();

  return (
    <div style={{ fontSize: "30px" }}>
      {location.locationName ? (
        <>
          Spotted:
          <span style={{ color: colors.primaryYellow }}>
            {" "}
            {location.locationName}
          </span>
        </>
      ) : (
        "Spotted"
      )}
    </div>
  );
}
