import React, { useEffect, useState } from "react";
import "../css/memberDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getMemberDetail } from "../redux/actions/memberAction";
import { getArticleByQuest } from "../redux/api/articleAPI";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ScrollToTop from "../components/ScrollToTop";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  faFacebook,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const MemberDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [articleRaise, setArticleRaise] = useState([]);
  const [articleDonate, setArticleDonate] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const memberDetail = useSelector((state) => state.member.memberDetail);
  const loading = useSelector((state) => state.member.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getMemberDetail(params.id));
        const res = await getArticleByQuest(params.id);
        setArticleRaise(res.articleRaise);
        setArticleDonate(res.articleDonate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch, params.id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based in JavaScript
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  function truncateString(str, num) {
    const wordCount = str.split(" ").length;
    if (wordCount <= num) {
      return str;
    }
    const truncatedString = str.split(" ").slice(0, num).join(" ");
    return `${truncatedString}...`;
  }

  const deadline = (createdAt, expireDate) => {
    const createdDate = new Date(createdAt);
    const deadline = new Date(
      createdDate.setDate(createdDate.getDate() + expireDate)
    );
    const today = new Date();
    const daysLeft = Math.floor((deadline - today) / (1000 * 3600 * 24));
    return daysLeft;
  };

  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }

  const itemsCommentPage = 6;
  const [currentItemsProject, setCurrentItemsProject] = useState([]);
  const [pageCountProject, setPageCountProject] = useState(0);
  const [itemProjectOffset, setItemProjectOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemProjectOffset + itemsCommentPage;
    setCurrentItemsProject(articleDonate.slice(itemProjectOffset, endOffset));
    setPageCountProject(Math.ceil(articleDonate.length / itemsCommentPage));
  }, [itemProjectOffset, itemsCommentPage, articleDonate]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsCommentPage) % articleDonate.length;
    setItemProjectOffset(newOffset);
  };

  return (
    <>
      <div className="user-page bg-white">
        <div className="user-header-section">
          <div className="container">
            <div className="row">
              <div className="col-3 py-5">
                <div className="user-avatar d-flex justify-content-end flex-shrink-0 flex-basis-0 ">
                  {loading ? (
                    <Skeleton circle={true} height={152} width={152} />
                  ) : (
                    <img
                      src={memberDetail.userId.avatar}
                      alt="Avatar"
                      style={{
                        height: "152px",
                        width: "152px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="col-9 py-5">
                <div className="d-flex flex-row flex-wrap">
                  <div className="user-info-container flex-1-1-0 ml-3 ml-md-4">
                    <div className="d-flex flex-row flex-wrap">
                      <div className="username-row flex-fill d-flex flex-column flex-shrink-1">
                        <h2 className="text-single-line text-dark text-bold font-size-20 font-size-md-24 mt-2 mb-0">
                          {loading ? (
                            <Skeleton width={200} />
                          ) : (
                            memberDetail.groupName
                          )}
                        </h2>
                        <div className="mt-2 text-gray-900">
                          {loading ? (
                            <Skeleton width={150} />
                          ) : (
                            memberDetail.emailContact
                          )}
                        </div>
                        <div className="mt-2 font-size-15 font-size-md-16">
                          Tham gia từ:{" "}
                          {loading ? (
                            <Skeleton width={150} />
                          ) : (
                            formatDate(memberDetail.approvaldate)
                          )}
                        </div>
                      </div>
                      <div className="counter-row d-none d-md-block">
                        <ul className="user-counters d-flex flex-row list-unstyled mb-0">
                          <li className="counter-item d-flex flex-column align-items-center">
                            <div className="text-bold text-dark font-size-20">
                              {loading ? (
                                <Skeleton width={120} />
                              ) : (
                                `${toDecimal(
                                  memberDetail.totalAmountDonate
                                )} VNĐ`
                              )}
                            </div>
                            <div className="text-gray-800 font-size-12 font-size-md-16">
                              Số tiền ủng hộ
                            </div>
                          </li>
                          <li className="counter-item d-flex flex-column align-items-center">
                            <div className="text-bold text-dark font-size-20">
                              {loading ? (
                                <Skeleton width={120} />
                              ) : (
                                `${toDecimal(
                                  memberDetail.totalAmountEarned
                                )} VNĐ`
                              )}
                            </div>
                            <div className="text-gray-800 font-size-12 font-size-md-16">
                              Số tiền đã gây quỹ
                            </div>
                          </li>
                          <li className="counter-item d-flex flex-column align-items-center">
                            <div className="text-bold text-dark font-size-20">
                              {loading ? (
                                <Skeleton width={120} />
                              ) : (
                                toDecimal(memberDetail.totalDonation)
                              )}
                            </div>
                            <div className="text-gray-800 font-size-12 font-size-md-16">
                              Lượt được ủng hộ
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bio-row flex-shrink-0 d-none d-md-block mt-3">
                      <span className="text-gray-800 font-size-15 font-size-md-18">
                        {loading ? (
                          <Skeleton width={300} />
                        ) : (
                          memberDetail?.userId?.intro
                        )}
                      </span>
                    </div>
                    <div className="mt-2 font-size-15 font-size-md-16">
                      Xem thêm thông tin tài khoản tại
                    </div>
                    <div className="mt-2 font-size-15 font-size-md-16 see-more">
                      <a href={memberDetail?.userId?.facebookUrl}>
                        <FontAwesomeIcon
                          size="2x"
                          className="media-item face"
                          icon={faFacebook}
                        />
                      </a>
                      <a href={memberDetail?.userId?.youtubeUrl}>
                        <FontAwesomeIcon
                          size="2x"
                          className="media-item youtube"
                          icon={faYoutube}
                        />
                      </a>
                      <a href={memberDetail?.userId?.tiktokUrl}>
                        <FontAwesomeIcon
                          size="lg"
                          className="media-item tiktok"
                          icon={faTiktok}
                        />
                      </a>
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path d="M27 4H5V27H27V4Z" fill="#ECEFF1"></path>
                          <path
                            d="M28.1875 4H27.25L16 13.0812L4.75 4H3.8125C2.26 4 1 5.288 1 6.875V24.125C1 25.712 2.26 27 3.8125 27H4.75V9.0715L16 17.9169L27.25 9.06958V27H28.1875C29.74 27 31 25.712 31 24.125V6.875C31 5.288 29.74 4 28.1875 4Z"
                            fill="#F44336"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
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
                    Chiến dịch đang gây quỹ
                  </li>
                  <li
                    className={
                      "fc-section " + (activeStep === 1 ? "action" : "")
                    }
                    onClick={() => handleStepClick(1)}
                  >
                    Chiến dịch đã ủng hộ
                  </li>
                </ul>
              </div>
            </div>

            {activeStep === 0 ? (
              <div className="row">
                <div className="list_project" style={{ marginTop: "20px" }}>
                  {loading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <div className="card" key={index}>
                          <div
                            className="card-top"
                            style={{ minHeight: "231px" }}
                          >
                            <Skeleton height={200} />
                          </div>
                          <div className="card-info">
                            <Skeleton width={150} />
                          </div>
                          <div className="card-bottom flex-row">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      ))
                    : articleRaise.map((data) => (
                        <div className="card" key={data._id}>
                          <div
                            className="card-top"
                            style={{ minHeight: "231px" }}
                          >
                            <img src={data.image[0]} alt="Blog Name" />
                          </div>
                          <div className="card-info">
                            <h2>{truncateString(data.articletitle, 15)}</h2>
                          </div>
                          <div className="card-bottom flex-row">
                            <Link
                              to={`/article-detail/${data._id}`}
                              className="read-more"
                            >
                              Đến bài viết
                            </Link>
                          </div>
                        </div>
                      ))}
                </div>
                <div>
                  {articleRaise.length === 0 && !loading && (
                    <div
                      style={{ minHeight: "300px" }}
                      className="d-flex justify-content-center align-items-center text-center"
                    >
                      <p style={{opacity: '0.6'}}>Chưa có chiến dịch nào</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="row">
                  <div
                    className="list_project"
                    style={{ marginTop: "20px"}}
                  >
                    {loading
                      ? Array.from({ length: 6 }).map((_, index) => (
                          <div className="card" key={index}>
                            <div
                              className="card-top"
                              style={{ minHeight: "231px" }}
                            >
                              <Skeleton height={200} />
                            </div>
                            <div className="card-info">
                              <Skeleton width={150} />
                            </div>
                            <div className="card-bottom flex-row">
                              <Skeleton width={100} />
                            </div>
                          </div>
                        ))
                      : currentItemsProject.map((data) => (
                          <div className="card" key={data._id}>
                            <div
                              className="card-top"
                              style={{ minHeight: "231px" }}
                            >
                              <img src={data.image[0]} alt="Blog Name" />
                            </div>
                            <div className="card-info">
                              <h2>{truncateString(data.articletitle, 15)}</h2>
                            </div>
                            <div className="card-bottom flex-row">
                              <Link
                                to={`/article-detail/${data._id}`}
                                className="read-more"
                              >
                                Đến bài viết
                              </Link>
                              <span>
                                {deadline(data.createdAt, data.expireDate) > 0
                                  ? "Đang gây quỹ"
                                  : "Đã kết thúc"}
                              </span>
                            </div>
                          </div>
                        ))}
                  </div>
                  <div>
                  {currentItemsProject.length === 0 && !loading && (
                    <div
                      style={{ minHeight: "300px" }}
                      className="d-flex justify-content-center align-items-center text-center"
                    >
                      <p style={{opacity: '0.6'}}>Chưa có chiến dịch nào</p>
                    </div>
                  )}
                </div>
                </div>
                <div className="mt-4 row">
                  <div className="col-12 m-sm-t0 m-t30">
                    <div className="contain-paginate">
                      <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCountProject}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default MemberDetail;
