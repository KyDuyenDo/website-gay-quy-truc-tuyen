import { MODEL_API, handleApiError } from "./utils";

export const comparisonFace = async (formData) => {
  try {
    const { data } = await MODEL_API.post(`/predict`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
