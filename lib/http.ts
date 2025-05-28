import axios from "axios";
import { toast } from "sonner";
import { authService } from "app/app/services/client/auth.service";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
  // console.log("Request Headers:", config.headers);
  const token = authService.getToken(); // get latest token from cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // Remove if no token
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error, "err");
    const message =
      error.response?.data?.error?.message ||
      error.message ||
      "Something went wrong";
    if (error.response?.status === 401) {
      toast.error(`Error: ${message}`);
      // toast.error("Unaauthorized, redirecting to login");
      //   window.location.href = "/login";
    }
    else if (error.response?.status === 500) {
      toast.error(`Something went wrong! Try again!!`);
      // toast.error("Unaauthorized, redirecting to login");
      //   window.location.href = "/login";
    } else {
      console.log(error, "err");
      toast.error(`Error: ${message}`);
    }
    return Promise.reject(error);
  }
);

export const post = async (endpoint: string, payload: any) => {
  return axiosInstance.post(endpoint, payload);
};
export default axiosInstance;
