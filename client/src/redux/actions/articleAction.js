import * as api from "../api/articleAPI";
import * as types from "../constants/projectConstants";

export const setDetailArticleAction = (data) => async (dispatch) => {
  dispatch({ type: types.SET_ARTICLE_DETAIL, payload: data });
};

export const setDetailAuthAction = (data) => async (dispatch) => {
  dispatch({ type: types.SET_AUTH_DETAIL, payload: data });
};

export const setArticleImageAction = (data) => async (dispatch) => {
  dispatch({ type: types.SET_ARTICLE_IMAGE, payload: data });
};

export const setArticleAddressAction = (data) => async (dispatch) => {
  dispatch({ type: types.SET_ARTICLE_ADDRESS, payload: data });
};

export const setArticlePaymentAction = (data) => async (dispatch) => {
  dispatch({ type: types.SET_ARTICLE_PAYMENT, payload: data });
};

export const setVerificationAction = (data) => async (dispatch) => {
  dispatch({ type: types.SET_VERIFICATION, payload: data });
};

export const projectClearAction = () => async (dispatch) => {
  dispatch({ type: types.PROJECT_CLEAR });
};

export const upLoadArticleAction = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addArticle(formData);
    console.log(data);
    dispatch({ type: types.SET_ARTICLE_ID, payload: data._id });
  } catch (error) {
    dispatch({ type: types.MESSAGEFAIL, payload: error });
  }
};
