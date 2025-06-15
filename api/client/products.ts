import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "./queryKeys";
import { stringifyParams } from "app/lib/utils";

export const useProducts = (args?: any) => {
  const queryClient = useQueryClient();
  const {enabled= true, id, params, slug } = args ?? {};

  const products = useQuery({
    enabled,
    queryKey: [KEYS.PRODUCTS, params],
    queryFn: async () => {
      let url = "products/all";
      let urlParams = {
        isActive: true,
        ...(params || {}),
      };
      url += stringifyParams(urlParams);
      const result = await http.get(url);
      return result?.data?.data;
    },
  });

  const productsByCategorySlug = useQuery({
    enabled: !!slug,
    queryKey: [KEYS.PRODUCTSBYCATEGORYSLUG, params, slug],
    queryFn: async () => {
      let url = `products/category/${slug}/products`;
      let urlParams = {
        ...(params || {}),
      };
      url += stringifyParams(urlParams);
      const result = await http.get(url);
      return result?.data?.data;
    },
  });

  const product = useQuery({
    queryKey: [KEYS.PRODUCTS, id],
    queryFn: async () => {
      const result = await http.get(`products/slug/${id}`);
      return result?.data?.data;
    },
    enabled: !!id,
  });

  return { products, product, productsByCategorySlug };
};
