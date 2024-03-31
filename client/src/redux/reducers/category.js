import * as types from "../constants/projectConstants";


const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_CATEGORIES:
      return {
        ...state,
        categories: payload ? payload : [],
      };
    case types.CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
      };
    default:
      return state;
  }
};

export default categoryReducer;
