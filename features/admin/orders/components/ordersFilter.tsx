"use client";
import { ChangeEvent, useState } from "react";

import clsx from "clsx";
import Button from "app/components/form/button";
import { orderStatuses } from "app/lib/constants";
// import Input from "app/components/form/Input";
// import { shippingSchema } from "app/lib/schemas/order";

const initialValues = {
  status: [],
};
export interface IFilters {
  status: string[];
}
export type IfilterKeys = keyof IFilters;

export default function OrdersFilter() {
  const [values, setValues] = useState<IFilters>(initialValues);

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      let copiedArray: string[] = [...values["status"]];
      copiedArray.push(e.target.id);

      setValues((values) => ({ ...values, status: copiedArray }));
    } else {
      let filteredArray = [...values["status"]].filter(
        (item) => item !== e.target.id
      );
      setValues((values) => ({ ...values, status: filteredArray }));
    }
  };
  return (
    <div className={clsx(" pb-6")}>
      <section className="px-4 pb-6">
        <h3 className="py-[10px] text-grey-900 text-sm font-medium">Status </h3>
        <ul className="flex flex-col">
          {/* <Input
            name="description"
            placeholder="LGA"
            methods={methods}
            type="text"
            schema={shippingSchema}
            disabled={true}
          /> */}
          {orderStatuses?.map((status) => (
            <div
              key={status.label}
              className="py-[10px] flex gap-3 items-center text-grey-700 text-sm"
            >
              <input
                type="radio"
                name={"status"}
                id={status.value}
                // checked={values.status.includes(status.value)}
                onChange={handleCheckChange}
              />
              <label htmlFor={status.value}>{status.label}</label>
            </div>
          ))}
        </ul>
      </section>
      <section className="px-4 py-6 border-b border-t border-b-grey-100 border-t-grey-100">
        <h3 className={"py-[10px] text-grey-900 text-sm font-medium"}>
          Delivery Date
        </h3>
        <div className="grid grid-cols-2 gap-6 py-[10px] ">
          <input
            type="date"
            className="w-full border border-grey-400 px-3 py-[10px] md:p-4"
          />
          <input
            type="date"
            className="w-full border border-grey-400 px-3 py-[10px] md:p-4"
          />
        </div>
      </section>
      <div className="flex flex-row-reverse md:flex-col gap-6 mt-6">
        <Button
          // onClick={closeFilter}
          disabled={values.status.length < 1}
          text="Apply"
          className="text-blue-600 border-[1.5px] border-blue-600 w-full py-[10px] px-4 font-medium rounded-lg disabled:cursor-not-allowed"
        />
        <Button
          onClick={() => setValues(initialValues)}
          text="Reset"
          className={clsx(
            "text-red w-full bg-transparent py-[10px] px-4 font-medium rounded-lg"
          )}
        />
      </div>
    </div>
  );
}
