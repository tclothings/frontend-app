import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "./queryKeys";

export const useAdminUsers = (args?: any) => {
  const { id } = args ?? {};
  const queryClient = useQueryClient();
  const admins = useQuery({
    queryKey: [KEYS.ADMINS],
    queryFn: async () => {
      const result = await http.get("admin/admin-users");
      return result?.data?.data;
    },
  });

  const addAmin = useMutation({
    mutationFn: async (data) => {
      const result = await http.post("admin/create", data)
      return result?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ADMINS],
      });
    }
  })
  const enableAdmin = useMutation({
    mutationFn: async (id) => {
      const result = await http.put(`admin/${id}/enable`, {});
      return result?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ADMINS],
      });
    },
  });
  const disableAdmin = useMutation({
    mutationFn: async (id) => {
      const result = await http.put(`admin/${id}/disable`, {});
      return result?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ADMINS],
      });
    },
  });
    return { admins, addAmin, enableAdmin, disableAdmin };
};

export const useCustomerUsers = (args?: any) => {
  const { id } = args ?? {};
  const queryClient = useQueryClient();

  const customers = useQuery({
    queryKey: [KEYS.CUSTOMERS],
    queryFn: async () => {
      const result = await http.get("users/customer-users");
      return result?.data?.data;
    },
  });

  return { customers };
};
  