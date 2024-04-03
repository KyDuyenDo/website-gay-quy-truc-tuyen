import React from "react";
import hand1 from "../assets/images/hand1.png";
import hand2 from "../assets/images/hand2.png";
import heart from "../assets/images/heart.png";
import "../css/loading.css";
const LoadingArea = () => {
  return (
    <div id="loading-area" className="loading-page-1">
      <div className="loading-inner">
        <div className="item-wrapper">
          <img className="item1" src={hand1} alt="" />
          <img className="item2" src={hand2} alt="" />
          <img className="item3" src={heart} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoadingArea;
