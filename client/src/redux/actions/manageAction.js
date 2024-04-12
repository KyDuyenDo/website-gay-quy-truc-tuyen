import * as api from "../api/managementAPI";
import * as types from "../constants/projectConstants";

export const getChartData = () => async (dispatch) => {
  try {
    const data = await api.getChartData();
    const labels = Object.keys(data.dataActivityChart);
    const dataActivityChart = Object.values(data.dataActivityChart);
    const dataDonationChart = Object.values(data.dataDonationChart);
    dispatch({
      type: types.SET_CHART,
      payload: {
        labels: labels,
        dataActivityChart: dataActivityChart,
        dataDonationChart: dataDonationChart,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataFundraising = () => async (dispatch) => {
  try {
    const data = await api.getDataFundraising();
    if (data && data.error === undefined) {
      dispatch({ type: types.SET_LIST_EARN, payload: data });
    } else {
      dispatch({ type: types.SET_LIST_EARN, payload: [] });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDataUserProject = () => async (dispatch) => {
  try {
    const data = await api.getDataUserProject();
    if (data && data.error === undefined) {
      dispatch({ type: types.SET_TOTAL_PROJECT, payload: data });
    } else {
      dispatch({ type: types.SET_TOTAL_PROJECT, payload: [] });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserDonation = () => async (dispatch) => {
  try {
    const data = await api.getUserDonation();
    if (data && data.error === undefined) {
      dispatch({ type: types.SET_USER_DONATIONS, payload: data });
    } else {
      dispatch({ type: types.SET_USER_DONATIONS, payload: [] });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getNotify = () => async (dispatch) => {
  try {
    const data = await api.getNotify();
    console.log(data.data);
    if (data && data.error === undefined) {
      dispatch({ type: types.SET_NOTIFY, payload: data });
    } else {
      dispatch({ type: types.SET_NOTIFY, payload: [] });
    }
  } catch (error) {
    console.log(error);
  }
};

export const delNotify = (formData) => async (dispatch) => {
  try {
    await api.delNotify(formData);
    const data = await api.getNotify();
    console.log(data);
    dispatch({ type: types.SET_NOTIFY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserArticleDetail = (articleId) => async (dispatch) => {
  try {
    const data = await api.getUserArticleDetail(articleId);
    dispatch({ type: types.SET_USER_ARTICLE_DETAIL, payload: data[0] });
  } catch (error) {
    console.log(error);
  }
};
