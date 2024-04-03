import { API, handleApiError } from "./utils";

export const getUser = async (id) => {
  try {
    const { data } = await API.get(`/users/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const isFundraiser = async () => {
  try {
    const { data } = await API.get(`users/protected/isFundraiserAuth`);
    return data.success;
  } catch (error) {
    return handleApiError(error);
  }
};

export const isProtected = async () => {
  try {
    const { data } = await API.post(`users/protected`);
    return data.success;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateUser = async (id, formData) => {
  try {
    const { data } = await API.put(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const becomeFundraiser = async (formData) => {
  try {
    const { data } = await API.post(`/users/become/fundraiser`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const upLoadImageFundraiser = async (formData) => {
  try {
    const data = await API.put(`/users/fund/image`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMember = async (query) => {
  try {
    const { data } = await API.get(`users/fundraiser${query}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
///fundraiser/get/name
export const getNameFund = async () => {
  try {
    const { data } = await API.get(`users/fundraiser/get/name`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
export const getMemberDetail = async (id) => {
  try {
    const { data } = await API.get(`users/fundraiser/${id}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
