import { useMutation, useQuery } from "@tanstack/react-query";
import http from "app/lib/http";

export const useAuth = () => {
  const register = useMutation({
    mutationFn: async (data) => {
      const result = await http.post("auth/register", data);
      return result?.data;
    },
  });

  const login = useMutation({
    mutationFn: async (data) => {
      const result = await http.post("auth/login", data);
      return result?.data;
    },
  });

  const forgotPassword = useMutation({
    mutationFn: async (data) => {
      const result = await http.post("auth/forgot-password", data);
      return result?.data;
    },
  });

  const resetPassword = useMutation({
    mutationFn: async (data) => {
      const result = await http.post("auth/reset-password", data);
      return result?.data;
    },
  });
  const verifyEmail = useMutation({
    mutationFn: async (token: string) => {
      const result = await http.post("auth/verify-email", {token})
      return result?.data
    }
  })
  const logout = useMutation({
    mutationFn: async () => {
      const result = await http.post("auth/logout", {})
      return result?.data
    }
  })

  return {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyEmail,
    logout,
  };
};


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