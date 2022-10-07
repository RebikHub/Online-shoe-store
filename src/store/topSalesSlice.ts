import { createSlice } from "@reduxjs/toolkit";


export const topSalesSlice = createSlice({
  name: 'topSalesSlice',
  initialState: {
    topSales: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchTopSalesRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchTopSalesSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.topSales = action.payload;
    },
    fetchTopSalesFailure: (state, action) => {
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