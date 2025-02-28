import { createSlice } from "@reduxjs/toolkit";
import { sigininUser, signupUser } from "../Services/auth-services";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    signUpError: null,
  },

  reducers: {
    signUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.signUpError = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signUpError = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signUpError = action.payload;
      })
      .addCase(sigininUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sigininUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(sigininUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
