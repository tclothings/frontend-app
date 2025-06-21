import { capitalizeWord } from "app/lib/utils";
import clsx from "clsx";

export default function StatusTag({ status }: { status: string }) {
 
    let classObj;
    const cardStatus = status.toLowerCase()

    switch (cardStatus) {
      case "pending":
        classObj = {
          className: "bg-grey-100 text-grey-700",
          circleColor: "#667185",
        };
        break;
      case "cancelled":
        classObj = {
          className: "bg-error-50 text-error-700",
          circleColor: "#F73502",
        };
        break;
      case "initiated":
        classObj = {
          className: "bg-primary-50 text-primary-700",
          circleColor: "#096B9C",
        };
        break;
      case "dispute":
        classObj = {
          className: "bg-warning-50 text-warning-700",
          circleColor: "#F7B302",
        };
        break;
      case "completed":
        classObj = {
          className: "bg-green-50 text-green-700",
          circleColor: "#02B04E",
        };
      case "active":
        classObj = {
          className: "bg-green-50 text-green-700",
          circleColor: "#02B04E",
        };
        break;
      default:
        classObj = {
          className: "bg-grey-100 text-grey-700",
          listClass: "#667185",
        };
  }
    return (
      <span
        className={clsx(
          "inline-flex py-[2px] px-2 rounded-2xl text-xs font-medium whitespace-nowrap",
          classObj.className
        )}
      >
        {capitalizeWord(cardStatus)}
      </span>
    );
}
