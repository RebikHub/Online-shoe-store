import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  search: string;
};

const initialState: State = {
  search: ''
}

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload.trim();
    },
    clearSearch: (state) => {
      state.search = '';
    }
  }
})

export const {
  changeSearch,
  clearSearch
} = searchSlice.actions;

export default searchSlice.reducer;