import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import OverView from "../components/FundraiserDetail/OverView";
import Activity from "../components/FundraiserDetail/Activity";
import DonorList from "../components/FundraiserDetail/DonorList";
import "../css/fundraiserDetail.css";
import GallerySlider from "../components/FundraiserDetail/GallerySlider";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faLocation,
  faBullseye,
  faCircleDollarToSlot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import Comment from "../components/FundraiserDetail/Comment";
import { setDataDetail } from "../redux/actions/detailAction";
import { useDispatch, useSelector } from "react-redux";
import { setDataDetailDonation } from "../redux/actions/donorsAction";

const ArticleDetail = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const detailArticle = useSelector((state) => state.detail.detail);
  const top4Donators = useSelector(
    (state) => state.detail.topDonorsWithDetails
  );
  // console.log(
  //   ((detailArticle.amountEarned / detailArticle.amountRaised) * 100).toFixed(2)
  // );
  const params = useParams();
  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }
  const deadline = (createdAt, expireDate) => {
    const createdDate = new Date(createdAt);
    const deadline = new Date(
      createdDate.setDate(createdDate.getDate() + expireDate)
    ); // Thêm expireDate + 2 ngày
    const today = new Date();
    const daysLeft = Math.floor((deadline - today) / (1000 * 3600 * 24)); // Chuyển đổi mili giây sang ngày

    return daysLeft;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setDataDetail(params.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("articleId", params.id);
        dispatch(setDataDetailDonation(formData, ""));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="page-content bg-white">
        <section className="content-inner-2">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 m-b30">
                <div className="fundraiser-single">
                  <div className="swiper fundraiser-gallery-wrapper">
                    <GallerySlider image={detailArticle.image} />
                  </div>
                  <h2 className="title">
                    {detailArticle.articletitle}{" "}
                    <span className="state">
                      {deadline(
                        detailArticle.releaseDate,
                        detailArticle.expireDate
                      ) >= 0
                        ? "Đang gây quỹ"
                        : "Đã kết thúc"}
                    </span>
                  </h2>
                  {/* <!--  selection --> */}
                  <div className="inner-section" style={{ minHeight: "450px" }}>
                    <ul
                      className="step-section"
                      activeStep={activeStep}
                      label={false}
                    >
                      <li
                        className={
                          "fc-section " + (activeStep === 0 ? "action" : "")
                        }
                        style={{ marginLeft: "0px" }}
                        onClick={() => handleStepClick(0)}
                      >
                        Câu chuyện
                      </li>
                      <li
                        className={
                          "fc-section " + (activeStep === 1 ? "action" : "")
                        }
                        onClick={() => handleStepClick(1)}
                      >
                        Hoạt động
                      </li>
                      <li
                        className={
                          "fc-section " + (activeStep === 2 ? "action" : "")
                        }
                        onClick={() => handleStepClick(2)}
                      >
                        Danh sách ủng hộ
                      </li>
                      <li
                        className={
                          "fc-section " + (activeStep === 3 ? "action" : "")
                        }
                        onClick={() => handleStepClick(3)}
                      >
                        Bình luận
                      </li>
                    </ul>
                    {/* Render content based on activeStep */}
                    {activeStep === 0 && <OverView body={detailArticle.body} />}
                    {activeStep === 1 && (
                      <Activity
                        activities={detailArticle.activities}
                        avatar={detailArticle.userId.avatar}
                        username={detailArticle.userId.username}
                      />
                    )}
                    {activeStep === 2 && (
                      <DonorList
                        itemsPerPage={10}
                        articleId={detailArticle._id}
                      />
                    )}
                    {activeStep === 3 &&
                      (detailArticle.published === true ? (
                        <Comment articleId={detailArticle._id} />
                      ) : (
                        ""
                      ))}
                  </div>
                </div>
              </div>
              {/* <!--  keep --> */}
              <div className="col-xl-4 col-lg-4">
                <div>
                  {deadline(
                    detailArticle.releaseDate,
                    detailArticle.expireDate
                  ) > 0 ? (
                    <div className="widget style-1 widget_donate">
                      <Link
                        to={`/payment/${params.id}`}
                        className="btn btn-donate btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDonate"
                      >
                        <FontAwesomeIcon
                          style={{ marginRight: "5px" }}
                          icon={faHeart}
                        ></FontAwesomeIcon>{" "}
                        Ủng hộ{" "}
                      </Link>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary facebook w-100 btn-bottom"
                      >
                        <FontAwesomeIcon
                          style={{ marginRight: "5px" }}
                          icon={faFacebook}
                        ></FontAwesomeIcon>{" "}
                        Chia sẻ Facebook
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <!--  Widget Fund --> */}
                  <div className="widget style-1 widget_fund">
                    <div className="content-fund">
                      <div>
                        <img src={detailArticle.userId.avatar} />
                      </div>
                      <div>
                        <span style={{ color: "#8d8d8d" }}>
                          Tiền ủng hộ được chuyển đến
                        </span>
                        <Link
                          to={`/member-detail/${detailArticle?.userId?._id}`}
                        >
                          <h5>{detailArticle.groupName}</h5>
                        </Link>
                      </div>
                    </div>
                    <hr className="horizontalLines" />
                    <div>
                      <FontAwesomeIcon
                        style={{ color: "#1B8271" }}
                        icon={faLocation}
                      />{" "}
                      <span
                        style={{
                          fontSize: "0.95rem",
                          color: "rgb(141, 141, 141)",
                        }}
                      >
                        {detailArticle?.addressId?.detail}
                      </span>
                    </div>
                    {/* <div className="ranking">
                      <span style={{ color: "#8d8d8d" }}>
                        Đánh giá chiến dịch{" "}
                      </span>
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
                        className="yellow-star"
                        icon={faStar}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className="yellow-star"
                        icon={faStar}
                      ></FontAwesomeIcon>
                    </div> */}
                    <h3 className="title" style={{ color: "#1b8271" }}>
                      {toDecimal(detailArticle.amountEarned)} VNĐ
                    </h3>
                    <div className="progress-bx style-1">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-secondary progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{
                            width: `${Math.round(
                              (detailArticle.amountEarned /
                                detailArticle.amountRaised) *
                                100
                            ).toFixed(2)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      style={{ color: "#1B8271" }}
                      icon={faBullseye}
                    />{" "}
                    <span style={{ color: "#8d8d8d" }}>
                      Mục tiêu{" "}
                      <span style={{ fontWeight: "bold", color: "#212529" }}>
                        {toDecimal(detailArticle.amountRaised)} VNĐ
                      </span>
                    </span>
                    <ul className="detail">
                      <li className="d-flex align-items-center">
                        <FontAwesomeIcon
                          style={{ color: "#1B8271", marginRight: "5px" }}
                          icon={faCircleDollarToSlot}
                        />{" "}
                        <h5 className="m-0">
                          {toDecimal(detailArticle.totalDonations)}
                        </h5>
                        <span style={{ color: "#8d8d8d" }} className="ms-2">
                          quyên góp
                        </span>
                      </li>
                      <li className="d-flex align-items-center">
                        <FontAwesomeIcon
                          style={{ color: "#1B8271", marginRight: "5px" }}
                          icon={faCalendarDays}
                        />
                        <h5 className="m-0">
                          {deadline(
                            detailArticle.releaseDate,
                            detailArticle.expireDate
                          )}
                        </h5>
                        <span style={{ color: "#8d8d8d" }} className="ms-2">
                          ngày còn lại
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- Top Donors --> */}
                  <div className="widget style-1 widget_avatar">
                    <div className="widget-title">
                      <h5 className="title">Top nhà quyên góp</h5>
                    </div>
                    <div className="avatar-wrapper">
                      {top4Donators.length === 0
                        ? ""
                        : top4Donators.map((item) => (
                            <div className="avatar-item" key={item._id}>
                              <div className="avatar-media">
                                <img src={item.avatar} alt="" />
                              </div>
                              <div className="avatar-info">
                                <h6 className="title">
                                  <Link to={"#"}>{item.username}</Link>
                                </h6>
                                <span className="donors-item">
                                  {toDecimal(item.totalDonations)} VNĐ
                                </span>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="call-action style-1 content-inner-1">
          {/* <!--  relate project --> */}
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
