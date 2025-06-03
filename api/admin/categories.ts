import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { stringifyParams } from "app/lib/utils";

export const useCategories = (args?: any) => {

  const { id, params } = args ?? {};

  const queryClient = useQueryClient()

  const categories = useQuery({
    queryKey: ["categories"],
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
      queryKey: ["categories", id],
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
        queryKey: ["categories"]
      })
    }
  })

  const updateCategory = useMutation({
    mutationFn: async ({ id, data} : {id: string, data: any}) => {
      const result = await http.put("products/categories", data);
      return result?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
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
        queryKey: ["categories"],
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
