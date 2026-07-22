import { configureStore } from "@reduxjs/toolkit";

import sessionReducer from "@/redux/slices/session.slice";
import { loadState, saveState } from "@/redux/loadstore";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    session: store.getState().session,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
