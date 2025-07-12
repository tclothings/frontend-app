import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "../components/queryKeys";
import { stringifyParams } from "app/lib/utils";

export const useCart = (args?: any) => {
  const { enabled = false } = args ?? {};
  const queryClient = useQueryClient();

  const cartItems = useQuery({
    enabled,
    queryKey: [KEYS.CART],
    queryFn: async () => {
      const result = await http.get("carts");
      return result?.data?.data;
    },
  });
  const createCart = useMutation({
    mutationFn: async (data: any) => {
      const result = await http.post("carts", data);
      return result?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CART],
      });
    },
  });
  const addToCart = useMutation({
    mutationFn: async (data: any) => {
      const result = await http.post("carts/add/items", data);
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CART],
      });
    },
  });
  const updateCartItem = useMutation({
    mutationFn: async (data: any) => {
      const result = await http.put(
        `carts/update/items/${data?.product}?quantity=${data?.quantity}`
      );
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CART],
      });
    },
  });
  const deleteItemFromCart = useMutation({
    mutationFn: async (id: any) => {
      const result = await http.delete(`carts/delete/items/${id}`);
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CART],
      });
    },
  });
  return {
    cartItems,
    createCart,
    addToCart,
    deleteItemFromCart,
    updateCartItem,
  };
};

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

export const useOrders = (args?: any) => {
  const queryClient = useQueryClient();
  const { id, params, enabled = false } = args ?? {};
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
      if (!id) return;
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
