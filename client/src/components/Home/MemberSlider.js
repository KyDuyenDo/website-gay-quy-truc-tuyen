import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import "../../css/member.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

import { useDispatch, useSelector } from "react-redux";
import { getHighRaiseMember } from "../../redux/actions/memberAction";
// import Swiper core and required modules
import { Autoplay } from "swiper/modules";

//SwiperCore.use([EffectCoverflow,Pagination]);

const MemberSlider = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.member.members);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getHighRaiseMember());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  function truncateString(str, num) {
    const wordCount = str.split(" ").length;
    if (wordCount <= num) {
      return str;
    }

    const truncatedString = str.split(" ").slice(0, num).join(" ");
    return `${truncatedString}...`;
  }
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
        {members.map((d) => (
          <SwiperSlide key={d._id}>
            <div className="member d-flex flex-row">
              <div className="">
                <img
                  src={d.user[0].avatar}
                  style={{
                    width: "110px",
                    borderRadius: "50%",
                    border: "2px solid #B1DAE7",
                  }}
                  alt=""
                />
              </div>
              <div className="member-info">
                <span className="span_underline">
                  {truncateString(d.groupName, 3)}
                </span>
                <p>Tham gia từ {formatDate(d.approvaldate)}</p>
                <p>Số tiền gây quỹ {d.totalAmountRaised}</p>
                <Link to={`/member-detail/${d.userId}`}>
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
