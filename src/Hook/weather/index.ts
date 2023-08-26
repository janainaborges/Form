"use client"
// useWeather.ts

import { useState, useEffect } from 'react';
import { getWeather } from '@/services/weather.service';

export const useWeather = () => {
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const notificationPermission = await Notification.requestPermission();

      if (notificationPermission !== 'granted') {
        console.error("Permission for notifications was denied");
      } else {
        navigator.geolocation.getCurrentPosition(async (position) => {
          new Notification("Permissão de localização concedida");
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const weatherData = await getWeather(lat, lon);
          setWeather(weatherData);
        }, (error) => {
          new Notification("Permissão de localização negada ou ocorreu um erro");
          console.error("Error getting location:", error);
        });
      }
    }

    requestPermissions();
  }, []);

  return weather;
};
