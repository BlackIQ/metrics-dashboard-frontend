import { combineReducers } from "redux";

import userReducer from "./reducers/user";
import sessionReducer from "./reducers/session";
import toastReducer from "./reducers/toast";

export default combineReducers({
  user: userReducer,
  session: sessionReducer,
  toast: toastReducer,
});
