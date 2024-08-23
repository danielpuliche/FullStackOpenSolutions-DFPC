import axios from "axios";

const baseURL = `${import.meta.env.VITE_WEATHER_API_URL}`;
const apiKey = `${import.meta.env.VITE_WEATHER_API_KEY}`;

const getWeatherWithLocation = (lat, lng) => {
  const completeURL = `${baseURL}?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
  return axios.get(completeURL).then((response) => response.data);
};

export default { getWeatherWithLocation };
