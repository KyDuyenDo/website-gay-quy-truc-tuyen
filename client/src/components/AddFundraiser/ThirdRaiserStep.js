import React from "react";
import ScrollToTop from "../ScrollToTop";

const ThirdRaiserStep = ({ register, errors }) => {
  return (
    <div>
      <div className="">
        <span className="header-title">Cung cấp các thông tin cá nhân</span>
        <div className="custom-form">
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example1"
                >
                  Họ và tên
                </label>
                <input
                  name="fullname"
                  id="fullname"
                  {...register("fullname")}
                  type="text"
                  className="cf-form__input"
                />
                {errors.fullname && (
                  <small className="text-danger m-1 p-0">
                    {errors.fullname.message}
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
                  Ngày tháng năm sinh
                </label>
                <input
                  name="birthday"
                  id="birthday"
                  {...register("birthday")}
                  type="text"
                  className="cf-form__input"
                />
                {errors.birthday && (
                  <small className="text-danger m-1 p-0">
                    {errors.birthday.message}
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
                  Số điện thoại
                </label>
                <input
                  name="numberPhone"
                  id="numberPhone"
                  {...register("numberPhone")}
                  type="text"
                  className="cf-form__input"
                />
                {errors.numberPhone && (
                  <small className="text-danger m-1 p-0">
                    {errors.numberPhone.message}
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
                  Email
                </label>
                <input
                  name="emailContact"
                  id="emailContact"
                  {...register("emailContact")}
                  type="text"
                  className="cf-form__input"
                />
                {errors.emailContact && (
                  <small className="text-danger m-1 p-0">
                    {errors.emailContact.message}
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
                  Đăng ký với hình thức
                </label>
                <select
                  className="cf-form__input"
                  {...register("type")}
                  name="type"
                  id="type"
                  aria-label="Default select example"
                >
                  <option selected value="only">
                    Cá nhân
                  </option>
                  <option value="group">Tổ chức</option>
                </select>
                {errors.projectMethod && (
                  <small className="text-danger m-1 p-0">
                    {errors.projectMethod.message}
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
                  Tên nhóm
                </label>
                <input
                  name="groupName"
                  id="groupName"
                  {...register("groupName")}
                  type="text"
                  className="cf-form__input"
                />
                {errors.groupName && (
                  <small className="text-danger m-1 p-0">
                    {errors.groupName.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div data-mdb-input-init className="form-outline">
              <label className="cf-form__section-subttitle" for="form6Example1">
                Link đến trang cá nhân/ website của cá nhân hoặc tổ chức
              </label>
              <input
                name="introLink"
                id="introLink"
                {...register("introLink")}
                type="text"
                className="cf-form__input"
              />
              {errors.introLink && (
                <small className="text-danger m-1 p-0">
                  {errors.introLink.message}
                </small>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label
              for="exampleFormControlTextarea1"
              className="cf-form__section-subttitle"
            >
              Mô tả ngắn về nhóm hoặc bản thân đại diện
            </label>
            <textarea
              className="form-control"
              id="describe"
              name="describe"
              rows="3"
              {...register("describe")}
            ></textarea>
            {errors.describe && (
              <small className="text-danger m-1 p-0">
                {errors.describe.message}
              </small>
            )}
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default ThirdRaiserStep;
