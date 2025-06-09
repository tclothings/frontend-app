
import { SortFilterItemType } from "./types";
import { formatDate } from "./utils";

const sellerImg = "/images/placeholderImg/scrim.png";
const logo = "/images/placeholderImg/sellerLogo.png";

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
  { title: "Profile", path: "/my-account/profile" },
  { title: "Address", path: "/my-account/address" },
  { title: "Payment methods", path: "/my-account/payment-methods" },
];

export const adminNavMenu = [
  { title: "Orders", path: "/admin/orders" },
  { title: "Customers", path: "/admin/user-management/customers" },
  { title: "Admins", path: "/admin/user-management/admins" },
  // { title: "Categories", path: "/admin/product-management/categories" },
  { title: "Products", path: "/admin/product-management/products" },
  { title: "Address", path: "/admin/address" },
  { title: "Payment methods", path: "/admin/payment-methods" },
  { title: "Profile", path: "/admin/profile" },
];

export const navMenu = [
  { title: "Home", path: "/" },
  { title: "Categories", path: "/category" },
  { title: "My Account", path: "/my-account/profile" },
];

export const companyName = "T CLOTHINGS";

export const recentOrders = [
  {
    id: "#654320",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Pending",
    deleiveryDate: formatDate("", "2"),
    transactionType: "credit",
  },
  {
    id: "#654321",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Cancelled",
    deleiveryDate: formatDate("", "2"),
    transactionType: "credit",
  },
  {
    id: "#654322",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Initiated",
    deleiveryDate: formatDate("", "2"),
    transactionType: "debit",
  },
  {
    id: "#654323",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Dispute",
    deleiveryDate: formatDate("", "2"),
    transactionType: "debit",
  },
  {
    id: "#654324",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Completed",
    deleiveryDate: formatDate("", "2"),
    transactionType: "credit",
  },
  {
    id: "#654320",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Pending",
    deleiveryDate: formatDate("", "2"),
    transactionType: "credit",
  },
  {
    id: "#654321",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Cancelled",
    deleiveryDate: formatDate("", "2"),
    transactionType: "credit",
  },
  {
    id: "#654322",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Initiated",
    deleiveryDate: formatDate("", "2"),
    transactionType: "debit",
  },
  {
    id: "#654323",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Dispute",
    deleiveryDate: formatDate("", "2"),
    transactionType: "debit",
  },
  {
    id: "#654324",
    seller: {
      id: "2",
      name: "Viva Store",
      productName: "Daily Shop Online",
      price: 5000,
      noOfSales: 10,
      sellerImg,
      logo,
      tags: ["Beauty, Health, Grocery"],
      rating: 5,
      noOfReviews: 9,
      productImg:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/9161952/1.jpg?7958",
    },
    amount: 4500,
    orderedDate: formatDate("", "2"),
    status: "Completed",
    deleiveryDate: formatDate("", "2"),
    transactionType: "credit",
  },
];

export const publicAuthRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];