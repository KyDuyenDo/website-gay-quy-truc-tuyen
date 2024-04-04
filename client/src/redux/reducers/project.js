import * as types from "../constants/projectConstants";

const initialState = {
  title: null,
  category: null,
  body: null,
  addedBy: null,
  userId: null,
  image: null,
  projectBankCode: null,
  expireDate: null,
  releaseDate: null,
  accountNumber: null,
  methodPayment: null,
  emailPayPal: null,
  amountRaised: null,
  address: null,
  Verification: false,
  messageFail: null,
  articleId: null,
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_AUTH_DETAIL:
      return {
        ...state,
        addedBy: payload ? payload.addedBy : null,
        userId: payload ? payload.userId : null,
      };
    case types.MESSAGEFAIL:
      return {
        ...state,
        messageFail: payload ? payload : null,
      };
    case types.SET_ARTICLE_ID:
      return {
        ...state,
        articleId: payload ? payload : null,
      };
    case types.SET_ARTICLE_DETAIL:
      return {
        ...state,
        title: payload ? payload.title : null,
        category: payload ? payload.category : null,
        expireDate: payload ? payload.expireDate : null,
        releaseDate: payload ? payload.releaseDate : null,
        body: payload ? payload.body : null,
        amountRaised: payload ? payload.amountRaised : null,
      };
    case types.SET_ARTICLE_IMAGE:
      return {
        ...state,
        image: payload ? payload : null,
      };

    case types.SET_ARTICLE_ADDRESS:
      return {
        ...state,
        address: payload ? payload : null,
      };
    case types.SET_ARTICLE_PAYMENT:
      return {
        ...state,
        projectBankCode: payload ? payload.projectBankCode : null,
        accountNumber: payload ? payload.accountNumber : null,
        methodPayment: payload ? payload.methodPayment : null,
        emailPayPal: payload ? payload.emailPayPal : null,
      };
    case types.SET_VERIFICATION:
      return {
        ...state,
        Verification: payload ? payload : null,
      };
    case types.PROJECT_CLEAR:
      return {
        ...state,
        title: null,
        category: null,
        body: null,
        addedBy: null,
        userId: null,
        image: null,
        projectBankCode: null,
        expireDate: null,
        releaseDate: null,
        accountNumber: null,
        methodPayment: null,
        emailPayPal: null,
        amountRaised: null,
        address: null,
        Verification: false,
        messageFail: null,
        articleId: null,
      };
    default:
      return state;
  }
};

export default projectReducer;
