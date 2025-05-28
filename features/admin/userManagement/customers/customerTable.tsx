import Table from "app/components/ui/table";
import { formatAmount, formatDate, fullName, roles } from "app/lib/utils";

// import Info from "../OrderDetails/Info";
import { Suspense, useState } from "react";
import { recentOrders } from "app/lib/constants";
import StatusCard from "app/components/ui/statusCard";
import Pagination from "app/components/ui/pagination";
import EmptyOrders from "app/components/orders/emptyOrders";
import { useCustomerUsers } from "app/api/admin/users";
import { customerHeaders } from "../components/userHeaders";
import UserCard from "../components/userCard";
import Spinner from "app/components/form/spinner";
import Drawer from "app/components/ui/drawer";
import ViewCustomer from "./viewCustomer";

export const metadata = {
  title: "Customers",
  description: "View customer list.",
};

export default function CustomerTable() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
  const { customers } = useCustomerUsers();

  if (customers.isPending) return <Spinner />;
  if (customers.isError) return <div>Something went wrong </div>;
  // const { openModal } = useAppContexxt();

  // function openOrderDetails() {
  //   openModal(<Info />, "Order Details");
  // }
  const data = customers?.data?.data;
  const totalPages = customers?.data?.totalPages;
  const rows = customers?.data?.total;

  const openDetailsModal = (user) => {
    setSelectedItem(user);
    setIsDrawerOpen(true);
  };

  return (
    <>
      {data?.length > 0 ? (
        <>
          <Table
            length={0}
            headers={customerHeaders}
            totalPages={totalPages}
            rows={rows}
            showPagination
            showRowCount
            header="Customers"
          >
            {data.map((user, idx) => (
              <tr
                key={idx}
                onClick={() => openDetailsModal(user)}
                className="hover:cursor-pointer hover:bg-[var(--background)]"
              >
                <td className="px-6 py-4 min-w-[199px]">
                  {fullName(user?.firstName, user?.lastName)}
                </td>
                <td className="px-6 py-4 min-w-[118px]">{user?.email}</td>
                <td className="px-6 py-4">{roles(user?.roles)}</td>
                <td className="px-6 py-4 w-[125px]">
                  {<StatusCard status={"Active"} />}
                </td>
                <td className="px-6 py-4 min-w-[138px]">
                  {formatDate(user.createdAt)}
                </td>
              </tr>
            ))}
          </Table>
          {/* <Suspense>
            <div className="mt-6">
              <Pagination totalPages={totalPages} />
              
            </div>
          </Suspense> */}
        </>
      ) : (
        <EmptyOrders />
      )}
      <Drawer
        title={"View Customer"}
        children={
          <ViewCustomer
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
