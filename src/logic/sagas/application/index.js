import Api from "logic/api";

import { put, takeLatest, call, select } from "redux-saga/effects";

import { Types as AlertTypes } from "logic/reducers/alert";
import { Types as RootTypes } from "logic/redux/rootReducer";
import { Types as ApplicationTypes } from "logic/reducers/application";

export const persisted = function* () {
  const { currentUser } = yield select((state) => state.application);
  Api.auth_token(currentUser.token || null);
};

export const resetStore = function* () {
  yield put({ type: RootTypes.RESET });
};

export const login = function* ({ payload }) {
  try {
    const { data } = yield call(Api.post, "/session/login", payload);
    Api.auth_token(data.token);
    yield put({
      type: ApplicationTypes.SET_CURRENT_USER,
      payload: {
        ...data.user,
        token: data.token,
        loggedInAt: data.loggedInAt,
        tokenAvailability: data.tokenAvailability,
      },
    });
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { content: "You logged in succesfully!" },
    });
  } catch ({ response }) {
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { type: "danger", content: response.data.msg },
    });
  } finally {
  }
};

export const logout = function* ({ payload }) {
  try {
    yield call(Api.post, "/session/logout", payload);
    Api.auth_token(null);
    yield put({ type: ApplicationTypes.SET_CURRENT_USER, payload: {} });
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { content: "Logged out" },
    });
  } catch ({ response }) {
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { type: "danger", content: response.data.msg },
    });
  } finally {
  }
};

const applicationSagas = [
  takeLatest(ApplicationTypes.LOGIN, login),
  takeLatest(ApplicationTypes.LOGOUT, logout),
  takeLatest(ApplicationTypes.PERSISTED, persisted),
  takeLatest(ApplicationTypes.RESET_STORE, resetStore),
];

export default applicationSagas;
