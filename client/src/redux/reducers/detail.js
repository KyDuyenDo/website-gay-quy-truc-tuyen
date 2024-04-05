import * as types from "../constants/projectConstants";

const initialState = {
  detail: {
    _id: "",
    userId: {
      _id: "",
      username: "",
      avatar: "",
    },
    categotyId: {
      _id: "",
      description: "",
      icon: "",
      popular: 0,
      title: "",
    },
    addressId: {
      _id: "",
      city: "",
      street: "",
      county: "",
      town: "",
      detail: "",
      lat: "",
      lon: "",
    },
    address: "",
    addedBy: "",
    articletitle: "",
    image: [],
    body: "",
    state: "pending",
    expireDate: 0,
    accountNumber: "",
    emailPayPal: "",
    methodPayment: "",
    bankcode: "",
    adminApproval: false,
    published: false,
    amountRaised: 0,
    amountEarned: 0,
    comments: [],
    activities: [],
    createdAt: "",
    groupName: "",
    totalDonations: 0,
    top4Donators: [],
    averageRating: 0,
  },
  topDonorsWithDetails: [],
};

const detailReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.DETAIL_SET:
      return {
        ...state,
        detail: payload ? payload : [],
      };
    case types.TOPDONORS_SET:
      return {
        ...state,
        topDonorsWithDetails: payload ? payload : [],
      };
    case types.COMMENT_SET:
      return {
        ...state,
        detail: {
          ...state.detail,
          comments: payload ? payload : [],
        },
      };
    case types.DETAIL_CLEAR:
      return {
        ...state,
        detail: {},
        topDonorsWithDetails: [],
      };
    default:
      return state;
  }
};

export default detailReducer;
