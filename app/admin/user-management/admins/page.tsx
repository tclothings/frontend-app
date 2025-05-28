import Admins from "app/features/admin/userManagement/admins";

export const metadata = {
  title: "Admins",
  description: "View admin list.",
};

export default async function CustomersPage() {
  return <Admins />;
}
