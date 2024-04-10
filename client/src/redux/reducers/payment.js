import * as types from "../constants/paymentConstants";

const initialState = {
  payername: null,
  payerEmail: null,
  amount: 10000,
  amountTip: 0,
  anonymous: null,
  status: null,
  payMethod: null,
};

const paymentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_PAYER_NAME:
      return {
        ...state,
        payername: payload ? payload : null,
      };
    case types.SET_PAYER_EMAIL:
      return {
        ...state,
        payerEmail: payload ? payload : null,
      };
    case types.SET_AMOUNT:
      return {
        ...state,
        amount: payload ? payload : 0,
      };

    case types.SET_MOUNT_TIP:
      return {
        ...state,
        amountTip: payload ? payload : null,
      };

    case types.SET_ANONYMOUS:
      return {
        ...state,
        anonymous: payload ? payload : null,
      };
    case types.SET_PAY_METHOD:
      return {
        ...state,
        payMethod: payload ? payload : null,
      };

    case types.PAYMENT_FAIL:
      return {
        ...state,
        status: payload ? payload : null,
      };

    case types.PAYMENT_SUCCESS:
      return {
        ...state,
        status: payload ? payload : null,
      };
    case types.PAYMENT_CLEAR:
      return {
        ...state,
        payername: null,
        payAccount: null,
        amount: null,
        amountTip: null,
        anonymous: null,
        status: null,
        payMethod: null,
        userData: null,
      };
    default:
      return state;
  }
};

export default paymentReducer;
