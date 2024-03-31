import React from "react";
import { Link } from "react-router-dom";
import '../css/footer.css'
// import logo from './../assets/images/logo-white.png';
import { faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <footer className="site-footer style-1" id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-12 col-md-12">
                <div className="widget widget_about">
                  <div className="footer-logo logo-white">
                    {/* <Link to={"/"}><img src={logoImage} alt="" /></Link>  */}
                  </div>
                  <p>
                  kết nối người cần giúp đỡ với những người muốn ủng hộ các dự án từ thiện và sáng tạo. Chúng tôi cung cấp nền tảng an toàn và thuận tiện để cùng nhau tạo ra sự tích cực và thúc đẩy các sáng kiến xã hội.
                  </p>
                  <div className="dz-social-icon style-1">
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faFacebook} />
                      </li>{" "}
                      <li>
                        <FontAwesomeIcon icon={faInstagram} />
                      </li>{" "}
                      <li>
                        <FontAwesomeIcon icon={faTwitter} />
                      </li>{" "}
                      <li>
                        <FontAwesomeIcon icon={faYoutube} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6 col-6">
                <div className="widget widget_services">
                  <h5 className="footer-title">Tài nguyên</h5>
                  <ul>
                    <li>Cách thức hoạt động</li>
                    <li>Chính sách bảo mật</li>
                    <li>Điều khoản</li>
                    <li>Hỏi đáp</li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-6">
                <div className="widget widget_getintuch">
                  <h5 className="footer-title">Kết nối với chúng tôi</h5>
                  <ul>
                    <li>
                      <span>
                        Đại học Cần Thơ, Cần thơ đường 03/02, Việt Nam
                      </span>
                    </li>
                    <li>
                      <span>support@gmail.com</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="text-center">
              <span className="copyright-text">
                Copyright © 2024{" "}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
