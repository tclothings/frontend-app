import { Product } from "app/lib/types";
import { create } from "zustand";

interface CartItem extends Product {
  quantity: number;
}
interface CartStore {
  items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (product: Product) => void
}
const cartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product: any) =>
    set((state) => {
      const existingItemIndex = state.items?.findIndex(
        (item) => item.id === product.id
      );
      if (existingItemIndex !== -1) {
          const cartItems = [...state.items];
          const existingItem = cartItems[existingItemIndex];
        const updatedItem = { ...existingItem, quantity: product.quantity + 1 };
        cartItems[existingItemIndex] = updatedItem;
        return { items: cartItems };
      } else {
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }
    }),
    removeItem: (product) => set((state) => {
        const updatedItemIndex = state.items?.findIndex((item) => item.id === product.id)
        if (updatedItemIndex !== 1) {
            const cartItems= [...state.items]
            const updatedItem = cartItems[updatedItemIndex];
            cartItems[updatedItemIndex] = { ...updatedItem, quantity: updatedItem.quantity - 1 }
            return {items: cartItems}
        } else {
            return {items: state.items}
        }
  })
}));

export default cartStore;
