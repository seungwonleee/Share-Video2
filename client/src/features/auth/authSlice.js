import { createSlice } from '@reduxjs/toolkit';

// Redux action + reducer → slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: {
      isLoggedIn: false,
      userId: null,
      email: null,
      nickname: null,
    },
  },
  reducers: {
    // 사용자 정보 업데이트
    setUserInfo: (state, action) => {
      // console.log('action ===> ', action);
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;
