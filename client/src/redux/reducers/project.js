import * as types from "../constants/projectConstants";

const initialState = {
  projects: [],
  articleId: null,
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_PROJECTS:
      return {
        ...state,
        projects: payload ? payload : null,
      };
    case types.SET_ARTICLE_ID:
      return {
        ...state,
        articleId: payload ? payload : null,
      };
    case types.PROJECT_CLEAR:
      return {
        ...state,
        projects: [],
        articleId: null,
      };
    default:
      return state;
  }
};

export default projectReducer;
