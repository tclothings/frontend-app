import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "./queryKeys";

export const useShipping = (args?: any) => {
  const queryClient = useQueryClient();
  const { enabled=false } = args ?? {};

  const shippingCostList = useQuery({
    enabled,
    queryKey: [KEYS.SHIPPINGLIST],
    queryFn: async () => {
      let url = "orders/shipping-costs";
      const result = await http.get(url);
      return result?.data?.data;
    },
  });

  const addShippingCost = useMutation({
    mutationFn: async (data: any) => {
      let url = "orders/shipping-cost";
      const result = await http.post(url, data);
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.SHIPPINGLIST],
      });
    },
  });

  const updateShippingCost = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      let url = `orders/shipping-cost/${id}`;
      const result = await http.put(url, data);
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.SHIPPINGLIST],
      });
    },
  });
  const deleteShippingCost = useMutation({
    mutationFn: async (id: string) => {
      let url = `orders/shipping-cost/${id}`;
      const result = await http.delete(url);
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.SHIPPINGLIST],
      });
    },
  });
  return {
    shippingCostList,
    addShippingCost,
    updateShippingCost,
    deleteShippingCost,
  };
};
