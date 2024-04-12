import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL_MODEL = process.env.REACT_APP_API_MODEL;

const authInterceptor = (req) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

export const API = axios.create({
  baseURL: BASE_URL,
});

export const COMMUNITY_API = axios.create({
  baseURL: BASE_URL,
});

export const MODEL_API = axios.create({
  baseURL: BASE_URL_MODEL,
});

API.interceptors.request.use(authInterceptor);
COMMUNITY_API.interceptors.request.use((req) => {
  req.headers["Content-Type"] = "application/json";
  return authInterceptor(req);
});

export const handleApiError = async (error) => {
  try {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};
