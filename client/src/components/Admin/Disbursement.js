import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "react-medium-image-zoom/dist/styles.css";
import { disbursement } from "../../redux/actions/adminAction";
import Button from "react-bootstrap/Button";
import {
  getDetaiArticleByAdmin,
  createDisbursement,
  sendNotify,
} from "../../redux/api/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Disbursement = () => {
  const dispatch = useDispatch();
  const disbursementItem = useSelector((state) => state.admin.disbursements);
  const [loginModal, setloginModal] = useState(false);
  const [selectArticle, setSelectArticle] = useState("");
  const [articleData, setArticleData] = useState();
  useEffect(() => {
    async function fetchData() {
      dispatch(disbursement());
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
  const totalDisbursement = (amountEarn, disburseList) => {
    const totalDis = disburseList?.reduce(
      (acc, dis) => acc + dis?.amountDisburse,
      0
    );
    return parseInt(amountEarn) - parseInt(totalDis);
  };
  const step = (expireDate, daysPassed) => {
    if (expireDate * 0.5 > daysPassed && daysPassed >= expireDate * 0.3) {
      console.log(1);
      return "1";
    } else if (expireDate > daysPassed && daysPassed >= expireDate * 0.5) {
      return "2";
    } else if (expireDate === daysPassed) {
      return "3";
    }
  };
  const stepObject = {
    1: 0.3,
    2: 0.5,
    3: 1,
  };
  return (
    <>
      <div className="table-data">
        <Modal
          className="fade modal-wrapper auth-modal"
          id="modalLogin"
          show={loginModal}
          onHide={setloginModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận giải ngân</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Đợt:{" "}
              <b>
                {step(
                  articleData?.expireDate,
                  Math.floor(
                    (new Date() - new Date(articleData?.releaseDate)) /
                      (1000 * 3600 * 24)
                  )
                )}
              </b>
            </p>
            <p>
              ID chiến dịch: <b>{articleData?._id}</b>
            </p>
            <p>
              {" "}
              Số tài khoản:{" "}
              <b>
                {articleData?.bankcode}-{articleData?.accountNumber}
              </b>
            </p>
            <p>
              Email liên kết paypal: <b>{articleData?.emailPayPal}</b>
            </p>
            <p>
              Số tiền giải ngân:{" "}
              <b>
                {toDecimal(
                  totalDisbursement(
                    articleData?.amountEarned,
                    articleData?.disbursements
                  )
                )}{" "}
                VNĐ
              </b>
            </p>
            <small>
              *Bắt buộc phải cập nhật giải ngân đúng đợt, dù cho số tiền gây quỹ
              rất ít.
            </small>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-end">
              <Button
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  const message = `Chúng tôi đã thực hiện cập nhật giải ngân cho chiến dịch ${
                    articleData.articletitle
                  } đợt ${step(
                    articleData?.expireDate,
                    Math.floor(
                      (new Date() - new Date(articleData?.releaseDate)) /
                        (1000 * 3600 * 24)
                    )
                  )} cho bạn với số tiền ${toDecimal(
                    totalDisbursement(
                      articleData?.amountEarned,
                      articleData?.disbursements
                    )
                  )} VNĐ. Liên hệ với chúng tôi nếu bạn có bất kì vấn đề gì.`;
                  const formData = new FormData();
                  formData.append("userId", articleData?.userId?._id);
                  formData.append("message", message);
                  formData.append("state", "success");
                  formData.append("articleId", articleData?._id);
                  formData.append(
                    "amountDisburse",
                    totalDisbursement(
                      articleData?.amountEarned,
                      articleData?.disbursements
                    )
                  );
                  formData.append(
                    "step",
                    step(
                      articleData?.expireDate,
                      Math.floor(
                        (new Date() - new Date(articleData?.releaseDate)) /
                          (1000 * 3600 * 24)
                      )
                    )
                  );
                  createDisbursement(formData).then(() => {
                    sendNotify(formData);
                    dispatch(disbursement());
                    setloginModal(false);
                  });
                }}
                variant="primary"
              >
                Xác nhận
              </Button>
            </div>
          </Modal.Footer>
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
              <tr>
                <th>Bài viết</th>
                <th>Số ngày gây quỹ</th>
                <th>Số ngày đã qua</th>
                <th>Số ngày kết thúc đợt</th>
                <th>Số tiền giải ngân</th>
                <th>Đợt</th>
              </tr>
            </thead>
            <tbody>
              {disbursementItem?.map((article) => {
                return (
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setloginModal(true);
                      setSelectArticle(article._id);
                    }}
                  >
                    <td>
                      <img
                        style={{
                          width: "100px",
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

                    <td>{article?.expireDate}</td>
                    <td>{article?.daysPassed}</td>
                    <td>
                      {article?.expireDate *
                        stepObject[
                          parseInt(
                            step(article?.expireDate, article?.daysPassed)
                          ) + 1
                        ] -
                        article?.daysPassed}
                    </td>
                    <td>
                      {toDecimal(
                        totalDisbursement(
                          article?.amountEarned,
                          article?.disbursements
                        )
                      )}
                    </td>
                    <td>{step(article?.expireDate, article?.daysPassed)}</td>
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

export default Disbursement;
