import {configureStore} from "@reduxjs/toolkit";
import thisReducer from "./slice";

export const store = configureStore({
  reducer: {
    thisReducer: thisReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
