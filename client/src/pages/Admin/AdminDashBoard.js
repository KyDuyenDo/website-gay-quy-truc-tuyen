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
  faUsers,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./admin.css";
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
            <a href="#">
              <span class="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faDashboard} />
              </span>
              <span class="text">Tổng quan</span>
            </a>
          </li>
          <li
            className={activeItem === 2 ? "active" : ""}
            onClick={() => setActiveItem(2)}
          >
            <a href="#">
              <span class="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faMessage} />
              </span>
              <span class="text">Yêu cầu người dùng</span>
            </a>
          </li>
          <li
            className={activeItem === 3 ? "active" : ""}
            onClick={() => setActiveItem(3)}
          >
            <a href="#">
              <span class="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faNewspaper} />
              </span>
              <span class="text">Quản lý bài viết</span>
            </a>
          </li>
          <li
            className={activeItem === 4 ? "active" : ""}
            onClick={() => setActiveItem(4)}
          >
            <a href="#">
              <span class="bx bxs-dashboard">
                <FontAwesomeIcon size="1x" icon={faUserFriends} />
              </span>
              <span class="text">Quản lý người dùng</span>
            </a>
          </li>
          {/* <li>
            <a href="#">
              <i class="bx bxs-group"></i>
              <span class="text">Team</span>
            </a>
          </li> */}
        </ul>
        <ul class="side-menu">
          {/* <li>
            <a href="#">
              <i class="bx bxs-cog"></i>
              <span class="text">Settings</span>
            </a>
          </li> */}
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
          <div class="head-title">
            <div class="left">
              <h1>Tổng Quan</h1>
              {/* <ul class="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>
                </li>
                <li>
                  <a class="active" href="#">
                    Home
                  </a>
                </li>
              </ul> */}
            </div>
          </div>

          <ul class="box-info">
            <li>
              <span class="bx bxs-dollar-circle">
                <FontAwesomeIcon icon={faNewspaper} />
              </span>
              <span class="text">
                <h3>1020</h3>
                <p>Dự án gây quỹ</p>
              </span>
            </li>
            <li>
              <span class="bx bxs-dollar-circle">
                <FontAwesomeIcon icon={faSackDollar} />
              </span>
              <span class="text">
                <h3>2834</h3>
                <p>Số tiền đã thu</p>
              </span>
            </li>
            <li>
              <span class="bx bxs-dollar-circle">
                <FontAwesomeIcon icon={faSackDollar} />
              </span>
              <span class="text">
                <h3>$2543</h3>
                <p>Số tiền đã chi</p>
              </span>
            </li>
            <li>
              <span class="bx bxs-dollar-circle">
                <FontAwesomeIcon icon={faUsers} />
              </span>
              <span class="text">
                <h3>2543</h3>
                <p>Thành viên</p>
              </span>
            </li>
            <li>
              <span class="bx bxs-dollar-circle">
                <FontAwesomeIcon icon={faUsers} />
              </span>
              <span class="text">
                <h3>2543</h3>
                <p>Người dùng</p>
              </span>
            </li>
            <li>
              <span class="bx bxs-dollar-circle">
                <FontAwesomeIcon icon={faMessage} />
              </span>
              <span class="text">
                <h3>2543</h3>
                <p>Yêu cầu đăng ký</p>
              </span>
            </li>
          </ul>

          <div class="table-data">
            <div class="order">
              <div class="head">
                <h3>Recent Orders</h3>
                <i class="bx bx-search"></i>
                <i class="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status process">Process</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span class="status completed">Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div class="todo">
              <div class="head">
                <h3>Todos</h3>
                <i class="bx bx-plus"></i>
                <i class="bx bx-filter"></i>
              </div>
              <ul class="todo-list">
                <li class="completed">
                  <p>Todo List</p>
                  <i class="bx bx-dots-vertical-rounded"></i>
                </li>
                <li class="completed">
                  <p>Todo List</p>
                  <i class="bx bx-dots-vertical-rounded"></i>
                </li>
                <li class="not-completed">
                  <p>Todo List</p>
                  <i class="bx bx-dots-vertical-rounded"></i>
                </li>
                <li class="completed">
                  <p>Todo List</p>
                  <i class="bx bx-dots-vertical-rounded"></i>
                </li>
                <li class="not-completed">
                  <p>Todo List</p>
                  <i class="bx bx-dots-vertical-rounded"></i>
                </li>
              </ul>
            </div> */}
          </div>
        </main>
      </section>
      <script src="script.js"></script>
    </div>
  );
};

export default AdminDashBoard;
