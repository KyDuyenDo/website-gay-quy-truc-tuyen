import * as api from "../api/articleAPI";
import * as types from "../constants/projectConstants";

export const setDataProjects = (query) => async (dispatch) => {
  try {
    const data = await api.getArticles(query);
    dispatch({ type: types.SET_PROJECTS, payload: data.limitedPosts });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const upLoadArticleAction = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addArticle(formData);
    dispatch({ type: types.SET_ARTICLE_ID, payload: data._id });
  } catch (error) {
    dispatch({ type: types.MESSAGEFAIL, payload: error });
  }
};
