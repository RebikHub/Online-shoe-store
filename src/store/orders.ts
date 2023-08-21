import create from 'zustand';
import { TOrder } from "../types/interfaces";

interface ICartState {
  orders: TOrder[] | null;
  removeItem: (id: number) => void;
  clearCart: () => void;
  updateCart: (orders: TOrder[]) => void;
}

const useCartStore = create<ICartState>((set) => ({
  orders: null,
  removeItem: (id) => {
    set((state) => ({
      orders: state.orders ? state.orders.filter((el) => el.id !== id) : null,
    }));
  },
  clearCart: () => {
    set({ orders: null });
  },
  updateCart: (orders) => {
    set({ orders });
  },
}));

export default useCartStore;
