import axios from "axios";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather"
const ApiFetchWeather = axios.create({
  baseURL: apiUrl,
});

export default ApiFetchWeather;
