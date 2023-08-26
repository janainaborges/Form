import axios from 'axios';
import WEATHER_API from "@/environment/environment";
import { getCache, setCache } from "@/shared/cacheWeather";

const API_KEY = "376e2dc2a9d45321850f963fd91eee7c";

export const fetchWeatherData = async (lat: number, lon: number) => {
  const cacheKey = `weather_${lat}_${lon}`;

  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const response = await axios.get(endpoint);

    if (response.status !== 200) {
      throw new Error(
        `Failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = response.data;
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
