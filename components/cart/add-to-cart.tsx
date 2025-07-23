"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useCart } from "app/apis/cart";
import { ICartItem, IProduct } from "app/lib/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

function SubmitButton({
  availableForSale,
  onClick,
  disabled,
}: {
  availableForSale: boolean;
  onClick: any;
  disabled: boolean;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  return (
    <button
      disabled={disabled}
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        "hover:opacity-90 hover:cursor-pointer": true,
      })}
      onClick={onClick}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: IProduct }) {
  const router = useRouter();
  // const userToken = Cookies.get("user");
  const { data: session } = useSession();
  const { addToCart, updateCartItem, cartItems } = useCart({ enabled: true });

  const items = cartItems?.data?.items;
  const cartProduct = items?.find(
    (item: ICartItem) => item.product?._id === product._id
  );

  const availableForSale =
    !!product.quantity || cartProduct.quantity < product.quantity;

  useEffect(() => {
    if (addToCart.isSuccess) {
      toast.success(addToCart.data?.message);
    }
  }, [addToCart.isSuccess]);

  const handleAddToCart = () => {
    if (session) {
      if (cartProduct) {
        const data = {
          product: product._id,
          quantity: cartProduct.quantity + 1,
        };
        updateCartItem.mutate(data);
      } else {
        const data = { product: product._id, quantity: 1 };
        addToCart.mutate(data);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <SubmitButton
      onClick={handleAddToCart}
      availableForSale={availableForSale}
      disabled={addToCart.isPending}
    />
  );
}

export function AddToCartButtonSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse",
        "h-12 w-full",
        "bg-gray-300 dark:bg-neutral-700",
        "rounded-md",
        "relative overflow-hidden",
        className
      )}
    >
      <div className="absolute left-0 ml-4 flex h-full items-center justify-center">
        <div className="h-5 w-5 bg-gray-400 dark:bg-neutral-600 rounded-full"></div>{" "}
      </div>
    </div>
  );
}
