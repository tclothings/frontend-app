import { capitalizeWord } from "app/lib/utils";
import clsx from "clsx";
import CardStyle from "../icons/cardStyle";

export default function StatusCard({ status }: { status: string }) {
  let classObj;
  const cardStatus = status.toLowerCase();

  switch (cardStatus) {
    case "pending":
      classObj = {
        className: "bg-yellow-100 text-yellow-800",
        circleColor: "#D97706", // Amber
      };
      break;
    case "paid":
    case "successful":
      classObj = {
        className: "bg-green-50 text-green-700",
        circleColor: "#10B981", // Emerald
      };
      break;
    case "failed":
      classObj = {
        className: "bg-red-100 text-red-700",
        circleColor: "#DC2626", // Red
      };
      break;
    case "cancelled":
      classObj = {
        className: "bg-red-50 text-red-600",
        circleColor: "#EF4444", // Slightly lighter red
      };
      break;
    case "refunded":
      classObj = {
        className: "bg-purple-50 text-purple-700",
        circleColor: "#8B5CF6", // Purple
      };
      break;
    case "partially_refunded":
      classObj = {
        className: "bg-violet-100 text-violet-700",
        circleColor: "#7C3AED", // Violet
      };
      break;
    case "processing":
      classObj = {
        className: "bg-blue-50 text-blue-700",
        circleColor: "#3B82F6", // Blue
      };
      break;
    case "shipped":
      classObj = {
        className: "bg-indigo-100 text-indigo-700",
        circleColor: "#6366F1", // Indigo
      };
      break;
    case "delivered":
    case "completed":
    case "active":
      classObj = {
        className: "bg-green-100 text-green-700",
        circleColor: "#22C55E", // Light green
      };
      break;
    case "returned":
      classObj = {
        className: "bg-orange-100 text-orange-700",
        circleColor: "#F97316", // Orange
      };
      break;
    case "initiated":
      classObj = {
        className: "bg-sky-100 text-sky-700",
        circleColor: "#0EA5E9", // Sky blue
      };
      break;
    case "dispute":
      classObj = {
        className: "bg-amber-100 text-amber-700",
        circleColor: "#F59E0B", // Warning amber
      };
      break;
    default:
      classObj = {
        className: "bg-gray-100 text-gray-600",
        circleColor: "#9CA3AF", // Neutral
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
      {capitalizeWord(cardStatus.replaceAll("_", " "))}
    </span>
  );
}
