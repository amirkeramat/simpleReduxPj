import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  error: null,
  data: [],
};
const BASE_URL = "http://localhost:3000/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      (state.loading = true), (state.error = action.payload);
    });
  },
});
export const selectAllUsers = (state) => state.users.data;
export default usersSlice.reducer;
