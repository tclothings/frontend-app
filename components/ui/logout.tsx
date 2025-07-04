"use client";

import { useAuth } from "app/api/useAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmationModal from "./confirmationModal";
import { signOut } from "next-auth/react";
import Button from "../form/button";

const Logout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();

  useEffect(() => {
    if (logout.isSuccess) {
      signOut({callbackUrl: "/login", redirect: true})
      toast.success(logout?.data?.message);
    }
  }, [logout.isSuccess]);

  const logoutUser = () => {
    logout.mutate();
  };
  return (
    <>
      <Button
        text="Logout"
        onClick={() => setIsOpen(true)}
        className="p-4 w-full bg-red-500 dark:bg-transparent text-white dark:!text-red-500 font-bold hover:cursor-pointer"
      />
      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        confirmationMessage="Logout"
        acceptAction={logoutUser}
        title="Logout"
      />

    </>
  );
};

export default Logout;
