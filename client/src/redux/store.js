import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/auth";
import projectReducer from "./reducers/project";
import categoryReducer from "./reducers/category";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";
import { initializeAuth } from "./actions/authActions";
import donationReducer from "./reducers/donors";
import detailReducer from "./reducers/detail";
import manageReducer from "./reducers/management";
import memberReducer from "./reducers/member";
import userReducer from "./reducers/user";
import adminReducer from "./reducers/admin";
const createAppStore = async () => {
  try {
    const rootReducer = combineReducers({
      auth: authReducer,
      project: projectReducer,
      category: categoryReducer,
      donation: donationReducer,
      detail: detailReducer,
      management: manageReducer,
      member: memberReducer,
      user: userReducer,
      admin: adminReducer,
      // Add other reducers here
    });
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([thunk, tokenMiddleware]),
    });
    await store.dispatch(initializeAuth()); // lấy dữ liệu từ localstorage

    return store;
  } catch (err) {
    console.log(err);
    throw new Error("Some error occurred");
  }
};

export default createAppStore;
