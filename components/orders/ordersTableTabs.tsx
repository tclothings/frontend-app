"use client"
import clsx from "clsx";
import { useState } from "react";

export default function OrderTableTabs() {
  const [activeOrderTab, setActiveOrderTab] = useState("all");

  return (
    <div className="flex flex-row md:gap-2">
      <h2
        onClick={() => setActiveOrderTab("all")}
        className={clsx(
          "flex items-center p-4 text-grey-900 text-sm font-medium border-b-solid border-b-[1px]",
          { "border-b-primary-500 gap-2": activeOrderTab === "all" },
          { "border-b-transparent": activeOrderTab !== "all" }
        )}
      >
        <span>All Orders</span>
        {activeOrderTab === "all" && (
          <span
            className={clsx(
              "bg-primary-50 rounded-[10px] w-[22px] h-[18px] flex justify-center text-primary-500",
              { flex: activeOrderTab === "all" },
              { hidden: activeOrderTab !== "all" }
            )}
          >
            12
          </span>
        )}
      </h2>

      <h2
        onClick={() => setActiveOrderTab("intransit")}
        className={clsx(
          "flex items-center p-4 text-grey-900 text-sm font-medium border-b-solid border-b-[1px]",
          {
            "border-b-primary-500 gap-2": activeOrderTab === "intransit",
          },
          {
            "border-b-transparent": activeOrderTab !== "intransit",
          }
        )}
      >
        <span className="text-nowrap">Orders in-transit</span>
        {activeOrderTab === "intransit" && (
          <span
            className={clsx(
              "bg-primary-50 rounded-[10px] w-[22px] h-[18px] flex justify-center text-primary-500",
              { flex: activeOrderTab === "intransit" },
              { hidden: activeOrderTab !== "intransit" }
            )}
          >
            12
          </span>
        )}
      </h2>
    </div>
  );
}
