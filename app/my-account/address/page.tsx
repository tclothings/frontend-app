import Addresses from "app/components/pages/customer/addresses";

export const metadata = {
  title: "Orders",
  description: "View orders list.",
};

export default async function AddressPage() {
  return <Addresses />;
}
