import { useMutation } from "@tanstack/react-query";
import http from "app/lib/http";

export const useAuth = (args?: any) => {
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
