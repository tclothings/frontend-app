import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";

export const useProducts = (args?: any) => {
  const queryClient = useQueryClient();
  const { id, params } = args ?? {};

  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      let url = "products/all";
      // if (params) {
      //   url = createUrl("products/all", params);
      // }
      const result = await http.get(url);
      return result?.data?.data;
    },
  });

  const product = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const result = await http.get(`products/${id}`);
      return result?.data?.data;
    },
    enabled: !!id
  });

  const addProduct = useMutation({
    mutationFn: async (data: any) => {
      const result = await http.post("products", data);
      return result?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const result = await http.put("products", data);
      return result?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const result = await http.delete(`products/${id}`);
      return result?.data?.data;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["products", id],
      // });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return { products, product, addProduct, updateProduct, deleteProduct };
};
