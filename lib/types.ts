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


export type Money = {
  amount: string;
  currencyCode: string;
};


// nav
export type Menu = {
  title: string;
  path: string;
};

// sort
export type SortFilterItemType = {
  title: string;
  slug: string | null;
  sortKey: "" | "price";
  reverse: boolean;
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
  _id?: string;
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
  slug: string;
  price: number;
  quantity: number;
  salePrice: number;
  size: string;
  sku: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface ICartItem {
  productId: string;
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
  subtotal: number;
} 
export interface ICategory {
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  createdAt: string;
  _id: string
}
export interface IShipping {
  _id: string;
  name: string;
  description: string;
  cost: number | null;
}

export type IParams = {
  page?: number;
  limit?: number;
  limitless?: true;
  order?: Record<string, string>;
  q?: Record<string, any>;
} | null;