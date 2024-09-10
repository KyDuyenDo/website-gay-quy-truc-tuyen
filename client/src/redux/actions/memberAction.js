import * as api from "../api/userAPI";
import * as types from "../constants/projectConstants";

export const fetchData = (apiCall, onSuccess) => async (dispatch) => {
  dispatch({ type: types.MEMBER_LOADING, payload: true });

  try {
    const data = await apiCall();
    onSuccess(data, dispatch); 
  } catch (error) {
    console.error('Failed to fetch data:', error); 
  } finally {
    dispatch({ type: types.MEMBER_LOADING, payload: false });
  }
};

export const getAllMember = (query) => {
  return fetchData(
    () => api.getAllMember(query),
    (data, dispatch) => {       
      dispatch({ type: types.SET_MEMBER_LIST, payload: data });
    }
  );
};

export const getMemberDetail = (id) => {
  return fetchData(
    () => api.getMemberDetail(id),
    (data, dispatch) => {       
      dispatch({ type: types.SET_MEMBER_DETAIL, payload: data });
    }
  );
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
