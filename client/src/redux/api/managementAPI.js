import { API, handleApiError } from "./utils";

export const getChartData = async (date) => {
  try {
    const { data } = await API.get(`manage/chart/${date}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserDonation = async () => {
  try {
    const { data } = await API.get("manage/user/donation");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getNotify = async () => {
  try {
    const { data } = await API.get("manage/notify");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const delNotify = async (formData) => {
  try {
    const { data } = await API.post("manage/del/notify", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getDataUserProject = async () => {
  try {
    const { data } = await API.get("manage/get/detail/user");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getDataFundraising = async () => {
  try {
    const { data } = await API.get("manage/get/user/fundraising");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserArticleDetail = async (articleId) => {
  try {
    const { data } = await API.get(`article/user/only/article/${articleId}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
