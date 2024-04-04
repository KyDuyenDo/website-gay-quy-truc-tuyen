import * as types from "../constants/projectConstants";
import * as api from "../api/articleAPI";
import { getUser } from "../api/userAPI";

export const setDataDetail = (articleId) => async (dispatch) => {
  try {
    const data = await api.getArticle(articleId);
    const topDonorsWithDetails = await Promise.all(
      data.top4Donators.map(async (donation) => {
        const userResponse = await getUser(donation.donorId);
        return {
          donorId: donation.donorId,
          totalDonations: donation.totalDonations,
          username: donation.username,
          anonymous: donation.anonymous,
          avatar: userResponse.avatar,
        };
      })
    );
    await dispatch({ type: types.DETAIL_SET, payload: data });
    await dispatch({
      type: types.TOPDONORS_SET,
      payload: topDonorsWithDetails,
    });
  } catch (error) {
    console.log(error);
  }
};
export const clearDetail = () => async (dispatch) => {
  dispatch({ type: types.DETAIL_CLEAR });
};
export const setComment = (articleId) => async (dispatch) => {
  try {
    const data = await api.getArticle(articleId);
    await dispatch({ type: types.COMMENT_SET, payload: data.comments });
  } catch (error) {
    console.log(error);
  }
};
