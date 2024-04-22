import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createPayment } from "../redux/api/paymentAPI";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  createDonationPrivate,
  createDonationPublic,
} from "../redux/api/donationAPI";
import { isProtected } from "../redux/api/userAPI";
import { raiseAmountEarn } from "../redux/api/articleAPI";
const PayPalPayment = ({
  customStyle,
  amountTip,
  anonymous,
  fullname,
  methodpay,
  amount,
  articleId,
}) => {
  const navigate = useNavigate();
  const [notifyAdd, setNotifyAdd] = useState(false);
  const convertToUSD = 0.00004008;
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (
              (parseInt(amount) + parseInt(amountTip)) *
              convertToUSD
            ).toFixed(2),
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const formPayment = new FormData();
      const formData = new FormData();
      const formRaiseAmount = new FormData();
      try {
        isProtected().then((res) => {
          formPayment.append("payerName", details.payer.name.given_name);
          formPayment.append("payerEmail", details.payer.email_address);
          formPayment.append("TradingCode", details.id);
          formPayment.append("method", methodpay);
          formPayment.append("status", details.status);
          formPayment.append("amount", parseInt(amount) + parseInt(amountTip));
          formPayment.append("tip", amountTip);
          if (res === true) {
            console.log("true");
            createPayment(formPayment).then((payment) => {
              formData.append("articleId", articleId);
              formData.append("paymentId", payment._id);
              formData.append("fullnameDonor", fullname);
              formData.append("donationAmount", parseInt(amount));
              formData.append("anonymous", anonymous);
              formRaiseAmount.append("postId", articleId);
              formRaiseAmount.append("amount", amount);
              createDonationPrivate(formData);
              raiseAmountEarn(formRaiseAmount).then(() => {
                setNotifyAdd(true);
              });
            });
          } else {
            console.log("false");
            createPayment(formPayment).then((payment) => {
              formData.append("articleId", articleId);
              formData.append("paymentId", payment._id);
              formData.append("fullnameDonor", fullname);
              formData.append("donationAmount", amount);
              formData.append("anonymous", anonymous);
              formRaiseAmount.append("postId", articleId);
              formRaiseAmount.append("amount", amount);
              createDonationPublic(formData);
              raiseAmountEarn(formRaiseAmount).then(() => {
                setNotifyAdd(true);
              });
            });
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    });
  };
  return (
    <>
      <PayPalButtons
        style={customStyle}
        createOrder={(data, actions) => onCreateOrder(data, actions)}
        onApprove={(data, actions) => onApproveOrder(data, actions)}
      />
      <Modal
        className="modal fade modal-wrapper auth-modal"
        show={notifyAdd}
        onHide={setNotifyAdd}
        backdrop="static"
        centered
      >
        <div style={{ textAlign: "center" }}>
          <h2 className="title">Thanh toán thành công</h2>
          <h6 className="m-0">Chúng tôi rất cảm ơn sự ủng hộ của bạn!</h6>
          <a
            to="/"
            className="sign-text d-block"
            data-bs-toggle="collapse"
            onClick={() => {
              setNotifyAdd(false);
              navigate(-1);
            }}
          >
            Trở lại
          </a>
        </div>
      </Modal>
    </>
  );
};

export default PayPalPayment;
