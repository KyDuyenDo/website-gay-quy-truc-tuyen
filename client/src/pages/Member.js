import React, { useState } from "react";
import "../css/projectList.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenberMasonry from "../components/project/MenberMasonry";
import { getAllMember } from "../redux/actions/memberAction";
import { useDispatch } from "react-redux";
const Member = () => {
  const [searchFile, setSearchFile] = useState("");
  const dispatch = useDispatch();
  const createQuerySearch = (title, sort) => {
    return new Promise((resolve, reject) => {
      try {
        const encodedTitle = title.replace(/ /g, "%20");
        const query = `?q=${encodedTitle}`;
        resolve(query);
      } catch (error) {
        reject(error); // Handle potential errors
      }
    });
  };
  const handleSearchSubmit = () => {
    createQuerySearch(searchFile).then((query) => {
      dispatch(getAllMember(query));
    });
  };
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
                  value={searchFile}
                  onChange={(event) => setSearchFile(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearchSubmit();
                    }
                  }}
                />
                <div className="input-group-prepend">
                  <button className="btn" onClick={handleSearchSubmit}>
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
