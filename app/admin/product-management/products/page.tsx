import Products from "app/features/admin/productManagement/products";

export const metadata = {
  title: "Products",
  description: "View product list.",
};

export default async function Page() {
  return <Products />;
}
