import React from "react";
import ScrollToTop from "../ScrollToTop";
import UpImageDropZone from "./UpImageDropZone";
const SecondRaiserStep = ({ setValue, errorImage }) => {
  return (
    <div>
      <div>
        <div className="container-fuild">
          <span className="header-title">Tải lên hình ảnh căn cước công dân hai mặt</span>
          <UpImageDropZone setValue={setValue} errorImage={errorImage} />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default SecondRaiserStep;
