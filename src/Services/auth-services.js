import { createAsyncThunk } from "@reduxjs/toolkit";
const url = import.meta.env.VITE_BASE_URL;

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errData = await response.json();
        return rejectWithValue(errData.message);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      if(!navigator.onLine){
        return rejectWithValue("No internet connection")
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

export const sigininUser = createAsyncThunk(
  "user/signinUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errData = await response.json();
        return rejectWithValue(errData.message);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      if(!navigator.onLine){
        return rejectWithValue("No internet connection")
      }
      return rejectWithValue(err.message);
    }
  }
);
