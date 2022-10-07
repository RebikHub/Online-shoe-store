import { createSlice } from "@reduxjs/toolkit";


export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState: {
    categories: [],
    loading: false,
    error: null,
    id: null
  },
  reducers: {
    fetchCategoriesRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    currentCategoriesId: (state, action) => {
      state.id = action.payload;
    }
  }
})

export const {
  fetchCategoriesRequest,
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
  currentCategoriesId
} = categoriesSlice.actions;

export default categoriesSlice.reducer;