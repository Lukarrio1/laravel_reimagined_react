import { createSlice } from "@reduxjs/toolkit";

const Errors = createSlice({
  name: "errors",
  initialState: {
    errors: [],
  },
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = [...payload, ...state.errors];
      return state;
    },
  },
});

export const { setErrors } = Errors.actions;
export default Errors.reducer;
