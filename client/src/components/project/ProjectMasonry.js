import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { faCoins, faCalendar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//images
import pic1 from "../../assets/images/project/pic1.jpg";
import pic2 from "../../assets/images/project/pic2.jpg";
import pic3 from "../../assets/images/project/pic3.jpg";
import pic4 from "../../assets/images/project/pic4.jpg";
import pic5 from "../../assets/images/project/pic5.jpg";
import pic6 from "../../assets/images/project/pic6.jpg";
import pic7 from "../../assets/images/project/pic7.jpg";
import pic8 from "../../assets/images/project/pic8.jpg";
import pic9 from "../../assets/images/project/pic9.jpg";
import pic10 from "../../assets/images/project/pic10.jpg";
import pic11 from "../../assets/images/project/pic11.jpg";
import pic12 from "../../assets/images/project/pic12.jpg";

import avat1 from "../../assets/images/avatar/avatar1.jpg";
import avat2 from "../../assets/images/avatar/avatar2.jpg";
import avat3 from "../../assets/images/avatar/avatar3.jpg";
import avat4 from "../../assets/images/avatar/avatar4.jpg";
import avat5 from "../../assets/images/avatar/avatar5.jpg";
import avat6 from "../../assets/images/avatar/avatar6.jpg";
import avat7 from "../../assets/images/avatar/avatar7.jpg";
import avat8 from "../../assets/images/avatar/avatar8.jpg";
import avat9 from "../../assets/images/avatar/avatar9.jpg";

const ProjectMasonry = () => {
  const cardData = [
    {
      cardid: "3",
      image: pic1,
      image2: avat1,
      progres: "75%",
      title: "Giáo dục",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "3,542",
      days: "43",
    },
    {
      cardid: "4",
      image: pic2,
      image2: avat2,
      progres: "85%",
      title: "Trẻ em",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "35,542",
      days: "63",
    },
    {
      cardid: "1",
      image: pic3,
      image2: avat3,
      progres: "70%",
      title: "Môi trường",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: " 2,542",
      days: "23",
    },
    {
      cardid: "4",
      image: pic4,
      image2: avat4,
      progres: "40%",
      title: "Sức khỏe",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "6,542",
      days: "35",
    },
    {
      cardid: "3",
      image: pic5,
      image2: avat5,
      progres: "30%",
      title: "Xóa nghèo",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "1,542",
      days: "47",
    },
    {
      cardid: "1",
      image: pic6,
      image2: avat6,
      progres: "50%",
      title: "Trẻ em",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "8,354",
      days: "75",
    },
    {
      cardid: "4",
      image: pic7,
      image2: avat7,
      progres: "75%",
      title: "Giáo dục",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "3,542",
      days: "43",
    },
    {
      cardid: "1",
      image: pic8,
      image2: avat8,
      progres: "85%",
      title: "Trẻ em",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "35,542",
      days: "63",
    },
    {
      cardid: "3",
      image: pic9,
      image2: avat9,
      progres: "70%",
      title: "Môi trường",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: " 2,542",
      days: "23",
    },
    {
      cardid: "1",
      image: pic10,
      image2: avat4,
      progres: "40%",
      title: "Sức khỏe",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "6,542",
      days: "35",
    },
    {
      cardid: "2",
      image: pic11,
      image2: avat3,
      progres: "30%",
      title: "Xóa nghèo",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "1,542",
      days: "47",
    },
    {
      cardid: "1",
      image: pic12,
      image2: avat1,
      progres: "50%",
      title: "Trẻ em",
      subtitle: "Một chiến dịch học tập mới",
      authar: "Nguyễn Thị Hồng",
      raised: "8,354",
      days: "75",
    },
  ];
  const [dropbtn, setDropbtn] = useState("Mới nhất");
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, []);
  function fetchPopular() {
    setPopular(cardData);
    setFiltered(cardData);
  }

  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(cardData);
      return;
    }
    const filtered = popular.filter((card) =>
      card.cardid.includes(activeGenre)
    );
    setFiltered(filtered);
  }, [activeGenre]);
  return (
    <>
      <div className="row m-b30">
        <div className="col-xl-10 col-lg-9">
          <div className="site-filters style-1 clearfix">
            <ul className="filters" data-bs-toggle="buttons">
              <li className={`btn ${activeGenre === 0 ? "active" : ""}`}>
                <Link to={"#"} onClick={() => setActiveGenre(0)}>
                  Tất cả
                </Link>
              </li>
              <li
                data-filter=".Technology"
                className={`btn ${activeGenre === 1 ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre(1)}>
                  Trẻ em
                </Link>
              </li>
              <li
                data-filter=".Medical"
                className={`btn ${activeGenre === 2 ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre(2)}>
                  Sức khỏe
                </Link>
              </li>
              <li
                data-filter=".Business"
                className={`btn ${activeGenre === 3 ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre(3)}>
                  Giáo dục
                </Link>
              </li>
              <li
                data-filter=".Fashion"
                className={`btn ${activeGenre === 4 ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre(4)}>
                  Môi trường
                </Link>
              </li>
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
              <Dropdown.Item onClick={() => setDropbtn("Mới nhất")}>
                Mới nhất
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDropbtn("Đã cũ")}>
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
            {filtered.map((item, index) => {
              return (
                <motion.li
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="card-container col-xl-4 col-lg-6 col-md-6 col-sm-12 Fashion m-b30"
                  key={index}
                  //transition={{ duration: 0.5 }}
                >
                  <div
                    className="dz-card style-2 overlay-skew wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <div className="dz-media">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="dz-info">
                      <ul className="dz-category">
                        <li>{item.title}</li>
                      </ul>
                      <h5 className="dz-title">{item.subtitle}</h5>
                      <div className="progress-bx style-1">
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-secondary progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <ul className="progress-tag">
                          <li className="raised">
                            <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>{" "}
                            <span>Đã đạt được {item.progres}</span>
                          </li>
                          <li className="goal">
                            <FontAwesomeIcon
                              icon={faCalendar}
                            ></FontAwesomeIcon>{" "}
                            <span>Còn {item.days} Ngày</span>
                          </li>
                        </ul>
                      </div>
                      <div className="author-wrappper d-flex">
                        <div className="author-content">
                          <h6 className="author-name">{item.authar}</h6>
                          <div className="author-head d-flex">
                            <ul className="author-meta d-flex">
                              <li className="location">Cá nhân</li>
                            </ul>

                            {/* <ul className="rating-list">
                              <FontAwesomeIcon
                                className="yellow-star"
                                icon={faStar}
                              ></FontAwesomeIcon>
                              <FontAwesomeIcon
                                className="yellow-star"
                                icon={faStar}
                              ></FontAwesomeIcon>
                              <FontAwesomeIcon
                                className="yellow-star"
                                icon={faStar}
                              ></FontAwesomeIcon>
                              <FontAwesomeIcon
                                style={{ color: "#CDC8C8" }}
                                icon={faStar}
                              ></FontAwesomeIcon>
                              <FontAwesomeIcon
                                style={{ color: "#CDC8C8" }}
                                icon={faStar}
                              ></FontAwesomeIcon>
                            </ul> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
