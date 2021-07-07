import { createSlice } from '@reduxjs/toolkit';

// Redux action + reducer → slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userId: null,
    email: null,
    nickname: null,
  },
  reducers: {
    // 로그인 상태 업데이트
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    // 사용자 식별 id 업데이트
    setId: (state, action) => {
      state.userId = action.payload;
    },
    // 사용자 이메일 계정 업데이트
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    // 사용자 닉네임 업데이트
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoginState, setId, setEmail, setNickname } =
  authSlice.actions;

export default authSlice.reducer;
