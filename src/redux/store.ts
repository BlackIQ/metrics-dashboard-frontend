import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./loadstore";
import tokenReducer from "@/redux/slices/token.slice";
import userReducer from "@/redux/slices/user.slice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    token: store.getState().token,
    user: store.getState().user,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
