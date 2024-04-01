import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { Modal } from "react-bootstrap";
import "../css/fund.css";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Loader from "../components/Loader";
import { upLoadImage } from "../redux/api/uploadAPI";
//images
import bg from "../assets/images/bg7.jpeg";
import FirstRaiserStep from "../components/AddFundraiser/FirstRaiserStep";
import SecondRaiserStep from "../components/AddFundraiser/SecondRaiserStep";
import ThirdRaiserStep from "../components/AddFundraiser/ThirdRaiserStep";
import FourthRaiserStep from "../components/AddFundraiser/FourthRaiserStep";

const schemaFundRaiser = yup.object().shape({
  fullname: yup.string().required("Họ và tên trống"),
  identificationCard: yup.array().default([]),
  identificationImage: yup.array().default([]),
  birthday: yup
    .string()
    .required("Ngày tháng năm sinh trống")
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      "không đúng định dạng (dd/mm/yyyy)"
    ),
  mumberPhone: yup.string().required("Số điện thoại trống trống"),
  emailContact: yup
    .string()
    .email("email không hợp lệ")
    .required("Chưa nhập email"),
  type: yup.string().default("only"),
  groupName: yup.string().required("Tên nhóm trống"),
  describe: yup.string().required("Mô tả trống"),
  introLink: yup.string().required("Mô tả trống"),
});

const BecomeFundraiser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(schemaFundRaiser) });

  const [goSteps, setGoSteps] = useState(0);
  const [errorImage, setErrorImage] = useState("");
  const [erroravt, setErroravt] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifyAdd, setNotifyAdd] = useState(false);
  const [notifyMess, setNotifyMess] = useState("");

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
                        <FirstRaiserStep
                          erroravt={erroravt}
                          setValue={setValue}
                          errors={errors}
                        />
                        <div className="text-end toolbar toolbar-bottom p-2">
                          <button
                            className="btn sw-btn-next sw-btn ms-1npm"
                            onClick={() => {
                              if (
                                getValues("identificationImage") === undefined
                              ) {
                                setErroravt("Chưa chụp ảnh nhận dạng");
                              } else {
                                setErroravt("");
                                setGoSteps(1);
                              }
                              // console.log(getValues("identificationImage").length);
                            }}
                          >
                            Sau
                          </button>
                        </div>
                      </>
                    )}
                    {goSteps === 1 && (
                      <>
                        <SecondRaiserStep
                          setValue={setValue}
                          errorImage={errorImage}
                        />
                        <div className="text-end toolbar toolbar-bottom p-2">
                          <button
                            className="btn sw-btn-prev sw-btn me-1"
                            onClick={() => setGoSteps(0)}
                          >
                            Trước
                          </button>
                          <button
                            className="btn sw-btn-next sw-btn ms-1"
                            onClick={() => {
                              if (
                                getValues("identificationCard") === undefined
                              ) {
                                setErrorImage("Chưa tải lên ảnh căn cước");
                              } else {
                                if (
                                  getValues("identificationCard").length !== 2
                                ) {
                                  setErrorImage(
                                    "Cần tải lên hai ảnh gồm trước và sau"
                                  );
                                } else {
                                  setErrorImage("");
                                  setGoSteps(2);
                                }
                              }
                            }}
                          >
                            Sau
                          </button>
                        </div>
                      </>
                    )}
                    {goSteps === 2 && (
                      <form
                        onSubmit={handleSubmit((data) => {
                          console.log(data);
                          setGoSteps(3);
                        })}
                      >
                        <ThirdRaiserStep register={register} errors={errors} />
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
                      <>
                        <FourthRaiserStep />
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BecomeFundraiser;
