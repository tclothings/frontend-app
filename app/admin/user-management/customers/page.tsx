import Customers from "app/features/admin/userManagement/customers";

export const metadata = {
  title: "Customers",
  description: "View customer list.",
};

export default async function Page() {
  return <Customers />;
}
