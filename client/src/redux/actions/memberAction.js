import * as api from "../api/userAPI";
import * as types from "../constants/projectConstants";

export const getAllMember = (query) => async (dispatch) => {
  try {
    const data = await api.getAllMember(query);
    dispatch({ type: types.SET_MEMBER_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getMemberDetail = (id) => async (dispatch) => {
  try {
    const data = await api.getMemberDetail(id);
    dispatch({ type: types.SET_MEMBER_DETAIL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getHighRaiseMember = () => async (dispatch) => {
  try {
    const data = await api.getHighRaiseMember();
    dispatch({ type: types.SET_MEMBER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setSearchClear = () => async (dispatch) => {
  dispatch({ type: types.SET_SEARCH_MEMBER_CLEAR });
};

export const setSearch = (data) => async (dispatch) => {
  dispatch({ type: types.SET_SEARCH, payload: data });
};
