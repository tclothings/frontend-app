"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCart } from "app/apis/cart";
import { toast } from "sonner";
import { useEffect } from "react";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: any;
  type: "plus" | "minus";
}) {
  const { updateCartItem } = useCart();

  useEffect(() => {
    if (updateCartItem.isSuccess) {
      toast.success(updateCartItem.data?.message);
    }
  }, [updateCartItem.isSuccess]);

  const disablePlusBtn = item?.quantity >= item?.product?.quantity;

  const disableMinusBtn = item?.quantity <= 1;

  const handleEditCart = () => {
    const productId = item?.product?._id;
    if (type === "plus") {
      if (disablePlusBtn) return;
      const data = {
        product: productId,
        quantity: item?.quantity + 1,
      };
      updateCartItem.mutate(data);
    } else {
      if (disableMinusBtn) return;
      const data = {
        product: productId,
        quantity: item?.quantity - 1,
      };
      updateCartItem.mutate(data);
    }
  };

  return (
    <button
      onClick={handleEditCart}
      disabled={
        (type === "plus" ? disablePlusBtn : disableMinusBtn) ||
        updateCartItem.isPending
      }
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "hover:cursor-pointer ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "ml-auto": type === "minus",
        }
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}
