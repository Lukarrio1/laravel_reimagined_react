import { createSlice } from "@reduxjs/toolkit";

const Loading = createSlice({
  name: "loading",
  initialState: {
    loads: {},
  },
  reducers: {
    setLoadingProperties: (state, { payload }) => {
      const { key, loading } = payload;
      state.loads[key] = loading;
      return state;
    },
  },
});

export const { setLoadingProperties } = Loading.actions;
export default Loading.reducer;
