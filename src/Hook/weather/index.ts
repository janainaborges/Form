import { useState, useEffect } from 'react';
import { WeatherData } from '@/types/Weather/WeatherData.types';
import { fetchWeatherData } from '@/services/weather.service';

export const useFetchWeather = (lat: number, lon: number) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchWeatherData(lat, lon);
        const data: WeatherData = {
          temp: rawData.main.temp,
          max: rawData.main.temp_max,
          min: rawData.main.temp_min,
          condition: rawData.weather[0].description,
          city: rawData.name,
        };
        setWeatherData(data);
      } catch (err) {
        setError("Error fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    if (lat !== -1 && lon !== -1) fetchData(); 
  }, [lat, lon]);

  return { weatherData, loading, error };
};

export const useWeather = () => {
  const [coords, setCoords] = useState<{lat: number, lon: number}>({lat: -1, lon: -1});
  const [locationError, setLocationError] = useState<string | null>(null);
  const { weatherData, loading, error } = useFetchWeather(coords.lat, coords.lon);

  const handleLocation = (position: GeolocationPosition) => {
    setCoords({ 
      lat: position.coords.latitude, 
      lon: position.coords.longitude 
    });
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    console.error("Error getting location:", error);
    setLocationError("Error getting location");
  }

  useEffect(() => {
    const requestPermissions = async () => {
      const notificationPermission = await Notification.requestPermission();

      if (notificationPermission === 'granted') {
        navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError);
      } else {
        setLocationError("Permission for notifications was denied");
      }
    };

    requestPermissions();
  }, []);

  return { weather: weatherData, loading, error: error || locationError };
};
