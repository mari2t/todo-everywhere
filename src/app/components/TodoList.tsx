import React, { useEffect } from "react";
import { useDepartureContext } from "../contexts/DepartureContext";
import { useRouter } from "next/navigation";

type TodoType = {
  id: number;
  task: string;
  done: boolean;
};
type Position = {
  latitude: number | null;
  longitude: number | null;
};

//受け取るプロップスの定義
type TodoListProps = {
  waypoints: Position[];
  setWaypoints: React.Dispatch<React.SetStateAction<Position[]>>;
  completedTasks: number;
  setCompletedTasks: React.Dispatch<React.SetStateAction<number>>;
};

const TodoList: React.FunctionComponent = () => {
  const {
    name,
    location,
    destination,
    todos,
    setTodos,
    locationPosition,
    destinationPosition,
    waypoints,
    setWaypoints,
    completedTasks,
    setCompletedTasks,
  } = useDepartureContext();

  const router = useRouter();

  // 中継地計算
  useEffect(() => {
    if (
      locationPosition.latitude &&
      locationPosition.longitude &&
      destinationPosition.latitude &&
      destinationPosition.longitude &&
      todos.length
    ) {
      let newWaypoints: Position[] = [];
      for (let i = 1; i < todos.length; i++) {
        let ratio = i / todos.length;
        let newLatitude = lerp(
          locationPosition.latitude,
          destinationPosition.latitude,
          ratio
        );
        let newLongitude = lerp(
          locationPosition.longitude,
          destinationPosition.longitude,
          ratio
        );

        // Convert to 5 decimal places and parse back to a number
        newLatitude = parseFloat(newLatitude?.toFixed(5) || "");
        newLongitude = parseFloat(newLongitude?.toFixed(5) || "");

        newWaypoints.push({ latitude: newLatitude, longitude: newLongitude });
      }
      setWaypoints(newWaypoints);
    }
  }, [todos, locationPosition, destinationPosition]);

  const handleTodoClick = (index: number) => {
    console.log(`Todo ${index} completed`);

    setTodos((prev) =>
      prev.map((item, i) => (i === index ? { ...item, done: true } : item))
    );
    setCompletedTasks((prev) => prev + 1);

    // Display the next waypoint
    if (completedTasks < waypoints.length) {
      console.log(`Waypoint ${completedTasks}:`, waypoints[completedTasks]);
    } else if (completedTasks === waypoints.length) {
      console.log("Destination:", destinationPosition);
    }
  };

  // Linear interpolation function
  function lerp(
    start: number | null,
    end: number | null,
    ratio: number
  ): number | null {
    if (start === null || end === null) return null;
    return start + ratio * (end - start);
  }

  const progress = (completedTasks / todos.length) * 100;

  useEffect(() => {
    if (progress === 100) {
      router.push("/Arrival");
    }
  }, [progress]);

  return (
    <div className="flex justify-center">
      <div
        className="bg-white bg-opacity-40 backdrop-blur-md flex"
        style={{ width: "50vw", height: "60vh" }}
      >
        <div className="w-1/2 h-full">
          <div className="">
            <span className="font-semibold">Name: </span>
            <span>{name}</span>
          </div>
          <div className="">
            <span className="font-semibold">From:</span>
            <span>{location}</span>{" "}
          </div>{" "}
          <div className="">
            <span className="font-semibold">To:</span>
            <span>{destination}</span>
          </div>
          <p className="font-semibold">Todo: </p>
          <div className="mb-4 flex flex-col">
            {todos.map((todo, index) => (
              <button
                key={index}
                onClick={() => handleTodoClick(index)}
                disabled={todo.done}
                className={`m-2 py-1 px-4 rounded shadow-md cursor-pointer transition-colors duration-200 ${
                  todo.done
                    ? "bg-gray-300 text-gray-500 line-through cursor-default"
                    : "bg-white hover:bg-blue-200"
                }`}
              >
                {todo.task}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="mb-2 text-lg font-medium">Progress</h2>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-md">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-blue-500"
              ></div>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-full">
          <h3 className="font-semibold">Current location</h3>
          <div className="h-4/5">
            <iframe
              style={{
                width: "100%",
                height: "100%",
              }}
              className="px-2 h-1/5"
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/view?key=${
                process.env.NEXT_PUBLIC_API_KEY_g
              }&center=${
                completedTasks === todos.length
                  ? destinationPosition.latitude
                  : completedTasks > 0
                  ? waypoints[completedTasks - 1]?.latitude
                  : locationPosition.latitude
              },${
                completedTasks === todos.length
                  ? destinationPosition.longitude
                  : completedTasks > 0
                  ? waypoints[completedTasks - 1]?.longitude
                  : locationPosition.longitude
              }&zoom=4&maptype=satellite`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
