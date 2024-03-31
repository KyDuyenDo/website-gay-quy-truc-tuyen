import { API, handleApiError } from "./utils";

export const getCategories = async () => {
  try {
    const { data } = await API.get(`/article/all/categories`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
