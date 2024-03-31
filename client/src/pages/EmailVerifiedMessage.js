import { useNavigate } from "react-router";
import "../css/verify.css";
import bg5 from "../assets/images/bg5.jpg";
const EmailVerifiedMessage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="under-construction overlay-white-dark background-luminosity"
      style={{
        backgroundImage: `url(${bg5})`,
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div
          style={{ zIndex: "1000" }}
          className="d-flex flex-col align-items-center justify-content-center min-vh-100 bg-gray-100"
        >
          <div className="col-xl-6 col-md-9 col-sm-12">
            <div className="form-verify" style={{ padding: "20px" }}>
              <div className="mb-4 text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Xin chúc mừng
                </h2>
                <p className="text-gray-600">
                  Email của bạn đã được xác minh và tài khoản của bạn đã được
                  tạo thành công, quay trở lại và đăng nhập tài khoản ngay.
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-primary effect"
                >
                  Trở về
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifiedMessage;
