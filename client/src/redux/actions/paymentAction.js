import * as types from "../constants/paymentConstants";
export const setUserData = (userData) => async (dispatch) => {
  dispatch({ type: types.SET_USER_DATA, payload: userData });
};

export const setPayerName = (payerName) => async (dispatch) => {
  dispatch({ type: types.SET_PAYER_NAME, payload: payerName });
};

export const setPayAccount = (payAccount) => async (dispatch) => {
    //cần API truy cập vào bài viết và lấy về số tài khoản trả
  dispatch({ type: types.SET_PAY_ACCOUNT, payload: payAccount });
};

export const setAmount = (amount) => async (dispatch) => {
  dispatch({ type: types.SET_AMOUNT, payload: amount });
};

export const setAmountTip = (amountTip) => async (dispatch) => {
  dispatch({ type: types.SET_AMOUNT_TIP, payload: amountTip });
};

export const setAnonymous = (anonymous) => async (dispatch) => {
  dispatch({ type: types.SET_ANONYMOUS, payload: anonymous });
};

export const setPayMethod = (payMethod) => async (dispatch) => {
  dispatch({ type: types.SET_PAY_METHOD, payload: payMethod });
};
