import { useQuery } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "../components/queryKeys";
import { stringifyParams } from "app/lib/utils";

export const useProducts = (args?: any) => {
  const { enabled = false, id, params, slug } = args ?? {};

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
    enabled: ["string", "number"].includes(typeof slug),
    queryKey: [KEYS.PRODUCTSBYCATEGORYSLUG, params, slug],
    queryFn: async () => {
      if (!slug) return;
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
      if (!id) return;
      const result = await http.get(`products/slug/${id}`);
      return result?.data?.data;
    },
    enabled: ["string", "number"].includes(typeof id),
  });

  return { products, product, productsByCategorySlug };
};

export const useCategories = (args?: any) => {
  const { id, params, enabled } = args ?? {};

  const categories = useQuery({
    enabled,
    queryKey: [KEYS.CATEGORIES],
    queryFn: async () => {
      let url = "products/all/categories";
      if (params) {
        url += stringifyParams(params);
      }
      const result = await http.get(url);
      return result?.data?.data;
    },
  });

  const category = useQuery({
    queryKey: [KEYS.CATEGORIES, id],
    queryFn: async () => {
      if (!id) return;
      const result = await http.get(`products/categories/${id}`);
      return result?.data?.data;
    },
    enabled: ["string", "number"].includes(typeof id),
  });

  return {
    categories,
    category,
  };
};
