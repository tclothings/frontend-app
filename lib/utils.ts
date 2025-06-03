import { ReadonlyURLSearchParams } from "next/navigation";
import { FormatOptions, IParams } from "./types";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./configs/s3Client";
import { toast } from "sonner";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const formatDate = (date?: string, format = "1") => {
  if (!date) {
    date = new Date().toISOString();
  }
  const month = new Intl.DateTimeFormat(undefined, { month: "short" }).format(
    new Date(date)
  );
  const day = new Intl.DateTimeFormat(undefined, { day: "numeric" }).format(
    new Date(date)
  );
  // let month = serializedDate.getMonth() + 1
  // let day = serializedDate.getDate();
  const year = new Intl.DateTimeFormat(undefined, { year: "numeric" }).format(
    new Date(date)
  );
  if (format === "1") {
    return `${day} ${month},${year}`;
  } else {
    return `${day} ${month} ${year}`;
  }
}; 


export const formatAmount = (
  amount: number,
  options: FormatOptions = {}
): string => {
  const {
    locale = "en-NG", // Default locale for Nigeria
    currency = "NGN", // Default currency for Naira
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options;

  // Configure number format options
  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits,
    maximumFractionDigits,
  };

  if (currency) {
    formatOptions.style = "currency";
    formatOptions.currency = currency;
  } else {
    // formatOptions.style = 'decimal';
  }
  const formatter = new Intl.NumberFormat(locale, formatOptions);
  return formatter.format(amount);
}; 

export const formatNumber = (amount: number, options: FormatOptions = {}) => {
  const {
    locale = "en-NG", // Default locale for Nigeria
    currency = "NGN", // Default currency for Naira
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options;
  // Configure number format options

  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits,
    maximumFractionDigits,
  };

  const formatter = new Intl.NumberFormat(locale, formatOptions);
  return formatter.format(amount);
};

export const capitalizeWord = (word: string) => {
  if (!word) return "";
  return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
};

export const fullName = (firstName: string, lastName: string) => {
  return `${capitalizeWord(firstName)} ${capitalizeWord(lastName)}`;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function decodeJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export function roles(roles: string[]) {
  if (!roles?.length) return "User"
    return roles.map((role) => capitalizeWord(role)).toString();
}


export const slugify = (name?: string) => {
  if (!name) return "";
  return name
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const stringifyParams = (data?: IParams) => {
  let urlParams = [];
  if (data) {

    if (data.limit) {
      urlParams.push(`limit=${data.limit}`);
    }

    if (data.limitless) {
      urlParams.push(`limitless=${data.limitless}`);
    }

    if (data.page) {
      urlParams.push(`page=${data.page}`);
    }
  }

  return urlParams.length > 0 ? `?${urlParams.join("&")}` : "";
};
