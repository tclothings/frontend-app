import { useQuery } from "@tanstack/react-query";
import http from "app/lib/http";
import { stringifyParams } from "app/lib/utils";
import { KEYS } from "./queryKeys";

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
        if (!id) return
        const result = await http.get(`products/categories/${id}`);
        return result?.data?.data;
      },
      enabled: ["string", "number"].includes(typeof id),
    });
  
    return {
      categories,
      category
    };
};
