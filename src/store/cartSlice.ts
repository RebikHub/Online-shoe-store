import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, TOrder } from "../types/interfaces";

const initialState: ICart = {
  orders: null,
  loading: false,
  error: null,
  status: false,
}

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<number>) => {
      if (state.orders) {
        state.orders = state.orders.filter((el) => el.id !== action.payload);
      };
    },
    clearCart: (state) => {
      state.orders = null;
      state.status = false;
    },
    updateCart: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
    postCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    postCartSuccess: (state) => {
      state.loading = false;
      state.status = true;
    },
  }
})

export const {
  removeItem,
  clearCart,
  updateCart,
  postCartRequest,
  postCartFailure,
  postCartSuccess
} = cartSlice.actions;

export default cartSlice.reducer;