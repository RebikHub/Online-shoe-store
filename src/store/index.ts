import { configureStore } from "@reduxjs/toolkit";
import topSalesSlice from "./topSalesSlice";
import categoriesSlice from "./categoriesSlice";
import itemsSlice from "./itemsSlice";
import searchSlice from "./searchSlice";
import countSlice from "./countSlice";
import cartSlice from "./cartSlice";


export const store = configureStore({
  reducer: {
    topSalesSlice,
    categoriesSlice,
    itemsSlice,
    searchSlice,
    countSlice,
    cartSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;