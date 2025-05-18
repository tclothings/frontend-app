"use client";

import { useAuth } from "app/api/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import Modal from "./modal";

const Logout = () => {
    const [isOpen, setIsOpen] = useState(false);

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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-2 text-red-500 font-bold"
      >
        Logout
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
        <p>This is modal content</p>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 text-sm text-blue-600"
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default Logout;
