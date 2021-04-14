import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import dialogSlice from "../features/dialog/dialogSlice";
// Redux Store 코드
// combine reducer와 동일한 역할
export default configureStore({
  reducer: {
    auth: authSlice,
    dialog: dialogSlice,
  },
});
