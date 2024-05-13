import React, { useEffect } from "react";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getNotify } from "../../redux/actions/manageAction";
import { useDispatch, useSelector } from "react-redux";
import { delNotify } from "../../redux/actions/manageAction";

const Notify = () => {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.management.notify);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getNotify());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  function formatDate(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${hours}:${minutes} - ${month}/${day}/${year.toString().slice(-2)}`;
  }

  return (
    <div className="notify-contain">
      {notify.map((data) => {
        return (
          <div class="item_card">
            <div
              className="round"
              style={
                data.state === "success"
                  ? {
                      border: "2px solid green",
                      backgroundColor: "#11c011",
                      color: "#fff",
                      width: "40px",
                      height: "35px",
                    }
                  : {
                      border: "2px solid red",
                      backgroundColor: "#f75c5c",
                      color: "#fff",
                      width: "40px",
                      height: "35px",
                    }
              }
            >
              {
                data.state === "success" ? (
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                ) // faX
              }
            </div>
            <div class="item_text">
              <p class="item_text_title">
                {data.state === "success" ? "Thành công" : " Thất bại"}{" "}
                <span className="item_time">
                  {formatDate(new Date(data.time))}
                </span>
              </p>
              <p class="item_text_content">{data.message}</p>
            </div>
            <div class="item_close">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const formData = new FormData();
                  formData.append("notifyId", data._id);
                  dispatch(delNotify(formData));
                  dispatch(getNotify());
                }}
              >
                <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
              </a>
              {/* <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notify;
