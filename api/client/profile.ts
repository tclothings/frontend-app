import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "app/lib/http";

export const useProfile = () => {
  const userProfile = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const result = await http.get("users/me");
      return result?.data?.data;
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
