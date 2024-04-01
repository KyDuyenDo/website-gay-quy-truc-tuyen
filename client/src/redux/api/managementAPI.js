import { API, handleApiError } from "./utils";

export const getChartData = async () => {
  try {
    const { data } = await API.get("manage/chart");
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
    const { data } = await API.post("manage/del/notify", formData);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
