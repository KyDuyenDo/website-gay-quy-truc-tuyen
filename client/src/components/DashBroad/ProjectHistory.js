import React, { useEffect } from "react";
import { faDashboard, faDonate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserDonation } from "../../redux/actions/manageAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProjectHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.management.userdonations);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUserDonation());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  function formatDate(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year.toString().slice(-2)} - ${hours}:${minutes}`;
  }
  const totalmount = (donations) => {
    const totalSpent = donations.reduce(
      (acc, donation) => acc + donation.donationAmount,
      0
    );
    return totalSpent;
  };
  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }
  return (
    <div className="contain_project">
      <div className="header_content">
        <ul>
          <li className="total_price">
            <FontAwesomeIcon size="2x" icon={faDonate}></FontAwesomeIcon>
            <p>Số tiền đã ủng hộ</p>
            <p>{toDecimal(totalmount(history))} VNĐ</p>
          </li>
          <li className="total_project">
            <FontAwesomeIcon size="2x" icon={faDashboard}></FontAwesomeIcon>
            <p>Số lượt đã ủng hộ</p>
            <p>{history.length}</p>
          </li>
        </ul>
      </div>
      <div className="row contain_donated">
        <span className="label">Các chiến dịch đã ủng hộ</span>
        <div className="table-responsive">
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-gray">
              <tr>
                <th scope="col">Dự Án</th>
                <th>Tiền hỗ trợ</th>
                <th>Ngày-giờ</th>
              </tr>
            </thead>
            <tbody>
              {console.log(history)}

              {history.map((data) => {
                return (
                  <tr>
                    <td className="col-xs-6">
                      <div className="d-flex align-items-center">
                        <img
                          src={data.articleId.image[0]}
                          alt=""
                          style={{ width: "100px" }}
                        />
                        <div className="ms-3">
                          <Link to={`/article-detail/${data.articleId._id}`}>
                            <p className="text-muted mb-0">
                              {data.articleId.articletitle}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <th style={{ color: "#35A2EB" }}>+{toDecimal(data.donationAmount)}</th>
                    <th>{formatDate(new Date(data.donationDate))}</th>
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

export default ProjectHistory;
