import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import "../../css/member.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

import Loader from "../Loader";
import { getHighRaiseMember } from "../../redux/api/userAPI";

//Images
import member1 from "./../../assets/images/avatar/avatar5.jpg";
import member2 from "./../../assets/images/avatar/avatar6.jpg";
import member3 from "./../../assets/images/avatar/avatar7.jpg";
import member4 from "./../../assets/images/avatar/avatar8.jpg";
import member5 from "./../../assets/images/avatar/avatar9.jpg";
import pattren5 from "./../../assets/constant/pattren5.png";

// import Swiper core and required modules
import { Autoplay } from "swiper/modules";

//SwiperCore.use([EffectCoverflow,Pagination]);

const dataBlog = [
  {
    image: member1,
    title: "Tấn công Sa",
    subtitle: "@gmail.com",
    time: "12/2023",
    money: "4.119.305.712 VND",
  },
  {
    image: member2,
    title: "Nguyễn Thị Hiếu",
    subtitle: "@gmail.com",
    time: "03/2023",
    money: "4.119.305.712 VND",
  },
  {
    image: member3,
    title: "Linh Ngọc Đàm",
    subtitle: "@gmail.com",
    time: "01/2023",
    money: "4.119.305.712 VND",
  },
  // {image: member4, title:'Hoàng Hoa Trung', subtitle:'@gmail.com', time:'Tham gia từ: 08/2023', money:'4.119.305.712 VND'},
  // {image: member5, title:'Đỗ Thị Nga', subtitle:'10.119.305.712 VND',time:'Tham gia từ: 01/2023'}
];

const MemberSlider = () => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    getHighRaiseMember().then((res) => {
      setMembers(res);
    });
  });
  return (
    <>
      <Swiper
        className="team-slider"
        speed={1500}
        //parallax= {true}
        slidesPerView={3}
        spaceBetween={0}
        //centeredSlides= {true}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        modules={[Autoplay]}
        breakpoints={{
          1200: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
          },
        }}
      >
        {dataBlog.map((d, i) => (
          <SwiperSlide key={i}>
            <div className="member d-flex flex-row">
              <div className="">
                <img
                  src={d.image}
                  style={{
                    width: "110px",
                    borderRadius: "50%",
                    border: "2px solid #B1DAE7",
                  }}
                  alt=""
                />
              </div>
              <div className="member-info">
                <span className="span_underline">{d.title}</span>
                <p>Tham gia từ {d.time}</p>
                <p>Số tiền gây quỹ {d.money}</p>
                <Link to="/member-detail">
                  <button className="cta">
                    <span>Xem chi tiết</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="d-flex justify-content-center btn-more"
        style={{ marginTop: "30px" }}
      >
        <button className="cf-button cf-button--hollow cf-button--small">
          Xem thêm
        </button>
      </div>
    </>
  );
};

export default MemberSlider;
