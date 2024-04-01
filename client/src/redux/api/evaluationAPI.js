import { API, handleApiError } from "./utils";

export const CreateEvaluation = async (formData) => {
  try {
    const { data } = await API.post("evaluation/create", formData);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
