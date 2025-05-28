import EmptyPage from "app/components/ui/emptyPage";

const emptyOrders = "/images/emptyPage/emptyOrder.png";

export default function EmptyUsers() {
  return (
    <EmptyPage
      imgSrc={emptyOrders}
      text={"You currently don't have any users"}
    />
  );
}
