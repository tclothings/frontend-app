import Products from "app/features/admin/productManagement/products";

export const metadata = {
  title: "Admins",
  description: "View admin list.",
};

export default async function CustomersPage() {
  return <Products />;
}
