"use client";
import { useCart } from "app/api/client/cart";
import OrderSummary from "app/features/landingPage/components/checkout/orderSummary";
import { useCheckout } from "app/api/client/checkout";
import CustomerNote from "app/features/landingPage/components/checkout/customerNote";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "app/lib/schemas/order";
import { useEffect, useState } from "react";
import { useAddresses } from "app/api/client/address";
import { IAddress, IShipping } from "app/lib/types";
import Spinner from "app/components/form/spinner";
import ShippingOptions from "app/features/landingPage/components/checkout/shipping-options";

export default function CheckoutPage() {
  const [shippingCostId, setShippingCostId] = useState();
  const [shippingAddress, setShippingAddress] = useState<IShipping | null>(null);
  const [deliveryAddressId, setDeliveryAddressId] = useState<string>("");
  const [isAddressDrawerOpen, setAddressDrawerOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();

  const { cartItems } = useCart();
  const { shippingCostList } = useCheckout();
  const { addresses } = useAddresses({ enabled: true });

  const cartData = cartItems?.data;

  const methods = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const { watch } = methods
  const customerNotes = watch("customerNotes");

  const addressList = addresses?.data?.data;

  const defaultAddress = addressList?.find(
    (address: IAddress) => address.isDefault
  );
  useEffect(() => {
    if (shippingCostList.data && addresses.data) {
      const {shippingCosts} = shippingCostList?.data?.data;
      if (defaultAddress) {
        setDeliveryAddressId(defaultAddress._id);
      }
      const deliveryAddress = shippingCosts?.find(
        (data: IShipping) => data.name === defaultAddress.lga
      );
      if (deliveryAddress) {
        setShippingAddress(deliveryAddress);
      } else {
        setShippingAddress(null)
      }

    }
  }, [shippingCostList.data, addresses.data]);


  if (cartItems.isError) {
    return null;
  }

  if (cartItems.isPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-screen mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white text-sm">
      <div className="w-full h-full flex-1 p-4 space-y-4 bg-[var(--grey-100)] dark:bg-black rounded-md min-w-[300px]">
        <ShippingOptions defaultAddress={defaultAddress} />
        <CustomerNote methods={methods} />
      </div>
      <div className="z-40">
        <OrderSummary
          cart={cartData}
          shippingAddress={shippingAddress}
          deliveryAddressId={deliveryAddressId}
          customerNotes={customerNotes}
        />
      </div>
    </div>
  );
}
