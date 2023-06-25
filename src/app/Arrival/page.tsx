import React from "react";
import Header from "../components/Header";
import Arrival from "../components/Arrival";

export default function page() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden bg-[url('/img/arrival.jpg')] bg-cover bg-center">
        <Header />
        <Arrival />
      </div>
    </div>
  );
}
