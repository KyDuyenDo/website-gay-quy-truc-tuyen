import React, { useState, useEffect, useRef } from "react";
import {
  faLocationDot,
  faEnvelope,
  faArrowRightToBracket,
  faSearch,
  faAngleRight,
  faBell,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import "../css/header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "./logo.png";
import { connect } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserClear } from "../redux/actions/userAction";
import {
  signInAction,
  signUpAction,
  logoutAction,
} from "../redux/actions/authActions";
import { getNotify } from "../redux/actions/manageAction";
import { setSearchProject } from "../redux/actions/articleAction";
import { signInActionAdmin } from "../redux/actions/adminAction";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Loader from "./Loader";

// use form
const schema = yup.object().shape({
  email: yup.string().required("chưa nhập email"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});
const schema1 = yup.object().shape({
  username: yup.string().required("chưa nhập tên admin"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});
const schema3 = yup.object().shape({
  email: yup
    .string()
    .email("email không thích hợp")
    .required("chưa nhập email"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/,
      "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký hiệu đặc biệt"
    ),

  repassword: yup
    .string()
    .required("Mật khẩu xác nhận không được bỏ trống")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
  username: yup.string().required("chưa nhập tên"),
});
const schema2 = yup.object().shape({
  email: yup
    .string()
    .email("email không thích hợp")
    .required("chưa nhập email"),
});

const Header = () => {
  const [active, setActive] = useState("");
  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const {
    register: registerForm1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmitForm1,
    reset: reset1,
  } = useForm({ resolver: yupResolver(schema1) });
  const {
    register: registerForm2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmitForm2,
    reset: reset2,
  } = useForm({
    resolver: yupResolver(schema2),
  });
  const {
    register: registerForm3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmitForm3,
    reset: reset3,
  } = useForm({
    resolver: yupResolver(schema3),
  });

  /* for sticky header */
  const [headerFix, setheaderFix] = React.useState(false);
  const notify = useSelector((state) => state.management.notify);

  window.addEventListener("scroll", () => {
    setheaderFix(window.scrollY > 50);
  });
  /*Sub menu*/
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  const userAvatarRef = useRef(null);
  const notifyRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target) &&
        userAvatarRef.current &&
        !userAvatarRef.current.contains(event.target)
      ) {
        // Đóng menu ở đây
        let subMenu = document.getElementById("sub-menu");
        subMenu.classList.remove("open-menu");
      }
      if (
        notifyRef.current &&
        !notifyRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        let subMenu = document.getElementById("notifies");
        subMenu.classList.remove("open-notify");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  //Notify
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getNotify());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  //Modal
  const [loginModal, setloginModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [adminModel, setAdminModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(true);
  const authData = useSelector((state) => state.auth);
  const adminAuth = useSelector((state) => state.admin.signInError);
  //Modals end
  useEffect(() => {
    if (!loginModal) {
      reset();
    }
    if (!resetModal) {
      reset2();
    }
    if (signupModal) {
      reset3();
    }
  }, [loginModal, resetModal, signupModal]);

  const MenuToggle = () => {
    let subMenu = document.getElementById("sub-menu");
    subMenu.classList.toggle("open-menu");
  };
  const LogOut = async () => {
    let subMenu = document.getElementById("sub-menu");
    subMenu.classList.toggle("open-menu");
    await dispatch(logoutAction());
  };
  const NotifyToggle = () => {
    let subMenu = document.getElementById("notifies");
    subMenu.classList.toggle("open-notify");
  };
  function truncateString(str, num) {
    const wordCount = str.split(" ").length;
    if (wordCount <= num) {
      return str;
    }

    const truncatedString = str.split(" ").slice(0, num).join(" ");
    return `${truncatedString}...`;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = location;
    setActive(pathname);
  }, [location]);

  return (
    <>
      <header className="site-header mo-left header style-1">
        <div className="top-bar">
          <div className="container">
            <div className="dz-topbar-inner d-flex justify-content-between align-items-center">
              <div className="dz-topbar-left">
                <ul>
                  <li>Chào mừng đến Website gây quỹ và từ thiện</li>
                  {authData.userData === null ? (
                    <li>
                      <button
                        className="badge badge-primary btn-login"
                        data-bs-toggle="modal"
                        data-bs-target="#modalLogin"
                        onClick={() => setloginModal(true)}
                      >
                        <FontAwesomeIcon icon={faArrowRightToBracket} /> Đăng ký
                        / Đăng nhập
                      </button>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
              <div className="dz-topbar-right">
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faLocationDot} />
                    035-911-2518
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faEnvelope} />
                    support@gmail.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`sticky-header main-bar-wraper navbar-expand-lg ${
            headerFix ? "fixed-top" : ""
          }`}
        >
          <div className="main-bar clearfix ">
            <div className="container clearfix">
              <Navbar expand="xl">
                <Container fluid>
                  <Navbar.Brand>
                    <Link to="/">
                      <img
                        src={logo}
                        style={{ maxWidth: "180px", height: "56px" }}
                      />
                    </Link>
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-xl`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title
                        id={`offcanvasNavbarLabel-expand-xl`}
                      ></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="custom_nav justify-content-start flex-grow-1 pe-3">
                        <Nav.Item>
                          <Link to={"/project"}>
                            <span
                              style={
                                active === "/project"
                                  ? { color: "#234567" }
                                  : {}
                              }
                            >
                              Chiến dịch
                            </span>
                          </Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Link to={"/member"}>
                            <span
                              style={
                                active === "/member" ? { color: "#234567" } : {}
                              }
                            >
                              Thành viên
                            </span>
                          </Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Link to={"/map"}>
                            <span
                              style={
                                active === "/map" ? { color: "#234567" } : {}
                              }
                            >
                              Bản đồ
                            </span>
                          </Link>
                        </Nav.Item>
                      </Nav>
                      <div className="search_contain">
                        <div className="form-group has-search">
                          <FontAwesomeIcon
                            icon={faSearch}
                            className="form-control-feedback"
                          ></FontAwesomeIcon>
                          <input
                            type="search"
                            aria-label="Search"
                            className="form-control me-2"
                            placeholder="Tìm kiếm chiến dịch"
                            onKeyUp={(event) => {
                              if (event.key === "Enter") {
                                const query = event.target.value.replace(
                                  / /g,
                                  "%20"
                                );
                                dispatch(setSearchProject(query));
                                navigate("/project");
                              }
                            }}
                          />
                        </div>
                      </div>
                      {authData.userData === null ? (
                        ""
                      ) : (
                        <div className="notify_contain">
                          <div
                            ref={bellRef}
                            className="bell_inner"
                            onClick={NotifyToggle}
                          >
                            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                            {notify?.length === 0 ? (
                              ""
                            ) : (
                              <span className="bell_inner_banner">
                                {notify?.length}
                              </span>
                            )}
                          </div>
                          <ul
                            ref={notifyRef}
                            className="notifies"
                            id="notifies"
                          >
                            {notify?.map((item) => {
                              return (
                                <li key={item._id} className="item_notify">
                                  <div
                                    className="round"
                                    style={
                                      item.state === "success"
                                        ? {
                                            border: "2px solid green",
                                            backgroundColor: "#11c011",
                                            color: "#fff",
                                          }
                                        : {
                                            border: "2px solid red",
                                            backgroundColor: "#f75c5c",
                                            color: "#fff",
                                          }
                                    }
                                  >
                                    {
                                      item.state === "success" ? (
                                        <FontAwesomeIcon
                                          icon={faCheck}
                                        ></FontAwesomeIcon>
                                      ) : (
                                        <FontAwesomeIcon
                                          icon={faX}
                                        ></FontAwesomeIcon>
                                      ) // faX
                                    }
                                  </div>
                                  <div className="text_inner">
                                    <span>
                                      Thông báo{" "}
                                      {item.state === "success"
                                        ? "Thành công"
                                        : "Thất bại"}
                                    </span>
                                    <p>{truncateString(item?.message, 5)}</p>
                                  </div>
                                </li>
                              );
                            })}
                            <li className="show_more">
                              <Link
                                to="/management/notify"
                                onClick={NotifyToggle}
                                href="#"
                              >
                                Xem tất cả
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                      {authData.userData === null ? (
                        ""
                      ) : (
                        <div className="user_contain">
                          <img
                            ref={userAvatarRef}
                            className="avatar"
                            src={
                              authData.userData !== null
                                ? authData.userData.avatar
                                : ""
                            }
                            onClick={MenuToggle}
                          ></img>
                          <div ref={menuRef} className="sub-menu-wrap">
                            <ul
                              ref={subMenuRef}
                              className="sub-menu"
                              id="sub-menu"
                            >
                              <Link to="/profile">
                                <li onClick={MenuToggle} className="link-item">
                                  <span>Sửa thông tin</span>
                                  <FontAwesomeIcon
                                    icon={faAngleRight}
                                  ></FontAwesomeIcon>
                                </li>
                              </Link>
                              <Link to="/management">
                                <li onClick={MenuToggle} className="link-item">
                                  <span>Quản lý chung</span>
                                  <FontAwesomeIcon
                                    icon={faAngleRight}
                                  ></FontAwesomeIcon>
                                </li>
                              </Link>
                              <li
                                onClick={() => {
                                  LogOut();
                                  dispatch(setUserClear());
                                  navigate("/");
                                }}
                                className="link-item"
                              >
                                <span>Đăng xuất</span>
                                <FontAwesomeIcon
                                  icon={faAngleRight}
                                ></FontAwesomeIcon>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            </div>
          </div>
        </div>
      </header>
      <Modal
        className="fade modal-wrapper auth-modal"
        id="modalLogin"
        show={loginModal}
        onHide={setloginModal}
        centered
      >
        <h2 className="title">Đăng nhập tài khoản</h2>
        <div
          className={
            "d-flex justify-content-center" +
            (loading === true ? "" : " d-none")
          }
        >
          <Loader />
        </div>
        <form
          className={loading === true ? "d-none" : ""}
          onSubmit={handleSubmit(async (data) => {
            setLoading(true);
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);
            await dispatch(signInAction(formData, navigate));
            setLoading(false);
            if (localStorage.getItem("profile")) {
              setloginModal(false);
              dispatch(getNotify());
            }
          })}
        >
          <div className="form-group">
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder=" Nhập địa chỉ email"
              {...register("email")}
            />
            {errors.email && (
              <small className="text-danger m-1 p-0">
                {errors.email.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              {...register("password")}
            />
            {(errors.password && (
              <small className="text-danger m-1 p-0">
                {errors.password.message}
              </small>
            )) ||
              (authData.signInError !== null && (
                <small className="text-danger m-1 p-0">
                  {authData.signInError}
                </small>
              ))}
            <div className="reset-password d-flex justify-content-end">
              <a
                className="btn-link collapsed"
                style={{ paddingTop: "5px" }}
                onClick={() => (setResetModal(true), setloginModal(false))}
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-outline-primary btn-block">
              Đăng nhập
            </button>
          </div>

          <div className="sign-text">
            <span>
              Bạn chưa có tài khoản?
              <a
                className="btn-link collapsed"
                onClick={() => (setSignupModal(true), setloginModal(false))}
              >
                {" "}
                Đăng ký ngay
              </a>{" "}
              - bạn là
              <a
                className="btn-link collapsed"
                style={{ paddingTop: "5px" }}
                onClick={() => (setAdminModel(true), setloginModal(false))}
              >
                {" "}
                admin
              </a>
              ?
            </span>
          </div>
        </form>
      </Modal>
      <Modal
        className="fade modal-wrapper auth-modal"
        id="modalLogin"
        show={adminModel}
        onHide={setAdminModel}
        centered
      >
        <h2 className="title">Đăng nhập tài khoản Admin</h2>
        <div
          className={
            "d-flex justify-content-center" +
            (loading === true ? "" : " d-none")
          }
        >
          <Loader />
        </div>
        <form
          className={loading === true ? "d-none" : ""}
          onSubmit={handleSubmitForm1(async (data) => {
            setLoading(true);
            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("password", data.password);
            await dispatch(signInActionAdmin(formData));
            if (localStorage.getItem("admin")) {
              setloginModal(false);
              navigate("/admin/dashboar");
            }
          })}
        >
          <div className="form-group">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder=" username"
              {...registerForm1("username")}
            />
            {errors1.username && (
              <small className="text-danger m-1 p-0">
                {errors1.username.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              {...registerForm1("password")}
            />
            {(errors1.password && (
              <small className="text-danger m-1 p-0">
                {errors1.password.message}
              </small>
            )) ||
              (adminAuth !== null && (
                <small className="text-danger m-1 p-0">{adminAuth}</small>
              ))}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-outline-primary btn-block">
              Đăng nhập
            </button>
          </div>

          <div className="sign-text">
            <span>
              <a
                className="btn-link collapsed"
                onClick={() => (setloginModal(true), setAdminModel(false))}
              >
                {" "}
                Người dùng
              </a>
            </span>
          </div>
        </form>
      </Modal>
      <Modal
        className="modal fade modal-wrapper auth-modal"
        show={resetModal}
        onHide={setResetModal}
        centered
      >
        <div className="reset-password" id="reset-password">
          <h2 className="title">Quên mật khẩu?</h2>
          <form
            onSubmit={handleSubmitForm2((data) => {
              console.log(data);
            })}
          >
            <div className="form-group password-icon-bx">
              <i className="fa fa-lock"></i>
              <p>
                Hãy nhập địa chỉ email của bạn. Chúng tôi sẽ gửi cho bạn mã xác
                thực để truy cập lại vào tài khoản
              </p>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Nhập địa chỉ email"
                {...registerForm2("email")}
              />
              {errors2.email && (
                <small className="text-danger m-1 p-0">
                  {errors2.email.message}
                </small>
              )}
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-outline-primary btn-block"
              >
                Tiếp tục
              </button>
            </div>
            <a
              className="sign-text d-block"
              data-bs-toggle="collapse"
              onClick={() => (setResetModal(false), setloginModal(true))}
            >
              Quay lại
            </a>
          </form>
        </div>
      </Modal>
      <Modal
        className="modal fade modal-wrapper auth-modal"
        show={signupModal}
        onHide={setSignupModal}
        centered
      >
        <h2 className="title">Đăng ký tài khoản</h2>
        <div
          className={
            "d-flex justify-content-center" +
            (loading === true ? "" : " d-none")
          }
        >
          <Loader />
        </div>
        <form
          className={loading === true ? "d-none" : ""}
          onSubmit={handleSubmitForm3(async (data) => {
            setLoading(true);
            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("isConsentGiven", isConsentGiven.toString());

            await dispatch(
              signUpAction(formData, navigate, isConsentGiven, data.email)
            );
            setLoading(false);
            if (authData.successMessage !== null) {
              setSignupModal(false);
            }
          })}
        >
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Nhập địa chỉ email"
              {...registerForm3("email")}
            />
            {(errors3.email && (
              <small className="text-danger m-1 p-0">
                {errors3.email.message}
              </small>
            )) ||
              (authData.signUpError !== null && (
                <small className="text-danger m-1 p-0">
                  {authData.signUpError}
                </small>
              ))}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Họ tên hoặc biệt danh của bạn"
              {...registerForm3("username")}
            />
            {errors3.username && (
              <small className="text-danger m-1 p-0">
                {errors3.username.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              {...registerForm3("password")}
            />
            {errors3.password && (
              <small className="text-danger m-1 p-0">
                {errors3.password.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="repassword"
              className="form-control"
              placeholder="Nhập lại mật khẩu"
              {...registerForm3("repassword")}
            />
            {errors3.repassword && (
              <small className="text-danger m-1 p-0">
                {errors3.repassword.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-outline-primary btn-block">
              Đăng ký
            </button>
          </div>
          <div className="sign-text">
            <span>
              Bạn đã có tài khoản?{" "}
              <a
                className="btn-link collapsed"
                onClick={() => (setSignupModal(false), setloginModal(true))}
              >
                Đăng nhập
              </a>
            </span>
          </div>
        </form>
      </Modal>
      <Modal
        className="modal fade modal-wrapper auth-modal"
        show={notifySuccess}
        onHide={setNotifySuccess}
        backdrop="static"
        centered
      >
        <div style={{ textAlign: "center" }}>
          <h2 className="title">Xác nhận địa chỉ Email</h2>
          <h6 className="m-0">
            Xin vui lòng kiểm tra Email của bạn, chúng tôi đã gửi cho bạn một
            liên kết xác thực để kích hoạt tài khoản.
          </h6>
          <a
            className="sign-text d-block"
            data-bs-toggle="collapse"
            onClick={() => setNotifySuccess(false)}
          >
            Đã rõ
          </a>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notifications, // Replace with the path to the notifications in your state
});

export default connect(mapStateToProps)(Header);
