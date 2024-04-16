import * as api from "../api/articleAPI";
import * as types from "../constants/projectConstants";

export const setDataProjects = (query) => async (dispatch) => {
  try {
    console.log(query);
    const data = await api.getArticles(query);
    dispatch({ type: types.SET_PROJECTS, payload: data.limitedPosts });
  } catch (error) {
    console.log(error);
  }
};

export const setSearchProject = (text) => async (dispatch) => {
  dispatch({ type: types.SET_SEARCH_PROJECTS, payload: text });
};

export const setSearchClear = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_SEARCH });
};

export const upLoadArticleAction = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addArticle(formData);
    dispatch({ type: types.SET_ARTICLE_ID, payload: data._id });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProject = (query) => async (dispatch) => {
  try {
    const data = await api.getArticleByUser(query);
    if (data.data !== null) {
      dispatch({ type: types.SET_USER_PROJECTS, payload: data });
    } else {
      dispatch({ type: types.CLEAR_USER_PROJECTS });
    }
  } catch (error) {
    console.log(error);
  }
};
