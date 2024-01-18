import axios from "axios";
const baseURL = "https://hcqs.azurewebsites.net";

export const api = axios.create();

api.interceptors.request.use((config) => {
  config = {
    ...config,
    baseURL,
  };
  return config;
});
