import { createSlice } from '@reduxjs/toolkit';



const authSlice = createSlice({
  name: 'auth',
  initialState : {
    isLogin: false,
    userDetails : {}
  },
  reducers: {
    login(state ,action) {
      state.isLogin = true; // Set isLogin to true when user logs in
      state.userDetails = action.payload;
    },
    logout(state) {
      state.isLogin = false; // Set isLogin to false when user logs out
      state.userDetails = {}
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
