"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
// import { updateItemQuantity } from 'app/components/cart/actions';
import type { CartItem, Product } from "app/lib/types";
import { useActionState } from "react";
import useCartStore from "app/store/cartStore";

function SubmitButton({
  type,
  onClick,
}: {
  type: "plus" | "minus";
  onClick: any;
}) {
  return (
    <button
      // type="submit"
      onClick={onClick}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
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

export function EditItemQuantityButton({
  item,
  type,
}: // optimisticUpdate,
{
  item: Product;
  type: "plus" | "minus";
  // optimisticUpdate: any;
}) {
  const { addItem, removeItem } = useCartStore((state) => state);

  // const [message, formAction] = useActionState(updateItemQuantity, null);
  // const payload = {
  //   merchandiseId: item.merchandise.id,
  //   quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  // };
  // const updateItemQuantityAction = formAction.bind(null, payload);
  const handleClick = () => {
    if (type === "plus") {
      addItem(item);
    } else {
      removeItem(item);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
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
