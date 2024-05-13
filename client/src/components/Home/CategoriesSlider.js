import React from "react";
import { Link } from "react-router-dom";
import "../../css/category.css";
import {
  faMoneyBillWheat,
  faChild,
  faPersonCane,
  faCommentDollar,
  faWheelchair,
  faSyringe,
  faMountainSun,
  faTree,
  faSchool,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
//import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import Swiper core and required modules
//import { Autoplay, Pagination } from "swiper";

//SwiperCore.use([EffectCoverflow,Pagination]);

const dataBlog = [
  { icon: faMoneyBillWheat, title: "Xóa nghèo" },
  { icon: faChild, title: "Trẻ em" },
  { icon: faPersonCane, title: "Người già" },
  { icon: faCommentDollar, title: "Người nghèo" },
  { icon: faWheelchair, title: "Người khuyết tật" },
  { icon: faSyringe, title: "Bệnh hiểm nghèo" },
  { icon: faMountainSun, title: "Dân tộc tiểu số" },
  { icon: faTree, title: "Môi trường" },
  { icon: faSchool, title: "Giáo dục" },
  { icon: faHouse, title: "Người vô gia cư" },
];

const CategoriesSlider = () => {
  //const navigationPrevRef = React.useRef(null)
  //const navigationNextRef = React.useRef(null)
  const paginationRef = React.useRef(null);
  return (
    <>
      <Swiper
        className="categories-swiper"
        speed={1500}
        //parallax= {true}
        slidesPerView={6}
        spaceBetween={30}
        loop={false}
        autoplay={{
          delay: 3000,
        }}
        //pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            //swiper.params.navigation.prevEl = navigationPrevRef.current
            //swiper.params.navigation.nextEl = navigationNextRef.current
            //swiper.navigation.destroy()
            //swiper.navigation.init()
            //swiper.navigation.update()
          });
        }}
        // pagination= {{
        //     el= {.swiper-pagination}
        //     clickable= {true}
        // }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          1191: {
            slidesPerView: 6,
          },
          992: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          575: {
            slidesPerView: 3,
          },
          320: {
            slidesPerView: 2,
          },
        }}
      >
        {dataBlog.map((d, i) => (
          <SwiperSlide key={i}>
            <div
              className="icon-bx-wraper text-center style-1 m-b30 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="icon-lg m-sm-b20 m-b30">
                <a className="icon-cell">
                  <FontAwesomeIcon
                    className="icon_shake"
                    icon={d.icon}
                  ></FontAwesomeIcon>
                </a>
              </div>
              <div className="icon-content">
                <Link to={"/project-categories"}>
                  <h6 className="dz-tilte m-b5 text-capitalize">
                    <p>{d.title}</p>
                  </h6>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div
          className="swiper-pagination style-1 text-center"
          ref={paginationRef}
        ></div>
      </Swiper>
      <div className="d-flex justify-content-center">
        <button className="cf-button cf-button--hollow cf-button--small">
          Xem thêm
        </button>
      </div>
    </>
  );
};

export default CategoriesSlider;
