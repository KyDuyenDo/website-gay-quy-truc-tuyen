import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { getAllFundAction } from "../../redux/actions/adminAction";
import { getDetailFundraiserAdmin } from "../../redux/api/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FundAd = () => {
  const dispatch = useDispatch();
  const allFund = useSelector((state) => state.admin.allFund);
  const [loginModal, setloginModal] = useState(false);
  const [selectUser, setSelectUser] = useState();
  const [userData, setUserData] = useState();
  const [search, setSearch] = useState("");

  const createQuerySearch = (title) => {
    return new Promise((resolve, reject) => {
      try {
        const query = `?id=${title}`;
        resolve(query);
      } catch (error) {
        reject(error); // Handle potential errors
      }
    });
  };
  const handleSearchSubmit = () => {
    createQuerySearch(search).then((query) => {
      dispatch(getAllFundAction(query));
    });
  };

  useEffect(() => {
    async function fetchData() {
      dispatch(getAllFundAction());
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
            <Modal.Title>Thông tin nhà gây quỹ</Modal.Title>
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
              </form>
            </div>
          </Modal.Body>
        </Modal>
        <div className="order">
          <table>
            <thead>
              <tr>
                <th style={{ border: "none" }}>
                  <form action="#">
                    <div className="form-input">
                      <input
                        className="custom--input"
                        type="search"
                        placeholder="Tìm kiếm theo ID người dùng"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            console.log("enter");
                            handleSearchSubmit();
                          }
                        }}
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
                <th>Người dùng</th>
                <th>Ngày yêu cầu</th>
                <th>ID người dùng</th>
              </tr>
            </thead>
            <tbody>
              {allFund?.map((req) => {
                return (
                  <tr
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

export default FundAd;
