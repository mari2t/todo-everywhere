import { useState } from "react";
import axios from "axios";

// Hookを定義します
export const useCurrentPosition = () => {
  const [fromLatAndLonLocation, setFromLatAndLonLocation] = useState<{
    latitude: number;
    longitude: number;
    country?: string;
    cityName: string | null;
  } | null>(null);

  //　緯度と経度から現在地を取得する関数
  const getLocationFromLatAndLon = async (
    lat: number,
    lon: number
  ): Promise<{
    latitude: number;
    longitude: number;
    country: string | null;
    cityName: string | null;
  } | null> => {
    try {
      const encodedLat = encodeURIComponent(lat);
      const encodedLon = encodeURIComponent(lon);

      const response = await axios.get(`/api/CurrentPosition`, {
        params: {
          encodedLat: encodedLat,
          encodedLon: encodedLon,
        },
      });

      setFromLatAndLonLocation({
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
        country: response.data[0].country || null,
        cityName: response.data[0].name || null,
      });
      // 位置の名前を返す
      return {
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
        country: response.data[0].country || null,
        cityName: response.data[0].name || null,
      };
    } catch (error) {
      return null;
    } finally {
    }
  };

  return { fromLatAndLonLocation, getLocationFromLatAndLon };
};
