import React, { useEffect } from "react";
import {
  faSackDollar,
  faMessage,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { totalDataAction } from "../../redux/actions/adminAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AdDashBoard = () => {
  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }
  const dispatch = useDispatch();
  const data = useSelector((state) => state.admin.totalData);
  useEffect(() => {
    async function fetchData() {
      dispatch(totalDataAction());
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>Tổng Quan</h1>
        </div>
      </div>
      <ul className="box-info">
        <li>
          <span className="bx bxs-dollar-circle">
            <FontAwesomeIcon icon={faNewspaper} />
          </span>
          <span className="text">
            <h3>{data.totalArticle}</h3>
            <p>Dự án gây quỹ</p>
          </span>
        </li>
        <li>
          <span className="bx bxs-dollar-circle">
            <FontAwesomeIcon icon={faSackDollar} />
          </span>
          <span className="text">
            <h3>{toDecimal(data.totalPrice)}</h3>
            <p>Số tiền đã thu</p>
          </span>
        </li>
        <li>
          <span className="bx bxs-dollar-circle">
            <FontAwesomeIcon icon={faSackDollar} />
          </span>
          <span className="text">
            <h3>{data.totalSpent}</h3>
            <p>Số tiền đã chi</p>
          </span>
        </li>
        <li>
          <span className="bx bxs-dollar-circle">
            <FontAwesomeIcon icon={faUsers} />
          </span>
          <span className="text">
            <h3>{data.totalMember}</h3>
            <p>Thành viên</p>
          </span>
        </li>
        <li>
          <span className="bx bxs-dollar-circle">
            <FontAwesomeIcon icon={faUsers} />
          </span>
          <span className="text">
            <h3>{data.totalUser}</h3>
            <p>Người dùng</p>
          </span>
        </li>
        <li>
          <span className="bx bxs-dollar-circle">
            <FontAwesomeIcon icon={faMessage} />
          </span>
          <span className="text">
            <h3>{data.totalRequestMember}</h3>
            <p>Yêu cầu đăng ký</p>
          </span>
        </li>
        <li>
          <span className="bx bxs-dollar-circle">
            <FontAwesomeIcon icon={faMessage} />
          </span>
          <span className="text">
            <h3>{data.totalRequestArticle}</h3>
            <p>Yêu cầu đăng bài</p>
          </span>
        </li>
      </ul>
    </>
  );
};

export default AdDashBoard;
