import { API, handleApiError } from "./utils";

export const upLoadImage = async (type, formData) => {
  try {
    const { data } = await API.post(`image/upload/${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getImage = async (type, filename) => {
  try {
    const { data } = await API.get(`/image/data/${type}/${filename}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const delImage = async (type, filename) => {
  try {
    await API.post(`image/${type}/del/${filename}`);
  } catch (error) {
    console.log(error);
  }
};
