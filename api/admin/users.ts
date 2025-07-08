import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";
import { KEYS } from "./queryKeys";
import { stringifyParams } from "app/lib/utils";

export const useAdminUsers = (args?: any) => {
  const { params } = args ?? {};
  const queryClient = useQueryClient();
  const admins = useQuery({
    queryKey: [KEYS.ADMINS],
    queryFn: async () => {
      let url = "admin/admin-users";
           if (params) {
              url += stringifyParams(params)
      }
      const result = await http.get(url);
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
  const { params } = args ?? {};
  const customers = useQuery({
    queryKey: [KEYS.CUSTOMERS],
    queryFn: async () => {
      let url = "users/customer-users";
      if (params) {
        url += stringifyParams(params);
      }
      const result = await http.get(url);
      return result?.data?.data;
    },
  });

  return { customers };
};
  