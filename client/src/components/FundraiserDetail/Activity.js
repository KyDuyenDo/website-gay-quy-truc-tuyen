import React from "react";
import ShowMoreText from "react-show-more-text";
import avatar from "../../assets/images/avatar/avatar7.jpg";
import project from "../../assets/images/project/pic1.jpg";
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
                anchorClass="show-more-less-clickable"
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
    </>
  );
};

export default Activity;
