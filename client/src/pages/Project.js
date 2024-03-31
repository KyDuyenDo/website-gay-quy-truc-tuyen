import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import ProjectMasonry from "../components/project/ProjectMasonry";
import "../css/projectList.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import PageBanner from '../layouts/PageBanner';

// import UpdateBlog from '../components/Home/UpdateBlog';

// import bg from '../assets/images/banner/bnr5.jpg';

const Project = () => {
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
                  placeholder="Tìm kiếm chiến dịch"
                />
                <div className="input-group-prepend">
                  <button className="btn">
                    <FontAwesomeIcon size="lg" icon={faSearch}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
            </div>
            <ProjectMasonry />
          </div>
        </section>
        <div className="call-action style-1 content-inner-1">
          <div className="container">{/* <UpdateBlog />         */}</div>
        </div>
      </div>
    </>
  );
};

export default Project;
