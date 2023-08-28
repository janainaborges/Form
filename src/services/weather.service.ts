import ApiFetchWeather from "@/core/apiWeather";
import { RawWeatherData } from "@/types/Weather/WeatherData.types";

const API_KEY = "376e2dc2a9d45321850f963fd91eee7c";

export const fetchWeatherData = async (lat: number, lon: number): Promise<RawWeatherData> => {
  const endpoint = `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
  
  try {
    const response = await ApiFetchWeather.get<RawWeatherData>(endpoint);
    if (response.status !== 200) {
      throw new Error(`Failed with status ${response.status}: ${response.statusText}`);
    }
    return response.data;
  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      console.error("Request took too long!", error.message);
    } else {
      console.error("Error fetching weather data:", error);
    }
    throw error;
  }
};
