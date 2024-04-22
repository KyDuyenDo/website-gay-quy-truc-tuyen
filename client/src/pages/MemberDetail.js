import React, { useEffect } from "react";
import "../css/memberDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getMemberDetail } from "../redux/actions/memberAction";
import { useParams } from "react-router-dom";
import {
  faFacebook,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
const MemberDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const memberDetail = useSelector((state) => state.member.memberDetail);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getMemberDetail(params.id));
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
  return (
    <div className="user-page bg-white">
      <div className="user-header-section">
        <div className="container">
          <div className="row">
            <div className="col-3  py-5">
              <div className="user-avatar d-flex justify-content-end flex-shrink-0 flex-basis-0 ">
                <img
                  src={memberDetail.userId.avatar}
                  alt="Như chưa hề có cuộc chia ly"
                  style={{
                    height: "152px",
                    width: "152px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="col-9 py-5">
              <div className="d-flex flex-row flex-wrap">
                <div className="user-info-container flex-1-1-0 ml-3 ml-md-4">
                  <div className="d-flex flex-row flex-wrap">
                    <div className="username-row flex-fill d-flex flex-column flex-shrink-1">
                      <h2 className="text-single-line text-dark text-bold font-size-20 font-size-md-24 mt-2 mb-0">
                        {memberDetail.groupName}
                      </h2>
                      <div className="mt-2 text-gray-900">
                        {memberDetail.emailContact}
                      </div>
                      <div className="mt-2 font-size-15 font-size-md-16">
                        Tham gia từ: {formatDate(memberDetail.approvaldate)}
                      </div>
                    </div>
                    <div className="counter-row d-none d-md-block">
                      <ul className="user-counters d-flex flex-row list-unstyled mb-0">
                        <li className="counter-item d-flex flex-column align-items-center">
                          <div className="text-bold text-dark font-size-20">
                            {memberDetail.totalAmountDonate} VND
                          </div>
                          <div className="text-gray-800 font-size-12 font-size-md-16">
                            Số tiền ủng hộ
                          </div>
                        </li>
                        <li className="counter-item d-flex flex-column align-items-center">
                          <div className="text-bold text-dark font-size-20">
                            <span>{memberDetail.totalAmountEarned} VNĐ</span>
                          </div>
                          <div className="text-gray-800 font-size-12 font-size-md-16">
                            Số tiền đã gây quỹ
                          </div>
                        </li>
                        <li className="counter-item d-flex flex-column align-items-center">
                          <div className="text-bold text-dark font-size-20">
                            <span>{memberDetail.totalDonation}</span>
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
                      {memberDetail.describe}
                    </span>
                  </div>
                  <div className="mt-2 font-size-15 font-size-md-16">
                    Xem thêm thông tin tài khoản tại
                  </div>
                  <div className="mt-2 font-size-15 font-size-md-16 see-more">
                    <a>
                      <FontAwesomeIcon
                        size="2x"
                        className="media-item face"
                        icon={faFacebook}
                      ></FontAwesomeIcon>
                    </a>
                    <a>
                      <FontAwesomeIcon
                        size="2x"
                        className="media-item youtube"
                        icon={faYoutube}
                      ></FontAwesomeIcon>
                    </a>
                    <a>
                      <FontAwesomeIcon
                        size="lg"
                        className="media-item tiktok"
                        icon={faTiktok}
                      ></FontAwesomeIcon>
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
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
