import axios from "axios";

const baseURL = "http://localhost:8000/";

const instance = axios.create({
  baseURL: baseURL,
});

const instanceWithoutHeaders = axios.create({
  baseURL: baseURL,
});

export { instance as default, instanceWithoutHeaders };
export { baseURL };
