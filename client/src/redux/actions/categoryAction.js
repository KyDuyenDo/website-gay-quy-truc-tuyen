import * as api from "../api/categoryAPI";
import * as types from "../constants/projectConstants";

export const getCategoriesAction = () => async (dispatch) => {
  dispatch({ type: types.CATEGORIES_LOADING, payload: true });
  try {
    const data = await api.getCategories();
    dispatch({ type: types.SET_CATEGORIES, payload: data });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: types.CATEGORIES_LOADING, payload: false });
  }
};
