import * as api from "../api/articleAPI";
import * as types from "../constants/projectConstants";

export const fetchData = (apiCall, onSuccess) => async (dispatch) => {
  dispatch({ type: types.PROJECT_LOADING, payload: true });

  try {
    const data = await apiCall();
    onSuccess(data, dispatch);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    dispatch({ type: types.PROJECT_LOADING, payload: false });
  }
};

export const setDataProjects = (query) => {
  return fetchData(
    () => api.getArticles(query),
    (data, dispatch) => {
      dispatch({ type: types.SET_PROJECTS, payload: data.limitedPosts });
    }
  );
};

export const getHighRatingProjects = () => {
  return fetchData(
    () => api.getHighRatingArticles(),
    (data, dispatch) => {
      dispatch({ type: types.SET_HIGH_RATING_PROJECTS, payload: data });
    }
  );
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

export const getUserProject = (query) => {
  return fetchData(
    () => api.getArticleByUser(query),
    (data, dispatch) => {
      if (data.data !== null) {
        dispatch({ type: types.SET_USER_PROJECTS, payload: data });
      } else {
        dispatch({ type: types.CLEAR_USER_PROJECTS });
      }
    }
  );
};
