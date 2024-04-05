import React, { useEffect, useState } from "react";
import { faPen, faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import project from "../../assets/images/project/pic1.jpg";
import { isFundraiser } from "../../redux/api/userAPI";
import { Link, useNavigate } from "react-router-dom";
import { getUserProject } from "../../redux/actions/articleAction";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
const ManagementProject = () => {
  const [notifyAdd, setNotifyAdd] = useState(false);
  const [action, setAction] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectByUser = useSelector((state) => state.project.userProject);
  console.log(projectByUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUserProject(`?state=fundraising`));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  function truncateString(str, num) {
    const wordCount = str.split(" ").length;
    if (wordCount <= num) {
      return str;
    }

    const truncatedString = str.split(" ").slice(0, num).join(" ");
    return `${truncatedString}...`;
  }
  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const deadline = (createdAt, expireDate) => {
    const createdDate = new Date(createdAt);
    const deadline = new Date(
      createdDate.setDate(createdDate.getDate() + expireDate + 2)
    ); // Thêm expireDate + 2 ngày
    const today = new Date();
    const daysLeft = Math.floor((deadline - today) / (1000 * 3600 * 24)); // Chuyển đổi mili giây sang ngày

    return daysLeft;
  };
  return (
    <>
      <div className="contain_all">
        <div className="search_project">
          <div className="input-group md-form form-sm form-1 pl-0">
            <div className="input-group-prepend">
              <span
                className="input-group-text purple lighten-3"
                id="basic-text1"
              >
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </span>
            </div>
            <input
              className="form-control my-0 py-1"
              type="text"
              placeholder="Nhập tên chiến dịch"
              aria-label="Search"
            />
          </div>
        </div>
        <div className="filter_project">
          <div className="contain-current-project">
            <ul className="choose-status">
              <li
                className={
                  "project-status " + (action === 1 ? "active-select" : "")
                }
                onClick={() => {
                  dispatch(getUserProject(`?state=fundraising`));
                  setAction(1);
                }}
              >
                Đang thực hiện
              </li>
              <li
                className={
                  "project-status " + (action === 2 ? "active-select" : "")
                }
                onClick={() => {
                  dispatch(getUserProject(`?state=finished`));
                  setAction(2);
                }}
              >
                Đã kết thúc
              </li>
              <li
                className={
                  "project-status " + (action === 3 ? "active-select" : "")
                }
                onClick={() => {
                  dispatch(getUserProject(`?state=pending`));
                  setAction(3);
                }}
              >
                Chờ xét duyệt
              </li>
            </ul>
            <a
              to="/create-project"
              onClick={async () => {
                const res = await isFundraiser();
                if (res !== true) {
                  setNotifyAdd(true);
                } else {
                  navigate("/create-project");
                }
              }}
              className="btn-mana-more"
            >
              <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
            </a>
          </div>
        </div>
        <div className="list_project">
          {projectByUser.map((data) => {
            return (
              <div class="card" key={data._id}>
                <div class="card-top">
                  <img src={data.image[0]} alt="Blog Name" />
                </div>
                <div class="card-info">
                  <h2>{truncateString(data.articletitle, 11)}</h2>
                  <p class="title">
                    Ngày tạo -{" "}
                    <span className="inner">{formatDate(data.createdAt)}</span>
                  </p>
                  <p class="title">
                    Số tiền kêu gọi -{" "}
                    <span className="inner">
                      {toDecimal(data.amountRaised)} VNĐ
                    </span>
                  </p>
                  <p class="title">
                    Tiến trình -{" "}
                    <span className="inner">
                      {Math.round(
                        (data.amountEarned / data.amountRaised) * 100
                      )}
                      %
                    </span>
                  </p>
                  <p class="title">
                    Ngày còn lại -{" "}
                    <span className="inner">
                      {deadline(data.createdAt, data.expireDate) > 0
                        ? deadline(data.createdAt, data.expireDate)
                        : 0}{" "}
                      ngày
                    </span>
                  </p>
                  <p class="title">
                    Hoạt động -{" "}
                    <span className="inner">
                      {data.activities === undefined
                        ? 0
                        : data.activities.length}
                    </span>
                  </p>
                </div>
                <div class="card-bottom flex-row">
                  {data.adminApproval === true ? (
                    <>
                      <Link
                        to={`/article-detail/${data._id}`}
                        class="read-more"
                      >
                        Đến bài viết
                      </Link>
                      <Link
                        to={`/management/management_project/${data._id}`}
                        class="button btn-yellow"
                      >
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        className="modal fade modal-wrapper auth-modal"
        show={notifyAdd}
        onHide={setNotifyAdd}
        centered
      >
        <div style={{ textAlign: "center" }}>
          <h2 className="title" style={{ backgroundColor: "#F79E00" }}>
            Cảnh báo
          </h2>
          <h6 className="m-0">Bạn cần đăng ký để tạo các bài đăng gây quỹ.</h6>
          <a
            className="sign-text d-block"
            data-bs-toggle="collapse"
            onClick={() => {
              setNotifyAdd(false);
              navigate("/become-a-fundraiser");
            }}
          >
            Đăng ký ngay
          </a>
        </div>
      </Modal>
    </>
  );
};

export default ManagementProject;
