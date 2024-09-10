import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "react-medium-image-zoom/dist/styles.css";
import { getAllUsers } from "../../redux/actions/adminAction";
import { blockUser, OpenBlock, getUserDetail } from "../../redux/api/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import {
  faEye,
  faTrash,
  faCircleMinus,
  faSearch,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserAd = () => {
  const dispatch = useDispatch();
  const alluser = useSelector((state) => state.admin.alluser);
  const [loginModal, setloginModal] = useState(false);
  const [selectUser, setSelectUser] = useState("");
  const [userData, setUserData] = useState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchData() {
      dispatch(getAllUsers());
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (selectUser) {
      getUserDetail(selectUser).then((data) => {
        setUserData(data);
      });
    }
  }, [selectUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
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
      dispatch(getAllUsers(query));
    });
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
            <Modal.Title>Thông tin người dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <form className="custom-form">
                  <div className="row mb-4">
                    <div className="col">
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          src={userData?.avatar}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example1">
                          Tên người dùng
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={userData?.username}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example1">
                          Email
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={userData?.email}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div data-mdb-input-init className="form-outline">
                      <label className="form-label" for="form6Example1">
                        Số điện thoại
                      </label>
                      <Form.Control
                        type="text"
                        aria-label="Disabled input example"
                        disabled
                        readOnly
                        value={userData?.phone}
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example1">
                          Ngày sinh
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={userData?.birthday}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example2">
                          Giới tính
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={userData?.gender === "0" ? "nữ" : "nam"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example1">
                          youtubeUrl
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={userData?.youtubeUrl}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example2">
                          facebookUrl
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={userData?.facebookUrl}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example1">
                          tiktokUrl
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={userData?.tiktokUrl}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form6Example2">
                          Ngày tham gia
                        </label>
                        <Form.Control
                          type="text"
                          aria-label="Disabled input example"
                          disabled
                          readOnly
                          value={formatDate(userData?.joindate)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Lời giới thiệu
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      readOnly={true} // Set the readOnly attribute to make it read-only
                      value={userData?.intro}
                    />
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
                  <form
                    action="#"
                    onSubmit={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <div className="form-input">
                      <input
                        className="custom--input"
                        type="search"
                        placeholder="Tìm kiếm theo ID người dùng"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
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
            </thead>
            <tbody>
              {alluser?.map((user) => {
                return (
                  <tr>
                    <td>
                      <img src={user?.avatar} />
                      <p style={{ maxWidth: "250px" }} className="p-0 m-0">
                        {user?.username}
                      </p>
                    </td>
                    <td>
                      <p>{user?._id}</p>
                    </td>
                    <td>
                      <span
                        className={
                          "status " +
                          (user?.isEmailVerified === true
                            ? "completed"
                            : "pending")
                        }
                      >
                        {user?.isEmailVerified === true
                          ? "Verified"
                          : "Pending"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          "status " +
                          (user?.state === "active" ? "completed" : "pending")
                        }
                      >
                        {user?.state}
                      </span>
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className="icon-click"
                        onClick={() => {
                          setloginModal(true);
                          setSelectUser(user?._id);
                        }}
                        size="sx"
                        icon={faEye}
                      />
                    </td>
                    <td>
                      {user?.state === "active" ? (
                        <FontAwesomeIcon
                          className="icon-click"
                          onClick={() => {
                            const formData = new FormData();
                            formData.append("userId", user?._id);
                            blockUser(formData).then(() => {
                              dispatch(getAllUsers());
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
                            formData.append("userId", user?._id);
                            OpenBlock(formData).then(() => {
                              dispatch(getAllUsers());
                            });
                          }}
                          size="sx"
                          icon={faCirclePlus}
                        />
                      )}
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

export default UserAd;
