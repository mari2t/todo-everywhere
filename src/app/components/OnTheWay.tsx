import React, { useState, ReactNode } from "react";
import { useDepartureContext } from "../contexts/DepartureContext";
import TodoList from "./TodoList";
import Direction from "./Direction";
import SearchPlace from "./SearchPlace";

type Position = {
  latitude: number | null;
  longitude: number | null;
};

export default function OnTheWay() {
  const [searchWord, setSearchWord] = useState<string>("cafe"); // 検索ワード
  const [waypoints, setWaypoints] = useState<Position[]>([]); // 中継地点
  const [completedTasks, setCompletedTasks] = useState(0); // タスク終了状況

  const { displayComponent, setDisplayComponent } = useDepartureContext();

  const handleTodoListClick = () => {
    console.log("Status button clicked");
    setDisplayComponent("TodoList");
  };

  const handleDirectionClick = () => {
    console.log("Direction button clicked");
    setDisplayComponent("Direction");
  };

  const handleSearchPlaceClick = () => {
    console.log("Info button clicked");
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
