import { createActions } from "reduxsauce";
import { createBrowserHistory } from "history";
import { persistCombineReducers } from "redux-persist";

import { storeConfig } from "./config";
import { application, alert, data } from "logic/reducers";

export const history = createBrowserHistory();

export const { Types } = createActions(
  {
    reset: null,
  },
  { prefix: "state/" }
);

const appReducers = persistCombineReducers(storeConfig, {
  application,
  alert,
  data,
});

const rootReducer = (state, action) => {
  if (action && action.type === "state/RESET") {
    state = {
      application: undefined,
      alert: undefined,
      data: undefined,
    };
  }

  return appReducers(state, action);
};

export default rootReducer;
