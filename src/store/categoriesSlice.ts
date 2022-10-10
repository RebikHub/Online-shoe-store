import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, ICategories } from "../interfaces";

const initialState: ICategories = {
  categories: null,
  loading: false,
  error: null,
  id: null
}

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    fetchCategoriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.loading = false;
      state.categories = action.payload;
    },
    currentCategoriesId: (state, action: PayloadAction<null | number>) => {
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