import { createSlice } from "@reduxjs/toolkit";

// Redux action + reducer → slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    uid: null,
    email: null,
  },
  reducers: {
    // 로그인 상태 업데이트
    loginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    // 사용자 식별 코드 업데이트
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    // 사용자 이메일 계정
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginState, setUid, setEmail } = authSlice.actions;

export default authSlice.reducer;
