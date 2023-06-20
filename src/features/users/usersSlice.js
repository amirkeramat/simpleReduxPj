import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "Johnny depp" },
  { id: 2, name: "Amber shit" },
  { id: 3, name: "Van diesel" },
  { id: 4, name: "Arnold" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
