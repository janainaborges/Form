import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API;
console.log(API_BASE_URL)
const ApiFetchWeather = axios.create({
  baseURL: API_BASE_URL,
});

export default ApiFetchWeather;
