import axios from "axios";
import { BASE_API_URL, SSO_URL } from "@/constant/CommonConstant";

export const request = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const returnUrl = window.location.href;
      window.location.href = `${SSO_URL}/masuk?b=${returnUrl}`;
    }
    return Promise.reject(error);
  }
);
