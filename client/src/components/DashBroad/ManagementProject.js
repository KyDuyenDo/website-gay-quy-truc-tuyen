import React, { useState } from "react";
import { faPen, faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import project from "../../assets/images/project/pic1.jpg";
import { isFundraiser } from "../../redux/api/userAPI";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
const ManagementProject = () => {
  const [notifyAdd, setNotifyAdd] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="contain_all">
        <div className="search_project">
          <div className="input-group md-form form-sm form-1 pl-0">
            <div className="input-group-prepend">
              <span
                className="input-group-text purple lighten-3"
                id="basic-text1"
              >
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </span>
            </div>
            <input
              className="form-control my-0 py-1"
              type="text"
              placeholder="Nhập tên chiến dịch"
              aria-label="Search"
            />
          </div>
        </div>
        <div className="filter_project">
          <div className="contain-current-project">
            <ul className="choose-status">
              <li className="project-status">Tất cả</li>
              <li className="project-status">Đang thực hiện</li>
              <li className="project-status">Đã kết thúc</li>
              <li className="project-status">Chờ xét duyệt</li>
            </ul>
            <a
              to="/create-project"
              onClick={async () => {
                const res = await isFundraiser();
                if (res !== true) {
                  setNotifyAdd(true);
                } else {
                  navigate("/create-project");
                }
              }}
              className="btn-mana-more"
            >
              <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
            </a>
          </div>
        </div>
        <div className="list_project">
          <div class="card">
            <div class="card-top">
              <img src={project} alt="Blog Name" />
            </div>
            <div class="card-info">
              <h2>Giúp đỡ các học sinh nghèo có hoàn cảnh khó khăn</h2>
              <p class="title">
                Ngày tạo - <span className="inner">22/12/2023</span>
              </p>
              <p class="title">
                Số tiền kêu gọi - <span className="inner">10.000.000 VNĐ</span>
              </p>
              <p class="title">
                Tiến trình - <span className="inner">52%</span>
              </p>
              <p class="title">
                Ngày còn lại - <span className="inner">52</span>
              </p>
              <p class="title">
                Hoạt động - <span className="inner">12</span>
              </p>
              <p class="title">
                Người ủng hộ - <span className="inner">12</span>
              </p>
            </div>
            <div class="card-bottom flex-row">
              <a href="#" class="read-more">
                Đến bài viết
              </a>
              <a href="#" class="button btn-yellow">
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
              </a>
            </div>
          </div>
          <div class="card">
            <div class="card-top">
              <img src={project} alt="Blog Name" />
            </div>
            <div class="card-info">
              <h2>Giúp đỡ các học sinh nghèo có hoàn cảnh khó khăn</h2>
              <p class="title">
                Ngày tạo - <span className="inner">22/12/2023</span>
              </p>
              <p class="title">
                Số tiền kêu gọi - <span className="inner">10.000.000 VNĐ</span>
              </p>
              <p class="title">
                Tiến trình - <span className="inner">52%</span>
              </p>
              <p class="title">
                Ngày còn lại - <span className="inner">52</span>
              </p>
              <p class="title">
                Hoạt động - <span className="inner">12</span>
              </p>
              <p class="title">
                Người ủng hộ - <span className="inner">12</span>
              </p>
            </div>
            <div class="card-bottom flex-row">
              <a href="#" class="read-more">
                Đến bài viết
              </a>
              <Link
                to="/management/management_project/1"
                class="button btn-yellow"
              >
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal fade modal-wrapper auth-modal"
        show={notifyAdd}
        onHide={setNotifyAdd}
        centered
      >
        <div style={{ textAlign: "center" }}>
          <h2 className="title" style={{ backgroundColor: "#F79E00" }}>
            Cảnh báo
          </h2>
          <h6 className="m-0">
           Bạn cần đăng ký để tạo các bài đăng gây quỹ.
          </h6>
          <a
            className="sign-text d-block"
            data-bs-toggle="collapse"
            onClick={() => {
              setNotifyAdd(false);
              navigate("/become-a-fundraiser");
            }}
          >
            Đăng ký ngay
          </a>
        </div>
      </Modal>
    </>
  );
};

export default ManagementProject;
