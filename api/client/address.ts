import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";

export const useAddresses = (args?: any) => {
  const { id, enabled } = args ?? {};
const queryClient = useQueryClient()
  const addresses = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const result = await http.get("users/me/addresses");
      return result?.data?.data;
    },
    enabled,
  });
  const address = useQuery({
    queryKey: ["addresses", id],
    queryFn: async () => {
      const result = await http.get("users/me/address");
      return result?.data;
    },
      enabled: !!id
  });
  const addAddress = useMutation({
    mutationFn: async (data) => {
      const result = await http.post(`users/me/address`, data);
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });

  const updateAddress = useMutation({
    mutationFn: async({ data, id }: {data: any, id: string}) => {
      const result = await http.put(`users/me/address/${id}`, data);
      return result?.data;
      },
      onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["addresses"],
          });
      },
  });
  const deleteAddress = useMutation({
    mutationFn: async (id: string) => {
      const result = await http.delete(`users/me/address/${id}`);
      return result?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });
    return { addresses, address, addAddress, updateAddress, deleteAddress };
};
