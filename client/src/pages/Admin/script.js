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
import "./admin.css";
import { Link, Outlet } from "react-router-dom";
const AdminDashBoard = () => {
  const [openSeach, setOpenSearch] = useState();
  const [openCategory, setOpenCategory] = useState(true);
  const [activeItem, setActiveItem] = useState(1);
  return (
    <div className="body--main">
      <section id="sidebar" className={openCategory === true ? "" : "hide"}>
        <a href="#" class="brand">
          <FontAwesomeIcon className="bx bxs-smile" icon={faSmile} />
          <span class="text">ZenGive</span>
        </a>
        <ul class="side-menu top">
          <li
            className={activeItem === 1 ? "active" : ""}
            onClick={() => setActiveItem(1)}
          >
            <Link to="/admin/dashboar">
              <span class="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faDashboard} />
              </span>
              <span class="text">Tổng quan</span>
            </Link>
          </li>
          <li
            className={activeItem === 2 ? "active" : ""}
            onClick={() => setActiveItem(2)}
          >
            <Link to="/admin/request">
              <span class="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faMessage} />
              </span>
              <span class="text">Yêu cầu người dùng</span>
            </Link>
          </li>
          <li
            className={activeItem === 3 ? "active" : ""}
            onClick={() => setActiveItem(3)}
          >
            <Link to="/admin/management_article">
              <span class="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faNewspaper} />
              </span>
              <span class="text">Quản lý bài viết</span>
            </Link>
          </li>
          <li
            className={activeItem === 4 ? "active" : ""}
            onClick={() => setActiveItem(4)}
          >
            <Link to="/admin/management_user">
              <span class="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faUserFriends} />
              </span>
              <span class="text">Quản lý người dùng</span>
            </Link>
          </li>
        </ul>
        <ul class="side-menu">
          <li>
            <a href="#" class="logout">
              <span class="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faSignOut} />
              </span>
              <span class="text">Đăng xuất</span>
            </a>
          </li>
        </ul>
      </section>
      <section id="content-1">
        <nav>
          <span
            onClick={() => setOpenCategory(!openCategory)}
            class="bx bx-menu"
          >
            <FontAwesomeIcon size="1x" icon={faList} />
          </span>
          <a href="#" class="nav-link">
            Danh mục quản lý
          </a>
          <form action="#" className={openSeach === true ? "show" : ""}>
            <div class="form-input">
              <input type="search" placeholder="Tìm kiếm" />
              <button
                type="submit"
                class="search-btn"
                onClick={() => setOpenSearch(true)}
              >
                <span class="bx bx-search">
                  <FontAwesomeIcon size="1x" icon={faSearch} />
                </span>
              </button>
            </div>
          </form>
          <a href="#" class="notification">
            <span class="bx bxs-bell">
              <FontAwesomeIcon size="1x" icon={faBell} />
            </span>
            <span class="num">8</span>
          </a>
          <a href="#" class="profile">
            <img src="img/people.png" />
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
