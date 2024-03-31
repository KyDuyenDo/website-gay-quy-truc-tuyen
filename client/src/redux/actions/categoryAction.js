import * as api from "../api/categoryAPI";
import * as types from "../constants/projectConstants";
export const getCategoriesAction = () => async (dispatch) => {
  try {
    const data = await api.getCategories();
    dispatch({ type: types.SET_CATEGORIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
