"use client";
import { createContext, useContext } from "react";
import React, { useState, ReactNode } from "react";

type Position = {
  latitude: number | null;
  longitude: number | null;
};

type CityAndCountry = {
  cityName: string | null;
  country: string | null;
};

type TodoType = {
  id: number;
  task: string;
  done: boolean;
};

type DepartureContextType = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  location: string | null;
  setLocation: React.Dispatch<React.SetStateAction<string | null>>;
  geocodingLocation: CityAndCountry;
  setGeocodingLocation: React.Dispatch<React.SetStateAction<CityAndCountry>>;
  geocodingDestination: CityAndCountry;
  setGeocodingDestination: React.Dispatch<React.SetStateAction<CityAndCountry>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  locationPosition: Position;
  setLocationPosition: React.Dispatch<React.SetStateAction<Position>>;
  destinationPosition: Position;
  setDestinationPosition: React.Dispatch<React.SetStateAction<Position>>;
  resetState: () => void;
  shouldRedirect: boolean;
  setShouldRedirect: React.Dispatch<React.SetStateAction<boolean>>;
  displayComponent: string;
  setDisplayComponent: React.Dispatch<React.SetStateAction<string>>;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  waypoints: Position[];
  setWaypoints: React.Dispatch<React.SetStateAction<Position[]>>;
  completedTasks: number;
  setCompletedTasks: React.Dispatch<React.SetStateAction<number>>;
};

export const DepartureContext = createContext<DepartureContextType | undefined>(
  undefined
);

// リセット用の初期定数
const INITIAL_NAME = "";
const INITIAL_LOCATION = null;
const INITIAL_DESTINATION = "";
const INITIAL_GEOCODING_LOCATION = {
  cityName: "Shibuya",
  country: "JP",
};
const INITIAL_GEOCODING_DESTINATION = {
  cityName: "Honolulu",
  country: "US",
};
const INITIAL_TODOS = [
  { id: 1, task: "", done: false },
  { id: 2, task: "", done: false },
  { id: 3, task: "", done: false },
];
const INITIAL_LOCATION_POSITION = { latitude: null, longitude: null };
const INITIAL_DESTINATION_POSITION = { latitude: null, longitude: null };
const INITIAL_COMPLETED_TASKS = 0;
const [shouldRedirect, setShouldRedirect] = useState(false);
const [displayComponent, setDisplayComponent] = useState<string>("TodoList");
const [searchWord, setSearchWord] = useState<string>("cafe");
const [waypoints, setWaypoints] = useState<Position[]>([]);
const [completedTasks, setCompletedTasks] = useState(0);

export default function DepartureProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string | null>("");
  const [destination, setDestination] = useState<string>("");
  const [geocodingLocation, setGeocodingLocation] = useState<CityAndCountry>({
    cityName: "Shibuya",
    country: "JP",
  });
  const [geocodingDestination, setGeocodingDestination] =
    useState<CityAndCountry>({
      cityName: "Honolulu",
      country: "US",
    });
  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, task: "", done: false },
    { id: 2, task: "", done: false },
    { id: 3, task: "", done: false },
  ]);
  const [locationPosition, setLocationPosition] = useState<Position>({
    latitude: null,
    longitude: null,
  });
  const [destinationPosition, setDestinationPosition] = useState<Position>({
    latitude: null,
    longitude: null,
  });
  const [completedTasks, setCompletedTasks] = useState<number>(0);

  // リセット関数
  function resetState() {
    setName(INITIAL_NAME);
    setLocation(INITIAL_LOCATION);
    setDestination(INITIAL_DESTINATION);
    setGeocodingLocation(INITIAL_GEOCODING_LOCATION);
    setGeocodingDestination(INITIAL_GEOCODING_DESTINATION);
    setTodos(INITIAL_TODOS);
    setLocationPosition(INITIAL_LOCATION_POSITION);
    setDestinationPosition(INITIAL_DESTINATION_POSITION);
    setCompletedTasks(INITIAL_COMPLETED_TASKS);
    setDisplayComponent("TodoList");
    setSearchWord("cafe");
    setWaypoints([]);
    setCompletedTasks(0);
  }

  return (
    <DepartureContext.Provider
      value={{
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
        completedTasks,
        setCompletedTasks,
        shouldRedirect,
        setShouldRedirect,
        displayComponent,
        setDisplayComponent,
        searchWord,
        setSearchWord,
        waypoints,
        setWaypoints,
        resetState,
      }}
    >
      {children}
    </DepartureContext.Provider>
  );
}

export function useDepartureContext() {
  const context = useContext(DepartureContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
}
