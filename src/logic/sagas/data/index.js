import Api from "logic/api";

import { put, takeLatest, call } from "redux-saga/effects";

import { Types as DataTypes } from "logic/reducers/data";
import { Types as AlertTypes } from "logic/reducers/alert";
import { Types as ApplicationTypes } from "logic/reducers/application";

export const getProducts = function* ({ payload }) {
  try {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: true });
    const { data } = yield call(Api.get, `/products?keywords=${payload}`);
    yield put({ type: DataTypes.SET_PRODUCTS, payload: data });
  } catch ({ response }) {
  } finally {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: false });
  }
};

export const getProduct = function* ({ payload }) {
  try {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: true });
    const { data } = yield call(Api.get, `/products/${payload?.id}`);
    yield put({ type: DataTypes.SET_PRODUCT, payload: data });
  } catch ({ response }) {
  } finally {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: false });
  }
};

export const createProduct = function* ({ payload }) {
  try {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: true });
    const { data } = yield call(Api.post, `/products`, payload);
    yield put({ type: DataTypes.PUSH_PRODUCT, payload: data });
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { content: "You just created a product!" },
    });
  } catch ({ response }) {
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { type: "danger", content: response.data.msg },
    });

    if (response?.status === 401) {
      Api.auth_token(null);
      yield put({ type: ApplicationTypes.SET_CURRENT_USER, payload: {} });
      yield put({
        type: AlertTypes.CREATE_ALERT,
        payload: { type: "danger", content: "You have been logged out!" },
      });
    }
  } finally {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: false });
  }
};

export const updateProduct = function* ({ id, payload }) {
  try {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: true });
    const { data } = yield call(Api.put, `/products/${id}`, payload);
    yield put({ type: DataTypes.ALTER_PRODUCT, payload: data });
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { content: "You just updated a product!" },
    });
  } catch ({ response }) {
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { type: "danger", content: response.data.msg },
    });

    if (response?.status === 401) {
      Api.auth_token(null);
      yield put({ type: ApplicationTypes.SET_CURRENT_USER, payload: {} });
      yield put({
        type: AlertTypes.CREATE_ALERT,
        payload: { type: "danger", content: "You have been logged out!" },
      });
    }
  } finally {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: false });
  }
};

export const deleteProduct = function* ({ payload }) {
  try {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: true });
    yield call(Api.delete, `/products/${payload.id}`);
    yield put({ type: DataTypes.POP_PRODUCT, payload });
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { content: "You just deleted a product!" },
    });
  } catch ({ response }) {
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { type: "danger", content: response.data.msg },
    });

    if (response?.status === 401) {
      Api.auth_token(null);
      yield put({ type: ApplicationTypes.SET_CURRENT_USER, payload: {} });
      yield put({
        type: AlertTypes.CREATE_ALERT,
        payload: { type: "danger", content: "You have been logged out!" },
      });
    }
  } finally {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: false });
  }
};

export const createOrder = function* ({ payload }) {
  try {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: true });
    const { data } = yield call(Api.post, `/orders`, payload);
    yield put({ type: DataTypes.EMPTY_CART });

    if (data) {
      yield put({
        type: DataTypes.UPDATE_PROPS,
        props: { orderDetails: data },
      });

      yield put({
        type: ApplicationTypes.UPDATE_PROPS,
        props: { showOrderFinishedModal: true },
      });
    }
  } catch ({ response }) {
    yield put({
      type: AlertTypes.CREATE_ALERT,
      payload: { type: "danger", content: response.data.msg },
    });
  } finally {
    yield put({ type: ApplicationTypes.SET_LOADING, payload: false });
  }
};

const dataSagas = [
  takeLatest(DataTypes.GET_PRODUCT, getProduct),
  takeLatest(DataTypes.GET_PRODUCTS, getProducts),
  takeLatest(DataTypes.CREATE_PRODUCT, createProduct),
  takeLatest(DataTypes.UPDATE_PRODUCT, updateProduct),
  takeLatest(DataTypes.DELETE_PRODUCT, deleteProduct),

  takeLatest(DataTypes.CREATE_ORDER, createOrder),
];

export default dataSagas;
