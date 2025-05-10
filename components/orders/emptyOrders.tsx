import EmptyPage from "../ui/emptyPage";
const emptyOrders = "/images/emptyPage/emptyOrder.png";

export default function EmptyOrders() {
  return (
    <EmptyPage
      imgSrc={emptyOrders}
      text={"You currently don't have any orders"}
    />
  );
}
