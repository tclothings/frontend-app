import Table from "app/components/ui/table";
import { formatAmount, formatDate } from "app/lib/utils";
import { useState } from "react";

import Spinner from "app/components/form/spinner";
import Drawer from "app/components/ui/drawer";
import { useOrders } from "app/api/admin/orders";
import { ordersHeaders } from "./components/orderHeaders";
import ViewOrder from "./viewOrder";
import StatusCard from "app/components/ui/statusCard";
import OrdersFilter from "./components/ordersFilter";
import { IOrder } from "app/lib/types";
import { useSearchParams } from "next/navigation";

export const metadata = {
  title: "Orders",
  description: "View order list.",
};

export default function OrderTable() {
       const params = useSearchParams()
        const page = params.get("page")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { orders } = useOrders({ params: { page }, enabled: true });

  if (orders.isPending) return <Spinner />;
  if (orders.isError) return <div>Something went wrong </div>;

  const data = orders?.data;
  const ordersList = data?.data;

  const totalPages = data?.totalPages;
  const rows = data?.total;

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
        filterComponent={<OrdersFilter />}
      >
        {ordersList?.map((order: IOrder, idx: number) => (
          <tr
            key={idx}
            onClick={() => openDetailsModal(order)}
            className="hover:cursor-pointer hover:bg-[var(--background)]"
          >
            <td className="px-6 py-4 min-w-[199px]">{order?.orderNumber}</td>
            <td className="px-6 py-4 min-w-[118px]">
              <StatusCard status={order?.paymentStatus} />
            </td>
            <td className="px-6 py-4 min-w-[118px]">
              {formatAmount(order?.totalAmount)}
            </td>
            <td className="px-6 py-4 min-w-[118px]">
              <StatusCard status={order?.status} />
            </td>
            <td className="px-6 py-4 min-w-[118px]">
              {formatDate(order?.createdAt)}
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
