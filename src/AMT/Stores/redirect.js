import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const Redirect = createSlice({
  name: "redirect",
  initialState: {
    current_redirect_config: null,
  },
  reducers: {
    setCurrentRedirectConfig: (state, { payload }) => {
      const {
        user: { roles },
        redirects,
      } = payload;
      const role = roles?.find((_, idx) => idx === 0);
      const current_user_redirect = redirects?.find(
        (redirect) => role?.id === redirect?.role_id
      );
      state.current_redirect_config = current_user_redirect;
      return state;
    },
  },
});

export const { setCurrentRedirectConfig } = Redirect.actions;
export default Redirect.reducer;

export const getMemRedirect = createSelector(
  [(state) => state?.redirect?.current_redirect_config],
  (current_redirect_config) => {
    return { ...current_redirect_config };
  }
);
