import OrderTableTabs from "./ordersTableTabs";
import AccountPageHeader from "../ui/accountPageHeader";
import RecentOrdersTable from "./ordersTable";

export default function Orders() {
    return (
      <>
        <AccountPageHeader title="Orders" />
        <div className="dark:bg-black">
          <section className="pt-5 pb-[19px] mt-6 md:mt-5 font-medium flex flex-row justify-between items-center">
            <OrderTableTabs />
          </section>
          <RecentOrdersTable />
        </div>
      </>
    );
}
