import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { faCoins, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Rating, RoundedStar, Heart } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import {
  setDataProjects,
  setSearchClear,
} from "../../redux/actions/articleAction";
import { getCategoriesAction } from "../../redux/actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";

const ProjectMasonry = () => {
  const dispatch = useDispatch();
  const [dropbtn, setDropbtn] = useState("Trạng thái");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("new");
  const [selectCategory, setSelectCategory] = useState("Chọn danh mục");
  const projects = useSelector((state) => state.project.projects);
  const category = useSelector((state) => state.category.categories);
  const searchhead = useSelector((state) => state.project.search);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchhead !== null) {
          await dispatch(setDataProjects(`?q=${searchhead}`));
          await dispatch(setSearchClear());
        } else {
          dispatch(setDataProjects(""));
        }
        dispatch(getCategoriesAction());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deadline = (createdAt, expireDate) => {
    const createdDate = new Date(createdAt);
    const deadline = new Date(
      createdDate.setDate(createdDate.getDate() + expireDate + 2)
    ); // Thêm expireDate + 2 ngày
    const today = new Date();
    const daysLeft = Math.floor((deadline - today) / (1000 * 3600 * 24)); // Chuyển đổi mili giây sang ngày

    return daysLeft;
  };

  function truncateString(str, num) {
    const wordCount = str.split(" ").length;
    if (wordCount <= num) {
      return str;
    }

    const truncatedString = str.split(" ").slice(0, num).join(" ");
    return `${truncatedString}...`;
  }

  const createQueryString = (title, sort) => {
    return new Promise((resolve, reject) => {
      try {
        const encodedTitle = title.replace(/ /g, "%20");
        const query = `?category=${encodedTitle}&sort=${sort}`;
        resolve(query);
      } catch (error) {
        reject(error); // Handle potential errors
      }
    });
  };
  return (
    <>
      <div className="row m-b30">
        <div className="col-xl-10 col-lg-9">
          <div className="site-filters style-1 clearfix">
            <ul className="filters" data-bs-toggle="buttons">
              <Dropdown className="select-drop">
                <Dropdown.Toggle as="div" className="i-false select-drop-btn">
                  <span>{selectCategory}</span>
                  <i className="fa-regular fa-angle-down"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setFilter("");
                      dispatch(setDataProjects(""));
                      setSelectCategory("Tất cả danh mục");
                    }}
                  >
                    Tất cả danh mục
                  </Dropdown.Item>
                  {category.map((item) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          createQueryString(item.title, sort)
                            .then((query) => {
                              setFilter(item.title);
                              dispatch(setDataProjects(query));
                              setSelectCategory(item.title);
                            })
                            .catch((error) => {
                              console.error(
                                "Error creating query string:",
                                error
                              );
                            });
                        }}
                      >
                        {item.title}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </div>
        {/* dropDown */}
        <div className="col-xl-2 col-lg-3 text-start text-lg-end m-b20">
          <Dropdown className="select-drop">
            <Dropdown.Toggle as="div" className="i-false select-drop-btn">
              <span>{dropbtn}</span>
              <i className="fa-regular fa-angle-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  createQueryString(filter, "new")
                    .then((query) => {
                      setSort("new");
                      dispatch(setDataProjects(query));
                      setDropbtn("Mới nhất");
                    })
                    .catch((error) => {
                      console.error("Error creating query string:", error);
                    });
                }}
              >
                Mới nhất
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  createQueryString(filter, "old")
                    .then((query) => {
                      setSort("old");
                      dispatch(setDataProjects(query));
                      setDropbtn("Đã cũ");
                    })
                    .catch((error) => {
                      console.error("Error creating query string:", error);
                    });
                }}
              >
                Đã cũ
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* project */}
      <div className="clearfix">
        <ul
          //layout
          id="masonry"
          className="row"
          //transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {projects.map((data) => {
              return (
                <motion.li
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="card-container col-xl-4 col-lg-6 col-md-6 col-sm-12 Fashion m-b30"
                  key={data._id}
                  //transition={{ duration: 0.5 }}
                >
                  <Link to={`/article-detail/${data._id}`}>
                    <div
                      className="dz-card style-2 overlay-skew wow fadeInUp"
                      data-wow-delay="0.2s"
                    >
                      <div className="dz-media">
                        <img src={data.image[0]} alt="" />
                      </div>
                      <div className="dz-info">
                        <ul className="dz-category d-flex flex-row justify-content-between align-items-center">
                          <li>{data.category[0].title}</li>
                          <li>
                            <Rating
                              style={{ maxWidth: 120 }}
                              value={
                                data.averageRating != null
                                  ? parseInt(Math.round(data.averageRating))
                                  : 0
                              }
                              itemStyles={{
                                itemShapes: Heart,
                                activeFillColor: "#F63B3B",
                                inactiveFillColor: "#CDC8C8",
                              }}
                              readOnly
                            />
                          </li>
                        </ul>
                        <h5 className="dz-title">
                          {truncateString(data.articletitle, 12)}
                        </h5>
                        <div className="progress-bx style-1">
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-secondary progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              aria-valuenow="75"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{
                                width: `${Math.round(
                                  (data.amountEarned / data.amountRaised) * 100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <ul className="progress-tag">
                            <li className="raised">
                              <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>{" "}
                              <span>
                                Đã đạt được{" "}
                                {Math.round(
                                  (data.amountEarned / data.amountRaised) * 100
                                )}
                                %
                              </span>
                            </li>
                            <li className="goal">
                              <FontAwesomeIcon
                                icon={faCalendar}
                              ></FontAwesomeIcon>{" "}
                              <span>
                                Còn {deadline(data.createdAt, data.expireDate)}{" "}
                                Ngày
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="author-wrappper d-flex">
                          <div className="author-content">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                              <span
                                className="location"
                                style={{ marginRight: "8px" }}
                              >
                                {data.type === "only" ? "Cá nhân" : "Tổ chức"}
                              </span>
                              <h6 className="author-name">
                                {truncateString(data.groupName, 6)}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
      {/* more */}
      <div className="row">
        <div className="col-12 m-sm-t0 m-t30">
          <nav className="pagination-bx">
            <div className="page-item">
              <Link to={"#"} className="page-link prev">
                <i className="fas fa-chevron-left"></i>
              </Link>
            </div>
            <ul className="pagination">
              <li className="page-item">
                <Link to={"#"} className="page-link">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link to={"#"} className="page-link active">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link to={"#"} className="page-link">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link to={"#"} className="page-link">
                  4
                </Link>
              </li>
            </ul>
            <div className="page-item">
              <Link to={"#"} className="page-link next">
                <i className="fas fa-chevron-right"></i>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProjectMasonry;
