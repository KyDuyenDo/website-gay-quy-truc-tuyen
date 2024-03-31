import React from "react";
import Form from "react-bootstrap/Form";
import {
  faUpload,
  faFileAlt,
  faImage,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/projectEdit.css";
const ProjectEdit = () => {
  return (
    <div>
      <div className="wrapper row">
        <div className="left-contain col-12 col-md-6">
          <span className="header-title">
            Tải lên các hình ảnh về chiến dịch
          </span>
          <form action="#">
            <FontAwesomeIcon size="3x" icon={faUpload}></FontAwesomeIcon>
            <p>Browse File to Upload</p>
          </form>
        </div>
        <div className="right-content col-12 col-md-6">
          <section className="progress-area">
            <li className="row-contain">
              <FontAwesomeIcon size="2x" icon={faImage}></FontAwesomeIcon>
              <div className="content">
                <div className="details">
                  <span className="name">image_1903802.png</span>
                  <span className="percent">uploading 50%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress"></div>
                </div>
              </div>
            </li>
          </section>
          <section className="progress-area">
            <li className="row-contain">
              <FontAwesomeIcon size="2x" icon={faImage}></FontAwesomeIcon>
              <div className="content">
                <div className="details">
                  <span className="name">
                    image_1903802.png &#8226;{" "}
                    <span style={{ fontSize: "14px" }}>70 KB</span>
                  </span>
                </div>
              </div>
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </li>
          </section>
          <section className="progress-area">
            <li className="row-contain">
              <FontAwesomeIcon size="2x" icon={faImage}></FontAwesomeIcon>
              <div className="content">
                <div className="details">
                  <span className="name">
                    image_1903802.png &#8226;{" "}
                    <span style={{ fontSize: "14px" }}>70 KB</span>
                  </span>
                </div>
              </div>
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </li>
          </section>
        </div>
      </div>
      <div className="contain-main-content">
        <span className="header-title">Nội dung chính</span>
        <form className="custom-form">
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example1">
                  Tiêu đề chiến dịch
                </label>
                <input
                  type="text"
                  id="form6Example1"
                  className="form-control"
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
              />
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Nội dung chiến dịch
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
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
                />
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example2">
                  Chủ sở hữu tài khoản
                </label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
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
                />
              </div>
            </div>
          </div>
        </form>
        <span className="header-title">Các hoạt động</span>
        <div className="list-activity">
          {/* các hoạt động */}
          <div className="item-activity">
            <div className="contain-activity row">
              <div className="left-contain col-12 col-md-4 ">
                <div className="s1q0b356 h3797oo">
                  <div>Ngày đăng: 3/7/2024</div>
                  <div>Số tiền chi: 50.000 VNĐ</div>
                  <div>Tài liệu đã đăng</div>
                  <div className="row-contain">
                    <FontAwesomeIcon
                      size="1x"
                      icon={faFileAlt}
                    ></FontAwesomeIcon>
                    <div className="content">
                      <div className="details">
                        <span className="name">
                          time_1903802.dox &#8226;{" "}
                          <span style={{ fontSize: "14px" }}>70 KB</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-contain col-12 col-md-8">
                <div className="main-text">
                  <span className="TermText">Nội dung</span>
                  <p>
                    Line 173:6: React Hook useEffect has a missing dependency:
                    'fetchPopular'. Either include it or remove the dependency
                    array Line 173:6: React Hook useEffect has a missing
                    dependency: 'fetchPopular'. Either include it or remove the
                    dependency array
                  </p>
                </div>
                <div className="image-contain">
                  <div className="ZoomableImage">
                    <img
                      alt="Hình ảnh: merchandise (n)"
                      className="ZoomableImage-rawImage SetPageTerm-image"
                      height="100"
                      src="https://quizlet.com/cdn-cgi/image/f=auto,fit=cover,h=100,onerror=redirect,w=120/https://o.quizlet.com/i/OIvl8oaCjYkaZPCYL34VPQ.jpg"
                      width="120"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* button thêm mới hoặc xem thêm */}
          <div className="contain-button">
            <button type="button" class="btn btn-outline-success">
              Xem thêm
            </button>
            <button type="button" class="btn btn-outline-primary">
              Thêm mới
            </button>
          </div>
          {/* form thêm hoạt động */}
          <form className="main-contain-up-activity">
            <div className="row">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" for="form6Example1">
                    Số tiền đã chi
                  </label>
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control"
                  />
                </div>
                <div className="contain-upload row">
                  <div className="col-3">
                    <div className="upload-item">
                      <FontAwesomeIcon
                        size="1x"
                        icon={faImage}
                      ></FontAwesomeIcon>
                      <p>HÌNH ẢNH</p>
                      <button className="d-none"></button>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="upload-item">
                      <FontAwesomeIcon
                        size="1x"
                        icon={faFileAlt}
                      ></FontAwesomeIcon>
                      <p>TÀI LIỆU</p>
                      <button className="d-none"></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Nội dung chiến dịch
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="contain-button">
              <button type="button" class="btn btn-secondary ml-2">
                Thoát
              </button>
              <button type="button" class="btn btn-primary">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;
