import { createSlice } from "@reduxjs/toolkit";

// Redux action + reducer → slice
export const likeSlice = createSlice({
  name: "like",
  initialState: {
    count: 0,
  },
  reducers: {
    // 개인 작품 영상 좋아요 상태 업데이트
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCount } = likeSlice.actions;

export default likeSlice.reducer;
