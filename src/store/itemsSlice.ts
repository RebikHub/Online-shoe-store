import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItems, Products } from "../types/interfaces";

const initialState: IItems = {
  items: null,
  item: null,
  loading: false,
  error: null,
  empty: false,
  searchResponse: false
}

export const itemsSlice = createSlice({
  name: 'itemsSlice',
  initialState,
  reducers: {
    fetchItemsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.empty = false;
      state.searchResponse = false;
    },
    fetchItemsSuccess: (state, action: PayloadAction<[]>) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    },
    fetchItemsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchItemsMoreSuccess: (state, action: PayloadAction<Products[] | null>) => {
      state.loading = false;
      state.error = null;
      if (state.items && action.payload) {
        const res: Products[] = [];
        action.payload.map((e) => {
          if (state.items) {
            if (!state.items.some((el) => e.id === el.id)) {
              return res.push(e)
            }
          }
          return e
        });
        state.items = [...state.items, ...res];
      };
    },
    fetchItemsMoreEmpty: (state, action) => {
      state.loading = false;
      state.error = null;
      state.empty = true;
    },
    fetchItemSuccess: (state, action: PayloadAction<Products>) => {
      state.loading = false;
      state.error = null;
      state.item = action.payload;
    },
    responseSearch: (state) => {
      state.searchResponse = true;
      state.loading = false;
    },
  }
})

export const {
  fetchItemsRequest,
  fetchItemsFailure,
  fetchItemsSuccess,
  fetchItemsMoreSuccess,
  fetchItemsMoreEmpty,
  fetchItemSuccess,
  responseSearch
} = itemsSlice.actions;

export default itemsSlice.reducer;