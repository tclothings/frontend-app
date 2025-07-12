"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "app/api/cart";
import type { ICartItem } from "app/lib/types";
import { useEffect } from "react";
import { toast } from "sonner";

export function DeleteItemButton({ item }: { item: ICartItem }) {
  const { deleteItemFromCart } = useCart();

  const handleDelete = () => {
    deleteItemFromCart.mutate(item.product?._id);
  };

  useEffect(() => {
    if (deleteItemFromCart.isSuccess) {
      toast.success(deleteItemFromCart.data?.message);
    }
  }, [deleteItemFromCart.isSuccess]);

  return (
    <>
      <button
        disabled={deleteItemFromCart.isPending}
        onClick={handleDelete}
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500 hover:cursor-pointer"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
    </>
  );
}
