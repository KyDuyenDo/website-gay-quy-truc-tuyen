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
