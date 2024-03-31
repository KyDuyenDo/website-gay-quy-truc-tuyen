import React from "react";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "../../components/DashBroad/Chart";
import project from "../../assets/images/project/pic1.jpg";

const DashBoard = () => {
  return (
    <div className="contain-dash">
      <div className="row d-flex align-items-center contain-total">
        <div className="col-12 col-md-6 total-item">
          <div className="project">
            <p className="main-title">
              <span className="number-detail">50</span> dự án
            </p>
            <div className="d-flex project-order">
              <p>
                <span className="number-detail">20</span> đang gây quỹ
              </p>
              <p>
                <span className="number-detail">10</span> đang chờ xét duyệt
              </p>
              <p>
                <span className="number-detail">20</span> đã kết thúc
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="news">
            <p className="main-title">
              <span className="number-detail">10</span> Thông báo mới
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="spend">
            <p className="main-title">
              {" "}
              <span className="number-detail">50.000</span> VNĐ Tổng tiền đã chi
            </p>
            <FontAwesomeIcon size="xl" icon={faChartSimple}></FontAwesomeIcon>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="total">
            <p className="main-title">
              {" "}
              <span className="number-detail">14.000.0000</span> VNĐ Tổng tiền
              gây quỹ
            </p>
            <FontAwesomeIcon size="xl" icon={faChartSimple}></FontAwesomeIcon>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="donors">
            <p className="main-title">
              {" "}
              <span className="number-detail">1.000</span> người đã hỗ trợ
            </p>
            <FontAwesomeIcon size="xl" icon={faChartSimple}></FontAwesomeIcon>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="star">
            <p className="main-title">
              <span className="number-detail">10</span> Thông báo mới
            </p>
          </div>
        </div>
      </div>
      <div className="row contain-chart">
        <Chart />
      </div>
      <div className="row contain-current-project">
        <span className="label">Danh sách thu chi của chiến dịch</span>
        <ul className="choose-status">
          <li className="project-status">Đang thực hiện</li>
          <li className="project-status">Đã kết thúc</li>
        </ul>
        <div className="table-responsive">
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-gray">
              <tr>
                <th scope="col">Dự Án</th>
                <th scope="col">Tiền thu</th>
                <th scope="col">Tiền chi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-xs-6">
                  <div class="d-flex align-items-center">
                    <img
                      src={project}
                      alt=""
                      style={{ width: "100px"}}
                      
                    />
                    <div class="ms-3">
                      <p class="text-muted mb-0">Hỗ trợ những hoc sinh có hoàn cảnh khó khăn ở Tiền Giang</p>
                    </div>
                  </div>
                </td>
                <td style={{ color: "#35A2EB" }}>+100.000.000</td>
                <td style={{ color: "#FF6384" }}>-20.000.000</td>
              </tr>
              {/* <tr>
                <th>
                  <img src={project} />
                </th>
                <th className="name">
                  Hỗ trợ những hoc sinh có hoàn cảnh khó khăn ở Tiền Giang
                </th>
                <th style={{ color: "#35A2EB" }}>+100.000.000</th>
                <th style={{ color: "#FF6384" }}>-20.000.000</th>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
