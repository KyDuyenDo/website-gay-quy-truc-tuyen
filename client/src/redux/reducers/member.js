import * as types from "../constants/projectConstants";

const initialState = {
  members: [],
  memberList: [],
  memberDetail: {
    _id: "",
    userId: {
      _id: "",
      username: "",
      email: "",
      youtubeUrl: "",
      facebookUrl: "",
      tiktokUrk: "",
      joindate: "",
    },
    fullname: "",
    birthday: "",
    numberPhone: "",
    emailContact: "",
    type: "",
    groupName: "",
    describe: "",
    introLink: "",
    approvaldate: "",
    totalAmountEarned: 0,
    totalAmountDonate: 0,
    totalDonation: 0,
  },
  memberId: "",
  search: "",
};

const memberReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_MEMBER:
      return {
        ...state,
        members: payload ? payload : [],
      };
    case types.SET_MEMBER_LIST:
      return {
        ...state,
        memberList: payload ? payload : [],
      };
    case types.SET_MEMBER_DETAIL:
      return {
        ...state,
        memberDetail: payload ? payload : {},
      };
    case types.SET_SEARCH:
      return {
        ...state,
        search: payload ? payload : "",
      };
    case types.SET_SEARCH_MEMBER_CLEAR:
      return {
        ...state,
        search: "",
      };
    default:
      return state;
  }
};

export default memberReducer;
