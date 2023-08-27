import ApiFetchWeather from "@/core/apiWeather";
import { getCache, setCache } from "@/shared/cacheWeather";

const API_KEY = "376e2dc2a9d45321850f963fd91eee7c";

export const fetchWeatherData = async (lat: number, lon: number) => {
  const cacheKey = `weather_${lat}_${lon}`;

  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const endpoint = `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const response = await ApiFetchWeather.get(endpoint);

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

interface WeatherData {
  temp: number;
  condition: string;
  city: string;
  max: number;
  min: number;
}

export const getWeather = async (
  lat: number,
  lon: number
): Promise<WeatherData | null> => {
  const data = await fetchWeatherData(lat, lon);

  if (data && data.main && data.weather) {
    return {
      temp: data.main.temp,
      max: data.main.temp_max,
      min: data.main.temp_min,
      condition: data.weather[0].description,
      city: data.name,
    };
  } else {
    console.error("Unexpected data format:", data);
    return null;
  }
};
