import axios from "axios";
import Storage from "@/helper/Storage";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  // timeout: 2000
});

const authInterceptor = (config) => {
  const token = Storage.Get("token", {}, "string");
  config.headers["Accept"] = "application/json";
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
};
API.interceptors.request.use(authInterceptor);


axios.interceptors.response.use(function (response) {
  if (response.config.method !== 'get' && response.data.message) {
    toast.success(response.data.message);
  }
  return response;
}, function (error) {
  return Promise.reject(error.response.data);
});

export default API;
