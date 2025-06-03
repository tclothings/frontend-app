import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";

export const useOrders = (args?: any) => {
  const queryClient = useQueryClient();
  const { id, params } = args ?? {};
  
  const orders = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      let url = "orders/users";
      // if (params) {
      //   url = createUrl("products/all", params);
      // }
      const result = await http.get(url);
      return result?.data?.data;
    },
  });

  const order = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const result = await http.get(`orders/${id}`);
      return result?.data?.data;
    },
    enabled: !!id
  });

  const addOrder = useMutation({
    mutationFn: async (data: any) => {
      const result = await http.post("orders", data);
      return result?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  return { orders, order, addOrder };
};
