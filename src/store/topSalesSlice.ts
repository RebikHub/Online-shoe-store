import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITopSales, Products } from "../types/interfaces";

const initialState: ITopSales = {
  topSales: null,
  loading: false,
  error: null
}

export const topSalesSlice = createSlice({
  name: 'topSalesSlice',
  initialState,
  reducers: {
    fetchTopSalesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTopSalesSuccess: (state, action: PayloadAction<Products[]>) => {
      state.loading = false;
      state.error = null;
      state.topSales = action.payload;
    },
    fetchTopSalesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
})

export const {
  fetchTopSalesRequest,
  fetchTopSalesFailure,
  fetchTopSalesSuccess
} = topSalesSlice.actions;

export default topSalesSlice.reducer;