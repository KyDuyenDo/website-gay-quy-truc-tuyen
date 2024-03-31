import React, { useState } from "react";
import "../css/management.css";
import {
  faChartLine,
  faBell,
  faClockRotateLeft,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashBoard from "../components/DashBroad/DashBoard";
import Notify from "../components/DashBroad/Notify";
import Project from "../components/DashBroad/Project";
import ManagementProject from "../components/DashBroad/ManagementProject";
const Management = () => {
  const [activeItem, setActiveItem] = useState(0);
  const handleItemClick = (step) => {
    setActiveItem(step);
  };

  return (
    <div className="contain-bg">
      <div className="container-fluid contain-main">
        <div className="row">
          <div className="col-md-12 col-xl-3">
            <div className="card-menu">
              <ul className="contain-item-menu">
                <li
                  className={"item-menu " + (activeItem === 0 ? "active" : "")}
                  onClick={() => handleItemClick(0)}
                >
                  <FontAwesomeIcon
                    size="lg"
                    icon={faChartLine}
                  ></FontAwesomeIcon>{" "}
                  <span>Tổng quan</span>
                </li>
                <li
                  className={"item-menu " + (activeItem === 1 ? "active" : "")}
                  onClick={() => handleItemClick(1)}
                >
                  <FontAwesomeIcon size="lg" icon={faBell}></FontAwesomeIcon>
                  <span>Thông báo</span>
                </li>
                <li
                  className={"item-menu " + (activeItem === 2 ? "active" : "")}
                  onClick={() => handleItemClick(2)}
                >
                  <FontAwesomeIcon
                    size="lg"
                    icon={faClockRotateLeft}
                  ></FontAwesomeIcon>
                  <span>Lịch sử quyên góp</span>
                </li>
                <li
                  className={"item-menu " + (activeItem === 3 ? "active" : "")}
                  onClick={() => handleItemClick(3)}
                >
                  <FontAwesomeIcon
                    size="lg"
                    icon={faListCheck}
                  ></FontAwesomeIcon>{" "}
                  <span>Quản lý chiến dịch</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12 col-xl-9">
            <div className="board-main">
              {activeItem === 0 && <DashBoard />}
              {activeItem === 1 && <Notify />}
              {activeItem === 2 && <Project />}
              {activeItem === 3 && <ManagementProject />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
