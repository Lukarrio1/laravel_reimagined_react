import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const Authentication = createSlice({
  name: "authenication",
  initialState: {
    permissions: [],
    user: null,
    is_logged_in: false,
  },
  reducers: {
    setAuthProperties: (state, { payload }) => {
      state.user = payload;
      state.permissions = [
        ...(payload.roles[0]?.permissions?.length > 0
          ? payload.roles[0].permissions
          : []),
      ];
      state.is_logged_in = true;
      localStorage.setItem("isLoggedIn", true);
      return state;
    },
    logout: (state) => {
      sessionStorage.removeItem("bearerToken");
      localStorage.clear();
      state.permissions = [];
      state.user = null;
      state.is_logged_in = false;
    },
  },
});

export const { setAuthProperties, logout } = Authentication.actions;
export default Authentication.reducer;

export const getMemProfile = createSelector(
  [(state) => state?.authentication?.user],
  (user) => {
    return !user ? null : { ...user };
  }
);
