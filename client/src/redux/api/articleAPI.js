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
    const { data } = await API.get(`/article/get/${idArticle}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const raiseAmountEarn = async (formData) => {
  try {
    const { data } = await API.put(`/article/raise/amount`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getArticles = async (query) => {
  try {
    const { data } = await API.get(`/article/get${query}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getArticlesByLocation = async (formData) => {
  try {
    const { data } = await API.post(`/article/get/by/location`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getArticleHighRating = async () => {
  try {
    const { data } = await API.get(`/article/get/high/rating`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getArticleByUser = async (query) => {
  try {
    const { data } = await API.get(`/article/user/get${query}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getLimitArticle = async () => {
  try {
    const { data } = await API.get(`/article/check/limt/post`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getDonorOfArticle = async (formData, query) => {
  try {
    const { data } = await API.post(`/article/donors/get${query}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
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
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getArticleByQuest = async (id) => {
  try {
    const { data } = await API.get(`/article/get/by/quest/${id}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
