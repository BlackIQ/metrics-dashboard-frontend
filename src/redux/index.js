import { createStore } from "redux";

import allReducers from "@/redux/reducers";

import { loadState, saveState } from "@/redux/loadstore";

const persistedState = loadState();

let store = createStore(allReducers, persistedState);

store.subscribe(() =>
  saveState({
    user: store.getState().user,
    session: store.getState().session,
    locale: store.getState().locale,
    theme: store.getState().theme,
  })
);

export default store;
