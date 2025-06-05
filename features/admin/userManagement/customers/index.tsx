"use client";

import AccountPageHeader from "app/components/ui/accountPageHeader";
import CustomerTable from "./customerTable";


export default function Customers() {
  // const [activeUserTab, setActiveUserTab] = useState <IUserTable>("customers");
  return (
    <>
      <AccountPageHeader title="Customers" />
      <div className="dark:bg-black">
       <CustomerTable /> 
      </div>
    </>
  );
}
