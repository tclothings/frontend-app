"use client";
import { useCart } from "app/api/client/cart";
import Checkout from "app/features/landingPage/components/checkout/shipping";
import OrderSummary from "app/features/landingPage/components/checkout/orderSummary";
import { useCheckout } from "app/api/client/checkout";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const { shippingCostList } = useCheckout();

  const cartData = cartItems?.data;

  const items = cartData?.items;

  const totalAmount = cartData?.totalAmount;

  console.log(shippingCostList?.data, "shippingCostList");
  if (cartItems.isError) {
    return null;
  }

  if (cartItems.isPending) {
    return null;
  }
  return (
    <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
      <div className="order-last w-full md:order-none py-4">
        <Checkout />
      </div>
      <div className="z-40 bg-[var(--grey-100)] dark:bg-black rounded-md  md:min-h-[calc(100vh-200px)] order-none flex-none md:order-last md:w-[180px]">
        <OrderSummary
          items={items}
          subTotalAmount={0}
          deliveryAmount={0}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
}
