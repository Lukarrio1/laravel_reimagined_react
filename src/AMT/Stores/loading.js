import { createSlice } from "@reduxjs/toolkit";

const Loading = createSlice({
  name: "loading",
  initialState: {
    loads: {},
    refs: {},
  },
  reducers: {
    setLoadingProperties: (state, { payload }) => {
      const { key, loading, loading_ref } = payload;
      state.loads[key] = loading;
      state.refs[key] = loading_ref;
      return state;
    },
  },
});

export const { setLoadingProperties } = Loading.actions;
export default Loading.reducer;
