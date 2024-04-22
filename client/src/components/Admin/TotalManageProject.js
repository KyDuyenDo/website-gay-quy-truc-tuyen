import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "react-medium-image-zoom/dist/styles.css";
import { setDataProjects } from "../../redux/actions/adminAction";
import {
  getDetaiArticleByAdmin,
  removePublishedArticle,
  publishedArticle,
} from "../../redux/api/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import GallerySlider from "../FundraiserDetail/GallerySlider";
import {
  faEye,
  faTrash,
  faCircleMinus,
  faSearch,
  faCirclePlus,
  faSquarePollVertical
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TotalManageProject = () => {
  const dispatch = useDispatch();
  const allArticle = useSelector((state) => state.admin.allArticle);
  const [loginModal, setloginModal] = useState(false);
  const [selectArticle, setSelectArticle] = useState("");
  const [articleData, setArticleData] = useState();
  useEffect(() => {
    async function fetchData() {
      dispatch(setDataProjects(""));
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (selectArticle) {
      getDetaiArticleByAdmin(selectArticle).then((data) => {
        setArticleData(data);
      });
    }
  }, [selectArticle]);
  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }
  const converDate = (date) => {
    const dateString = new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return dateString;
  };
  const deadline = (createdAt, expireDate) => {
    const createdDate = new Date(createdAt);
    const deadline = new Date(
      createdDate.setDate(createdDate.getDate() + expireDate)
    ); // Thêm expireDate + 2 ngày
    const today = new Date();
    const daysLeft = Math.floor((deadline - today) / (1000 * 3600 * 24)); // Chuyển đổi mili giây sang ngày

    return daysLeft;
  };
  return (
    <>
      <div className="table-data">
        <Modal
          className="fade modal-wrapper auth-modal modal-lg"
          id="modalLogin"
          show={loginModal}
          onHide={setloginModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Nội dung chiến dịch</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <label id="number-label" for="number">
                  Ảnh chiến dịch
                </label>
                <div className="mt-3 fundraiser-single">
                  <div className="swiper fundraiser-gallery-wrapper">
                    <GallerySlider
                      image={[
                        {
                          url:
                            articleData?.image?.length === 3
                              ? articleData.image[0]
                              : "",
                          title: 1,
                        },
                        {
                          url:
                            articleData?.image?.length === 3
                              ? articleData.image[1]
                              : "",
                          title: 2,
                        },
                        {
                          url:
                            articleData?.image?.length === 3
                              ? articleData.image[2]
                              : "",
                          title: 3,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
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
                          value={articleData?.articletitle}
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
                          value={articleData?.categotyId?.title}
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
                        value={articleData?.addressId?.detail}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Nội dung chiến dịch
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="10"
                      readOnly={true} // Set the readOnly attribute to make it read-only
                      value={articleData?.body}
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
                          value={
                            articleData?.bankcode +
                            "-" +
                            articleData?.accountNumber
                          }
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
                          value={articleData?.emailPayPal}
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
                          value={toDecimal(articleData?.amountRaised)}
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
                          value={articleData?.expireDate}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example1">
                          Họ tên nhà gây quỹ
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={
                            articleData?.fundraiser?.length === 1
                              ? articleData.fundraiser[0].fullname
                              : ""
                          }
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example2">
                          ID nhà gây quỹ
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={articleData?.userId?._id}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example1">
                          Số điện thoại
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={
                            articleData?.fundraiser?.length === 1
                              ? articleData.fundraiser[0].numberPhone
                              : ""
                          }
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example2">
                          Email liên hệ
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={
                            articleData?.fundraiser?.length === 1
                              ? articleData.fundraiser[0].emailContact
                              : ""
                          }
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div className="order">
          <table>
            <thead>
              <tr>
                <th>
                  <form action="#">
                    <div className="form-input">
                      <input
                        className="custom--input"
                        type="search"
                        placeholder="Tìm kiếm"
                      />
                      <button type="submit" className="search-btn">
                        <span className="bx bx-search">
                          <FontAwesomeIcon size="1x" icon={faSearch} />
                        </span>
                      </button>
                    </div>
                  </form>
                </th>
              </tr>
            </thead>
            <tbody>
              {allArticle?.map((article) => {
                return (
                  <tr>
                    <td>
                      <img
                        style={{
                          width: "120px",
                          height: "70px",
                          borderRadius: "0px",
                        }}
                        src={
                          article?.image?.length === 3 ? article?.image[0] : ""
                        }
                      />
                      <p style={{ maxWidth: "250px" }} className="p-0 m-0">
                        {article?.articletitle}
                      </p>
                    </td>
                    <td>
                      <span
                        className={
                          "status " +
                          (deadline(
                            article?.releaseDate,
                            article?.expireDate
                          ) >= 0
                            ? "completed"
                            : "process")
                        }
                      >
                        {deadline(article?.releaseDate, article?.expireDate) >=
                        0
                          ? "fundrasing"
                          : "finished"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          "status " +
                          (article?.published === true
                            ? "completed"
                            : "pending")
                        }
                      >
                        {article?.published === true ? "published" : "Block"}
                      </span>
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className="icon-click"
                        onClick={() => {
                          setloginModal(true);
                          setSelectArticle(article?._id);
                        }}
                        size="sx"
                        icon={faEye}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className="icon-click"
                        onClick={() => {
                        //   setloginModal(true);
                        //   setSelectArticle(article?._id);
                        }}
                        size="sx"
                        icon={faSquarePollVertical}
                      />
                    </td>
                    <td>
                      {article?.published === true ? (
                        <FontAwesomeIcon
                          className="icon-click"
                          onClick={() => {
                            const formData = new FormData();
                            formData.append("articleId", article?._id);
                            removePublishedArticle(formData).then(() => {
                              dispatch(setDataProjects(""));
                            });
                          }}
                          size="sx"
                          icon={faCircleMinus}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="icon-click"
                          onClick={() => {
                            const formData = new FormData();
                            formData.append("articleId", article?._id);
                            publishedArticle(formData).then(() => {
                              dispatch(setDataProjects(""));
                            });
                          }}
                          size="sx"
                          icon={faCirclePlus}
                        />
                      )}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className="icon-click"
                        onClick={() => {}}
                        size="sx"
                        icon={faTrash}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TotalManageProject;
