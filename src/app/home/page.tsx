"use client";

import useCEPSearch from "@/Hook/cep";
import { useWeather } from "@/Hook/weather";

export default function Home() {
  const weather = useWeather();
  const { streetName, setStreetName, results, handleSearch } = useCEPSearch();

  return (
    <div>
      <div>
        {weather && (
          <div>
            <p>Temperature: {weather.temp}°C</p>
            <p>Condition: {weather.condition}</p>
          </div>
        )}
      </div>
      <div>
        <input
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {results.map((result) => (
            <li key={result.cep}>{result.cep}</li>
          ))}
        </ul>
      </div>
      oie
    </div>
  );
}
