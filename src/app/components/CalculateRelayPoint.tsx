import React, { useEffect, useState } from "react";

type Position = {
  latitude: number | null;
  longitude: number | null;
};

type Todo = {
  id: number;
  content: string;
  done: boolean;
};

const CalculateRelayPoint = () => {
  // フックを包含する新しい関数コンポーネント
  const [locationPosition, setLocationPosition] = useState<Position>({
    latitude: null,
    longitude: null,
  });

  const [destinationPosition, setDestinationPosition] = useState<Position>({
    latitude: null,
    longitude: null,
  });

  const [todos, setTodos] = useState<Todo[]>([]);

  // 中継地点を格納するためのState
  const [relayPoints, setRelayPoints] = useState<Position[]>([]);

  // Todoの状態が更新された時、中継地点を計算する
  useEffect(() => {
    if (
      locationPosition.latitude &&
      locationPosition.longitude &&
      destinationPosition.latitude &&
      destinationPosition.longitude
    ) {
      const deltaLatitude =
        (destinationPosition.latitude - locationPosition.latitude) /
        todos.length;
      const deltaLongitude =
        (destinationPosition.longitude - locationPosition.longitude) /
        todos.length;

      const newRelayPoints: Position[] = [];
      for (let i = 1; i < todos.length; i++) {
        newRelayPoints.push({
          latitude: locationPosition.latitude + deltaLatitude * i,
          longitude: locationPosition.longitude + deltaLongitude * i,
        });
      }
      setRelayPoints(newRelayPoints);
    }
  }, [todos, locationPosition, destinationPosition]);

  return null;
};

export default CalculateRelayPoint;
