import React, { useContext, useState, useEffect } from "react";
import { DepartureContext } from "../contexts/DepartureContext";

export default function Direction() {
  const context = useContext(DepartureContext);

  // Window size states
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      // Remove event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { geocodingLocation, geocodingDestination } = context;

  return (
    <div className="flex justify-center">
      <div
        className="bg-white bg-opacity-40 backdrop-blur-md flex"
        style={{ width: windowWidth / 2, height: (3 * windowHeight) / 5 }}
      >
        <iframe
          style={{
            width: "100%",
            height: "100%",
            border: "2px solid gray",
          }}
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_API_KEY_g}&origin=${geocodingLocation.cityName}+${geocodingLocation.country}&destination=${geocodingDestination.cityName}+${geocodingDestination.country}&mode=flying&maptype=satellite`}
        ></iframe>
      </div>
    </div>
  );
}
