import * as types from "../constants/adminConstants";

const initialState = {
  adminAccessToken: null,
  signInError: null,
  totalData: {
    totalArticle: 0,
    totalPrice: 0,
    totalSpent: 0,
    totalMember: 0,
    totalUser: 0,
    totalRequestMember: 0,
    totalRequestArticle: 0,
  },
  disbursements: [],
  requestMember: [],
  requestArticle: [],
  alluser: [],
  allArticle: [],
  allFund: [],
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInError: null,
      };
    case types.SIGN_IN_FAIL:
      return {
        ...state,
        signInError: payload ? payload : null,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        adminAccessToken: null,
        signInError: null,
      };
    case types.SET_TOTAL_DATA:
      return {
        ...state,
        totalData: payload ? payload : null,
      };
    case types.SET_DISBURSEMENT:
      return {
        ...state,
        disbursements: payload ? payload : [],
      };
    case types.SET_REQUEST_MEMBER:
      return {
        ...state,
        requestMember: payload ? payload : [],
      };
    case types.SET_REQUEST_ARTICLE:
      return {
        ...state,
        requestArticle: payload ? payload : [],
      };
    case types.SET_ALL_ARTICLE:
      return {
        ...state,
        allArticle: payload ? payload : [],
      };
    case types.SET_ALL_USER:
      return {
        ...state,
        alluser: payload ? payload : [],
      };
    case types.SET_ALL_FUND:
      return {
        ...state,
        allFund: payload ? payload : [],
      };
    default:
      return state;
  }
};

export default adminReducer;
