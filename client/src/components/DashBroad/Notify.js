import React from "react";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const notifyList = [
  { type: "success", message: "", day: "" },
  { type: "error", message: "", day: "" },
  { type: "waring", message: "", day: "" },
];

const Notify = () => {
  return (
    <div className="notify-contain">
      <div class="item_card">
        <div class="item_icon">
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </div>
        <div class="item_text">
          <p class="item_text_title">
            Success <span className="item_time">10:11 - 2/25/24</span>
          </p>
          <p class="item_text_content">
            Line 3:10: 'Dropdown' is defined but never used no-unused-vars Line
            16:10: 'dropbtn2' is assigned a value but never used no-unused-vars
            Line 16:20: 'setDropbtn2' is assigned a value but never used
          </p>
        </div>
        <div class="item_close">
          <a>
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </a>
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        </div>
      </div>
      <div class="item_card">
        <div class="item_icon">
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </div>
        <div class="item_text">
          <p class="item_text_title">
            Success <span className="item_time">10:11 - 2/25/24</span>
          </p>
          <p class="item_text_content">
            Line 3:10: 'Dropdown' is defined but never used no-unused-vars Line
            16:10: 'dropbtn2' is assigned a value but never used no-unused-vars
            Line 16:20: 'setDropbtn2' is assigned a value but never used
          </p>
        </div>
        <div class="item_close">
          <a>
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </a>
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        </div>
      </div>
      <div class="item_card">
        <div class="item_icon">
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </div>
        <div class="item_text">
          <p class="item_text_title">
            Success <span className="item_time">10:11 - 2/25/24</span>
          </p>
          <p class="item_text_content">
            Line 3:10: 'Dropdown' is defined but never used no-unused-vars Line
            16:10: 'dropbtn2' is assigned a value but never used no-unused-vars
            Line 16:20: 'setDropbtn2' is assigned a value but never used
          </p>
        </div>
        <div class="item_close">
          <a>
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </a>
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        </div>
      </div>
    </div>
  );
};

export default Notify;
