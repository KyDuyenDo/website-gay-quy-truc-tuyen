import React, { useState } from "react";
import ProjectMasonry from "../components/project/ProjectMasonry";
import "../css/projectList.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setDataProjects } from "../redux/actions/articleAction";
import { useDispatch } from "react-redux";
const Project = () => {
  const [search, setSearch] = useState("");
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
    createQuerySearch(search).then((query) => {
      dispatch(setDataProjects(query));
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
                  placeholder="Tìm kiếm chiến dịch"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
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
