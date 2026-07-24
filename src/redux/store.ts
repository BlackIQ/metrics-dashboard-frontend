import { configureStore } from "@reduxjs/toolkit";

import sessionReducer from "@/redux/slices/session.slice";
import userReducer from "@/redux/slices/user.slice";

import { loadState, saveState } from "@/redux/loadstore";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    session: store.getState().session,
    user: store.getState().user,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
