import { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

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
        window.sessionStorage.setItem("latitude", position.coords.latitude.toString());
        window.sessionStorage.setItem(
          "longitude",
          position.coords.longitude.toString()
        );
      });
    } else {
      console.log("geo location not available");
    }
  }, []);

  return location;
};
