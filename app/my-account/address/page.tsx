import Addresses from "app/features/customer/addresses";

export const metadata = {
  title: "Address Book",
  description: "View Address List.",
};

export default async function AddressPage() {
  return <Addresses />;
}
