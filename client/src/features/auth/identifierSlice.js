import { createSlice } from "@reduxjs/toolkit";

export const identifierSlice = createSlice({
  name: "identifier",
  initialState: {
    uid: null,
  },
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUid } = identifierSlice.actions;

export default identifierSlice.reducer;
