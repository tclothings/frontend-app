import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "./queryKeys";

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
        `carts/update/items/${data?.product}?quantity=${data?.quantity}`);
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
