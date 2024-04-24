import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { setDataProjects } from "../../redux/actions/adminAction";
import { useDispatch } from "react-redux";
import UserAd from "./UserAd";
import FundAd from "./FundAd";
const AdUsers = () => {
  const [selection, SetSelection] = useState(1);
  const [dropbtn, setDropbtn] = useState("Trạng thái");
  const dispatch = useDispatch();
  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>Quản lý người dùng</h1>
          <div className="filter_project">
            <div className="contain-current-project pb-0 mb-0">
              <ul className="choose-status mb-0">
                <li
                  className={
                    "project-status " + (selection === 1 ? "active-select" : "")
                  }
                  onClick={() => {
                    SetSelection(1);
                  }}
                >
                  Người dùng
                </li>
                <li
                  className={
                    "project-status banner " +
                    (selection === 2 ? "active-select" : "")
                  }
                  onClick={() => {
                    SetSelection(2);
                  }}
                >
                  Nhà gây quỹ
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {selection === 1 ? <UserAd /> : <FundAd />}
    </>
  );
};

export default AdUsers;
