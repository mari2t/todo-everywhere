"use client";
import React from "react";
import { useDepartureContext } from "../contexts/DepartureContext";
import { BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";

export default function Arrival() {
  const { name, destination, todos, destinationPosition } =
    useDepartureContext();

  return (
    <div className="flex justify-center items-center ">
      <div
        style={{ width: "30vw", height: "85vh" }}
        className="mt-4 bg-white bg-opacity-60 backdrop-blur-md"
      >
        <div className="flex justify-center items-center h-3/5 pt-3 pl-3 pr-3 pb-2 mb-1">
          <iframe
            style={{
              width: "100%",
              height: "100%",
              border: "2px solid gray",
            }}
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_API_KEY_g}&location=${destinationPosition.latitude},${destinationPosition.longitude}&heading=210&pitch=10&fov=80`}
          ></iframe>
        </div>
        <div className="h-2/5 pb-3 pl-3 pr-3 mb-1">
          <div className="bg-white bg-opacity-40 border-2 border-gray-500 rounded h-full">
            <div className="flex mb-1 ml-2 pt-2">
              <IconContext.Provider value={{ color: "#413f3f", size: "2em" }}>
                <BsPersonCircle />
              </IconContext.Provider>
              <span className="pl-2 font-bold text-xl">{name}</span>
            </div>
            <h2 className="mb-1 ml-2 mt-2">やりました✔️</h2>
            {todos.map((todo, index) => (
              <div key={`todo-${index}`} className="flex ml-2">
                <label className="text-blue-800">#{todo.task}</label>
              </div>
            ))}
            <h2 className="ml-2 mb-2">いつか {destination} に行きたい！</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
