import axios from "axios";

const baseURL = `${import.meta.env.VITE_COUNTRIES_API_URL}`;

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

export default { getAll };
