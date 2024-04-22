import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { faCoins, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating, Heart } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { getArticleHighRating } from "../../redux/api/articleAPI";

import "../../css/project.css";
// Import Swiper styles
import "swiper/css";

//SwiperCore.use([EffectCoverflow,Pagination]);

const RecentProjectsSlider = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getArticleHighRating().then((res) => {
      if (res.length !== 0) {
        setProjects(res);
      }
    });
    // console.log(returnFund("660ade60a2b0a6bc4696271f"))
  }, []);
  const deadline = (createdAt, expireDate) => {
    const createdDate = new Date(createdAt);
    const deadline = new Date(
      createdDate.setDate(createdDate.getDate() + expireDate)
    ); // Thêm expireDate + 2 ngày
    const today = new Date();
    const daysLeft = Math.floor((deadline - today) / (1000 * 3600 * 24)); // Chuyển đổi mili giây sang ngày

    return daysLeft;
  };

  function truncateString(str,num) {
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
        className="recent-blog p-b5"
        speed={1500}
        //parallax= {true}
        slidesPerView={3}
        spaceBetween={30}
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
        {projects.map((data) => (
          <SwiperSlide key={data._id}>
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
                        <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>{" "}
                        <span>
                          Còn {deadline(data.releaseDate, data.expireDate)} Ngày
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
                        <h6 className="author-name">{truncateString(data.groupName, 6)}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "30px" }}
      >
        <button className="cf-button cf-button--hollow cf-button--small">
          Xem thêm
        </button>
      </div>
    </>
  );
};

export default RecentProjectsSlider;
