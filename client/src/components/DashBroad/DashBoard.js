import React, { useEffect, useState } from "react";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "../../components/DashBroad/Chart";
import { isProtected } from "../../redux/api/userAPI";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
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
  const [dateSend, setDateSend] = useState(new Date().toISOString());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  useEffect(() => {
    const fetchData = async () => {
      const res = await isProtected();
      if (res !== true) {
        navigate(-1);
      }
      try {
        dispatch(getDataUserProject());
        dispatch(getDataFundraising());
        dispatch(getChartData(dateSend));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    dispatch(getChartData(dateSend));
  }, [dateSend]);
  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const newDate = new Date(date);
    if (!isNaN(newDate.getTime())) {
      setDateSend(newDate.toISOString());
    } else {
      console.log("Invalid Date");
    }
  };
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
                {toDecimal(totalProject.totalSpend)}
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
                {toDecimal(totalProject.totalRaise)}
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
        <div className="d-flex justify-content-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </div>
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
                    <td style={{ color: "#35A2EB" }}>
                      {toDecimal(data.amountRaised)}
                    </td>
                    <td style={{ color: "#35A2EB" }}>
                      +{toDecimal(data.amountEarned)}
                    </td>
                    <td style={{ color: "#FF6384" }}>
                      -{toDecimal(data.totalSpent)}
                    </td>
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
