export type Cart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  // lines: Connection<CartItem>;
  totalQuantity: number;
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
};
export type Edge<T> = {
  node: T;
};

export type Money = {
  amount: string;
  currencyCode: string;
};


export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

// nav
export type Menu = {
  title: string;
  path: string;
};

// product
export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};
export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};
export type SEO = {
  title: string;
  description: string;
};

export type Product = {
  id: string;
  handle: string;
  // availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  totalQuantity: number;
  price: number;
  // priceRange: {
  //   maxVariantPrice: Money;
  //   minVariantPrice: Money;
  // };
  // variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Image[];
  // seo: SEO;
  // tags: string[];
  // updatedAt: string;
};
// export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
//   variants: ProductVariant[];
//   images: Image[];
// };

// sort
export type SortFilterItemType = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export type ProductsCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};
export type Collection = ProductsCollection & {
  path: string;
};


// tables
export interface TableHeaderProps {
  headers: { label: string; icon?: string }[];
  header?: string;
  showRowCount?: boolean;
  bulkActions?: any[];
  selectedRowKeys?: React.Key[];
  totalPages?: number;
  showPagination?: boolean;
}
export interface TableBodyProps {
  isLoading?: boolean;
  children: React.ReactNode;
  length: number;
  className?: string;
  img?: string;
  title?: string;
  text?: string;
  headerLength?: number;
}
export interface TableProps extends TableBodyProps, TableHeaderProps { }

export interface FormatOptions {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export type IUserTable = "customers" | "admins"

// products

export interface IMedia {
  _id: string;
  mediaType: string,
  url: string,
  altText: string,
  // isPrimary: true,
  // displayOrder: 1,
}


export interface IProduct {
  category: string;
  createdAt: string;
  description: string;
  productImage: string;
  isActive: boolean;
  isFeatured: boolean;
  materials: string;
  media: IMedia[];
  name: string;
  price: number;
  quantity: number;
  salePrice: number;
  size: string;
  sku: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface ICategory {
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  createdAt: string;
  _id: string
}

export type IParams = {
  page?: number;
  limit?: number;
  limitless?: true;
  order?: Record<string, string>;
  q?: Record<string, any>;
} | null;