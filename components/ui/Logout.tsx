"use client";

import { useAuth } from "app/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Logout = () => {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    if (logout.isSuccess) {
      Cookies.remove("user");
      router.push("/login");
      toast.success(logout?.data?.message);
    }
  }, [logout.isSuccess]);

  const logoutUser = () => {
    logout.mutate();
  };
  return (
    <button onClick={logoutUser} className="mt-2 text-red-500 font-bold">
      Logout
    </button>
  );
};

export default Logout;
