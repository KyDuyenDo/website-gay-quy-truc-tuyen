import { API, handleApiError } from "./utils";

export const getConfig = async () => {
  const { data } = await API.get(`/payment/config`);
  return data.data;
};

export const createOrderPayPal = async (payload) => {
  const { order } = await API.post(`/paypal/create-paypal-order`, payload);
  console.log(order);
  return order.id;
};

export const capturerderPayPal = async (orderID) => {
  const { order } = await API.post(`/paypal/capture-paypal-order`, {
    orderID: orderID,
  });
  return order;
};

export const createPayment = async (formData) => {
  try {
    const { data } = await API.post(`/payment/create`, formData, {
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
// ceate_paymnet_url
export const createPaymentUrl = async (formData) => {
  try {
    const { data } = await API.post(`/vnpay/create_payment_url`, formData, {
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
// vnpay_return
export const vnpayReturn = async (formData) => {
  try {
    const { data } = await API.post(`/vnpay/vnpay_return`, formData, {
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

// check payment TradingRef
export const checkPayment = async (id) => {
  try {
    const { data } = await API.get(`/payment/check/${id}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// detele payment by _id
export const deletePayment = async (id) => {
  try {
    const { data } = await API.delete(`/payment/delete/${id}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// get payment by _id
export const getPayment = async (id) => {
  try {
    const { data } = await API.get(`/payment/get/${id}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// update payment status by _id
export const updatePayment = async (id, formData) => {
  try {
    const { data } = await API.put(`/payment/update/${id}`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
