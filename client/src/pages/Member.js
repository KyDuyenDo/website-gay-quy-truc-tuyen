import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import ProjectMasonry from "../components/project/ProjectMasonry";
import "../css/projectList.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenberMasonry from "../components/project/MenberMasonry";
const Member = () => {
  const [dropbtn2, setDropbtn2] = useState("All Category");
  return (
    <>
      <div className="page-content bg-white">
        <section className="content-inner-2">
          <div className="container">
            <div className="search-contain">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm thành viên"
                />
                <div className="input-group-prepend">
                  <button className="btn">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faSearch}
                    ></FontAwesomeIcon>
                  </button>
                </div>
              </div>
            </div>
            <MenberMasonry />
          </div>
        </section>
        <div className="call-action style-1 content-inner-1">
          <div className="container">{/* <UpdateBlog />         */}</div>
        </div>
      </div>
    </>
  );
};

export default Member;
