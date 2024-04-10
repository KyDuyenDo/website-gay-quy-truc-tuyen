import * as types from "../constants/paymentConstants";
export const setUserData = (userData) => async (dispatch) => {
  dispatch({ type: types.SET_USER_DATA, payload: userData });
};

export const setPayerName = (payerName) => async (dispatch) => {
  dispatch({ type: types.SET_PAYER_NAME, payload: payerName });
};

export const setAmountAction = (amount) => async (dispatch) => {
  dispatch({ type: types.SET_AMOUNT, payload: amount });
};

export const setAnonymous = (anonymous) => async (dispatch) => {
  dispatch({ type: types.SET_ANONYMOUS, payload: anonymous });
};

export const setPayMethod = (payMethod) => async (dispatch) => {
  dispatch({ type: types.SET_PAY_METHOD, payload: payMethod });
};
