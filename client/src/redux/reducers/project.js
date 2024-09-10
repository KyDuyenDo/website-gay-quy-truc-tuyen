import * as types from "../constants/projectConstants";

const initialState = {
  projects: [],
  highRatingProjects: [],
  articleId: null,
  search: null,
  userProject: [],
  loading: false,
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_PROJECTS:
      return {
        ...state,
        projects: payload ? payload : [],
      };
    case types.SET_USER_PROJECTS:
      return {
        ...state,
        userProject: payload ? payload : [],
      };
    case types.SET_HIGH_RATING_PROJECTS:
      return {
        ...state,
        highRatingProjects: payload ? payload :[],
      };
    case types.SET_ARTICLE_ID:
      return {
        ...state,
        articleId: payload ? payload : "",
      };
    case types.SET_SEARCH_PROJECTS:
      return {
        ...state,
        search: payload ? payload : "",
      };
    case types.CLEAR_SEARCH:
      return {
        ...state,
        search: null,
      };
    case types.CLEAR_USER_PROJECTS:
      return {
        ...state,
        userProject: [],
      };
    case types.PROJECT_CLEAR:
      return {
        ...state,
        projects: [],
        articleId: null,
      };
    case types.PROJECT_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
