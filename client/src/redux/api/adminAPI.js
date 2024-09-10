import { ADMIN_API, handleApiError } from "./utils";

export const signIn = async (credential) => {
  try {
    const res = await ADMIN_API.post("/admin/signin", credential, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const verifyAdmin = async () => {
  try {
    const { data } = await ADMIN_API.get("/admin/verify");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const totalData = async () => {
  try {
    const { data } = await ADMIN_API.get("/admin/total");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const disbursement = async () => {
  try {
    const { data } = await ADMIN_API.get("/admin/disbursement");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
//confirmArticle
export const confirmArticle = async (credential) => {
  try {
    const { data } = await ADMIN_API.post(
      "/admin/comfirm/article",
      credential,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// deleteArticle
export const deleteArticle = async (credential) => {
  try {
    const { data } = await ADMIN_API.post("/admin/detele/article", credential, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// removePublishedArticle
export const removePublishedArticle = async (credential) => {
  try {
    const { data } = await ADMIN_API.post(
      "/admin/remove/pulished/article",
      credential,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// puslish
export const publishedArticle = async (credential) => {
  try {
    const { data } = await ADMIN_API.post("/admin/puslish", credential, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// sendNotify
export const sendNotify = async (credential) => {
  try {
    const { data } = await ADMIN_API.post("/admin/send/notify", credential, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// blockUser
export const blockUser = async (credential) => {
  try {
    const { data } = await ADMIN_API.post("/admin/block/user", credential, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// OpenBlock
export const OpenBlock = async (credential) => {
  try {
    const { data } = await ADMIN_API.post("/admin/open/block", credential, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// acceptFundraiser
export const acceptFundraiser = async (credential) => {
  try {
    const { data } = await ADMIN_API.post(
      "/admin/accept/fundraiser",
      credential,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// rejectFundraiser
export const rejectFundraiser = async (credential) => {
  try {
    const { data } = await ADMIN_API.post(
      "/admin/reject/fundraiser",
      credential,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// getDetailFundraiserAdmin
export const getDetailFundraiserAdmin = async (formData) => {
  try {
    const { data } = await ADMIN_API.post(
      "/admin/getDetailFundraiser",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// returnRequestMember
export const returnRequestMember = async () => {
  try {
    const { data } = await ADMIN_API.get("/admin/returnRequestMember");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// getAllFund
export const getAllFund = async (query) => {
  try {
    if (query) {
      const { data } = await ADMIN_API.get(`/admin/get/all/fund${query}`);
      return data;
    } else {
      const { data } = await ADMIN_API.get(`/admin/get/all/fund`);
      return data;
    }
  } catch (error) {
    return handleApiError(error);
  }
};
// returnRequestArticle
export const returnRequestArticle = async () => {
  try {
    const { data } = await ADMIN_API.get("/admin/returnRequestArticle");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
//getArticlesByAdmin
export const getArticlesByAdmin = async (query) => {
  try {
    const { data } = await ADMIN_API.get(`/admin/getArticlesByAdmin${query}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
//getAllUsers
export const getAllUsers = async (query) => {
  try {
    if (query) {
      const { data } = await ADMIN_API.get(`/admin/all/users${query}`);
      return data;
    } else {
      const { data } = await ADMIN_API.get(`/admin/all/users`);
      return data;
    }
  } catch (error) {
    return handleApiError(error);
  }
};
// getDetaiArticleByAdmin
// /get/article/:id
export const getDetaiArticleByAdmin = async (idArticle) => {
  try {
    const { data } = await ADMIN_API.get(`/admin/get/article/${idArticle}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// createDisbursement
export const createDisbursement = async (credential) => {
  try {
    const { data } = await ADMIN_API.post(
      "/admin/create/disbursement",
      credential,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// /user/detail
export const getUserDetail = async (id) => {
  try {
    const { data } = await ADMIN_API.get(`/admin/user/detail/${id}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
// get disbursement by article
export const getDisbursementByArticle = async (id) => {
  try {
    const { data } = await ADMIN_API.get(`/admin/disbursement/article/${id}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};