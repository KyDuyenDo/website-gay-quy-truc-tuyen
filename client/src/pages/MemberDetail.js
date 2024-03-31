import React from "react";
import "../css/memberDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faYoutube,
  faMailchimp,
} from "@fortawesome/free-brands-svg-icons";
const MemberDetail = () => {
  return (
    <div className="user-page bg-white">
      <div className="user-header-section">
        <div className="container">
          <div className="row">
            <div className="col-3  py-5">
              <div className="user-avatar d-flex justify-content-end flex-shrink-0 flex-basis-0 ">
                <img
                  src="https://static.thiennguyen.app/public/user/profile/2023/3/7/6df16864-27cb-4ada-8e90-cb7cfdc55015.jpg"
                  alt="Như chưa hề có cuộc chia ly"
                />
              </div>
            </div>
            <div className="col-9 py-5">
              <div className="d-flex flex-row flex-wrap">
                <div className="user-info-container flex-1-1-0 ml-3 ml-md-4">
                  <div class="d-flex flex-row flex-wrap">
                    <div class="username-row flex-fill d-flex flex-column flex-shrink-1">
                      <h2 class="text-single-line text-dark text-bold font-size-20 font-size-md-24 mt-2 mb-0">
                        Như chưa hề có cuộc chia ly
                      </h2>
                      <div class="mt-2 text-gray-900">@nchcccl</div>
                      <div class="mt-2 font-size-15 font-size-md-16">
                        Tham gia từ: 3/2023
                      </div>
                    </div>
                    <div class="counter-row d-none d-md-block">
                      <ul class="user-counters d-flex flex-row list-unstyled mb-0">
                        <li class="counter-item d-flex flex-column align-items-center">
                          <div class="text-bold text-dark font-size-20">
                            0 VND
                          </div>
                          <div class="text-gray-800 font-size-12 font-size-md-16">
                            Số tiền ủng hộ
                          </div>
                        </li>
                        <li class="counter-item d-flex flex-column align-items-center">
                          <div class="text-bold text-dark font-size-20">
                            <span>0</span>
                          </div>
                          <div class="text-gray-800 font-size-12 font-size-md-16">
                            Lượt ủng hộ
                          </div>
                        </li>
                        <li class="counter-item d-flex flex-column align-items-center">
                          <div class="text-bold text-dark font-size-20">
                            <span>5 sao</span>
                          </div>
                          <div class="text-gray-800 font-size-12 font-size-md-16">
                            Đánh giá uy tín
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="bio-row flex-shrink-0 d-none d-md-block mt-3">
                    <span class="text-gray-800 font-size-15 font-size-md-18">
                      “Hoạt động Nhân đạo Tìm kiếm &amp; Đoàn tụ người thân Như
                      chưa hề có cuộc chia ly hoàn toàn miễn phí; do công ty xã
                      hội Nối Thân Thương (WeConnect) chủ trì.”
                    </span>
                  </div>
                  <div class="mt-2 font-size-15 font-size-md-16">
                    Xem thêm thông tin tài khoản tại
                  </div>
                  <div class="mt-2 font-size-15 font-size-md-16 see-more">
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
