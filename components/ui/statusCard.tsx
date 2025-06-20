import { capitalizeWord } from "app/lib/utils";
import clsx from "clsx";
import CardStyle from "../icons/cardStyle"; // Assuming CardStyle takes a `color` prop

export default function StatusCard({ status }: { status: string }) {
  let classObj;
  const cardStatus = status.toLowerCase();

  switch (cardStatus) {
    case "pending":
      classObj = {
        // Changed for better visibility on dark backgrounds
        className: "bg-gray-700 text-gray-200", // Dark grey background, light grey text
        circleColor: "#D1D5DB", // A light grey for the circle
      };
      break;
    case "paid":
    case "successful":
      classObj = {
        className: "bg-green-50 text-green-700",
        circleColor: "#02B04E", // Green
      };
      break;
    case "failed":
    case "cancelled":
      classObj = {
        className: "bg-error-50 text-error-700",
        circleColor: "#F73502", // Red
      };
      break;
    case "refunded":
    case "partially_refunded":
    case "returned":
      classObj = {
        className: "bg-purple-50 text-purple-700",
        circleColor: "#800080", // Purple
      };
      break;
    case "processing":
      classObj = {
        className: "bg-blue-50 text-blue-700",
        circleColor: "#3366FF", // Blue
      };
      break;
    case "shipped":
      classObj = {
        className: "bg-indigo-50 text-indigo-700",
        circleColor: "#663399", // Darker indigo/violet
      };
      break;
    case "delivered":
    case "completed":
    case "active":
      classObj = {
        className: "bg-green-50 text-green-700",
        circleColor: "#02B04E", // Green
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
        circleColor: "#F7B302", // Orange/Warning color
      };
      break;
    default:
      classObj = {
        className: "bg-neutral-100 text-neutral-600",
        circleColor: "#9CA3AF", // Light gray
      };
  }

  return (
    <span
      className={clsx(
        "inline-flex gap-2 items-center py-[2px] px-2 rounded-2xl text-xs font-medium whitespace-nowrap",
        classObj.className
      )}
    >
      <CardStyle color={classObj.circleColor} />
      {capitalizeWord(cardStatus)}
    </span>
  );
}
