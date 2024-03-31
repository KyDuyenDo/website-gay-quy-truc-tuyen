import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { faCoins, faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import member1 from "./../../assets/images/avatar/avatar5.jpg";
import member2 from "./../../assets/images/avatar/avatar6.jpg";
import member3 from "./../../assets/images/avatar/avatar7.jpg";
const MenberMasonry = () => {
  const cardData = [
    {
      cardid: "1",
      image: member1,
      title: "Tấn công Sa",
      subtitle: "@gmail.com",
      time: "12/2023",
      money: "4.119.305.712 VND",
    },
    {
      cardid: "2",
      image: member2,
      title: "Nguyễn Thị Hiếu",
      subtitle: "@gmail.com",
      time: "03/2023",
      money: "4.119.305.712 VND",
    },
    {
      cardid: "3",
      image: member3,
      title: "Linh Ngọc Đàm",
      subtitle: "@gmail.com",
      time: "01/2023",
      money: "4.119.305.712 VND",
    },
    {
      cardid: "4",
      image: member3,
      title: "Linh Ngọc Đàm",
      subtitle: "@gmail.com",
      time: "01/2023",
      money: "4.119.305.712 VND",
    },
    {
      cardid: "5",
      image: member3,
      title: "Linh Ngọc Đàm",
      subtitle: "@gmail.com",
      time: "01/2023",
      money: "4.119.305.712 VND",
    },
    // {image: member4, title:'Hoàng Hoa Trung', subtitle:'@gmail.com', time:'Tham gia từ: 08/2023', money:'4.119.305.712 VND'},
    // {image: member5, title:'Đỗ Thị Nga', subtitle:'10.119.305.712 VND',time:'Tham gia từ: 01/2023'}
  ];
  const [dropbtn, setDropbtn] = useState("Newest");
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
                  Cá nhân
                </Link>
              </li>
              <li
                data-filter=".Medical"
                className={`btn ${activeGenre === 2 ? "active" : ""}`}
              >
                <Link to={"#"} onClick={() => setActiveGenre(2)}>
                  Tổ chức
                </Link>
              </li>
            </ul>
          </div>
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
                  <div className="member d-flex flex-row">
                    <div className="">
                      <img
                        src={item.image}
                        style={{
                          width: "110px",
                          borderRadius: "50%",
                          border: "2px solid #B1DAE7",
                        }}
                        alt=""
                      />
                    </div>
                    <div className="member-info">
                      <span className="span_underline">{item.title}</span>
                      <p>Tham gia từ {item.time}</p>
                      <p>Số tiền gây quỹ {item.money}</p>
                      <Link to="/member-detail">
                        <button class="cta">
                          <span>Xem chi tiết</span>
                          <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                          </svg>
                        </button>
                      </Link>
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

export default MenberMasonry;
