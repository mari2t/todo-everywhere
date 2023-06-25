import { useState } from "react";
import axios from "axios";

export const useCityToLatLon = () => {
  const [latLonFromCity, setLatLonFromCity] = useState<{
    latitude: number;
    longitude: number;
    country?: string;
    cityName: string | null;
  } | null>(null);

  // 都市名から緯度と経度を取得する関数
  const getLatLonFromCity = async (
    city: string
  ): Promise<{
    latitude: number;
    longitude: number;
    country: string | null;
    cityName: string | null;
  } | null> => {
    try {
      const encodedCity = encodeURIComponent(city);
      console.log(city);
      const response = await axios.get(`/api/GetLatLon`, {
        params: {
          city: encodedCity,
        },
      });

      setLatLonFromCity({
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
        country: response.data[0].country || null,
        cityName: response.data[0].name || null, // ここで cityName が undefined の場合は null を設定
      });

      // 位置の名前を返す
      console.log(response.data);
      console.log(response.data[0].country);
      console.log(response.data[0].name);
      return {
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
        country: response.data[0].country || null,
        cityName: response.data[0].name || null, // ここで cityName が undefined の場合は null を設定
      };
    } catch (error) {
      return null;
    }
  };

  return { latLonFromCity, getLatLonFromCity };
};
