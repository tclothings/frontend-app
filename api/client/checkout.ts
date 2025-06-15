import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "./queryKeys";

export const useCheckout = (args?: any) => {
  const queryClient = useQueryClient();
  const { id, params, shipping } = args ?? {};

  const shippingCostList = useQuery({
    queryKey: [KEYS.SHIPPINGLIST],
    queryFn: async () => {
      let url = "orders/shipping-cost";
      const result = await http.get(url);
      return result?.data;
    },
  });

  return { shippingCostList };
};
