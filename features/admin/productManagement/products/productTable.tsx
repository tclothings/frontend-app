import Table from "app/components/ui/table";
import { formatNumber } from "app/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

import Spinner from "app/components/form/spinner";
import { productHeaders } from "../components/productHeaders";
import Drawer from "app/components/ui/drawer";
import { useProducts } from "app/api/admin/products";
import ViewProduct from "./viewProduct";
import { IProduct } from "app/lib/types";
import { useSearchParams } from "next/navigation";

export const metadata = {
  title: "Products",
  description: "View product list.",
};

interface ProductTableProps {
  selectedItem: IProduct | undefined;
  setSelectedItem: Dispatch<SetStateAction<any>>;
  setIsNewProductDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
export default function ProductTable({
  selectedItem,
  setSelectedItem,
  setIsNewProductDrawerOpen,
}: ProductTableProps) {
  const params = useSearchParams()
  const page = params.get("page")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { products } = useProducts({ params: { page } });

  if (products.isPending) return <Spinner />;
  if (products.isError) return <div>Something went wrong </div>;

  const data = products?.data
  const productsData = data?.products;

  const totalPages = data?.totalPages;
  const rows = data?.total;

  const openDetailsModal = (product: IProduct) => {
    setSelectedItem(product);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Table
        length={rows}
        headers={productHeaders}
        totalPages={totalPages}
        showPagination
        showRowCount
        header="All Products"
      >
        {productsData?.map((product: IProduct, idx: number) => (
          <tr
            key={product._id}
            onClick={() => openDetailsModal(product)}
            className="hover:cursor-pointer hover:bg-[var(--background)]"
          >
            <td className="px-6 py-4 min-w-[199px]">{product?.name}</td>
            <td className="px-6 py-4 min-w-[118px]">
              {product?.category?.name}
            </td>
            {/* <td className="px-6 py-4">{roles(product?.roles)}</td> */}
            <td className="px-6 py-4 w-[125px]">
              {formatNumber(product?.price)}
            </td>
            <td className="px-6 py-4 w-[125px]">
              {formatNumber(product?.salePrice) ?? "-"}
            </td>
            <td className="px-6 py-4 min-w-[138px]">
              {formatNumber(product.quantity)}
            </td>
          </tr>
        ))}
      </Table>
      {/* <Suspense>
            <div className="mt-6">
              <Pagination totalPages={totalPages} />
            </div>
          </Suspense> */}
      <Drawer
        title={"View Product"}
        children={
          <ViewProduct
            item={selectedItem}
            setIsNewProductDrawerOpen={setIsNewProductDrawerOpen}
            setSelectedItem={setSelectedItem}
            onSuccess={() => {
              setIsDrawerOpen(false);
              // setSelectedItem(null);
            }}
          />
        }
        size="lg"
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedItem(null);
        }}
        onOpen={() => setIsDrawerOpen(true)}
      />
    </>
  );
}
