import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const Setting = createSlice({
  name: "setting",
  initialState: {
    settings: null,
  },
  reducers: {
    setSettings: (state, { payload }) => {
      const temp = {};
      payload.forEach((element) => {
        temp[element.key] = element.properties;
      });
      state.settings = temp;
      return state;
    },
  },
});

export const { setSettings } = Setting.actions;
export default Setting.reducer;

export const getMemSettings = createSelector(
  [(state) => state?.setting?.settings],
  (settings) => {
    return { ...settings };
  }
);
