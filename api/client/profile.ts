import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";

export const useProfile = (args?: any) => {
  const { id } = args ?? {};
const queryClient = useQueryClient()
    const changePassword = useMutation({
      mutationFn: async (data) => {
        const result = await http.post("users/me/password", data);
        return result?.data;
      },
    });
    const updateBioData = useMutation({
      mutationFn: async (data) => {
        const result = await http.post("users/me/password", data);
        return result?.data;
      },
    });
    return { changePassword };
};
