import React from "react";
import ShowMoreText from "react-show-more-text";
import avatar from "../../assets/images/avatar/avatar7.jpg";
import project from '../../assets/images/project/pic1.jpg'
const Activity = () => {
  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };
  return (
    <div>
      <div className="content-header">
        <div>
        <img className="avatar_activity" src={avatar} />
        </div>
        <div className="content-text">
            <h6>Nguyễn Thị Hương</h6>
            <span>2/13/2024</span>
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
          {`Tết năm nay mình chưa giàu tiền, nhưng chắc chắn giàu ý nghĩa khi biết đến chiến dịch #GuiquaGopTet - chương trình thiện nguyện chính thống do Hội Chữ thập đỏ Việt Nam tổ chức. Gửi chút quà Tết đến đồng bào có hoàn cảnh khó khăn để góp phần giúp tết trọn vẹn hơn và để tích chữ “Phúc” cho năm mới nhé.`}
        </ShowMoreText>
      </div>
      <div className="content-img">
        <img className="img-main" src={project} />
      </div>
      <div className="content-doc"></div>
      <hr class="horizontalLines"></hr>
    </div>
  );
};

export default Activity;
