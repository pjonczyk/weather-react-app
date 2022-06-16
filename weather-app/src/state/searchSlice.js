import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTown: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSelectedTown: (state, action) => {
      state.selectedTown = action.payload;
    },
  },
});

export const { setSelectedTown } = searchSlice.actions;

export default searchSlice.reducer;
