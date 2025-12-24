import { useState, useEffect } from "react";

type Location = {
  location:
    | {
        latitude: number;
        longitude: number;
      }
    | undefined;
  locationName: string;
};

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

export const useLocation = (): Location => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    if (
      window.sessionStorage.getItem("latitude") &&
      window.sessionStorage.getItem("longitude")
    ) {
      setLocation({
        latitude: parseFloat(window.sessionStorage.getItem("latitude")!),
        longitude: parseFloat(window.sessionStorage.getItem("longitude")!),
      });
    } else if ("geolocation" in navigator) {
      console.log("geo location available");
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        window.sessionStorage.setItem(
          "latitude",
          position.coords.latitude.toString()
        );
        window.sessionStorage.setItem(
          "longitude",
          position.coords.longitude.toString()
        );
      });
    } else {
      console.log("geo location not available");
    }
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem("locationName")) {
      setLocationName(window.sessionStorage.getItem("locationName")!);
      return;
    }

    const getAndSetLocation = async () => {
      try {
        if (location?.latitude && location?.longitude) {
          const geoLocationResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${location?.latitude}&lon=${location?.longitude}&format=json`
          );

          if (!geoLocationResponse.ok) {
            throw new Error(`Response status: ${geoLocationResponse.status}`);
          }

          const geoLocation: GeoLocation = await geoLocationResponse.json();

          if (geoLocation.address.hamlet) {
            setLocationNameFn(geoLocation.address.hamlet);
          } else if (geoLocation.address.village) {
            setLocationNameFn(geoLocation.address.village);
          } else if (geoLocation.address.town) {
            setLocationName(geoLocation.address.town);
          } else if (geoLocation.address.city) {
            setLocationNameFn(geoLocation.address.city);
          } else if (geoLocation.address.county) {
            setLocationNameFn(geoLocation.address.county);
          }
        }
      } catch (err) {
        console.log("Failed getting location data");
      }
    };

    getAndSetLocation();
  }, [location]);

  const setLocationNameFn = (name: string) => {
    setLocationName(name);
    window.sessionStorage.setItem("locationName", name);
  };

  return { location, locationName };
};
