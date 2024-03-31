import React from "react";
import project from "../../assets/images/project/pic1.jpg";
import { faDashboard, faDonate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProjectHistory = () => {
  return (
    <div className="contain_project">
      <div className="header_content">
        <ul>
          <li className="total_price">
            <FontAwesomeIcon size="2x" icon={faDonate}></FontAwesomeIcon>
            <p>Số tiền đã ủng hộ</p>
            <p>50.000 VNĐ</p>
          </li>
          <li className="total_project">
            <FontAwesomeIcon size="2x" icon={faDashboard}></FontAwesomeIcon>
            <p>Số dự án đã ủng hộ</p>
            <p>50</p>
          </li>
        </ul>
      </div>
      <div className="row contain_donated">
        <span className="label">Các chiến dịch đã ủng hộ</span>
        {/* <table>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên chiến dịch</th>
              <th>Tiền hỗ trợ</th>
              <th>Thời gian</th>
              <th>Ngày</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <img src={project} />
              </th>
              <th className="name">
                Hỗ trợ những hoc sinh có hoàn cảnh khó khăn ở Tiền Giang
              </th>
              <th style={{ color: "#35A2EB" }}>+100.000.000</th>
              <th>5:54</th>
              <th>25/02/2024</th>
            </tr>
            <tr>
              <th>
                <img src={project} />
              </th>
              <th className="name">
                Hỗ trợ những hoc sinh có hoàn cảnh khó khăn ở Tiền Giang
              </th>
              <th style={{ color: "#35A2EB" }}>+100.000.000</th>
              <th>5:54</th>
              <th>25/02/2024</th>
            </tr>
          </tbody>
        </table> */}
        <div className="table-responsive">
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-gray">
              <tr>
                <th scope="col">Dự Án</th>
                <th>Tiền hỗ trợ</th>
                <th>Thời gian</th>
                <th>Ngày</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-xs-6">
                  <div class="d-flex align-items-center">
                    <img src={project} alt="" style={{ width: "100px" }} />
                    <div class="ms-3">
                      <p class="text-muted mb-0">
                        Hỗ trợ những hoc sinh có hoàn cảnh khó khăn ở Tiền Giang
                      </p>
                    </div>
                  </div>
                </td>
                <th style={{ color: "#35A2EB" }}>+100.000.000</th>
                <th>5:54</th>
                <th>25/02/2024</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectHistory;
