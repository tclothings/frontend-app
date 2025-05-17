import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";

export const useAddresses = (args?: any) => {
  const { id } = args ?? {};
const queryClient = useQueryClient()
  const addresses = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const result = await http.get("users/me/addresses");
      return result?.data;
    },
  });
  const address = useQuery({
    queryKey: ["addresses", id],
    queryFn: async () => {
      const result = await http.get("users/me/address");
      return result?.data;
    },
      enabled: !!id
  });

  const updateAddress = useMutation({
    mutationFn: async () => {
      const result = await http.put(`users/me/address/${id}`);
      return result?.data;
      },
      onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["addresses"],
          });
      },
  });
    return {address, addresses, updateAddress}
};
