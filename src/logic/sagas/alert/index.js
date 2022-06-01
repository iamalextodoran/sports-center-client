import { delay, put, takeEvery, select } from "redux-saga/effects";

import { Types as AlertTypes } from "logic/reducers/alert";

export const createAlert = function* ({ payload }) {
  yield put({ type: AlertTypes.PUSH_ALERT, payload });
  yield delay(4_000);

  const messages = yield select((state) => state.alert.messages);
  const index = messages.findIndex((msg) => msg.content === payload.content);

  if (index !== -1) yield put({ type: AlertTypes.POP_ALERT, payload: index });
};

const alertSagas = [takeEvery(AlertTypes.CREATE_ALERT, createAlert)];

export default alertSagas;
