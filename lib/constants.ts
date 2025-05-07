import { SortFilterItemType } from "./types";

export const DEFAULT_OPTION = 'Default Title';
export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";


export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};
export const defaultSort: SortFilterItemType = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItemType[] = [
  defaultSort,
  {
    title: "Trending",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];

export const accountNavMenu = [
  { title: "Profile", path: "/my-account/profile" },
  { title: "Address", path: "/my-account/address" },
  { title: "Payment methods", path: "/my-account/payment-methods" },
  { title: "Orders", path: "/my-account/orders" },
];
  export const navMenu = [
    { title: "Home", path: "/" },
    { title: "Categories", path: "/category" },
    { title: "My Account", path: "/my-account/profile" },
];
  
export const companyName = "T CLOTHINGS"