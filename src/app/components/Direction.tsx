import React, { useContext } from "react";
import { DepartureContext } from "../contexts/DepartureContext";

export default function Direction() {
  const context = useContext(DepartureContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { geocodingLocation, geocodingDestination } = context;

  return (
    <div className="flex justify-center">
      <div
        className="bg-white bg-opacity-60 backdrop-blur-md flex"
        style={{ width: "50vw", height: "60vh" }}
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
