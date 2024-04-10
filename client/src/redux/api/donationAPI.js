import { API, handleApiError } from "./utils";

export const createDonationPrivate = async (formData) => {
  try {
    const { data } = await API.post(`/donation/create/private`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createDonationPublic = async (formData) => {
  try {
    const { data } = await API.post(`/donation/create/public`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
