"use client";
import { useLocation } from "@/app/hooks/useLocation";
import Icon from "./Icon";
export default function LocationTitle() {
  const { locationName } = useLocation();
  return (
    <span className="location-pill">
      <span className="status-dot" />
      <Icon name="pin" size={14} />
      {locationName || "Your neighborhood"}
      <span className="location-radius">3 km radius</span>
    </span>
  );
}
