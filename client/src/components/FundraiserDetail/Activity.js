import React from "react";
import ShowMoreText from "react-show-more-text";
const Activity = ({ activities, avatar, username }) => {
  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };
  return (
    <>
      {activities.map((item) => {
        return (
          <div>
            <div className="content-header">
              <div>
                <img className="avatar_activity" src={avatar} />
              </div>
              <div className="content-text">
                <h6>{username}</h6>
                <span>{item.createdAt}</span>
              </div>
            </div>
            <div className="content-main">
              <ShowMoreText
                /* Default options */
                lines={2}
                more="Xem thêm"
                less="Thu gọn"
                className="content-css"
                anchorClassNclassName="show-more-less-clickable"
                onClick={executeOnClick}
                expanded={false}
                truncatedEndingComponent={"... "}
              >
                {`${item.body}`}
              </ShowMoreText>
            </div>
            <div className="content-img">
              <img className="img-main" src={item.image} />
            </div>
            <div className="content-doc"></div>
            <hr className="horizontalLines"></hr>
          </div>
        );
      })}
      {activities?.length === 0 ? (
        <div
          role="tabpanel"
          id="simple-tabpanel-2"
          aria-labelledby="simple-tab-2"
        >
          <div className="css-127g5zj">
            <div className="containerPostCampaign">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ marginTop: "13%", opacity: "0.6" }}
              >
                Chiến dịch chưa có hoạt động
              </div>
              <div className="row mb-3">
                <div className="col-12 text-center pb-4 pb-lg-5 pt-4 pt-lg-3"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Activity;
