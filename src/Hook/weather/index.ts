import { useState, useEffect } from 'react';
import { getWeather } from '@/services/weather.service';
import { WeatherData } from '@/types/Weather/WeatherData.types';



export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const weatherData = await getWeather(lat, lon);
      setWeather(weatherData);
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Error fetching weather data");
    }
  }

  const handleLocation = (position: GeolocationPosition) => {
    new Notification("Permissão de localização concedida");
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherData(lat, lon);
  }

  const handleLocationError = (error: GeolocationPositionError) => {
    new Notification("Permissão de localização negada ou ocorreu um erro");
    console.error("Error getting location:", error);
    setError("Error getting location");
  }

  useEffect(() => {
    const weatherDataFromStorage = localStorage.getItem('weatherData');
    if (weatherDataFromStorage) {
      setWeather(JSON.parse(weatherDataFromStorage));
    } else {
      const requestPermissions = async () => {
        const notificationPermission = await Notification.requestPermission();

        if (notificationPermission === 'granted') {
          navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError);
        } else {
          console.error("Permission for notifications was denied");
          setError("Permission for notifications was denied");
        }
      }

      requestPermissions();
    }
  }, []);

  return { weather, error };
};
