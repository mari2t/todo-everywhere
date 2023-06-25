"use client";
import React from "react";
import Header from "../components/Header";
import OnTheWay from "../components/OnTheWay";

export default function page() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden bg-[url('/img/ontheway.jpg')] bg-cover bg-center">
        <Header />
        <OnTheWay />
      </div>
    </div>
  );
}
