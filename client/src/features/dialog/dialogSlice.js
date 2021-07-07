import { createSlice } from '@reduxjs/toolkit';

// Redux action + reducer → slice
export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    dialogState: false,
    message: null,
  },
  reducers: {
    // dialog 상태 업데이트
    dialogState: (state, action) => {
      state.dialogState = action.payload;
      state.dialogState = action.payload.dialogState;
      state.message = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { dialogState } = dialogSlice.actions;

export default dialogSlice.reducer;
