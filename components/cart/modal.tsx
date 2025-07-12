"use client";

import clsx from "clsx";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useMemo, useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createUrl } from "app/lib/utils";
import { useCart } from "app/api/cart";
import { ICartItem } from "app/lib/types";

import Button from "../form/button";
import OpenCart from "./open-cart";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import Price from "../price";

const CartModal = () => {
  const { cartItems } = useCart({ enabled: true });
  const cartData = cartItems?.data;

  const items = useMemo(() => cartData?.items || [], [cartData?.items]);
  const totalAmount = cartData?.totalAmount || 0;

  // const totalQuantity = useMemo(
  //   () => items.reduce((acc, item) => acc + item.quantity, 0),
  //   [items]
  // );

  const [isOpen, setIsOpen] = useState(false);
  // const previousTotalQuantityRef = useRef(0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Auto open cart when quantity increases
  // useEffect(() => {
  //   const prevQuantity = previousTotalQuantityRef.current;
  //   if (!isOpen && totalQuantity > 0 && totalQuantity > prevQuantity) {
  //     setIsOpen(true);
  //   }
  //   previousTotalQuantityRef.current = totalQuantity;
  // }, [totalQuantity]);

  if (cartItems.isPending) return null;

  return (
    <>
      <button
        aria-label="Open cart"
        onClick={openCart}
        className="hover:cursor-pointer"
      >
        <OpenCart quantity={items.length} />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {items.length === 0 ? (
                <EmptyCartView />
              ) : (
                <CartContent
                  items={items}
                  totalAmount={totalAmount}
                  closeCart={closeCart}
                />
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

export default memo(CartModal);

const EmptyCartView = memo(() => (
  <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
    <ShoppingCartIcon className="h-16" />
    <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
  </div>
));
EmptyCartView.displayName = "EmptyCartView";

const CartContent = memo(function CartContent({
  items,
  totalAmount,
  closeCart,
}: {
  items: ICartItem[];
  totalAmount: number;
  closeCart: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden p-1">
      <ul className="grow overflow-auto py-4">
        {items.map((item, i) => {
          const productUrl = createUrl(
            `/product/${item.product?.slug}`,
            new URLSearchParams()
          );
          return (
            <li
              key={i}
              className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
            >
              <div className="relative flex justify-between px-1 py-4">
                <div className="absolute z-40 -ml-1 -mt-2">
                  <DeleteItemButton item={item} />
                </div>
                <div className="flex flex-row">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    <Image
                      className="h-full w-full object-cover"
                      width={64}
                      height={64}
                      alt={item.product?.name}
                      src={item.product?.productImage}
                    />
                  </div>
                  <Link
                    href={productUrl}
                    onClick={closeCart}
                    className="z-30 ml-2 flex flex-row space-x-4"
                  >
                    <div className="flex flex-1 flex-col text-base">
                      <span className="leading-tight">
                        {item.product?.name}
                      </span>
                      {item.quantity > 0 && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {item.product?.quantity} units left
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
                <div className="flex h-16 flex-col justify-between">
                  <Price
                    className="flex justify-end text-right text-sm"
                    amount={item.subtotal}
                  />
                  <div className="ml-auto flex h-9 items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                    <EditItemQuantityButton item={item} type="minus" />
                    <p className="w-6 text-center">
                      <span className="text-sm">{item.quantity}</span>
                    </p>
                    <EditItemQuantityButton item={item} type="plus" />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
          <p>Shipping</p>
          <p className="text-right">Calculated at checkout</p>
        </div>
        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
          <p>Total</p>
          <Price
            className="text-right text-base text-black dark:text-white"
            amount={totalAmount}
            currencyCode="NGN"
          />
        </div>
      </div>

      <CheckoutButton totalAmount={totalAmount} disabled={items.length === 0} />
    </div>
  );
});

CartContent.displayName = "CartContent";

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-700 text-black dark:text-white">
      <XMarkIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className
        )}
      />
    </div>
  );
}

function CheckoutButton({
  totalAmount,
  disabled,
}: {
  totalAmount: number;
  disabled: boolean;
}) {
  const router = useRouter();
  const goToCheckout = () => {
    router.push("/checkout/shipping-options");
  };

  return (
    <Button
      disabled={disabled}
      onClick={goToCheckout}
      className="flex items-center justify-center w-full rounded-full bg-blue-600 p-3 text-sm font-medium text-white opacity-90 hover:opacity-100"
      text={`Checkout ${new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(totalAmount)}`}
    />
  );
}
