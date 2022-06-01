import { createActions, createReducer } from "reduxsauce";

import { updateProps } from "logic/reducers/shared";

export const { Types, Creators } = createActions(
  {
    persisted: null,
    resetStore: null,
    login: ["payload"],
    logout: ["payload"],
    setLoading: ["payload"],
    setCurrentUser: ["payload"],
    updateProps: ["props"],
  },
  { prefix: "application/" }
);

export const initialState = {
  loading: false,
  showLoginModal: false,
  showOrderFinishedModal: false,
  currentUser: { isLoggedIn: false },
};

export const setLoading = (state, { payload }) => {
  return { ...state, loading: payload };
};

export const setCurrentUser = (state, { payload }) => {
  const currentUser = {
    ...payload,
    isLoggedIn: Boolean(Object.keys(payload).length),
  };
  return { ...state, currentUser };
};

export default createReducer(initialState, {
  [Types.SET_LOADING]: setLoading,
  [Types.UPDATE_PROPS]: updateProps,
  [Types.SET_CURRENT_USER]: setCurrentUser,
});
