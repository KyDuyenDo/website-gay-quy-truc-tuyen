import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

const FirstStep = ({ setValue, errors, erroravt }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  const custom = {
    display: "inline-block",
    outline: " 0",
    border: "0",
    cursor: "pointer",
    backgroundColor: "#1B8271",
    borderRadius: "50px",
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: "400",
    color: "white",
    lineHeight: "22px",
    width: "110px",
  };
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
    const imageData = imageSrc.split(",")[1];
    setValue("image", [imageData]);
  }, [webcamRef]);
  useEffect(() => {
    if (isCameraOn) {
      setIsCameraActive(true); // Ensure camera starts when active
    }
  }, [isCameraOn]);

  return (
    <>
      <div id="wizard_Time" className="tab-pane" role="tabpanel">
        <span className="header-title">Nhận diện khuôn mặt</span>
        <p>
          Bật camera và tiến hành chụp ảnh khuôn mặt, đảm bảo độ sáng và hiển
          thị rõ khuôn mặt để tăng độ chính xác trong quá trình xác thực.
        </p>
        <div className="row sp15">
          <div className="camera-controls">
            <a
              style={{ backgroundColor: "#FF5F52", border: "none" }}
              className="btn btn-primary buttons"
              onClick={() => {
                setIsCameraOn(!isCameraOn);
                if (isCameraOn) {
                  setIsCameraActive(true);
                } else {
                  setIsCameraActive(false);
                }
              }}
            >
              {isCameraOn ? (
                <>
                  <FontAwesomeIcon icon={faVideoSlash} /> Tắt camera
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faVideo} /> Bật camera
                </>
              )}
            </a>
            {erroravt === "" ? (
              ""
            ) : (
              <small className="text-danger m-1 p-0">{erroravt}</small>
            )}
          </div>
          {isCameraOn &&
            isCameraActive &&
            (img === null ? (
              <>
                <div
                  className="d-flex justify-content-center"
                  style={{ margin: "10px", marginTop: "20px" }}
                >
                  <div className="frame">
                    <Webcam
                      audio={false}
                      mirrored={true}
                      height={300}
                      width={300}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button style={custom} onClick={capture}>
                    Chụp ảnh
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className="d-flex justify-content-center"
                  style={{ margin: "10px", marginTop: "20px" }}
                >
                  <img style={{ width: "300px" }} src={img} alt="screenshot" />
                </div>
                <div className="d-flex justify-content-center">
                  <button style={custom} onClick={() => setImg(null)}>
                    Chụp lại
                  </button>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default FirstStep;
