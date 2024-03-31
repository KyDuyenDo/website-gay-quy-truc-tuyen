import React from "react";
import ScrollToTop from "../ScrollToTop";
import Dropzone from "./Dropzone";
const FourthStep = ({ setValue, errorImage }) => {
  return (
    <div>
      <div>
        <div className="container-fuild">
          <span className="header-title">Tải lên hình ảnh cho chiến dịch</span>
          <Dropzone
            errorImage={errorImage}
            setValue={setValue}
            className="p-16 mt-10 border"
          />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default FourthStep;
