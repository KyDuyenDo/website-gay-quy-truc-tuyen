import React, { useState, useEffect } from "react";
import {
  faDashboard,
  faMessage,
  faNewspaper,
  faUserFriends,
  faSearch,
  faBell,
  faList,
  faSignOut,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/adminAction";
import { verifyAdmin } from "../../redux/api/adminAPI";
import "./admin.css";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
const AdminDashBoard = () => {
  const [openSeach, setOpenSearch] = useState();
  const [openCategory, setOpenCategory] = useState(true);
  const url = useLocation();
  const [activeItem, setActiveItem] = useState(
    url.pathname === "/admin/request"
      ? 2
      : url.pathname === "/admin/dashboar"
      ? 1
      : url.pathname === "/admin/project"
      ? 3
      : 4
  );
  console.log(activeItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await verifyAdmin();
      if (res.success !== true) {
        navigate("/");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="body--main">
      <section id="sidebar" className={openCategory === true ? "" : "hide"}>
        <a href="#" className="brand">
          <FontAwesomeIcon className="bx bxs-smile" icon={faSmile} />
          <span className="text">ZenGive</span>
        </a>
        <ul className="side-menu top">
          <li
            className={activeItem === 1 ? "active" : ""}
            onClick={() => setActiveItem(1)}
          >
            <Link to="/admin/dashboar">
              <span className="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faDashboard} />
              </span>
              <span className="text">Tổng quan</span>
            </Link>
          </li>
          <li
            className={activeItem === 2 ? "active" : ""}
            onClick={() => setActiveItem(2)}
          >
            <Link to="/admin/request">
              <span className="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faMessage} />
              </span>
              <span className="text">Yêu cầu người dùng</span>
            </Link>
          </li>
          <li
            className={activeItem === 3 ? "active" : ""}
            onClick={() => setActiveItem(3)}
          >
            <Link to="/admin/project">
              <span className="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faNewspaper} />
              </span>
              <span className="text">Quản lý Chiến dịch</span>
            </Link>
          </li>
          <li
            className={activeItem === 4 ? "active" : ""}
            onClick={() => setActiveItem(4)}
          >
            <Link to="/admin/management_user">
              <span className="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faUserFriends} />
              </span>
              <span className="text">Quản lý người dùng</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a
              href="#"
              className="logout"
              onClick={() => {
                dispatch(logoutAction());
                navigate("/");
              }}
            >
              <span className="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faSignOut} />
              </span>
              <span className="text">Đăng xuất</span>
            </a>
          </li>
        </ul>
      </section>
      <section id="content-1">
        <nav>
          <span
            onClick={() => setOpenCategory(!openCategory)}
            className="bx bx-menu"
          >
            <FontAwesomeIcon size="1x" icon={faList} />
          </span>
          <a href="#" className="nav-link">
            Danh mục quản lý
          </a>
          <form action="#">
            <div className="form-input"></div>
          </form>
          <a href="#" className="notification">
            <span className="bx bxs-bell">
              <FontAwesomeIcon size="1x" icon={faBell} />
            </span>
            <span className="num">8</span>
          </a>
          <a href="#" className="profile-img">
            <img src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg" />
          </a>
        </nav>
        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default AdminDashBoard;
