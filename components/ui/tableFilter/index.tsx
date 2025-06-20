"use client";
import Button from "app/components/form/button";
import Filter from "app/components/icons/filter";
import Drawer from "../drawer";
import { useState } from "react";

export default function FilterBtn({ children }: { children: React.ReactNode }) {
  // const { openModal } = useAppContexxt();
const [isFilterOpen, setFilterOpen] = useState(false)
  return (
    <>
      <div className="">
        <Button
          icon={<Filter />}
          onClick={() => setFilterOpen(true)}
          text="Filter"
          className="hidden md:flex font-medium text-grey-700  py-[10px] rounded-lg"
        />
        <Button
          icon={<Filter />}
          onClick={() => setFilterOpen(true)}
          text=""
          className="flex md:hidden font-medium text-grey-700 py-[10px] rounded-lg"
        />
      </div>
      <Drawer
        drawerOpenerClass="bg-blue-600 text-white border border-blue-600"
        title={"Filter"}
        children={children}
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        onOpen={() => setFilterOpen(true)}
      />
    </>
  );
}
