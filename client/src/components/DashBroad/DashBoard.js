import React, { useEffect } from "react";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "../../components/DashBroad/Chart";
import { isProtected } from "../../redux/api/userAPI";
import {
  getDataUserProject,
  getDataFundraising,
  getChartData,
} from "../../redux/actions/manageAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalProject = useSelector((state) => state.management.totalProject);
  const listEarn = useSelector((state) => state.management.listEarn);
  const notify = useSelector((state) => state.management.notify);
  useEffect(() => {
    const fetchData = async () => {
      const res = await isProtected();
      if (res !== true) {
        navigate(-1);
      }
      try {
        dispatch(getDataUserProject());
        dispatch(getDataFundraising());
        dispatch(getChartData());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="contain-dash">
      <div className="row d-flex align-items-center contain-total">
        <div className="col-12 col-md-6 total-item">
          <div className="project">
            <p className="main-title">
              <span className="number-detail">
                {totalProject.fundraising + totalProject.finished}
              </span>{" "}
              dự án
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="news">
            <p className="main-title">
              <div className="d-flex project-order">
                <p>
                  <span className="number-detail">
                    {totalProject.fundraising}
                  </span>{" "}
                  đang gây quỹ
                </p>
                <p>
                  <span className="number-detail">{totalProject.spending}</span>{" "}
                  đang chờ xét duyệt
                </p>
                <p>
                  <span className="number-detail">{totalProject.finished}</span>{" "}
                  đã kết thúc
                </p>
              </div>
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="spend">
            <p className="main-title">
              {" "}
              <span className="number-detail">
                {totalProject.totalSpend}
              </span>{" "}
              VNĐ Tổng tiền đã chi
            </p>
            <FontAwesomeIcon size="xl" icon={faChartSimple}></FontAwesomeIcon>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="total">
            <p className="main-title">
              {" "}
              <span className="number-detail">
                {totalProject.totalRaise}
              </span>{" "}
              VNĐ Tổng tiền gây quỹ
            </p>
            <FontAwesomeIcon size="xl" icon={faChartSimple}></FontAwesomeIcon>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="donors">
            <p className="main-title">
              {" "}
              <span className="number-detail">
                {totalProject.totalDonor}
              </span>{" "}
              người đã hỗ trợ
            </p>
            <FontAwesomeIcon size="xl" icon={faChartSimple}></FontAwesomeIcon>
          </div>
        </div>
        <div className="col-12 col-md-6 total-item">
          <div className="star">
            <p className="main-title">
              <span className="number-detail">{notify.length}</span> Thông báo
            </p>
          </div>
        </div>
      </div>
      <div className="row contain-chart">
        <Chart />
      </div>
      <div className="row contain-current-project">
        <span className="label">
          Danh sách thu chi của chiến dịch đang gây quỹ
        </span>
        <div className="table-responsive">
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-gray">
              <tr>
                <th scope="col">Dự Án</th>
                <th scope="col">Tiền kêu gọi</th>
                <th scope="col">Tiền thu</th>
                <th scope="col">Tiền chi</th>
              </tr>
            </thead>
            <tbody>
              {listEarn.map((data) => {
                return (
                  <tr key={data._id}>
                    <td className="col-xs-6">
                      <div class="d-flex align-items-center">
                        <img
                          src={data.image[0]}
                          alt=""
                          style={{ width: "100px" }}
                        />
                        <div class="ms-3">
                          <p class="text-muted mb-0">{data.articletitle}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "#35A2EB" }}>{data.amountRaised}</td>
                    <td style={{ color: "#35A2EB" }}>+{data.amountEarned}</td>
                    <td style={{ color: "#FF6384" }}>-{data.totalSpent}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
