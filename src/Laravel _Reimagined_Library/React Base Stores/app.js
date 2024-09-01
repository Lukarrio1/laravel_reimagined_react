import { createSlice } from "@reduxjs/toolkit";

const Application = createSlice({
  name: "Application",
  initialState: {
    reload_if_cache_is_clear: false,
    preload_page_data: {
      kmg9uKHV1VR9eoF1mdl3nahG8CCpSduNdL55C26uvwG6c9ldsH: {
        jb15qZsvnOZQtRSmmlyLaM9o4IFsdc96Anmu9suzAiEkZg9ioW: [],
      },
    },
    reload_preloaded_page_data: null,
  },
  reducers: {
    setReloadCachedData: (state, { payload }) => {
      state.reload_if_cache_is_clear = payload;
      return state;
    },
    setReloadedPageData: (state, { payload }) => {
      state.reload_preloaded_page_data = payload;
      state.preload_page_data[payload] = null;
      return state;
    },
    setPreLoadPageData: (state, { payload }) => {
      state.preload_page_data[payload.page_key][payload.key] = payload.data;
      return state;
    },
  },
});

export const { setReloadCachedData, setPreLoadPageData, setReloadedPageData } =
  Application.actions;
export default Application.reducer;
