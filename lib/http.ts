import axios, { AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { authService } from "app/services/auth.service";

 interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  suppressToast?: boolean;
  suppress401Toast?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// axiosInstance.interceptors.request.use((config) => {
//   // console.log("Request Headers:", config.headers);
//   // const token = authService.getToken(); // get latest token from cookies

//   if (authService.token && typeof window !== "undefined") {
//     config.headers.Authorization = `Bearer ${authService.token}`;
//   } else {
//     delete config.headers.Authorization; // Remove if no token
//   }
//   return config;
// });
axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = await authService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config as CustomAxiosRequestConfig;;
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      "Something went wrong";
    console.log(message, "message", error);
    const suppress401 = config?.suppress401Toast;
    const suppressToast = config?.suppressToast;
    console.log(error, "errors");
    if (!suppressToast) {
      if (error.response?.status === 401) {
        if (!suppress401) {
          toast.error(`Error: ${message}`);
          // toast.error("Unaauthorized, redirecting to login");
          window.location.href = "/login";
        }
      } else if (error.response?.status === 500) {
        toast.error(`Something went wrong! Try again!!`);
        // toast.error("Unaauthorized, redirecting to login");
        //   window.location.href = "/login";
      } else {
        // console.log(error, "err");
        toast.error(`Error: ${message}`);
      }
    }
    error.customMessage = message;

    return Promise.reject(error);
  }
);
export const get = async (url: string, config?: any) => {
  if (authService.token && typeof window !== "undefined") {
    config.headers.Authorization = `Bearer ${authService.token}`;
  }
  return axiosInstance.get(url, config);
};
export const post = async (
  endpoint: string,
  payload: any,
  config: CustomAxiosRequestConfig = {}
) => {
  if (authService.token && typeof window !== "undefined") {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${authService.token}`;
  }
  return axiosInstance.post(endpoint, payload, config);
};
export default axiosInstance;
