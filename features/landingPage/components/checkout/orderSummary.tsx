import { usePayment } from "app/api/client/payment";
import Button from "app/components/form/button";
import { IShipping } from "app/lib/types";
import { formatAmount } from "app/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const OrderSummary = ({
  cart,
  shippingAddress,
  deliveryAddressId,
  customerNotes,
}: {
  cart: any;
  shippingAddress: IShipping | null;
  deliveryAddressId: string;
  customerNotes: string;
  }) => {
  const router = useRouter()
  const { initiatePayment } = usePayment()
  const subTotalAmount = cart?.totalAmount;
  const items = cart?.items;
  const deliveryAmount = shippingAddress?.cost || 0;
  const totalAmount = subTotalAmount + deliveryAmount;

  const confirmOrder = () => {
    const data: any = { deliveryAddressId };
    const cartItems = items?.map((item) => ({ product: item?.product?._id, quantity: item.quantity })) 
    if (customerNotes) {
      data.customerNotes = customerNotes;
    }
      if (shippingAddress) {
        data.shippingCostId = shippingAddress?._id;
      }
    data.items = cartItems;
    data.cartId = cart._id
    data.callbackUrl = "http://localhost:3000/checkout/confirm-payment";
    initiatePayment.mutate(data);
  }
  useEffect(() => {
    if (initiatePayment.data) {
      console.log(initiatePayment.data, "initiatePayment.data");
      const { authorizationUrl } = initiatePayment.data?.data;
      if (authorizationUrl) {
        toast.success("You are now being rerouted to pasystack")
        window.location.href = authorizationUrl;
        // router.replace(authorizationUrl);
      }
    }
  }, [initiatePayment.isSuccess]);

  return (
    <div className="text-sm bg-[var(--grey-100)] dark:bg-black rounded-md min-w-[300px]">
      <div className="flex items-center justify-between border-b border-neutral-200 p-2 dark:border-neutral-700">
        <h3>Order summary</h3>
      </div>
      <div className="flex items-center justify-between p-2 dark:border-neutral-700">
        <p>Item's total</p>
        <p className="text-right">{formatAmount(subTotalAmount)}</p>
      </div>
      <div className="flex items-center justify-between border-b border-neutral-200 p-2 dark:border-neutral-700">
        <p>Delivery fees</p>
        <p className="text-right">{formatAmount(deliveryAmount)}</p>
      </div>
      <div className="flex items-center justify-between border-b border-neutral-200 p-2 dark:border-neutral-700 font-mdium">
        <p className="">Total</p>
        <p className="text-right text-xl">{formatAmount(totalAmount)}</p>
      </div>
      {/* <Button text="Confrm order" /> */}
      <div className="p-2">
        <Button
          disabled={!deliveryAddressId}
          onClick={confirmOrder}
          className="flex items-center gap-2 justify-center w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
          text={`Confirm order`}
        />
      </div>
    </div>
  );
};

export default OrderSummary;
