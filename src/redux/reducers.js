import { combineReducers } from "redux";

import userReducer from "./reducers/user";
import sessionReducer from "./reducers/session";
import localeReducer from "./reducers/locale";
import themeReducer from "./reducers/theme";

export default combineReducers({
  user: userReducer,
  session: sessionReducer,
  locale: localeReducer,
  theme: themeReducer,
});