import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { setRequestMember } from "../../redux/actions/adminAction";
import {
  getDetailFundraiserAdmin,
  rejectFundraiser,
  acceptFundraiser,
} from "../../redux/api/adminAPI";
import { useDispatch, useSelector } from "react-redux";
const AdRequestUser = () => {
  const dispatch = useDispatch();
  const requestMember = useSelector((state) => state.admin.requestMember);
  const [loginModal, setloginModal] = useState(false);
  const [selectUser, setSelectUser] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function fetchData() {
      dispatch(setRequestMember());
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (selectUser) {
      const formData = new FormData();
      formData.append("userId", selectUser);
      getDetailFundraiserAdmin(formData).then((data) => {
        setUserData(data);
      });
    }
  }, [selectUser]);
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
            <Modal.Title>Hồ sơ đăng ký</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-wrap">
              <form id="survey-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label id="name-label" for="name">
                        Tên người dùng
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        required
                        value={userData?.fullname}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label id="email-label" for="email">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        required
                        value={userData?.emailContact}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label id="number-label" for="number">
                        Ngày sinh
                      </label>
                      <input
                        type="text"
                        value={userData?.birthday}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label id="number-label" for="number">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        value={userData?.numberPhone}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label id="number-label" for="number">
                        Tên tổ chức/ cá nhân
                      </label>
                      <input
                        type="text"
                        value={userData?.groupName}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label id="number-label" for="number">
                        Link trang cá nhân
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={userData?.introLink}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Lời giới thiệu</label>
                      <textarea
                        id="comments"
                        className="form-control comment-text"
                        name="comment"
                        value={userData?.describe}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label>Ảnh căn cước công dân</label>
                  <div className="col-md-6 p-3">
                    <Zoom>
                      <img
                        width="100%"
                        src={
                          userData?.identificationCard?.length === 2
                            ? userData.identificationCard[0]
                            : ""
                        }
                      />
                    </Zoom>
                  </div>
                  <div className="col-md-6 p-3">
                    <Zoom>
                      <img
                        width="100%"
                        src={
                          userData?.identificationCard?.length === 2
                            ? userData.identificationCard[1]
                            : ""
                        }
                      />
                    </Zoom>
                  </div>
                </div>
                <div className="row">
                  <label>Ảnh nhận dạng</label>
                  <div className="col-md-6 p-3">
                    <Zoom>
                      <img width="60%" src={userData?.identificationImage} />
                    </Zoom>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const formData = new FormData();
                        formData.append("userId", userData?._id);
                        rejectFundraiser(formData).then(() => {
                          dispatch(setRequestMember());
                          setloginModal(false);
                        });
                      }}
                    >
                      Từ chối
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        const formData = new FormData();
                        formData.append("userId", userData?._id);
                        acceptFundraiser(formData).then(() => {
                          dispatch(setRequestMember());
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
          </Modal.Body>
        </Modal>
        <div className="order">
          <table>
            <thead>
              <tr>
                <th>Người dùng</th>
                <th>Ngày yêu cầu</th>
                <th>ID người dùng</th>
              </tr>
            </thead>
            <tbody>
              {requestMember?.map((req) => {
                return (
                  <tr
                  style={{cursor: "pointer"}}
                    onClick={() => {
                      setSelectUser(req.userId);
                      setloginModal(true);
                    }}
                  >
                    <td>
                      <img src={req.user[0].avatar} />
                      <p className="m-0">{req.user[0].username}</p>
                    </td>
                    <td>{converDate(req.createdAt)}</td>
                    <td>
                      <span>{req.userId}</span>
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

export default AdRequestUser;
