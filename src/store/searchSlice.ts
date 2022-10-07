import { createSlice } from "@reduxjs/toolkit";


export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    search: ''
  },
  reducers: {
    changeSearch: (state, action) => {
      state.search = action.payload.trim();
      state.response = false;
    },
    clearSearch: (state, action) => {
      state.search = '';
    }
  }
})

export const {
  changeSearch,
  clearSearch
} = searchSlice.actions;

export default searchSlice.reducer;