import { createSlice } from "@reduxjs/toolkit";

const Response = createSlice({
  name: "Response",
  initialState: {
    responses: {},
  },
  reducers: {
    setResponse: (state, { payload }) => {
      const { key, data } = payload;
      if (!key || !data) {
        return state;
      }
      state.responses[key] = data;
      return state;
    },
    removeResponse: (state, { payload }) => {
      const { key } = payload;
      state[key] = null;
      return state;
    },
  },
});

export const { setResponse, removeResponse } = Response.actions;
export default Response.reducer;
