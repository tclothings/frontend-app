import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { stringifyParams } from "app/lib/utils";
import { KEYS } from "./queryKeys";

export const useCategories = (args?: any) => {

  const { id, params } = args ?? {};

  const queryClient = useQueryClient()

  const categories = useQuery({
    queryKey: [KEYS.CATEGORIES],
    queryFn: async () => {
      let url = "products/all/categories" 
      if (params) {
        url+= stringifyParams(params)
      }
      const result = await http.get(url);
      return result?.data?.data;
    },
  });
    
    const category = useQuery({
      queryKey: [KEYS.CATEGORIES, id],
      queryFn: async () => {
        const result = await http.get(`products/categories/${id}`);
        return result?.data?.data;
      },
      enabled: !!id,
    });
  
  const addCategory = useMutation({
    mutationFn: async (data: any) => {
      const result = await http.post("products/category", data)
      return result?.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CATEGORIES],
      });
    }
  })

  const updateCategory = useMutation({
    mutationFn: async ({ id, data} : {id: string, data: any}) => {
      const result = await http.put(`products/category/${id}`, data);
      return result?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CATEGORIES, id],
      });
      queryClient.invalidateQueries({
        queryKey: [KEYS.CATEGORIES],
      });
    },
  });
    
  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const result = await http.delete(`products/category/${id}`);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CATEGORIES],
      });
    },
  });

    return {
      categories,
      category,
      addCategory,
      updateCategory,
      deleteCategory,
    };
};
