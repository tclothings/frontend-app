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
  images: Connection<Image>;
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
