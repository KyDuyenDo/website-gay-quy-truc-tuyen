import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";

import OverView from "../components/FundraiserDetail/OverView";
import Activity from "../components/FundraiserDetail/Activity";
import DonorList from "../components/FundraiserDetail/DonorList";
import "../css/fundraiserDetail.css";
import GallerySlider from "../components/FundraiserDetail/GallerySlider";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import Comment from "../components/FundraiserDetail/Comment";
import { getArticle, getDonorOfArticle } from "../redux/api/articleAPI";
import { getUser } from "../redux/api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataDetailDonation,
  clearDonation,
} from "../redux/actions/donorsAction";

const ArticleDetail = () => {
  const [modalDonate, setModalDonate] = useState(false);
  const [referModal, setReferModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [top4Donators, setTop4Donators] = useState([]);
  const [detailArticle, setDetailArticle] = useState({
    _id: "",
    userId: {
      _id: "",
      username: "",
      avatar: "",
    },
    categotyI: {
      _id: "",
      description: "",
      icon: "",
      popular: 0,
      title: "",
    },
    addressId: {
      _id: "",
      city: "",
      street: "",
      county: "",
      town: "",
      detail: "",
      lat: "",
      lon: "",
    },
    address: "",
    addedBy: "",
    articletitle: "",
    image: [],
    body: "",
    state: "pending",
    expireDate: 0,
    accountNumber: "",
    emailPayPal: "",
    methodPayment: "",
    bankcode: "",
    adminApproval: true,
    published: true,
    amountRaised: 0,
    amountEarned: 0,
    comments: [],
    activities: [],
    createdAt: "",
    groupName: "",
    totalDonations: 0,
    top4Donators: [],
    averageRating: 0,
  });
  const dispatch = useDispatch();
  // const [donations, setDonations] = useState([]);
  const [query, setQuery] = useState("");
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
      createdDate.setDate(createdDate.getDate() + expireDate + 2)
    ); // Thêm expireDate + 2 ngày
    const today = new Date();
    const daysLeft = Math.floor((deadline - today) / (1000 * 3600 * 24)); // Chuyển đổi mili giây sang ngày

    return daysLeft;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleResponse = await getArticle(params.id);
        setDetailArticle(articleResponse);
        const topDonorsWithDetails = await Promise.all(
          articleResponse.top4Donators.map(async (donation) => {
            const userResponse = await getUser(donation.donorId);
            return {
              donorId: donation.donorId,
              totalDonations: donation.totalDonations,
              username: donation.username,
              anonymous: donation.anonymous,
              avatar: userResponse.avatar,
            };
          })
        );
        // console.log(topDonorsWithDetails);
        setTop4Donators(topDonorsWithDetails);
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
        dispatch(setDataDetailDonation(formData, query));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [query]);
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
                      {detailArticle.state === "pending" ? "Đang gây quỹ" : ""}
                    </span>
                  </h2>
                  {/* <!--  selection --> */}
                  <div className="inner-section">
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
                    {activeStep === 3 && (
                      <Comment comments={detailArticle.comments} />
                    )}
                  </div>
                </div>
              </div>
              {/* <!--  keep --> */}
              <div className="col-xl-4 col-lg-4">
                <div>
                  <div className="widget style-1 widget_donate">
                    <Link
                      to="/payment"
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
                        <h5>{detailArticle.groupName}</h5>
                      </div>
                    </div>
                    <hr className="horizontalLines" />

                    <div className="ranking">
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
                    </div>
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
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <p style={{ color: "#8d8d8d" }}>
                      Mục tiêu gây quỹ{" "}
                      <span style={{ fontWeight: "bold", color: "#212529" }}>
                        {toDecimal(detailArticle.amountRaised)} VNĐ
                      </span>
                    </p>
                    <ul className="detail">
                      <li className="d-flex">
                        <h5>{toDecimal(detailArticle.totalDonations)}</h5>
                        <span style={{ color: "#8d8d8d" }} className="ms-2">
                          quyên góp
                        </span>
                      </li>
                      <li className="d-flex">
                        <h5>
                          {deadline(
                            detailArticle.createdAt,
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
