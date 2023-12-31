"use client";
import React from "react";
import { useDepartureContext } from "../contexts/DepartureContext";
import TodoList from "./TodoList";
import Direction from "./Direction";
import SearchPlace from "./SearchPlace";

export default function OnTheWay() {
  const { displayComponent, setDisplayComponent } = useDepartureContext();

  const handleTodoListClick = () => {
    setDisplayComponent("TodoList");
  };

  const handleDirectionClick = () => {
    setDisplayComponent("Direction");
  };

  const handleSearchPlaceClick = () => {
    setDisplayComponent("SearchPlace");
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="gap-2 mt-8 w-1/2 justify-center ">
          <button
            className="px-2 py-1 w-1/3 bg-black text-white rounded bg-opacity-60"
            onClick={handleTodoListClick}
          >
            現在のTODO
          </button>
          <button
            className="px-2 py-1 w-1/3 bg-black text-white rounded bg-opacity-60"
            onClick={handleDirectionClick}
          >
            現地までの経路
          </button>
          <button
            className="px-2 py-1 w-1/3 bg-black text-white rounded bg-opacity-60"
            onClick={handleSearchPlaceClick}
          >
            現地を検索
          </button>
        </div>
      </div>
      {displayComponent === "TodoList" && <TodoList />}
      {displayComponent === "Direction" && <Direction />}
      {displayComponent === "SearchPlace" && <SearchPlace />}
    </div>
  );
}
