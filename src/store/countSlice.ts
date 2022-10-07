import { createSlice } from "@reduxjs/toolkit";


export const countSlice = createSlice({
  name: 'countSlice',
  initialState: {
    count: 0
  },
  reducers: {
    increment: (state, action) => {
      if (state.count >= 0 && state.count < 10) {
        state.count = state.count + 1;
      } else {
        state.count = 0;
      }
    },
    decrement: (state, action) => {
      if (state.count > 0 && state.count <= 10) {
        state.count = state.count - 1;
      } else {
        state.count = 0;
      }
    },
    clearCount: (state, action) => {
      state.count = 0;
    }
  }
})

export const {
  increment,
  decrement,
  clearCount
} = countSlice.actions;

export default countSlice.reducer;