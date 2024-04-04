import * as types from "../constants/projectConstants";
import * as api from "../api/articleAPI";

export const setDataDetailDonation = (formData, query) => async (dispatch) => {
  try {
    const data = await api.getDonorOfArticle(formData, query);
    await dispatch({ type: types.DONATIONS_SET, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const clearDonation = () => async (dispatch) => {
  dispatch({ type: types.DONATIONS_CLEAR });
};
