

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
  filterComponent?: React.ReactNode
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
export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  isActive: boolean;
  roles: UserRole[];
  status: string;
  createdAt: string
}

export type UserRole = "customer"


// products

export interface IMedia {
  _id?: string;
  mediaType: string,
  url: string,
  altText: string,
}


export interface IProduct {
  category: ICategory;
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
    slug: string;
    quantity: number;
    productImage: string;
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

export interface IAddress {
  additionalDetails: string;
  city: string;
  country: string;
  createdAt: string;
  isDefault: boolean;
  latitude: number;
  lga: string;
  longitude: number;
  phoneNumber: { _id: string; number: string };
  state: string;
  street: string;
  updatedAt: string;
  user: string;
  _id: string;
}
export type IParams = {
  page?: number;
  limit?: number;
  limitless?: true;
  order?: Record<string, string>;
  q?: Record<string, any>;
} | null;

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface IDeliveryDetails {
  riderName: string;
  riderPhone: string;
  deliveryCompany: string;
}

export interface ITrackingInfo {
  deliveryDetails: IDeliveryDetails;
  estimatedDeliveryDate: string; // ISO date string
  shippedAt: string; // ISO date string
  deliveredAt: string; // ISO date string
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  userId: string;
  status:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED"
    | "REFUNDED";
  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED"
    | "PARTIALLY_REFUNDED"
    | "SUCCESSFUL";
  paymentMethod: string;
  shippingAddress: IAddress;
  billingAddress: IAddress;
  items: IOrderItem[];
  totalAmount: number;
  shippingCost: number;
  taxAmount: number;
  trackingInfo: ITrackingInfo;
  customerNotes?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


export type ISessionData = {
  accessToken: string;
  accessTokenExpires: number;
  exp: number;
  expires: number;
  iat: number;
  jti: string;
  refreshToken: string;
  user: {
    createdAt: any;
    deletedAt: any;
    displayName: string;
    dob: string;
    email: string;
    emailVerified: string;
    firstName: string;
    gender: string;
    id: number;
    isAdmin: boolean;
    isCustomer: boolean;
    isProvider: boolean;
    lastName: boolean;
    phone: any;
    phoneVerified: boolean;
    photo: any;
    status: string;
    updatedAt: any;
    roles: []
  };
};
