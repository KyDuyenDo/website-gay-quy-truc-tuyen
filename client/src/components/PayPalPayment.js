import React, { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
const PayPalPayment = ({ customStyle, amount }) => {
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log(details);
      
    });
  };

  return (
    <PayPalButtons
      style={customStyle}
      createOrder={(data, actions) => onCreateOrder(data, actions)}
      onApprove={(data, actions) => onApproveOrder(data, actions)}
    />
  );
};

export default PayPalPayment;
