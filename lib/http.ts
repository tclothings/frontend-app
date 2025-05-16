import axios from "axios";
import { title } from "process";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
