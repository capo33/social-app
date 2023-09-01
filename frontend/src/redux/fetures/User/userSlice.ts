import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userServices from "./userService";
import { initialState } from "../authState";

// Get user profile
export const userProfile = createAsyncThunk(
  "auth/userProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await userServices.getUserProfile(token);

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get user profile
    builder.addCase(userProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });
    builder.addCase(userProfile.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export default authSlice.reducer;
