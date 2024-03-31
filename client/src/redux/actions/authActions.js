import * as api from "../api/authAPI";
import * as types from "../constants/authConstants";
import { isValidToken } from "../../utils/authUtils";
import { refreshTokenAction } from "./refreshTokenAction";

export const initializeAuth = () => async (dispatch) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const refreshToken = JSON.parse(
    localStorage.getItem("profile")
  )?.refreshToken;

  if (accessToken && refreshToken) {
    if (isValidToken(accessToken)) {
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(setUserData(JSON.parse(localStorage.getItem("profile")).user));
    } else {
      await dispatch(refreshTokenAction(refreshToken));
    }
  }
};

export const setAccessToken = (accessToken) => async (dispatch) => {
  dispatch({ type: types.SET_ACCESS_TOKEN, payload: accessToken });
};

export const setRefreshToken = (refreshToken) => async (dispatch) => {
  dispatch({ type: types.SET_REFRESH_TOKEN, payload: refreshToken });
};

export const setUserData = (userData) => async (dispatch) => {
  dispatch({ type: types.SET_USER_DATA, payload: userData });
};

export const setInitialAuthState = (navigate) => async (dispatch) => {
  await dispatch({ type: types.LOGOUT });
  navigate("/");
};

export const clearMessage = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_MESSAGE });
};

export const logoutAction = () => async (dispatch) => {
  try {
    const { data } = await api.logout();
    localStorage.removeItem("profile");
    dispatch({ type: types.LOGOUT, payload: data });
  } catch (error) {
    dispatch({ type: types.LOGOUT, payload: types.ERROR_MESSAGE });
  }
};

export const signUpAction =
  (formData, navigate, isConsentGiven = true, email) =>
  async (dispatch) => {
    try {
      localStorage.removeItem("profile");
      const response = await api.signUp(formData);
      const { error } = response;
      if (error) {
        dispatch({
          type: types.SIGNUP_FAIL,
          payload: error,
        });
      } else {
        if (!isConsentGiven) {
          dispatch({
            type: types.SIGNUP_SUCCESS,
            payload: types.SIGNUP_SUCCESS_MESSAGE,
          });
          navigate("/");
        }

        if (isConsentGiven) {
          dispatch({
            type: types.SIGNUP_SUCCESS,
            payload: types.SIGNUP_SUCCESS_MESSAGE,
          });
          navigate("/auth/verify", { state: email });
        }
      }
    } catch (error) {
      dispatch({
        type: types.SIGNUP_FAIL,
        payload: types.ERROR_MESSAGE,
      });
    }
  };

export const signInAction = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.signIn(formData);
    const { error, data } = response;
    if (error) {
      await dispatch({
        type: types.SIGNIN_FAIL,
        payload: error,
      });
    } else {
      const { user, accessToken, refreshToken, accessTokenUpdatedAt } = data;
      const profile = {
        user,
        accessToken,
        refreshToken,
        accessTokenUpdatedAt,
      };
      localStorage.setItem("profile", JSON.stringify(profile));
      await dispatch({
        type: types.SIGNIN_SUCCESS,
        payload: profile,
      });
      navigate("/");
    }
  } catch (error) {
    await dispatch({
      type: types.SIGNIN_FAIL,
      payload: types.ERROR_MESSAGE,
    });
    navigate("/");
  }
};
