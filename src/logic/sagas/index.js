import { all } from "redux-saga/effects";

import alertSagas from "./alert";
import applicationSagas from "./application";
import dataSagas from "./data";

export default function* root() {
  yield all([...alertSagas, ...applicationSagas, ...dataSagas]);
}
