"use client";

import clsx from "clsx";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createUrl } from "app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";
import LoadingDots from "../loading-dots";
import Price from "../price";
import { useCart } from "app/api/client/cart";
import { ICartItem } from "app/lib/types";
import { useOrders } from "app/api/client/orders";
import { useRouter } from "next/navigation";

export default function CartModal() {
  const { cartItems } = useCart();

  const cartData = cartItems?.data;

  const items = cartData?.items;

  const totalQuantity = items?.reduce(
    (acc: number, item: ICartItem) => acc + item.quantity,
    0
  );

  const totalAmount = cartData?.totalAmount;

  const [isOpen, setIsOpen] = useState(false);
  const previousTotalQuantityRef = useRef(0); 
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // useEffect(() => {
  //   if (!cart) {
  //   }
  // }, [cart]);
  // useEffect(() => {
  //   if (totalQuantity > 0 && totalQuantity !== quantityRef.current) {
  //     if (!isOpen) {
  //       setIsOpen(true);
  //     }
  //     quantityRef.current = totalQuantity;
  //   }
  // }, [isOpen, totalQuantity]);
  useEffect(() => {
    // Only run this logic if the cart is not already open
    if (!isOpen) {
      // Check if the current totalQuantity is greater than the previous totalQuantity
      // and if the current totalQuantity is actually greater than 0
      if (
        totalQuantity > 0 &&
        totalQuantity > previousTotalQuantityRef.current
      ) {
        setIsOpen(true);
      }
    }
    // Update the ref for the next render
    previousTotalQuantityRef.current = totalQuantity;
  }, [isOpen, totalQuantity]);

  if (cartItems.isError) {
    return null;
  }

  if (cartItems.isPending) {
    return null;
  }
  return (
    <>
      <button
        aria-label="Open cart"
        onClick={openCart}
        className="hover:cursor-pointer"
      >
        <OpenCart quantity={items?.length} />
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
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="hover:cursor-pointer"
                >
                  <CloseCart />
                </button>
              </div>

              {!items || items.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="grow overflow-auto py-4">
                    {items
                      // .sort((a, b) =>
                      //   a.merchandise.product.title.localeCompare(
                      //     b.merchandise.product.title
                      //   )
                      // )
                      .map((item, i) => {
                        const merchandiseUrl = createUrl(
                          `/product/${item.product?.slug}`,
                          new URLSearchParams()
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -ml-1 -mt-2">
                                <DeleteItemButton
                                  item={item}
                                  // optimisticUpdate={updateCartItem}
                                />
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
                                  href={merchandiseUrl}
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
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={
                                    // item.product?.salePrice ||
                                    item.subtotal
                                  }
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    // optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    // optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {/* <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div> */}
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Total</p>
                      <Price
                        className="flex text-right text-base text-black dark:text-white"
                        amount={totalAmount}
                        currencyCode={"NGN"}
                      />
                    </div>
                  </div>
                  <CheckoutButton totalAmount={totalAmount} />
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <XMarkIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className
        )}
      />
    </div>
  );
}

function CheckoutButton({ totalAmount }: { totalAmount : number}) {
const router = useRouter()
  // const { addOrder } = useOrders()
  const goToCheckout = () => {
    router.push("/checkout")
  }
  return (
    <button
      onClick={goToCheckout}
      className="flex items-center gap-2 justify-center w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      // type="submit"
      // disabled={addOrder.isPending}
    >
      {/* {addOrder.isPending ? (
        <LoadingDots className="bg-white" />
      ) : ( */}
      <>
        <span>Checkout </span> (<Price amount={totalAmount} />)
      </>
      {/* )} */}
    </button>
  );
}
