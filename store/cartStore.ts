import { Product } from "app/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem extends Product {
  quantity: number;
}
interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  deleteItem: (product: Product) => void;
  // deleteItem: (product: Product) => void;
  totalQuantity: () => number;
  totalAmount: () => number;
  // message: string;
  // setMessage: (res: string) => void;
}
const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: any) =>
        set((state) => {
          const existingItemIndex = state.items?.findIndex(
            (item) => item.id === product.id
          );
          if (existingItemIndex !== -1) {
            const cartItems = [...state.items];
            const existingItem = cartItems[existingItemIndex];
            const updatedItem = {
              ...existingItem,
              quantity: existingItem.quantity + 1,
            };
            cartItems[existingItemIndex] = updatedItem;
            return { items: cartItems };
          } else {
            const newProduct = { ...product, quantity: 1 };
            const updatedCart = [...state.items];
            updatedCart.push(newProduct);
            return { items: updatedCart };
          }
        }),
      removeItem: (product) =>
        set((state) => {
          const updatedItemIndex = state.items?.findIndex(
            (item) => item.id === product.id
          );
          if (updatedItemIndex !== -1) {
            const cartItems = [...state.items];
            const updatedItem = cartItems[updatedItemIndex];
            if (updatedItem.quantity > 1) {
              cartItems[updatedItemIndex] = {
                ...updatedItem,
                quantity: updatedItem.quantity - 1,
              };
            } else {
              cartItems.splice(updatedItemIndex, 1);
            }
            return { items: cartItems };
          } else {
            return { items: state.items };
          }
        }),
      deleteItem: (product) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== product.id),
        })),
      totalQuantity: () =>
        Array.isArray(get().items)
          ? get().items.reduce((sum, item) => sum + item.quantity, 0)
          : 0,
      totalAmount: () =>
        Array.isArray(get().items)
          ? get().items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )
          : 0,
      // message: "",
      // setMessage: (res: string) => {
      //   set({ message: res });
      //   setTimeout(() => {
      //     set({ message: "" });
      //   }, 5000);
      // },
    }),
    {
      name: "cart-storage", // Storage key
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && !Array.isArray(state.items)) {
          state.items = [];
        }
      },
    }
  )
);

export default useCartStore;
