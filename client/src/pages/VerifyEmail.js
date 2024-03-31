import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import Loader from "../components/Loader";
import bg5 from "../assets/images/bg5.jpg";
import "../css/verify.css";
const BASE_URL = process.env.REACT_APP_API_URL;

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const codeFromUrl = searchParams.get("code");
  const emailFromUrl = searchParams.get("email");
  const email = location.state ? location.state : emailFromUrl;

  const [code, setCode] = useState(codeFromUrl ? codeFromUrl : "");
  const [error, setError] = useState("");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = useCallback(() => {
    setLoading(true);
    const verificationLink = `${BASE_URL}/auth/verify?code=${code}&email=${email}`;
    axios
      .get(verificationLink)
      .then((res) => {
        if (res.status === 200) {
          navigate("/email-verified");
          setCode("");
          setError("");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(
          err.response.data.message || "Invalid code, please try again."
        );

        setLoading(false);
      });
  }, [code, email, navigate, setLoading, setError]);

  useEffect(() => {
    // Automatically trigger handleVerify if both code and email are present in the URL
    if (codeFromUrl && emailFromUrl) {
      handleVerify();
    }
  }, [codeFromUrl, emailFromUrl, handleVerify]);

  if (error === "Email is already verified") {
    navigate("/");
  }

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
          className="d-flex align-items-center justify-content-center"
          style={{ zIndex: "1000" }}
        >
          <div className="col-xl-6 col-md-9 col-sm-12" >
            <div className="form-verify">
              <h2 className="mb-4 text-2xl font-bold title-verify">
                Xác minh địa chỉ Email
              </h2>

              {!codeFromUrl && !emailFromUrl && (
                <p className="mb-4">
                  Mã xác minh đã được gửi đến địa chỉ email của bạn. Vui lòng
                  <span className="font-bold"> truy cập </span>
                  liên kết trong email hoặc
                  <span className="font-bold"> nhập </span>
                  mã bên dưới.
                </p>
              )}

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Verification code"
                  className="form-control form-control-lg"
                  value={code}
                  onChange={handleCodeChange}
                />
              </div>
              {error && <div className="mb-4 text-sm text-danger">{error}</div>}
              {loading ? <Loader /> : ""}
              <button
                disabled={loading}
                className={
                  loading === true ? "d-none" : "btn btn-primary effect"
                }
                onClick={handleVerify}
              >
                Xác minh
              </button>
              <button
                style={{ marginLeft: "15px" }}
                className={loading === true ? "d-none" : "btn btn-secondary"}
                onClick={() => {
                  navigate("/");
                }}
              >
                Thoát
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
