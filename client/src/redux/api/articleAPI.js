import { API, handleApiError } from "./utils";

export const addArticle = async (formData) => {
  try {
    const { data } = await API.post(`/article/create`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
export const upDateImage = async (formData) => {
  try {
    const { data } = await API.put(`/article/up_image`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
export const getArticle = async (idArticle) => {
  try {
    const { data } = await API.get(`/article/${idArticle}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getArticles = async (limit, skip) => {
  try {
    const { data } = await API.get(`/article/limit=${limit}&skip=${skip}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
// rating, content, postId, userId
export const addComment = async (formData) => {
  try {
    const { data } = await API.post(`/article/add/comment`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
// image, state, content, title, amountSpent, document, postId, userId,
export const addActivity = async (formData) => {
  try {
    const { data } = await API.post(`/article/add/activity`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
