"use client";
import { useEffect } from "react";
import Header from "./components/Header";
import Departure from "./components/Departure";
import { useDepartureContext } from "./contexts/DepartureContext";

export default function Home() {
  const { resetState } = useDepartureContext();

  useEffect(() => {
    resetState();
  }, []); //

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden bg-[url('/img/airport.jpg')] bg-cover bg-center">
        <Header />
        <Departure />
      </div>
    </div>
  );
}
