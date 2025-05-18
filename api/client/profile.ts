import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";

export const useProfile = (args?: any) => {
  const { id } = args ?? {};
  const queryClient = useQueryClient();
  const userProfile = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const result = await http.put("users/me");
      return result?.data;
    },
  });
  const changePassword = useMutation({
    mutationFn: async (data) => {
      const result = await http.put("users/me/password", data);
      return result?.data;
    },
  });
  const updateBioData = useMutation({
    mutationFn: async (data) => {
      const result = await http.put("users/me", data);
      return result?.data;
    },
  });

  return { userProfile, changePassword, updateBioData };
};
