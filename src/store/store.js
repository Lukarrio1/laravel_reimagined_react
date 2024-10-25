import { configureStore } from "@reduxjs/toolkit";
import Laravel_Reimagined_Reducers from "../AMT/Stores/Laravel_Reimagined_Reducers";

export const store = configureStore({
  reducer: { ...Laravel_Reimagined_Reducers },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["errors/setErrors"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
