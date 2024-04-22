import React, { useState } from "react";
import AdRequestUser from "./AdRequestUser";
import AdRequestArticle from "./AdRequestArticle";
const AdRequest = () => {
  const [selection, SetSelection] = useState(1);
  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>Yêu cầu</h1>
          <div className="filter_project">
            <div className="contain-current-project pb-0 mb-0">
              <ul className="choose-status mb-0">
                <li
                  className={
                    "project-status " + (selection === 1 ? "active-select" : "")
                  }
                  onClick={() => {
                    SetSelection(1);
                  }}
                >
                  Yêu cầu đăng ký
                </li>
                <li
                  className={
                    "project-status " + (selection === 2 ? "active-select" : "")
                  }
                  onClick={() => {
                    SetSelection(2);
                  }}
                >
                  Yêu cầu đăng bài
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {selection === 1 ? <AdRequestUser /> : <AdRequestArticle />}
    </>
  );
};

export default AdRequest;
