import React, { useState, useEffect } from "react";
import "../css/payment.css";
import paypal from "../assets/logo/paypal.png";
import vnpay from "../assets/logo/vnpay.png";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getConfig } from "../redux/api/paymentAPI";
import PayPalPayment from "../components/PayPalPayment";

const Payment = () => {
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
  const [tip, setTip] = useState(0);
  const [methodpay, setMethodpay] = useState("");
  const [amount, setAmount] = useState(10000);
  const matTip = amount * (parseInt(progress[tip].va) / 100);
  const [amountTip, setAmountTip] = useState(matTip);
  const [config, setConfig] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [total, setTotal] = useState(
    ((parseInt(amount) + parseInt(amountTip)) / 24000).toFixed(2)
  );

  useEffect(() => {
    setAmountTip(amount * (parseInt(progress[tip].va) / 100));
  }, [tip, amount]);

  const addPayPal = async () => {
    const data = await getConfig();
    setConfig(data);
  };
  useEffect(() => {
    addPayPal();
    console.log(total);
  }, []);

  const initialOptions = {
    clientId: config,
    currency: "USD",
    intent: "capture",
  };

  return (
    <section
      style={{
        borderTop: "1px solid #d7d7d7",
        backgroundColor: "#F8F8F8",
        paddingTop: "32px",
      }}
      data-background="transparent"
    >
      <div class="cf-container">
        <form class="cf-form">
          <div class="cf-checkout">
            <div class="cf-checkout__blocks">
              <fieldset class="cf-form__section">
                <h3 class="cf-form__section-title">Thủ Tục Thanh Toán</h3>
                <h4 class="cf-form__section-subttitle">
                  Thông tin người ủng hộ
                </h4>
                <div class="cf-form__group ">
                  {" "}
                  <input
                    class="cf-form__input "
                    placeholder="Tên đầy đủ"
                    type="text"
                  />
                </div>

                <br />
                <h4 class="cf-form__section-subttitle">
                  Phương thức thanh toán
                </h4>
                <div data-stripe-type="payment">
                  <div class="cf-form__error-box">
                    <div class="cf-form__error-text" data-error="true"></div>
                  </div>
                  <div data-stripe-element="payment" class="StripeElement">
                    <div
                      class="__PrivateStripeElement"
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
                                onClick={() => setMethodpay("vnpay")}
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
              <div class="cf-form__section">
                <div class="cf-form__group ">
                  {" "}
                  <label
                    class="cf-form__label"
                    for="checkout_type_neu_anonymous"
                  >
                    <div class="round">
                      <input type="checkbox" id="checkbox-18" />
                      <label for="checkbox-18"></label>
                    </div>
                    <span class="cf-form__label-text" data-input-label="true">
                      Không hiển thị tên của tôi
                    </span>
                  </label>
                </div>
                <div class="cf-form__group-extra-text">
                  Khoản đóng góp của bạn sẽ được hiển thị dưới dạng ẩn danh đối
                  với công chúng trên trang dự án, tuy nhiên bạn không thể bình
                  luận ẩn danh. Để biết thêm thông tin vui lòng tham khảo của
                  chúng tôi{" "}
                  <a
                    class="cf-anchor"
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
            <div class="cf-checkout__summary">
              <div class="js-sticky-dummy" style={{ minHeight: "0px" }}></div>
              <div class="cf-form__section">
                <h3 class="cf-form__section-title">Tổng Kết</h3>
                <h4 class="cf-form__section-secondary-title">
                  Giúp nhà máy chưng cất Silver Circle di dời
                </h4>
                <div class="cf-form__layout" data-form-layout-padded="bottom">
                  <a
                    href="/checkout/help-silver-circle-distillery-to-relocate/start"
                    class="cf-form__anchor"
                    previewlistener="true"
                  >
                    Xem lại bài viết
                  </a>
                </div>
                <div class="cf-form__layout">
                  <label
                    class="cf-form__label"
                    for="checkout_type_neu_donation_unitCost"
                  >
                    Số tiền quyên góp
                  </label>
                  <div class="cf-form__group" data-icon="" data-currency="VNĐ">
                    <input
                      onChange={(event) => setAmount(event.target.value)}
                      class="cf-form__input"
                      value={amount}
                      step="1000"
                      min="10000"
                      type="number"
                    />
                  </div>
                </div>
                <div data-checkout-tip="true">
                  <div class="cf-form__layout" data-form-layout="twin small">
                    <span class="cf-form__general-text">Tiền tip</span>
                    <span class="cf-form__general-text cf-text--break-word">
                      <span data-checkout-tip-amount="true">
                        {amountTip} VNĐ
                      </span>
                      <div class="d-none">
                        <button class="cf-anchor" type="button">
                          Edit
                        </button>
                        <div></div>
                      </div>
                    </span>
                  </div>
                  <div class="cf-form__layout">
                    <div class="cf-well cf-checkout__tiprange-wrap">
                      <div class="cf-media">
                        <div class="cf-media__content">
                          <div class="cf-thumb cf-thumb--small">
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="37"
                              class="cf-svg"
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
                        <div class="cf-media__content">
                          <div class="cf-text cf-text--fixed14 cf-text--dark">
                            ZenGive giúp các dự án huy động được số tiền họ cần.
                            Để duy trì hoạt động website, chúng tôi dựa vào sự
                            hỗ trợ của bạn để tiếp tục đem đến nhiều dự án và
                            hơn thế nữa.
                          </div>
                        </div>
                      </div>
                      <div class="cf-checkout__tiprange" data-tiprange="true">
                        <input
                          class="cf-form__input "
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
                        <div class="cf-checkout__tiprange-label-wrap">
                          <div
                            class="cf-checkout__tiprange-label"
                            data-range-tip-label="true"
                            style={{ left: `${progress[tip].mes}` }}
                          >
                            <span>{progress[tip].avt}</span> {progress[tip].va}%{" "}
                            ({amountTip} VNĐ)
                          </div>
                          <div
                            class="cf-checkout__tiprange-tip"
                            data-range-tip-label-tip="true"
                            style={{ left: `${progress[tip].ar}` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cf-form__highlight-box">
                  <div class="cf-form__layout" data-form-layout="twin small">
                    <span class="cf-form__general-text">
                      <strong>Tổng cộng:</strong>
                    </span>
                    <span class="cf-form__general-text cf-text--break-word">
                      <strong data-checkout-cart-total="true">
                        {parseInt(amount) + parseInt(amountTip)} VNĐ
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="cf-checkout__action">
              <div
                class="cf-form__section"
                data-form-layout="full-width"
                data-form-section="checkout-submit"
              >
                {/* <div
                  class="cf-form__group "
                  data-field-name="checkout_type_neu[terms][crowdfunder_terms]"
                  data-form-group="checkbox"
                >
                  {" "}
                  <label
                    class="cf-form__label"
                    for="checkout_type_neu_terms_crowdfunder_terms"
                  >
                    <div class="round">
                      <input type="checkbox" id="checkbox-16" />
                      <label for="checkbox-16"></label>
                    </div>

                    <span class="cf-form__label-text" data-input-label="true">
                      Tôi chấp nhận Điều khoản và điều kiện được cập nhật vào
                      ngày 14/11/2022 và đã đọc hướng dẫn của Cơ quan quản lý
                      việc gây quỹ.
                    </span>
                  </label>
                </div>
                <div
                  class="cf-form__group "
                  data-field-name="checkout_type_neu[terms][newsletter]"
                  data-form-group="checkbox"
                >
                  {" "}
                  <label
                    class="cf-form__label"
                    for="checkout_type_neu_terms_newsletter"
                  >
                    <div class="round">
                      <input type="checkbox" id="checkbox-17" />
                      <label for="checkbox-17"></label>
                    </div>

                    <span class="cf-form__label-text" data-input-label="true">
                      Có - Tôi chọn tham gia nhận tin tức mới nhất từ Người gây
                      quỹ cộng đồng thiện nguyện.
                    </span>
                  </label>
                </div> */}
                <p class="cf-form__general-text cf-text--spacer1">
                  Chúng tôi rất nghiêm túc trong bảo mật. Để tìm hiểu thêm, vui
                  lòng xem chính sách quyền riêng tư của chúng tôi
                  <a
                    target="_blank"
                    href="/privacy-policy"
                    class="cf-form__anchor"
                    previewlistener="true"
                  >
                    {" "}
                    Privacy policy
                  </a>
                </p>
                {methodpay === "" ? (
                  ""
                ) : (
                  <div class="cf-form__group" data-form-layout-padded="bottom">
                    <PayPalScriptProvider options={initialOptions}>
                      <PayPalPayment
                        amount={total}
                        customStyle={{
                          layout: "horizontal",
                          tagline: false,
                          color: "white",
                        }}
                      />
                      {/* <PayPalButtons
                          style={{
                            layout: "horizontal",
                            tagline: false,
                            color: "white",
                          }}
                        /> */}
                    </PayPalScriptProvider>
                  </div>
                )}
                {methodpay === "" ? (
                  ""
                ) : (
                  <p class="cf-text cf-text--small cf-text--light cf-text--center">
                    Thẻ của bạn sẽ bị tính phí ngay lập tức
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Payment;
