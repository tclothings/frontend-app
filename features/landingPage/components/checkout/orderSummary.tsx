import Button from "app/components/form/button";

const OrderSummary = ({
  items,
  subTotalAmount,
  deliveryAmount,
  totalAmount,
}: {
  items: any[];
  subTotalAmount: number;
  deliveryAmount: number;
  totalAmount: number;
}) => {
  return (
    <div>
      <h3>Order summary</h3>
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
        <p>Item's total (1)</p>
        <p className="text-right"></p>
      </div>
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
        <p>Delivery fees</p>
        <p className="text-right"></p>
      </div>
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700 font-mdium">
        <p className="">Total</p>
        <p className="text-right text-xl"></p>
      </div>
      <Button text="Confrm order" />
    </div>
  );
};

export default OrderSummary;