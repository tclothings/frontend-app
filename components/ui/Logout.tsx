"use client";

import { useAuth } from "app/api/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import ConfirmationModal from "./confirmationModal";

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
        className="mt-2 text-red-500 font-bold hover:cursor-pointer"
      >
        Logout
      </button>
      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        confirmationMessage="Logout"
        acceptAction={logoutUser}
        title="Logout"
      />
      {/* <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
        <p>This is modal content</p>
        <div className="flex items-center gap-10 justify-between">
          <Button />
          <Button />

          <button
            onClick={() => logoutUser()}
            className="mt-4 text-sm text-blue-600"
          >
            Close
          </button>
        </div>
      </Modal> */}
    </>
  );
};

export default Logout;
