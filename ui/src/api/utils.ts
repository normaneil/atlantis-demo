/* eslint-disable */
import axios, { AxiosInstance } from "axios";
// const BASE_URL = process.env.VUE_APP_API_URL;
const BASE_URL = import.meta.env.VITE_API_URL;

export function getAxiosInstance() {
  const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL
  });

  apiClient.interceptors.request.use(
    async (config: any) => {
      const accessToken = window.localStorage.getItem("authtoken");
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // Add a response interceptor
  apiClient.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return apiClient;
}
