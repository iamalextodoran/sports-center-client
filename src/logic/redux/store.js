import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, compose, applyMiddleware } from "redux";

import sagas from "logic/sagas";
import { storeConfig } from "./config";
import rootReducer from "./rootReducer";

const EXCLUDED_TYPES = ["persist/REHYDRATE"];

const loggerMiddleware = createLogger({
  predicate: (_getState, action) => !EXCLUDED_TYPES.includes(action.type),
  collapsed: (_getState, _action, logEntry) => !logEntry.error,
  duration: true,
  timestamp: false,
  diff: true,
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.REACT_APP_NODE_ENV === `development`) {
  middlewares.push(loggerMiddleware);
}

const enhancer = compose(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(storeConfig, rootReducer);
const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store, {});

sagaMiddleware.run(sagas);

const reduxStore = () => ({ store, persistor });

export default reduxStore;
