import { useMutation } from "@tanstack/react-query";
import http from "app/lib/http";

export const usePayment = () => {

  const initiatePayment = useMutation({
    mutationFn: async (data: any) => {
      let url = "payments/initialize";
      const result = await http.post(url, data);
      return result?.data;
    },
  });

  const verifyPayment = useMutation({
    mutationFn: async (data: any) => {
      let url = "payments/verify";
      const result = await http.post(url, data);
      return result?.data;
    },
  });

  
  return { initiatePayment, verifyPayment };
};
