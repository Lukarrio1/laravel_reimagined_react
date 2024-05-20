import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

import coreNodesReducer from "./coreNodes";
import settingReducer from "./setting";
import AuthenticationReducer from "./auth";

export const store = configureStore({
  reducer: {
    coreNodes: coreNodesReducer,
    setting: settingReducer,
    authentication: AuthenticationReducer,
  },
});
