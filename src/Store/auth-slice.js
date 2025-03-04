// import { createSlice } from "@reduxjs/toolkit";
// import { googleOuth, logout, sigininUser, signupUser, updateUser } from "../Services/auth-services";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     loading: false,
//   },

//   reducers:
//   {
//     signOut: (state) =>
//     {
//       state.user = null;
//     }
//   },
  
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(sigininUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sigininUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(sigininUser.rejected, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         const updatedUser = action.payload.updatedUser;
//         state.user = {...state.user,...updatedUser};
//         state.loading = false;
//       })
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateUser.rejected, (state,action) => {
//         state.loading = false; 
//       })
//       .addCase(googleOuth.fulfilled, (state, action) => {
//         state.user = action.payload;
//       })
//       .addCase(logout.fulfilled,(state)=>
//       {
//         state.user = null;
//       })
//   },
// });

// export const authActions = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
    updateUser: (state,action) =>
    {
      state.user = {...state.user,...action.payload};
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
