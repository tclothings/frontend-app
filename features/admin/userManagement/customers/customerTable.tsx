import Table from "app/components/ui/table";
import { formatAmount, formatDate, fullName } from "app/lib/utils";

// import Info from "../OrderDetails/Info";
import { Suspense } from "react";
import { recentOrders } from "app/lib/constants";
import StatusCard from "app/components/orders/statusCard";
import Pagination from "app/components/ui/pagination";
import EmptyOrders from "app/components/orders/emptyOrders";
import { useCustomerUsers } from "app/api/admin/users";
import { customerHeaders } from "../components/userHeaders";
import UserCard from "../components/userCard";
import Spinner from "app/components/form/spinner";

export const metadata = {
  title: "Customers",
  description: "View customer list.",
};

export default function CustomerTable() {
  const { customers } = useCustomerUsers();
  console.log(customers.data, "data");

  if (customers.isPending) return <Spinner />
  if(customers.isError) return <div>Something went wrong </div>
  // const { openModal } = useAppContexxt();

  // function openOrderDetails() {
  //   openModal(<Info />, "Order Details");
  // }
  const data = customers?.data?.data
  const totalPages = customers?.data?.totalPages;
  return (
    <>
      {data?.length > 0 ? (
        <>
          <Table length={0} headers={customerHeaders}>
            {data.map((user, idx) => (
              <tr
                key={idx}
                // onClick={openOrderDetails}
                className="hover:cursor-pointer hover:bg-primary-50"
              >
                <td className="px-6 py-4">{user._id}</td>
                <td className="px-6 py-4 min-w-[199px]">
                  {fullName(user?.firstName, user?.lastName)}
                </td>
                <td className="px-6 py-4 min-w-[118px]">{user?.email}</td>
                <td className="px-6 py-4 w-[125px]">
                  {<StatusCard status={"Active"} />}
                </td>
                <td className="px-6 py-4 min-w-[138px]">
                  {formatDate(user.createdAt)}
                </td>
              </tr>
            ))}
          </Table>
          <Suspense>
            <div className="mt-6">
              <Pagination totalPages={totalPages} />
            </div>
          </Suspense>
        </>
      ) : (
        <EmptyOrders />
      )}
    </>
  );
}
