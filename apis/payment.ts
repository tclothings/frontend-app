import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "app/components/queryKeys";
import http from "app/lib/http";
import { stringifyParams } from "app/lib/utils";

export const usePayment = () => {

  const initiatePayment = useMutation({
    mutationFn: async (data: any) => {
      let url = "payments/initialize";
      const result = await http.post(url, data);
      return result?.data;
    },
  });

  const verifyPayment = useMutation({
    mutationFn: async (data: any) => {
      let url = "payments/verify";
      const result = await http.post(url, data);
      return result?.data;
    },
  });

  return { initiatePayment, verifyPayment };
};

export const useAddresses = (args?: any) => {
  const { id, enabled = false, params } = args ?? {};
  const queryClient = useQueryClient();

  const addresses = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const result = await http.get("users/me/addresses");
      return result?.data?.data;
    },
    enabled,
  });

    const infiniteAddresses = useInfiniteQuery({
      enabled,
      queryKey: [KEYS.ADDRESS, params],
      queryFn: async ({ pageParam = 1 }) => {
        let urlParams = { ...params, page: pageParam };
        let serializedParams = stringifyParams(urlParams);
        let url = `users/me/addresses${serializedParams}`;
        const result = await http.get(url);
        return result?.data;
      },
      initialPageParam: 1, //
      getNextPageParam: (lastPage) => {
        if (lastPage?.pagination?.page < lastPage?.pagination?.pages) {
          return lastPage?.pagination?.page + 1;
        } else {
          return undefined;
        }
      },
    });
  
  const address = useQuery({
    queryKey: ["addresses", id],
    queryFn: async () => {
      if (!id) return;
      const result = await http.get("users/me/address");
      return result?.data;
    },
    enabled: ["string", "number"].includes(typeof id),
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
    mutationFn: async ({ data, id }: { data: any; id: string }) => {
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
  return { addresses, infiniteAddresses, address, addAddress, updateAddress, deleteAddress };
};