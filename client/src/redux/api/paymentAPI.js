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
