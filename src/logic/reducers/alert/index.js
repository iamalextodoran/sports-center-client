import { createActions, createReducer } from "reduxsauce";

import { updateProps } from "logic/reducers/shared";

export const { Types, Creators } = createActions(
  {
    createAlert: ["payload"],
    popAlert: ["payload"],
    pushAlert: ["payload"],
    updateProps: ["props"],
  },
  { prefix: "alert/" }
);

export const initialState = {
  messages: [],
};

export const popAlert = (state, { payload }) => {
  const newMessages = state.messages.filter((a, index) => index !== payload);
  return { ...state, messages: newMessages };
};

export const pushAlert = (state, { payload }) => {
  return { ...state, messages: [...state.messages, payload] };
};

export default createReducer(initialState, {
  [Types.POP_ALERT]: popAlert,
  [Types.PUSH_ALERT]: pushAlert,
  [Types.UPDATE_PROPS]: updateProps,
});
