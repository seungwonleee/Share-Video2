import { createSlice } from "@reduxjs/toolkit";

// Redux action + reducer → slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    toggleLoginState: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },

    // toggleState: (state, action) => {
    //   state.login = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { toggleLoginState } = authSlice.actions;

export default authSlice.reducer;
