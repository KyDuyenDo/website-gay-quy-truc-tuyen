import React from "react";

const OverView = ({ body }) => {
  return (
    <div style={{ padding: "32px 0px", minHeight: "400px" }}>
      <span style={{ textAlign: "left", whiteSpace: "pre-line" }}>{body}</span>
    </div>
  );
};

export default OverView;
