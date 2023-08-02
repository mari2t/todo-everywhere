"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCityToLatLon } from "../hooks/useCityToLatLon";
import { useCurrentPosition } from "../hooks/useCurrentPosition";
import { useDepartureContext } from "../contexts/DepartureContext";
import { ImArrowDown } from "react-icons/im";
import { IconContext } from "react-icons";

type Position = {
  latitude: number | null;
  longitude: number | null;
};

const Departure = () => {
  const router = useRouter();
  const { fromLatAndLonLocation, getLocationFromLatAndLon } =
    useCurrentPosition();
  const { latLonFromCity, getLatLonFromCity } = useCityToLatLon();

  const {
    name,
    setName,
    location,
    setLocation,
    geocodingLocation,
    setGeocodingLocation,
    destination,
    setDestination,
    geocodingDestination,
    setGeocodingDestination,
    todos,
    setTodos,
    locationPosition,
    setLocationPosition,
    destinationPosition,
    setDestinationPosition,
    shouldRedirect,
    setShouldRedirect,
    setWaypoints,
  } = useDepartureContext();

  const cities = ["(select)", "Paris", "New york", "Singapore"];

  //　TODOを設定する関数
  const handleTodoChange = (id: number, task: string, done: boolean) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { id, task, done } : todo
    );
    setTodos(newTodos);
  };

  // 4個め以上のTODOを設定する関数
  const addTodo = () => {
    if (todos.length < 5) {
      const newTodo = {
        id: todos.length + 1,
        task: "",
        done: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  // 4個め以上のTODOを削除する関数
  const removeTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // ブラウザから現在地を取得する関数
  const getCurrentLocation = () => {
    let resultLocation: string | null = "";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (locationPosition) => {
        const latitude = locationPosition.coords.latitude;
        const longitude = locationPosition.coords.longitude;
        setLocationPosition({ latitude, longitude });
        getLocationFromLatAndLon(latitude, longitude).then((result) => {
          if (result !== null) {
            setLocationPosition(result);
            setGeocodingLocation(result);
            resultLocation = result.cityName;
            setLocation(resultLocation);
          } else {
            // nullが返されたときの処理をここに書く
            alert(
              "位置が特定できませんでした。From欄に入力してください。\nLocation not found.Please enter in the From field."
            );
          }
        });
      });
    } else {
      alert(
        "ジオロケーションはこのブラウザではサポートされていません。\nGeolocation is not supported by this browser."
      );
    }
  };

  const calculateWaypoints = () => {
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

  //　出発ボタンの関数　inputの確認とアラート
  const handleDeparture = () => {
    if (!name || !location || !destination || todos.some((todo) => !todo)) {
      alert("すべての項目を入力してください。\nPlease fill in all fields.");
    } else {
      alert("出発準備完了！\nReady to depart!");
      calculateWaypoints();
      setShouldRedirect(true);
      router.push("/OnTheWay");
    }
  };

  const handleEnterLocationInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLatLonFromLocation();
    }
  };

  const handleEnterDestinationInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLatLonFromDestination();
    }
  };

  // Locationの入力からLatとLonを取得する関数
  const setLatLonFromLocation = () => {
    if (location) {
      getLatLonFromCity(location).then((result) => {
        if (result !== null) {
          if (
            result.latitude != destinationPosition.latitude &&
            result.longitude != destinationPosition.longitude
          ) {
            setLocationPosition(result);
            setGeocodingLocation(result);
          } else {
            alert(
              "FromとToは別の場所を入力してください。\nPlease enter a different location for From and To."
            );
          }
        } else {
          alert(
            "位置が特定できませんでした。別の表記又は別の地名を入力してください。\nLocation not found.\nPlease enter another notation or another place name."
          );
        }
      });
    }
  };

  // Destinationの入力からLatとLonを取得する関数
  const setLatLonFromDestination = () => {
    if (destination) {
      getLatLonFromCity(destination).then((result) => {
        if (result !== null) {
          if (
            result.latitude != locationPosition.latitude &&
            result.longitude != locationPosition.longitude
          ) {
            setDestinationPosition(result);
            setGeocodingDestination(result);
          } else {
            alert(
              "FromとToは別の場所を入力してください。\nPlease enter a different location for From and To."
            );
          }
        } else {
          alert(
            "位置が特定できませんでした。別の表記又は別の地名を入力してください。\nLocation not found.\nPlease enter another notation or another place name."
          );
        }
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white bg-opacity-60 backdrop-blur-md w-3/4 h-3/4 ">
        <div className="bg-sky-900 text-white text-center  py-2 text-xl">
          BOARDING PASS
        </div>
        <div className="container mx-auto my-5 px-4  flex">
          <div className="w-3/5 pl-4">
            <div className="flex mb-2">
              <label className="w-1/5 font-medium text-lg">Name:</label>
              <input
                className="w-4/5 px-3 py-2 border rounded bg-opacity-10"
                type="text"
                value={name}
                placeholder="input your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex mb-2">
              <label className="w-1/5 font-medium text-lg">From:</label>
              <div className="w-4/5 flex gap-2">
                <input
                  className="w-3/4 px-3 py-2 border rounded"
                  type="text"
                  value={location || ""}
                  placeholder="input location(ex shibuya)"
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleEnterLocationInput}
                />
                <label className="w-1/6 text-center">or</label>
                <button
                  className="w-1/4 px-3 py-2 border rounded bg-blue-400 text-white text-xs"
                  onClick={getCurrentLocation}
                >
                  Get Location
                </button>
                <button
                  className="w-1/4 px-3 py-2 border rounded bg-blue-500 text-white text-xs"
                  onClick={setLatLonFromLocation}
                >
                  Confirm
                </button>
              </div>
            </div>
            <div className="flex mb-2">
              <label className="w-1/5 font-medium text-lg">To:</label>
              <div className="w-4/5 flex gap-2">
                <input
                  className="w-3/4 px-3 py-2 border rounded"
                  type="text"
                  value={destination}
                  placeholder="input destination(ex London)"
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyDown={handleEnterDestinationInput}
                />
                <label className="w-1/6 text-center">or</label>
                <select
                  className="w-1/4 px-3 py-2 border rounded bg-blue-400 text-white text-xs"
                  onChange={(e) => setDestination(e.target.value)}
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <button
                  className="w-1/4 px-3 py-2 border rounded bg-blue-500 text-white text-xs"
                  onClick={setLatLonFromDestination}
                >
                  Confirm
                </button>
              </div>
            </div>

            {todos.map((todo, index) => (
              <div key={`todo-${index}`} className="flex mb-2 ">
                <label className="w-1/5 font-medium text-lg">{`TODO #${
                  index + 1
                }:`}</label>
                <div className="w-4/5 flex gap-2">
                  <input
                    className={`w-${
                      index < 3 ? "full" : "4/5"
                    } px-3 py-2 border rounded `}
                    type="text"
                    value={todo.task}
                    placeholder="input your todo"
                    onChange={(e) =>
                      handleTodoChange(todo.id, e.target.value, todo.done)
                    }
                  />
                  {index >= 3 && (
                    <button
                      className="w-1/4 px-3 py-2 border rounded bg-red-500 text-white"
                      onClick={() => removeTodo(todo.id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              className={`w-full px-3 py-2 text-white rounded mb-2 ${
                todos.length >= 5
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-300"
              }`}
              disabled={todos.length >= 5}
              onClick={addTodo}
            >
              {todos.length >= 5
                ? "TODOはこれ以上登録できません"
                : "TODOを追加"}
            </button>
            <button
              className="w-full px-3 py-2 bg-blue-500 text-white rounded"
              onClick={handleDeparture}
            >
              Departure
            </button>
          </div>
          <div className="w-2/5 ">
            <label className=" m-1 pl-4">From:</label>
            <div className="justify-center m-1 pl-4">
              <iframe
                style={{
                  width: "90%",
                  height: "50%",
                  border: "2px solid gray",
                }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_API_KEY_g}&&q=${geocodingLocation.cityName}+${geocodingLocation.country}&zoom=8`}
              ></iframe>
            </div>
            <div className="flex justify-center mt-4 mb-2">
              <IconContext.Provider
                value={{
                  color: "rgb(12 74 110)",
                  size: "2em",
                }}
              >
                <ImArrowDown />
              </IconContext.Provider>
            </div>
            <label className="justify-center mb-1 pl-4">To:</label>
            <div className="justify-center m-1 pl-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departure;
