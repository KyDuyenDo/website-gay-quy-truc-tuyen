import * as types from "../constants/projectConstants";

const initialState = {
  donations: [],
};

const donationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.DONATIONS_SET:
      return {
        ...state,
        donations: payload ? payload : [],
      };
    case types.DONATIONS_CLEAR:
      return {
        ...state,
        donations: [],
      };
    default:
      return state;
  }
};

export default donationReducer;
