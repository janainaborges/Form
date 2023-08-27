export interface WeatherData {
  temp: number;
  condition: string;
  city: string;
  max: number;
  min: number;
}

export interface RawWeatherData {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  name: string;
}
