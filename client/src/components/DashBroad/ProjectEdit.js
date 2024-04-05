import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import ShowMoreText from "react-show-more-text";
import {
  faUpload,
  faFileAlt,
  faImage,
  faTrash,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getUserArticleDetail } from "../../redux/actions/manageAction";
import { useParams } from "react-router-dom";
import "../../css/projectEdit.css";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schemaActivity = yup.object().shape({
  amountSpend: yup.string().required("Số tiền chi trống"),
  activityImage: yup.string().required("Chưa chọn ảnh"),
  content: yup.string().required("Chưa nhập nội dung"),
});

const ProjectEdit = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(schemaActivity) });
  const dispatch = useDispatch();
  const params = useParams();
  const [openForm, setOpenForm] = useState(false);
  const detailArticle = useSelector(
    (state) => state.management.userArticleDetail
  );
  function formatDate(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year.toString().slice(-2)} - ${hours}:${minutes}`;
  }
  console.log(params.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUserArticleDetail(params.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };
  return (
    <div>
      <div className="contain-main-content">
        <span className="header-title">Nội dung chính</span>
        <form className="custom-form">
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example1">
                  Tiêu đề chiến dịch
                </label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={detailArticle.articletitle}
                />
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example1">
                  Thuộc danh mục
                </label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={detailArticle.categotyId.title}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" for="form6Example1">
                Địa chỉ chiến dịch
              </label>
              <Form.Control
                type="text"
                aria-label="Disabled input example"
                disabled
                readOnly
                value={detailArticle.address}
              />
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Nội dung chiến dịch
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="10"
              readOnly={true} // Set the readOnly attribute to make it read-only
              value={detailArticle.body}
            />
          </div>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example1">
                  Số tài khoản nhận
                </label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={detailArticle.accountNumber}
                />
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example2">
                  email PayPal
                </label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={detailArticle.emailPayPal}
                />
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example1">
                  Mục tiêu gây quỹ
                </label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={detailArticle.amountRaised}
                />
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example2">
                  Số ngày gây quỹ
                </label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={detailArticle.expireDate}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-between">
          <span className="header-title">Các hoạt động</span>
          <a onClick={() => setOpenForm(true)} className="btn-mana-more">
            <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
          </a>
        </div>
        {openForm === true ? (
          <form
            className="main-contain-up-activity"
            style={{ marginTop: "25px" }}
            onSubmit={() => {}}
          >
            <div className="row">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" for="form6Example1">
                    Số tiền đã chi
                  </label>
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control"
                  />
                </div>
                <div className="contain-upload row">
                  <div className="col-3">
                    <div className="upload-item">
                      <FontAwesomeIcon
                        size="1x"
                        icon={faImage}
                      ></FontAwesomeIcon>
                      <p>HÌNH ẢNH</p>
                      <button className="d-none"></button>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="upload-item">
                      <FontAwesomeIcon
                        size="1x"
                        icon={faFileAlt}
                      ></FontAwesomeIcon>
                      <p>TÀI LIỆU</p>
                      <button className="d-none"></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Nội dung chiến dịch
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="contain-button">
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() => setOpenForm(false)}
              >
                Thoát
              </button>
              <button type="submit" className="btn btn-primary">
                Thêm
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
        <div className="list-activity">
          {/* các hoạt động */}
          {detailArticle.activities.map((data) => {
            return (
              <div className="item-activity">
                <div className="contain-activity row">
                  <div className="left-contain col-12 col-md-4 ">
                    <div className="s1q0b356 h3797oo">
                      <div>
                        Ngày đăng: {formatDate(new Date(data.createdAt))}
                      </div>
                      <div>Số tiền chi: {data.amountSpent} VNĐ</div>
                      {/* <div>Tài liệu đã đăng</div>
                      <div className="row-contain">
                        <FontAwesomeIcon
                          size="1x"
                          icon={faFileAlt}
                        ></FontAwesomeIcon>
                        <div className="content">
                          <div className="details">
                            <span className="name">
                              time_1903802.dox &#8226;{" "}
                              <span style={{ fontSize: "14px" }}>70 KB</span>
                            </span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="right-contain col-12 col-md-8">
                    <div className="main-text">
                      <span className="TermText">Nội dung</span>
                      <ShowMoreText
                        lines={2}
                        more="Xem thêm"
                        less="Thu gọn"
                        className="content-css"
                        anchorClass="show-more-less-clickable"
                        onClick={executeOnClick}
                        expanded={false}
                        truncatedEndingComponent={"... "}
                      >
                        {`${data.body}`}
                      </ShowMoreText>
                    </div>
                    <div className="image-contain">
                      <div className="ZoomableImage">
                        <img
                          alt="Hình ảnh: merchandise (n)"
                          className="ZoomableImage-rawImage SetPageTerm-image"
                          style={{
                            width: "120px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          src={data.image}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* form thêm hoạt động */}
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;
