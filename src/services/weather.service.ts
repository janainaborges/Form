import { fetchWeatherData } from '@/core/apiWeather';

interface WeatherData {
  temp: number;
  condition: string;
}

export const getWeather = async (lat: number, lon: number): Promise<WeatherData | null> => {
    const data = await fetchWeatherData(lat, lon);

    if (data && data.main && data.weather) {
      return {
        temp: data.main.temp,
        condition: data.weather[0].description
      };
    } else {
      console.error("Unexpected data format:", data);
      return null;
    }
}
