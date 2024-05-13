import React, { useState, useEffect } from "react";
import "../css/payment.css";
import paypal from "../assets/logo/paypal.png";
import vnpay from "../assets/logo/vnpay.png";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getConfig } from "../redux/api/paymentAPI";
import { createPaymentUrl } from "../redux/api/paymentAPI";
import PayPalPayment from "../components/PayPalPayment";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  updatePayment,
  checkPayment,
  getPayment,
  deletePayment,
} from "../redux/api/paymentAPI";
import { isProtected } from "../redux/api/userAPI";
import { raiseAmountEarn } from "../redux/api/articleAPI";
import {
  createDonationPrivate,
  createDonationPublic,
} from "../redux/api/donationAPI";

import { Modal } from "react-bootstrap";
const Payment = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const progress = [
    {
      avt: "🙂",
      mes: "0%",
      ar: "4%",
      va: "10",
      css: {
        "--cf-range-position": "0%",
        "--cf-range-bullets":
          "radial-gradient(circle at 25% 5px, var(--cf-primary-color) 3px, transparent 0), radial-gradient(circle at 50% 5px, var(--cf-primary-color) 3px, transparent 0), radial-gradient(circle at 75% 5px, var(--cf-primary-color) 3px, transparent 0)",
      },
    },
    {
      avt: "😊",
      mes: "10%",
      ar: "27%",
      va: "15",
      css: {
        "--cf-range-position": "25%",
        "--cf-range-bullets":
          "radial-gradient(circle at 25% 5px, white 3px, transparent 0), radial-gradient(circle at 50% 5px, var(--cf-primary-color) 3px, transparent 0), radial-gradient(circle at 75% 5px, var(--cf-primary-color) 3px, transparent 0)",
      },
    },
    {
      avt: "😊",
      mes: "33%",
      ar: "50%",
      va: "20",
      css: {
        "--cf-range-position": "50%",
        "--cf-range-bullets":
          "radial-gradient(circle at 25% 5px, white 3px, transparent 0), radial-gradient(circle at 50% 5px, white 3px, transparent 0), radial-gradient(circle at 75% 5px, var(--cf-primary-color) 3px, transparent 0)",
      },
    },
    {
      avt: "😍",
      mes: "56%",
      ar: "73%",
      va: "25",
      css: {
        "--cf-range-position": "75%",
        "--cf-range-bullets":
          "radial-gradient(circle at 25% 5px, white 3px, transparent 0), radial-gradient(circle at 50% 5px, white 3px, transparent 0), radial-gradient(circle at 75% 5px, white 3px, transparent 0)",
      },
    },
    {
      avt: "😍",
      mes: "65%",
      ar: "94%",
      va: "30",
      css: {
        "--cf-range-position": "100%",
        "--cf-range-bullets":
          "radial-gradient(circle at 25% 5px, white 3px, transparent 0), radial-gradient(circle at 50% 5px, white 3px, transparent 0), radial-gradient(circle at 75% 5px, white 3px, transparent 0)",
      },
    },
  ];
  const params = useParams();
  const [isMounted, setIsMounted] = useState(true);
  const [tip, setTip] = useState(0);
  const [fullname, setFullname] = useState("");
  const [methodpay, setMethodpay] = useState("");
  const [amount, setAmount] = useState(10000);
  const matTip = amount * (parseInt(progress[tip].va) / 100);
  const [amountTip, setAmountTip] = useState(matTip);
  const [config, setConfig] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [errorText, setErrorText] = useState(true);
  useEffect(() => {
    setAmountTip(amount * (parseInt(progress[tip].va) / 100));
  }, [tip, amount]);
  useEffect(() => {
    if (anonymous === true && fullname === "") {
      setErrorText(false);
    } else if (anonymous !== true && fullname !== "") {
      setErrorText(false);
    } else {
      setErrorText(true);
    }
  }, [anonymous, fullname]);
  const addPayPal = async () => {
    const data = await getConfig();
    setConfig(data);
  };
  useEffect(() => {
    addPayPal();
  }, []);

  useEffect(() => {
    const params_search = new URLSearchParams(location.search);
    if (
      params_search?.get("vnp_TransactionStatus") === "00" &&
      localStorage.getItem("paymentId") !== null
    ) {
      console.log("Thanh toán thành công");
      const formData = new FormData();
      formData.append("status", "COMPLETED");
      formData.append("TradingCode", params_search?.get("vnp_TransactionNo"));
      updatePayment(localStorage.getItem("paymentId"), formData);
      isProtected().then((res) => {
        console.log(res);
        if (res === true) {
          console.log("Private");
          getPayment(localStorage.getItem("paymentId")).then((payment) => {
            if (
              payment.message === "found" &&
              payment.data.status === "COMPLETED"
            ) {
              console.log(payment);
              const formData = new FormData();
              const formRaiseAmount = new FormData();
              formData.append("articleId", params.id);
              formData.append("paymentId", payment.data._id);
              formData.append("fullnameDonor", payment.data.payerName);
              formData.append("donationAmount", payment.data.amount);
              formData.append(
                "anonymous",
                payment.data.payerName === "" ? true : false
              );
              formRaiseAmount.append("postId", params.id);
              formRaiseAmount.append("amount", payment.data.amount);
              for (const pair of formData) {
                const key = pair[0];
                const value = pair[1];
                console.log(`Key: ${key}, Value: ${value}`);
              }
              createDonationPrivate(formData).then((res) => {
                if (
                  res?.message !==
                    "Donation with this paymentId already exists" ||
                  res.message === undefined
                ) {
                  raiseAmountEarn(formRaiseAmount);
                }
              });
              localStorage.removeItem("paymentId");
            }
          });
        } else {
          getPayment(localStorage.getItem("paymentId")).then((payment) => {
            if (
              payment.message === "found" &&
              payment.data.status === "COMPLETED"
            ) {
              const formData = new FormData();
              const formRaiseAmount = new FormData();
              formData.append("articleId", params.id);
              formData.append("paymentId", payment.data._id);
              formData.append("fullnameDonor", payment.data.payerName);
              formData.append("donationAmount", payment.data.amount);
              formData.append(
                "anonymous",
                payment.data.payerName === "" ? true : false
              );
              formRaiseAmount.append("postId", params.id);
              formRaiseAmount.append("amount", payment.data.amount);
              createDonationPublic(formData).then((res) => {
                if (
                  res?.message !==
                    "Donation with this paymentId already exists" ||
                  res.message === undefined
                ) {
                  raiseAmountEarn(formRaiseAmount);
                }
              });
              localStorage.removeItem("paymentId");
            }
          });
        }
      });
      setShowModal(true);
    }
    // get paymentId in localStorage, then check status payment, if status payment is not COMPLETED then delete payment
    else if (localStorage.getItem("paymentId") !== null) {
      getPayment(localStorage.getItem("paymentId")).then((res) => {
        if (res.message === "found" && res.data.status !== "COMPLETED") {
          deletePayment(localStorage.getItem("paymentId")).then(() => {
            localStorage.removeItem("paymentId");
          });
        }
      });
    }
    // Check if the URL contains 'query_vnpay'
  }, [location]);

  const initialOptions = {
    clientId: config,
    currency: "USD",
    intent: "capture",
  };

  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }

  return (
    <section
      style={{
        borderTop: "1px solid #d7d7d7",
        backgroundColor: "#F8F8F8",
        paddingTop: "32px",
      }}
      data-background="transparent"
    >
      <div className="cf-container">
        <form className="cf-form">
          <div className="cf-checkout">
            <div className="cf-checkout__blocks">
              <fieldset className="cf-form__section">
                <h3 className="cf-form__section-title">Thủ Tục Thanh Toán</h3>
                <h4 className="cf-form__section-subttitle">
                  Thông tin người ủng hộ
                </h4>
                <div className="cf-form__group ">
                  {" "}
                  <input
                    className="cf-form__input "
                    placeholder="Tên đầy đủ"
                    type="text"
                    value={fullname}
                    onChange={(event) => setFullname(event.target.value)}
                  />
                  {errorText === true ? (
                    <small className="text-warning m-1 p-0">
                      Nếu chọn ẩn danh thì không cần nhập tên và ngược lại!
                    </small>
                  ) : (
                    ""
                  )}
                </div>

                <br />
                <h4 className="cf-form__section-subttitle">
                  Phương thức thanh toán
                </h4>
                <div data-stripe-type="payment">
                  <div data-stripe-element="payment" className="StripeElement">
                    <div
                      className="__PrivateStripeElement"
                      style={{
                        margin: "-4px 0px !important",
                        padding: "0px !important",
                        border: "none !important",
                        display: "block !important",
                        background: "transparent !important",
                        position: "relative !important",
                        opacity: "1 !important",
                        clear: "both !important",
                        transition: "height 0.35s ease 0s !important",
                      }}
                    >
                      <div className="p-FadeWrapper">
                        <div className="p-Fade">
                          <div className="p-Fade-item">
                            <div className="p-PaymentMethodSelector">
                              <button
                                onClick={() => setMethodpay("paypal")}
                                className={
                                  "paypal " +
                                  (methodpay === "paypal" ? "add-pay" : "")
                                }
                                type="button"
                                data-testid="card"
                                id="card-tab"
                                aria-disabled="false"
                                aria-controls="card-panel"
                                aria-selected="false"
                                aria-setsize="2"
                                role="tab"
                                tabindex="-1"
                                value="card"
                              >
                                <img
                                  style={{
                                    width: "50%",
                                    objectFit: "cover",
                                  }}
                                  src={paypal}
                                ></img>
                              </button>
                              <button
                                onClick={() => {
                                  setMethodpay("vnpay");
                                }}
                                className={
                                  "vnpay " +
                                  (methodpay === "vnpay" ? "add-pay" : "")
                                }
                                type="button"
                                data-testid="pay_by_bank"
                                id="pay_by_bank-tab"
                                aria-disabled="false"
                                aria-controls="pay_by_bank-panel"
                                aria-selected="true"
                                aria-setsize="2"
                                role="tab"
                                tabindex="0"
                                value="pay_by_bank"
                              >
                                <img
                                  style={{
                                    width: "50%",
                                    objectFit: "cover",
                                  }}
                                  src={vnpay}
                                ></img>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="cf-form__section">
                <div className="cf-form__group ">
                  {" "}
                  <label
                    className="cf-form__label"
                    for="checkout_type_neu_anonymous"
                  >
                    <div className="round">
                      <input
                        onChange={() => setAnonymous(!anonymous)}
                        type="checkbox"
                        id="checkbox-18"
                      />
                      <label for="checkbox-18"></label>
                    </div>
                    <span
                      className="cf-form__label-text"
                      data-input-label="true"
                    >
                      Không hiển thị tên của tôi
                    </span>
                  </label>
                </div>
                <div className="cf-form__group-extra-text">
                  Khoản đóng góp của bạn sẽ được hiển thị dưới dạng ẩn danh đối
                  với công chúng trên trang dự án, tuy nhiên bạn không thể bình
                  luận ẩn danh. Để biết thêm thông tin vui lòng tham khảo của
                  chúng tôi{" "}
                  <a
                    className="cf-anchor"
                    target="_blank"
                    href="https://intercom.help/crowdfunder/en/articles/1642648-can-i-pledge-anonymously"
                    previewlistener="true"
                  >
                    Trung tâm hỗ trợ
                  </a>
                  .
                </div>
              </div>
            </div>
            <div className="cf-checkout__summary">
              <div
                className="js-sticky-dummy"
                style={{ minHeight: "0px" }}
              ></div>
              <div className="cf-form__section">
                <h3 className="cf-form__section-title">Tổng Kết</h3>
                <div
                  className="cf-form__layout"
                  data-form-layout-padded="bottom"
                >
                  <a
                    href="/checkout/help-silver-circle-distillery-to-relocate/start"
                    className="cf-form__anchor"
                    previewlistener="true"
                  >
                    Xem lại bài viết
                  </a>
                </div>
                <div className="cf-form__layout">
                  <label
                    className="cf-form__label"
                    for="checkout_type_neu_donation_unitCost"
                  >
                    Số tiền quyên góp
                  </label>
                  <div
                    className="cf-form__group"
                    data-icon=""
                    data-currency="VNĐ"
                  >
                    <input
                      onChange={(event) => {
                        setAmount(event.target.value);
                        setIsMounted(false);
                      }}
                      onBlur={() => {
                        setIsMounted(true);
                      }}
                      className="cf-form__input"
                      value={amount}
                      step="1000"
                      min="10000"
                      type="number"
                    />
                  </div>
                </div>
                <div data-checkout-tip="true">
                  <div
                    className="cf-form__layout"
                    data-form-layout="twin small"
                  >
                    <span className="cf-form__general-text">Tiền tip</span>
                    <span className="cf-form__general-text cf-text--break-word">
                      <span data-checkout-tip-amount="true">
                        {amountTip} VNĐ
                      </span>
                      <div className="d-none">
                        <button className="cf-anchor" type="button">
                          Edit
                        </button>
                        <div></div>
                      </div>
                    </span>
                  </div>
                  <div className="cf-form__layout">
                    <div className="cf-well cf-checkout__tiprange-wrap">
                      <div className="cf-media">
                        <div className="cf-media__content">
                          <div className="cf-thumb cf-thumb--small">
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="37"
                              className="cf-svg"
                              viewBox="0 0 42 37"
                            >
                              <g fill="none" fill-rule="evenodd">
                                <path
                                  fill="#53C874"
                                  d="M30 0a11.7 11.7 0 0 0-9.23 4.8A11.7 11.7 0 0 0 11.54 0 11.55 11.55 0 0 0 0 11.54C0 24.2 18.75 36.08 19.55 36.57a2.3 2.3 0 0 0 2.44 0c.8-.5 19.55-12.36 19.55-25.03C41.54 5.18 36.36 0 30 0"
                                ></path>
                                <path
                                  fill="#5DE082"
                                  d="M20.77 36.93c.43 0 .85-.12 1.22-.36.8-.5 19.55-12.36 19.55-25.03C41.54 5.18 36.36 0 30 0a11.7 11.7 0 0 0-9.23 4.8v32.13z"
                                ></path>
                                <path
                                  fill="#FFF"
                                  d="M37.18 15.05l-1.78 1.77-3.54-3.54-3.54 3.54-1.77-1.77 3.54-3.55-3.54-3.54 1.77-1.77 3.54 3.54 3.54-3.54 1.78 1.77-3.55 3.54z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </div>
                        <div className="cf-media__content">
                          <div className="cf-text cf-text--fixed14 cf-text--dark">
                            ZenGive giúp các dự án huy động được số tiền họ cần.
                            Để duy trì hoạt động website, chúng tôi dựa vào sự
                            hỗ trợ của bạn để tiếp tục đem đến nhiều dự án và
                            hơn thế nữa.
                          </div>
                        </div>
                      </div>
                      <div
                        className="cf-checkout__tiprange"
                        data-tiprange="true"
                      >
                        <input
                          className="cf-form__input "
                          type="range"
                          id="checkout_type_neu_tip_feesChoice"
                          name="checkout_type_neu[tip][feesChoice]"
                          required="required"
                          data-checkout-cart-tip-selection="true"
                          data-tip-change='{"0":"2","250":"1","1000":"0"}'
                          data-tip-choices='{"10%":"0.1","15%":"0.15","20%":"0.2","25%":"0.25","30%":"0.3"}'
                          data-tip-default="2"
                          data-tip-label-choices='{"10%":"\ud83d\ude42","15%":"\ud83d\ude0a","20%":"\ud83d\ude0a","25%":"\ud83d\ude0d","30%":"\ud83d\ude0d"}'
                          data-tip-show-money="true"
                          min="0"
                          step="1"
                          max="4"
                          value={tip}
                          onChange={(event) => {
                            setTip(event.target.value);
                          }}
                          style={progress[tip].css}
                        />
                        <div className="cf-checkout__tiprange-label-wrap">
                          <div
                            className="cf-checkout__tiprange-label"
                            data-range-tip-label="true"
                            style={{ left: `${progress[tip].mes}` }}
                          >
                            <span>{progress[tip].avt}</span> {progress[tip].va}%{" "}
                            ({amountTip} VNĐ)
                          </div>
                          <div
                            className="cf-checkout__tiprange-tip"
                            data-range-tip-label-tip="true"
                            style={{ left: `${progress[tip].ar}` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cf-form__highlight-box">
                  <div
                    className="cf-form__layout"
                    data-form-layout="twin small"
                  >
                    <span className="cf-form__general-text">
                      <strong>Tổng cộng:</strong>
                    </span>
                    <span className="cf-form__general-text cf-text--break-word">
                      <strong data-checkout-cart-total="true">
                        {toDecimal(parseInt(amount) + parseInt(amountTip))} VNĐ
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cf-checkout__action">
              <div
                className="cf-form__section"
                data-form-layout="full-width"
                data-form-section="checkout-submit"
              >
                <p className="cf-form__general-text cf-text--spacer1">
                  Chúng tôi rất nghiêm túc trong bảo mật. Để tìm hiểu thêm, vui
                  lòng xem chính sách quyền riêng tư của chúng tôi
                  <a
                    target="_blank"
                    href="/privacy-policy"
                    className="cf-form__anchor"
                    previewlistener="true"
                  >
                    {" "}
                    Privacy policy
                  </a>
                </p>
                {methodpay === "" || errorText === true ? (
                  ""
                ) : isMounted === false ? (
                  ""
                ) : methodpay === "paypal" ? (
                  <div
                    className="cf-form__group"
                    data-form-layout-padded="bottom"
                  >
                    <PayPalScriptProvider options={initialOptions}>
                      <PayPalPayment
                        amountTip={amountTip}
                        anonymous={anonymous}
                        fullname={fullname}
                        methodpay={methodpay}
                        amount={amount}
                        articleId={params.id}
                        customStyle={{
                          layout: "horizontal",
                          tagline: false,
                          color: "white",
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                ) : (
                  <div
                    style={{
                      paddingBottom: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <button
                      style={{
                        width: "100%",
                        backgroundColor: "#fff",
                        border: "1px solid #555",
                      }}
                      onClick={(event) => {
                        event.preventDefault();
                        const formData = new FormData();
                        formData.append("articleId", params.id);
                        formData.append("orderDescription", "donate");
                        formData.append("orderType", "donate");
                        formData.append("bankCode", "");
                        formData.append("language", "vn");
                        formData.append("payerName", fullname);
                        formData.append("method", methodpay);
                        formData.append("status", "pending");
                        formData.append("amount", amount);
                        formData.append("tip", amountTip);
                        createPaymentUrl(formData).then((data) => {
                          // console.log(data);
                          window.location.href = data.vnpUrl;
                          localStorage.setItem("paymentId", data.paymentId);
                        });
                      }}
                    >
                      <img
                        src={vnpay}
                        style={{ width: "125px", padding: "10px" }}
                      />
                    </button>
                  </div>
                )}
                {methodpay === "" || errorText === true ? (
                  ""
                ) : (
                  <p className="cf-text cf-text--small cf-text--light cf-text--center">
                    Thẻ của bạn sẽ bị tính phí ngay lập tức
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      {showModal && (
        <Modal
          className="modal fade modal-wrapper auth-modal"
          show={showModal}
          onHide={setShowModal}
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
                setShowModal(false);
                // Replace the current URL with a new one
                window.history.replaceState(
                  {},
                  document.title,
                  `/payment/${params.id}`
                );
                navigate(`/article-detail/${params.id}`);
              }}
            >
              Trở lại
            </a>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Payment;
