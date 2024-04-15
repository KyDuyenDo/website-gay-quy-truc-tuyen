import * as types from "../constants/userConstants";

const initialState = {
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
  intro: "",
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        _id: payload ? payload._id : "",
        username: payload ? payload.username : "",
        email: payload ? payload.email : "",
        phone: payload ? payload.phone : "",
        gender: payload ? payload.gender : "",
        birthday: payload ? payload.birthday : "",
        youtubeUrl: payload ? payload.youtubeUrl : "",
        facebookUrl: payload ? payload.facebookUrl : "",
        tiktokUrl: payload ? payload.tiktokUrl : "",
        intro: payload ? payload.intro : "",
        avatar: payload ? payload.avatar : "",
      };
    case types.SET_USER_AVATAR:
      return {
        ...state,
        avatar: payload ? payload : "",
      };
    case types.SET_USER_CLEAR:
      return {
        ...state,
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
        intro: "",
      };
    default:
      return state;
  }
};

export default userReducer;
