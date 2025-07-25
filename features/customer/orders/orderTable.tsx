import Table from "app/components/ui/table";
import { useState } from "react";

import Spinner from "app/components/form/spinner";
import Drawer from "app/components/ui/drawer";
import { ordersHeaders } from "./components/orderHeaders";
import ViewOrder from "./viewOrder";
import { IOrder } from "app/lib/types";
import { useSearchParams } from "next/navigation";
import { useOrders } from "app/apis/cart";
import { formatDate } from "app/lib/utils";
import StatusCard from "app/components/ui/statusCard";

export const metadata = {
  title: "Orders",
  description: "View order list.",
};

export default function OrderTable() {
  const params = useSearchParams();
  const page = params.get("page");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { orders } = useOrders({ params: { page }, enabled: true });

  if (orders.isPending)
    return (
      <div className="mt-20">
        <Spinner />
      </div>
    );
  if (orders.isError) return <div>Something went wrong </div>;

  const data = orders?.data?.data;
  const totalPages = orders?.data?.totalPages;
  const rows = orders?.data?.total;
  const openDetailsModal = (order: IOrder) => {
    setSelectedItem(order);
    setIsDrawerOpen(true);
  };
  return (
    <>
      <Table
        length={rows}
        headers={ordersHeaders}
        totalPages={totalPages}
        showPagination
        showRowCount
        header="All Orders"
      >
        {data?.map((order: IOrder, idx: number) => (
          <tr
            key={idx}
            onClick={() => openDetailsModal(order)}
            className="hover:cursor-pointer hover:bg-[var(--background)]"
          >
            <td className="px-6 py-4 min-w-[199px]">{order?.orderNumber}</td>
            <td className="px-6 py-4 min-w-[118px]">
              {formatDate(order?.createdAt)}
            </td>
            <td className="px-6 py-4 min-w-[118px]">
              {<StatusCard status={order?.paymentStatus} />}
            </td>
            <td className="px-6 py-4 min-w-[118px]">{order?.totalAmount}</td>
            <td className="px-6 py-4 min-w-[118px]">
              {<StatusCard status={order?.status} />}
            </td>
            {/* <td className="px-6 py-4 min-w-[118px]">{order?.customerNotes}</td> */}
          </tr>
        ))}
      </Table>
      {/* <Suspense>
            <div className="mt-6">
              <Pagination totalPages={totalPages} />
            </div>
          </Suspense> */}
      <Drawer
        title={"View Order"}
        children={
          <ViewOrder
            item={selectedItem}
            onSuccess={() => setIsDrawerOpen(false)}
          />
        }
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      />
    </>
  );
}
