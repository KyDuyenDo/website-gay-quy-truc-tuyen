import * as api from "../api/adminAPI";
import * as types from "../constants/adminConstants";

export const signInActionAdmin = (credential) => async (dispatch) => {
  try {
    const { error, data } = await api.signIn(credential);
    if (error) {
      throw new Error(error);
    }
    localStorage.setItem("admin", JSON.stringify(data));
    dispatch({
      type: types.SIGN_IN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: types.SIGN_IN_FAIL,
      payload: error.message,
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    localStorage.removeItem("admin");
    dispatch({
      type: types.LOGOUT_SUCCESS,
    });
  } catch (error) {}
};

export const totalDataAction = () => async (dispatch) => {
  try {
    const data = await api.totalData();
    if (data) {
      dispatch({
        type: types.SET_TOTAL_DATA,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const disbursement = () => async (dispatch) => {
  try {
    const data = await api.disbursement();
    if (data) {
      dispatch({
        type: types.SET_DISBURSEMENT,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// SET_REQUEST_MEMBER
export const setRequestMember = () => async (dispatch) => {
  try {
    const data = await api.returnRequestMember();
    if (data) {
      dispatch({
        type: types.SET_REQUEST_MEMBER,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// SET_REQUEST_ARTICLE
export const setRequestArticle = () => async (dispatch) => {
  try {
    const data = await api.returnRequestArticle();
    if (data) {
      dispatch({
        type: types.SET_REQUEST_ARTICLE,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// SET_ALL_ARTICLE
export const setDataProjects = (query) => async (dispatch) => {
  try {
    const data = await api.getArticlesByAdmin(query);
    dispatch({ type: types.SET_ALL_ARTICLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
// SET_ALL_USER
export const getAllUsers = () => async (dispatch) => {
  try {
    const data = await api.getAllUsers();
    dispatch({ type: types.SET_ALL_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
