import { createSlice } from '@reduxjs/toolkit';

// Redux action + reducer → slice
export const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    count: 0,
  },
  reducers: {
    // 상태 업데이트
    refresh: (state, action) => {
      state.count = state.count + action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { refresh } = refreshSlice.actions;

export default refreshSlice.reducer;
