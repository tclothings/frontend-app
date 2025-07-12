
import { SortFilterItemType } from "./types";


export const emptyValue = ""
export const DEFAULT_OPTION = "Default Title";
export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const allCategory = {
  handle: "",
  title: "All",
  description: "All products",
  seo: {
    title: "All",
    description: "All products",
  },
  path: "/category",
};
export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};
export const defaultSort: SortFilterItemType = {
  title: "Latest arrivals",
  slug: null,
  sortKey: "",
  reverse: false,
};
export const sorting: SortFilterItemType[] = [
  defaultSort,
  // {
  //   title: "Trending",
  //   slug: "trending-desc",
  //   sortKey: "BEST_SELLING",
  //   reverse: false,
  // },
  // {
  //   title: "Latest arrivals",
  //   slug: "latest-desc",
  //   sortKey: "CREATED_AT",
  //   reverse: true,
  // },
  {
    title: "Price: Low to high",
    slug: "asc",
    sortKey: "price",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "desc",
    sortKey: "price",
    reverse: true,
  },
];

export const clientNavMenu = [
  { title: "Orders", path: "/my-account/orders" },
  { title: "Address", path: "/my-account/address" },
  { title: "Profile", path: "/my-account/profile" },
];

export const navMenu = [
  { title: "Home", path: "/" },
  { title: "Categories", path: "/category" },
  { title: "My Account", path: "/my-account/orders" },
];

export const companyName = "T CLOTHINGS";


export const publicAuthRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];


export const orderStatuses = [
  // { label: "Draft", value: "DRAFT" },
  // { label: "Pending", value: "PENDING" },
  { label: "Processing", value: "PROCESSING" }, //DISABLE
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Returned", value: "RETURNED" },
  { label: "Refunded", value: "REFUNDED" },
];

export const paymentStatuses = [
  { label: "Pending", value: "PENDING" }, //DISABLE
  { label: "Paid", value: "PAID" }, //DISABLE
  { label: "Failed", value: "FAILED" }, //DISABLE
  { label: "Refunded", value: "REFUNDED" },
  { label: "Partially Refunded", value: "PARTIALLY_REFUNDED" },
  // { label: "Successful", value: "SUCCESSFUL" },
];