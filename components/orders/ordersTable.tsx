import Table from "app/components/ui/table";
import { formatAmount } from "app/lib/utils";

// import Info from "../OrderDetails/Info";
import { Suspense } from "react";
import { recentOrders } from "app/lib/constants";
import ProductCard from "app/components/orders/productCard";
import StatusCard from "app/components/orders/statusCard";
import Pagination from "app/components/ui/pagination";
import EmptyOrders from "app/components/orders/emptyOrders";
import { ordersHeaders } from "app/components/orders/ordersHeaders";

export const metadata = {
  title: "Orders",
  description: "View orders list.",
};

export default function RecentOrdersTable() {
  // const { openModal } = useAppContexxt();

  // function openOrderDetails() {
  //   openModal(<Info />, "Order Details");
  // }
  return (
    <>
      {recentOrders?.length > 0 ? (
        <>
          <Table length={0} headers={ordersHeaders}>
            {recentOrders.map((order, idx) => (
              <tr
                key={idx}
                // onClick={openOrderDetails}
                className="hover:cursor-pointer hover:bg-primary-50"
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4 min-w-[199px]">
                  {
                    <ProductCard
                      productImg={order.seller.productImg}
                      sellerName={order.seller.name}
                      productName={order.seller.productName}
                    />
                  }
                </td>
                <td className="px-6 py-4 min-w-[118px]">
                  {formatAmount(order.amount)}
                </td>
                <td className="px-6 py-4 min-w-[138px]">{order.orderedDate}</td>
                <td className="px-6 py-4 w-[125px]">
                  {<StatusCard status={order.status} />}
                </td>
                <td className="px-6 py-4 min-w-[138px]">
                  {order.deleiveryDate}
                </td>
              </tr>
            ))}
          </Table>
          <Suspense>
            <Pagination totalPages={2} />
          </Suspense>
        </>
      ) : (
        <EmptyOrders />
      )}
    </>
  );
}
