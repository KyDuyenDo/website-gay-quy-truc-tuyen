import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ScrollToTop from "../ScrollToTop";

const SecondStep = ({ register, errors }) => {
  const categories = useSelector((state) => state.category.categories);
  const [allBank, setAllBank] = useState([]);
  const [listCategory, setListCategory] = useState(categories);
  const [data, setData] = useState({
    title: null,
    category: null,
    body: null,
    addedBy: null,
    userId: null,
    payeeName: null,
    expireDate: null,
    releaseDate: null,
    accountNumber: null,
    methodPayment: null,
    emailPayPal: null,
    amountRaised: null,
  });
  useEffect(() => {
    fetch("https://api.vietqr.io/v2/banks")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setAllBank(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="">
        <span className="header-title">Nội dung chính</span>
        <div className="custom-form">
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example1"
                >
                  Tiêu đề chiến dịch
                </label>
                <input
                  name="projectTitle"
                  id="projectTitle"
                  {...register("projectTitle")}
                  type="text"
                  className="cf-form__input"
                />
                {errors.projectTitle && (
                  <small className="text-danger m-1 p-0">
                    {errors.projectTitle.message}
                  </small>
                )}
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example1"
                >
                  Thuộc danh mục
                </label>
                <select
                  className="cf-form__input"
                  aria-label="Default select example"
                  name="projectCategory"
                  id="projectCategory"
                  {...register("projectCategory")}
                >
                  <option value="" selected>
                    Chọn danh mục
                  </option>
                  {listCategory &&
                    listCategory.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.title}
                        </option>
                      );
                    })}
                </select>
                {errors.projectCategory && (
                  <small className="text-danger m-1 p-0">
                    {errors.projectCategory.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label
              for="exampleFormControlTextarea1"
              className="cf-form__section-subttitle"
            >
              Nội dung chiến dịch
            </label>
            <textarea
              className="form-control"
              id="projectBody"
              name="projectBody"
              rows="3"
              {...register("projectBody")}
            ></textarea>
            {errors.projectBody && (
              <small className="text-danger m-1 p-0">
                {errors.projectBody.message}
              </small>
            )}
          </div>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example1"
                >
                  Số tiền gây quỹ
                </label>
                <input
                  name="projectAmount"
                  id="projectAmount"
                  {...register("projectAmount")}
                  type="number"
                  className="cf-form__input "
                  aria-label="Disabled input example"
                />
                {errors.projectAmount && (
                  <small className="text-danger m-1 p-0">
                    {errors.projectAmount.message}
                  </small>
                )}
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example2"
                >
                  Số ngày gây quỹ
                </label>
                <input
                  {...register("projectDay")}
                  name="projectDay"
                  id="projectDay"
                  type="number"
                  className="cf-form__input "
                  aria-label="Disabled input example"
                />
                {errors.projectDay && (
                  <small className="text-danger m-1 p-0">
                    {errors.projectDay.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example1"
                >
                  Số tài khoản nhận
                </label>
                <input
                  name="projectAccount"
                  id="projectAccount"
                  {...register("projectAccount")}
                  type="text"
                  className="cf-form__input "
                  aria-label="Disabled input example"
                />
                {errors.projectAccount && (
                  <small className="text-danger m-1 p-0">
                    {errors.projectAccount.message}
                  </small>
                )}
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example2"
                >
                  Ngân hàng
                </label>
                <select
                  className="cf-form__input"
                  aria-label="Default select example"
                  name="projectBankCode"
                  id="projectBankCode"
                  {...register("projectBankCode")}
                >
                  <option selected value="">
                    Chọn ngân hàng
                  </option>
                  {allBank.map((item) => {
                    return (
                      <option value={item.bin}>
                        {`(${item.bin}) ${item.shortName}`}
                      </option>
                    );
                  })}
                </select>
                {errors.projectBankCode && (
                  <small className="text-danger m-1 p-0">
                    {errors.projectBankCode.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example1"
                >
                  Email liên kết PayPal
                </label>
                <input
                  {...register("projectEmail")}
                  name="projectEmail"
                  id="projectEmail"
                  type="text"
                  className="cf-form__input "
                  aria-label="Disabled input example"
                />
                {errors.projectEmail && (
                  <small className="text-danger m-1 p-0">
                    {errors.projectEmail.message}
                  </small>
                )}
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example1"
                >
                  Phương thức thanh toán
                </label>
                <select
                  className="cf-form__input"
                  {...register("projectMethod")}
                  name="projectMethod"
                  id="projectMethod"
                  aria-label="Default select example"
                >
                  <option selected value="vnpay">
                    VNPay
                  </option>
                  <option value="paypal">PayPal</option>
                  <option value="both">VNPay và PayPal</option>
                </select>
                {errors.projectMethod && (
                  <small className="text-danger m-1 p-0">
                    {errors.projectMethod.message}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default SecondStep;
