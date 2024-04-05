import * as types from "../constants/projectConstants";

const initialState = {
  totalProject: {
    fundraising: "",
    finished: "",
    spending: "",
    totalPend: "",
    totalRaise: "",
    totalDonor: "",
  },
  notify: [],
  chart: {
    labels: [],
    dataActivityChart: [],
    dataDonationChart: [],
  },
  listEarn: [],
  history: [],
  userdonations: [],
  userArticleDetail: {
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
};

const manageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_TOTAL_PROJECT:
      return {
        ...state,
        totalProject: payload ? payload : [],
      };
    case types.SET_USER_ARTICLE_DETAIL:
      return {
        ...state,
        userArticleDetail: payload
          ? payload
          : {
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
      };
    case types.SET_USER_DONATIONS:
      return {
        ...state,
        userdonations: payload ? payload : [],
      };
    case types.SET_NOTIFY:
      return {
        ...state,
        notify: payload ? payload : [],
      };
      return {
        ...state,
        totalDonor: payload ? payload : null,
      };
    case types.SET_CHART:
      return {
        ...state,
        chart: payload ? payload : [],
      };
    case types.SET_LIST_EARN:
      return {
        ...state,
        listEarn: payload ? payload : [],
      };
    case types.SET_HISTORY:
      return {
        ...state,
        history: payload ? payload : [],
      };
    default:
      return state;
  }
};

export default manageReducer;
