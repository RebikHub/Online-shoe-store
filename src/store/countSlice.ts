import { createSlice } from "@reduxjs/toolkit";

type State = {
  count: number;
};

const initialState: State = {
  count: 0
}

export const countSlice = createSlice({
  name: 'countSlice',
  initialState,
  reducers: {
    increment: (state) => {
      if (state.count >= 0 && state.count < 10) {
        state.count = state.count + 1;
      } else {
        state.count = 0;
      }
    },
    decrement: (state) => {
      if (state.count > 0 && state.count <= 10) {
        state.count = state.count - 1;
      } else {
        state.count = 0;
      }
    },
    clearCount: (state) => {
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