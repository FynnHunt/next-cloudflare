"use client";

import { useLocation } from "@/app/hooks/useLocation";
import { colors } from "@/globalStyles";
import { useEffect, useState } from "react";

type Address = {
  hamlet?: string;
  village?: string;
  town?: string;
  city?: string;
  county: string;
};

type GeoLocation = {
  address: Address;
};

export default function LocationTitle() {
  const [locationName, setLocationName] = useState("");

  const location = useLocation();

  useEffect(() => {
    const getAndSetLocation = async () => {
      try {
        const geoLocationResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${location?.latitude}&lon=${location?.longitude}&format=json`,
        );

        if (!geoLocationResponse.ok) {
          throw new Error(`Response status: ${geoLocationResponse.status}`);
        }

        const geoLocation: GeoLocation = await geoLocationResponse.json();

        if (geoLocation.address.hamlet) {
          setLocationName(geoLocation.address.hamlet);
        } else if (geoLocation.address.village) {
          setLocationName(geoLocation.address.village);
        } else if (geoLocation.address.town) {
          setLocationName(geoLocation.address.town);
        } else if (geoLocation.address.city) {
          setLocationName(geoLocation.address.city);
        } else if (geoLocation.address.county) {
          setLocationName(geoLocation.address.county);
        }
      } catch (err) {
        console.log("Failed getting location data");
      }
    };

    getAndSetLocation();
  }, [location]);

  return (
    <div style={{ fontSize: "30px" }}>
      {locationName ? (
        <>
          Spotted:
          <span style={{ color: colors.primaryYellow }}> {locationName}</span>
        </>
      ) : (
        "Spotted"
      )}
    </div>
  );
}
