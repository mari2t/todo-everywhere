import { useEffect } from "react";
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

  const handleTodoClick = (index: number) => {
    setTodos((prev) =>
      prev.map((item, i) => (i === index ? { ...item, done: true } : item))
    );
    setCompletedTasks((prev) => prev + 1);

    if (completedTasks < waypoints.length) {
    } else if (completedTasks === waypoints.length) {
      router.push("/Arrival");
    }
  };

  const progress = (completedTasks / todos.length) * 100;

  return (
    <div className="flex justify-center">
      <div
        className="bg-white bg-opacity-60 backdrop-blur-md flex"
        style={{ width: "50vw", height: "60vh" }}
      >
        <div className="w-1/2 h-full  p-1 shadow-md rounded-lg">
          <div>
            <h2 className="text-xl font-semibold mb-1">Travel Information</h2>
            <div className="flex mb-1">
              <span className="font-medium text-lg w-1/4">Name: </span>
              <span className="text-lg">{name}</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium text-lg w-1/4">From:</span>
              <span className="text-lg">{location}</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium text-lg w-1/4">To:</span>
              <span className="text-lg">{destination}</span>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-1">Todo: </h2>
          <div className="mb-1 flex flex-col">
            {todos.map((todo, index) => (
              <button
                key={index}
                onClick={() => handleTodoClick(index)}
                disabled={todo.done}
                className={`m-1 py-1 px-2 rounded shadow-md transition-all duration-200 ${
                  todo.done
                    ? "bg-gray-300 text-gray-500 line-through cursor-default"
                    : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
              >
                {todo.task}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <h2 className="mb-1 text-lg font-medium">Progress</h2>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-blue-500"
              ></div>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-full">
          <h3 className="text-xl font-semibold mb-1">Current location</h3>
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
