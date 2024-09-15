import { createSlice } from "@reduxjs/toolkit";


const sessionSlice = createSlice({

  name:'session',
  initialState:true,
  reducers:
  {
    sessionExpired: (state,action) =>
    {
      return false;
    },
    
    sessionActive: (state,action) =>
    {
      return true;
    }
  }
})

export const sessionActions = sessionSlice.actions;
export default sessionSlice.reducer;