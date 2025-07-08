import { useQuery } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "./queryKeys";

export const useCheckout = () => {
  const shippingCostList = useQuery({
    queryKey: [KEYS.SHIPPINGLIST],
    queryFn: async () => {
      let url = "orders/shipping-costs";
      const result = await http.get(url);
      return result?.data;
    },
  });

  return { shippingCostList };
};
