import { createSlice } from "@reduxjs/toolkit";

const Authentication = createSlice({
  name: "Authentication",
  initialState: {
    permissions: [],
    user: null,
    is_logged_in: false,
  },
  reducers: {
    setAuthProperties: (state, { payload }) => {
      state.user = payload;
      state.permissions = [...payload.roles[0].permissions];
      state.is_logged_in = true;
      localStorage.setItem("isLoggedIn", true);
      return state;
    },
  },
});

export const { setAuthProperties } = Authentication.actions;
export default Authentication.reducer;
