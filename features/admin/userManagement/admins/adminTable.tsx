import Table from "app/components/ui/table";
import { formatDate, fullName, roles } from "app/lib/utils";
import { Suspense, useState } from "react";
import StatusCard from "app/components/ui/statusCard";
import Pagination from "app/components/ui/pagination";
import EmptyOrders from "app/components/orders/emptyOrders";
import { useAdminUsers } from "app/api/admin/users";
import Spinner from "app/components/form/spinner";
import { customerHeaders } from "../components/userHeaders";
import Drawer from "app/components/ui/drawer";
import ViewAdmin from "./viewAdmin";

export const metadata = {
  title: "Admin",
  description: "View admin list.",
};

export default function AdminTable() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { admins } = useAdminUsers();

  if (admins.isPending) return <Spinner />;
  if (admins.isError) return <div>Something went wrong </div>;

  const data = admins?.data?.data;
  const totalPages = admins?.data?.totalPages;
  const rows = admins?.data?.total;

  const openDetailsModal = (user) => {
    setSelectedItem(user);
    setIsDrawerOpen(true);
  };
  return (
    <>
          <Table
            length={rows}
            headers={customerHeaders}
            totalPages={totalPages}
            showPagination
            showRowCount
            header="All Admins"
          >
            {data?.map((user, idx) => (
              <tr
                key={idx}
                onClick={() => openDetailsModal(user)}
                className="hover:cursor-pointer hover:bg-[var(--background)]"
              >
                <td className="px-6 py-4 min-w-[199px]">
                  {fullName(user?.firstName, user?.lastName!)}
                </td>
                <td className="px-6 py-4 min-w-[118px]">{user?.email}</td>
                <td className="px-6 py-4">{roles(user?.roles)}</td>
                <td className="px-6 py-4 w-[125px]">
                  {<StatusCard status={user?.status} />}
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
      <Drawer
        title={"View Admin"}
        children={
          <ViewAdmin
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
