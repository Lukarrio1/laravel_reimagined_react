import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import Laravel_Reimagined_Reducers from "../Laravel _Reimagined_Library/React Base Stores/Laravel_Reimagined_Reducers";

export const store = configureStore({
  reducer: { ...Laravel_Reimagined_Reducers },
});
