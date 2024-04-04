import React, { useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { Modal } from "react-bootstrap";
import "../css/fund.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Loader from "../components/Loader";
import { addArticle, upDateImage } from "../redux/api/articleAPI";
import { upLoadImage } from "../redux/api/uploadAPI";
//images
import bg from "../assets/images/bg7.jpeg";

import { Link } from "react-router-dom";
import FirstStep from "../components/AddArticle/FirstStep";
import SecondStep from "../components/AddArticle/SecondStep";
import ThirdStep from "../components/AddArticle/ThirdStep";
import FourthStep from "../components/AddArticle/FourthStep";
import { getCategoriesAction } from "../redux/actions/categoryAction";
import { useDispatch } from "react-redux";
const schema = yup.object().shape({
  projectTitle: yup.string().required("Tiêu đề trống")
  .min(10, "Quá ngắn, tối thiểu 10 từ"),
  projectCategory: yup.string().required("Chưa chọn danh mục"),
  projectBody: yup.string().required("Nội dung trống")
  .min(250, "Quá ngắn, tối thiểu 250 từ"),
  projectAmount: yup
    .string()
    .matches(/^\d+$/, "Số không hợp lệ")
    .required("Số tiền gây quỹ trống"),
  projectDay: yup.string().required("Số ngày gây quỹ trống"),
  projectMethod: yup
    .string()
    .required("Vui lòng chọn phương thức thanh toán")
    .default("vnpay"),
  projectAccount: yup
    .string()
    .matches(/^\d+$/, "Số không hợp lệ")
    .when(["$projectMethod"], ([projectMethod], schema) =>
      projectMethod === "vnpay" || projectMethod === "both"
        ? schema.required("required")
        : schema.optional().nullable()
    ),
  projectEmail: yup
    .string()
    .email()
    .when(["$projectMethod"], ([projectMethod], schema) =>
      projectMethod === "paypal" || projectMethod === "both"
        ? schema.required("required")
        : schema.optional().nullable()
    ),
  projectBankCode: yup
    .string()
    .when(["$projectMethod"], ([projectMethod], schema) =>
      projectMethod === "vnpay" || projectMethod === "both"
        ? schema.required("required")
        : schema.optional().nullable()
    ),
  city: yup.string().default(""),
  county: yup.string().default(""),
  town: yup.string().default(""),
  street: yup.string().default(""),
  detail: yup.string().default(""),
  address: yup.string().default(""),
  total: yup.string().default(""),
  lat: yup.string().default(""),
  lon: yup.string().default(""),
  image: yup.array().default([]),
});

const ProjectCreate = () => {
  const [lackAddMess, setLackAddMess] = useState("");
  const [success, setSuccess] = useState(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const [goSteps, setGoSteps] = useState(0);
  const [errorImage, setErrorImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifyAdd, setNotifyAdd] = useState(false);
  const [notifyMess, setNotifyMess] = useState("");

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);
  const uploadImages = async (files) => {
    const imageData = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const data = await upLoadImage("article", formData);
        return data;
      })
    );
    return imageData;
  };
  return (
    <>
      <div className="page-content bg-white">
        <section
          className="content-inner-1 section-pattren1 overlay-white-dark"
          style={{
            backgroundImage: "url(" + bg + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container" style={{ zIndex: "1000" }}>
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="form-wrapper overflow-hidden">
                  <div className="form-wizard dz-form-step">
                    <Stepper
                      className="nav nav-wizard"
                      activeStep={goSteps}
                      label={false}
                    >
                      <Step className="nav-link" />
                      <Step
                        className="nav-link"
                        onClick={() => setGoSteps(1)}
                      />
                      <Step
                        className="nav-link"
                        onClick={() => setGoSteps(2)}
                      />
                      <Step
                        className="nav-link"
                        onClick={() => setGoSteps(3)}
                      />
                    </Stepper>
                    {goSteps === 0 && (
                      <>
                        <FirstStep />
                        <div className="text-end toolbar toolbar-bottom p-2">
                          <button
                            className="btn sw-btn-next sw-btn ms-1npm"
                            onClick={() => setGoSteps(1)}
                          >
                            Xác thực
                          </button>
                        </div>
                      </>
                    )}
                    {goSteps === 1 && (
                      <form
                        onSubmit={handleSubmit((data) => {
                          // console.log(data)
                          setGoSteps(2);
                        })}
                      >
                        <SecondStep register={register} errors={errors} />
                        <div className="text-end toolbar toolbar-bottom p-2">
                          <button
                            className="btn sw-btn-next sw-btn ms-1"
                            type="submit"
                          >
                            Sau
                          </button>
                        </div>
                      </form>
                    )}
                    {goSteps === 2 && (
                      <form
                        onSubmit={handleSubmit((data) => {
                          console.log(data.total);
                          if (data.total !== "") {
                            setLackAddMess("");
                            setGoSteps(3);
                          } else {
                            setLackAddMess("Chưa chọn địa chỉ");
                          }
                        })}
                      >
                        <ThirdStep
                          register={register}
                          errors={errors}
                          getValues={getValues}
                          setValue={setValue}
                          lackAddMess={lackAddMess}
                        />
                        <div className="text-end toolbar toolbar-bottom p-2">
                          <button
                            className="btn sw-btn-prev sw-btn me-1"
                            onClick={() => setGoSteps(1)}
                          >
                            Trước
                          </button>
                          <button
                            className="btn sw-btn-next sw-btn ms-1"
                            type="submit"
                          >
                            Sau
                          </button>
                        </div>
                      </form>
                    )}
                    {goSteps === 3 && (
                      <form
                        onSubmit={handleSubmit((data) => {
                          if (data.image.length === 3) {
                            setErrorImage("");
                            setNotifyAdd(true);
                            setLoading(true);

                            const formData = new FormData();
                            formData.append("bankcode", data.projectBankCode);
                            formData.append("title", data.projectTitle);
                            formData.append("category", data.projectCategory);
                            formData.append("body", data.projectBody);
                            formData.append("expireDate", data.projectDay);
                            formData.append("releaseDate", "");
                            formData.append(
                              "accountNumber",
                              data.projectAccount
                            );
                            formData.append(
                              "methodPayment",
                              data.projectMethod
                            );
                            formData.append("emailPayPal", data.projectEmail);
                            formData.append("amountRaised", data.projectAmount);

                            formData.append("city", data.city);
                            formData.append("county", data.county);
                            formData.append("detail", data.total);
                            formData.append("address", data.address);
                            formData.append("lat", data.lat);
                            formData.append("lon", data.lon);
                            formData.append("street", data.street);
                            formData.append("town", data.town);

                            // for (const pair of formData) {
                            //   const key = pair[0];
                            //   const value = pair[1];
                            //   console.log(`Key: ${key}, Value: ${value}`);
                            // }
                            const formDataImage = new FormData();
                            addArticle(formData)
                              .then((result) => {
                                formDataImage.append("articleId", result._id);
                                uploadImages(data.image)
                                  .then((dataImage) => {
                                    dataImage.forEach((item, index) => {
                                      formDataImage.append(
                                        `imageURL${index + 1}`,
                                        item.imageURL
                                      );
                                    });
                                  })
                                  .then(() => {
                                    upDateImage(formDataImage)
                                      .then(() => {
                                        setSuccess(true);
                                      })
                                      .catch((error) => {
                                        console.log(error);
                                        setSuccess(false);
                                      });
                                  })
                                  .catch((error) => {
                                    setSuccess(false);
                                    console.log(error);
                                  });
                              })
                              .catch((error) => {
                                setSuccess(false);
                                console.log(error);
                              });

                            if (success === true) {
                              setNotifyMess(
                                "Yêu cầu thành công, yêu cầu gây quỹ của bạn đã được gửi đi, bài sẽ được đăng sau khi được kiểm duyệt, chúng tôi sẽ thông báo cho bạn sau."
                              );
                            } else {
                              setNotifyMess(
                                "Có lỗi đã xảy ra, vui lòng thử lại!"
                              );
                            }
                            setLoading(false);
                          } else {
                            setErrorImage("Bạn cần tải lên 3 ảnh");
                          }
                        })}
                      >
                        <FourthStep
                          setValue={setValue}
                          errorImage={errorImage}
                        />
                        <div className="text-end toolbar toolbar-bottom p-2">
                          <button
                            className="btn sw-btn-prev sw-btn me-1"
                            onClick={() => setGoSteps(2)}
                          >
                            Trước
                          </button>
                          <button
                            className="btn sw-btn-next sw-btn ms-1"
                            type="submit"
                          >
                            Gửi
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        className="modal fade modal-wrapper auth-modal"
        show={notifyAdd}
        onHide={setNotifyAdd}
        backdrop="static"
        centered
      >
        <div style={{ textAlign: "center" }}>
          <h2 className="title">Yêu cầu tạo dự án gây quỹ</h2>
          {loading === true ? (
            <Loader />
          ) : (
            <>
              <h6 className="m-0">{notifyMess}</h6>
              <Link
                to="/management/management_project"
                className="sign-text d-block"
                data-bs-toggle="collapse"
                onClick={() => {
                  setNotifyAdd(false);
                  reset();
                }}
              >
                Trở lại
              </Link>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ProjectCreate;
