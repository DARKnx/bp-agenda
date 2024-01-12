import axios, { AxiosInstance} from "axios";

import config from '../assets/config/default';

const api: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      config.headers["authorization"] = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
