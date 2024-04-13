
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('userPetFamily')) || null,
  loading: false,
  error: false,
};



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
        localStorage.setItem("userPetFamily", JSON.stringify(state.currentUser));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    
  },
});

export const { loginStart, loginSuccess, loginFailure, logout} = userSlice.actions;

export default userSlice.reducer;