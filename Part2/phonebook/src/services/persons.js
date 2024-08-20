import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => axios.get(baseURL).then((response) => response.data);

const create = (newObject) =>
  axios.post(baseURL, newObject).then((response) => response.data);

export default { getAll, create };
