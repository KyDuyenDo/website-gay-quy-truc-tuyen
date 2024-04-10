import * as types from "../constants/projectConstants";
import * as api from "../api/articleAPI";
import { getUser } from "../api/userAPI";

export const setDataDetail = (articleId) => async (dispatch) => {
  try {
    const data = await api.getArticle(articleId);

    // Filter top donors (assuming top4Donators is an array)
    const topDonorsWithDetails = data.top4Donators
      ?.filter((donation) => !donation.anonymous)
      .map(async (donation) => {
        const userResponse = await getUser(donation.donorId);
        return {
          donorId: donation.donorId,
          totalDonations: donation.totalDonations,
          username: donation.anonymous ? "" : donation.username, // Set username to empty string if anonymous
          anonymous: donation.anonymous,
          avatar: userResponse.avatar,
        };
      });

    const resolvedDonors = await Promise.all(topDonorsWithDetails); // Wait for all async operations to finish
    await dispatch({ type: types.DETAIL_SET, payload: data });
    await dispatch({ type: types.TOPDONORS_SET, payload: resolvedDonors });
  } catch (error) {
    console.error(error); // Use console.error for errors
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
