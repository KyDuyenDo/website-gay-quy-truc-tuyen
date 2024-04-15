import * as api from "../api/userAPI";
import * as types from "../constants/userConstants";
export const setUpdateInfoAction = (formData) => async (dispatch) => {
  try {
    const data = await api.updateUser(formData);
    if (data) {
      dispatch({ type: types.SET_USER_DATA, payload: data });
    } else {
      dispatch({
        type: types.SET_USER_DATA,
        payload: {
          _id: "",
          username: "",
          email: "",
          avatar: "",
          phone: "",
          gender: "",
          birthday: "",
          youtubeUrl: "",
          facebookUrl: "",
          tiktokUrl: "",
          info: "",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfoAction = (id) => async (dispatch) => {
  try {
    const data = await api.getUser(id);
    if (!data.message) {
      dispatch({ type: types.SET_USER_DATA, payload: data });
    } else {
      dispatch({
        type: types.SET_USER_DATA,
        payload: {
          _id: "",
          username: "",
          email: "",
          avatar: "",
          phone: "",
          gender: "",
          birthday: "",
          youtubeUrl: "",
          facebookUrl: "",
          tiktokUrl: "",
          info: "",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateImage = (data) => async (dispatch) => {
  dispatch({ type: types.SET_USER_AVATAR, payload: data });
};

export const setUserClear = () => async (dispatch) => {
  dispatch({ type: types.SET_USER_CLEAR });
};