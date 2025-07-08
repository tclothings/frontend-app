import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "./queryKeys";
import { stringifyParams } from "app/lib/utils";

export const useOrders = (args?: any) => {
  const queryClient = useQueryClient();
  const { id, params, enabled=false } = args ?? {};
  const orders = useQuery({
    enabled,
    queryKey: [KEYS.ORDERS],
    queryFn: async () => {
      let url = "orders/users";
  if (params) {
        url += stringifyParams(params);
      }
      const result = await http.get(url);
      return result?.data?.data;
    },
  });

  const order = useQuery({
    queryKey: [KEYS.ORDERS, id],
    queryFn: async () => {
      if (!id) return
      const result = await http.get(`orders/${id}`);
      return result?.data?.data;
    },
    enabled: ["string", "number"].includes(typeof id),
  });

  const addOrder = useMutation({
    mutationFn: async (data: any) => {
      const result = await http.post("orders", data);
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ORDERS],
      });
    },
  });

  return { orders, order, addOrder };
};
