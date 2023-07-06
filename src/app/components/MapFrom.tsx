type GeocodingDestination = {
  cityName: string | null;
  country: string | null;
};

export default function MapFrom({
  geocodingDestination,
}: {
  geocodingDestination: GeocodingDestination;
}) {
  return (
    <div>
      {" "}
      <iframe
        style={{
          width: "90%",
          height: "50%",
          border: "2px solid gray",
        }}
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_API_KEY_g}&&q=${geocodingDestination.cityName}+${geocodingDestination.country}&zoom=8`}
      ></iframe>
    </div>
  );
}
