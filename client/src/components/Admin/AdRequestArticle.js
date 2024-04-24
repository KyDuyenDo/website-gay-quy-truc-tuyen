import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "react-medium-image-zoom/dist/styles.css";
import { setRequestArticle } from "../../redux/actions/adminAction";
import {
  getDetaiArticleByAdmin,
  sendNotify,
  deleteArticle,
  confirmArticle,
} from "../../redux/api/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GallerySlider from "../FundraiserDetail/GallerySlider";
const AdRequestArticle = () => {
  const dispatch = useDispatch();
  const requestArticle = useSelector((state) => state.admin.requestArticle);
  const [loginModal, setloginModal] = useState(false);
  const [selectArticle, setSelectArticle] = useState();
  const [articleData, setArticleData] = useState();
  useEffect(() => {
    async function fetchData() {
      dispatch(setRequestArticle());
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
            <Modal.Title>Yêu cầu đăng bài</Modal.Title>
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
                  <div className="row">
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          const message = `Yêu cầu đăng bài gây quỹ cho chiến dịch ${articleData?.articletitle}, của bạn đã bị từ chối, do hồ sơ của bản không đáp ứng đủ yêu cầu. Nếu có bất kì câu hỏi nào hãy liên hệ với chúng tôi qua địa chỉ hỗ trợ.`;
                          const formData = new FormData();
                          formData.append("userId", articleData?.userId?._id);
                          formData.append("message", message);
                          formData.append("state", "error");
                          formData.append("articleId", articleData._id);
                          deleteArticle(formData).then(() => {
                            sendNotify(formData);
                            setloginModal(false);
                          });
                        }}
                      >
                        Từ chối
                      </Button>
                      <Button
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          const message = `Yêu cầu đăng bài cho chiến dịch ${articleData?.articletitle} của bạn đã được chấp nhận. Nếu có bất kì câu hỏi nào hãy liên hệ với chúng tôi qua địa chỉ hỗ trợ.`;
                          const formData = new FormData();
                          formData.append("articleId", articleData._id);
                          formData.append("userId", articleData?.userId?._id);
                          formData.append("message", message);
                          formData.append("state", "success");
                          confirmArticle(formData).then(() => {
                            sendNotify(formData);
                            setloginModal(false);
                          });
                        }}
                        variant="primary"
                      >
                        Đồng ý
                      </Button>
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
                <th>Bài viết</th>
                <th>Ngày yêu cầu</th>
              </tr>
            </thead>
            <tbody>
              {requestArticle?.map((article) => {
                return (
                  <tr
                    onClick={() => {
                      setloginModal(true);
                      setSelectArticle(article?._id);
                    }}
                  >
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
                      <p className="p-0 m-0">{article?.articletitle}</p>
                    </td>
                    <td>{converDate(article?.createdAt)}</td>
                    {/* <td>
                      <span className="status completed">Completed</span>
                    </td> */}
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

export default AdRequestArticle;
