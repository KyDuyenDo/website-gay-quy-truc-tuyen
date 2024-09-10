import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import {
  getAllMember,
  setSearchClear,
} from "../../redux/actions/memberAction";
import { useDispatch, useSelector } from "react-redux";
import nothing from "../../assets/no_result.png";
const MenberMasonry = () => {
  const dispatch = useDispatch();
  const allmember = useSelector((state) => state.member.memberList);
  const search = useSelector((state) => state.member.search);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search !== "") {
          await dispatch(getAllMember(`?q=${search}`));
          await dispatch(setSearchClear());
        } else {
          dispatch(getAllMember(""));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
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
  function truncateString(str, num) {
    const wordCount = str.split(" ").length;
    if (wordCount <= num) {
      return str;
    }

    const truncatedString = str.split(" ").slice(0, num).join(" ");
    return `${truncatedString}...`;
  }
  const itemsMemberPage = 9;
  const [activeGenre, setActiveGenre] = useState(0);
  const [searchResult, setSearchResult] = useState(true);
  const [currentItemsMember, setCurrentItemsMember] = useState(null);
  const [pageCountMember, setPageCountMember] = useState(0);

  const [itemMemberOffset, setItemMemberOffset] = useState(0);

  useEffect(() => {
    if (allmember?.length === 0) {
      setSearchResult(false);
    } else {
      setSearchResult(true);
    }
  }, [allmember]);

  useEffect(() => {
    const endOffset = itemMemberOffset + itemsMemberPage;
    setCurrentItemsMember(allmember.slice(itemMemberOffset, endOffset));
    setPageCountMember(Math.ceil(allmember.length / itemsMemberPage));
  }, [itemMemberOffset, itemsMemberPage, allmember]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsMemberPage) % allmember.length;
    setItemMemberOffset(newOffset);
  };

  return (
    <>
      <div className="row m-b30">
        <div className="col-xl-10 col-lg-9">
          <div className="site-filters style-1 clearfix">
            <ul className="filters" data-bs-toggle="buttons">
              <li className={`btn ${activeGenre === 0 ? "active" : ""}`}>
                <Link
                  to={"#"}
                  onClick={() => {
                    dispatch(getAllMember(""));
                    setActiveGenre(0);
                  }}
                >
                  Tất cả
                </Link>
              </li>
              <li
                data-filter=".Technology"
                className={`btn ${activeGenre === 1 ? "active" : ""}`}
              >
                <Link
                  to={"#"}
                  onClick={() => {
                    dispatch(getAllMember(`?type=only`));
                    setActiveGenre(1);
                  }}
                >
                  Cá nhân
                </Link>
              </li>
              <li
                data-filter=".Medical"
                className={`btn ${activeGenre === 2 ? "active" : ""}`}
              >
                <Link
                  to={"#"}
                  onClick={() => {
                    dispatch(getAllMember(`?type=group`));
                    setActiveGenre(2);
                  }}
                >
                  Tổ chức
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* project */}
      <div className="clearfix">
        <ul
          //layout
          id="masonry"
          className="row"
          //transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {currentItemsMember &&
              currentItemsMember.map((item) => {
                return (
                  <motion.li
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="card-container col-xl-4 col-lg-6 col-md-6 col-sm-12 Fashion m-b30"
                    key={item._id}
                    //transition={{ duration: 0.5 }}
                  >
                    <div className="member d-flex flex-row">
                      <div className="">
                        <img
                          src={item.user[0].avatar}
                          style={{
                            width: "110px",
                            height: "110px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #B1DAE7",
                          }}
                          alt=""
                        />
                      </div>
                      <div className="member-info">
                        <span className="span_underline">
                          {truncateString(item.groupName, 3)}
                        </span>
                        <p>Tham gia từ {formatDate(item.approvaldate)}</p>
                        <p>
                          Số tiền gây quỹ <br /> {toDecimal(item.totalAmountRaised)} VNĐ
                        </p>
                        <Link to={`/member-detail/${item.userId}`}>
                          <button className="cta">
                            <span>Xem chi tiết</span>
                            <svg width="15px" height="10px" viewBox="0 0 13 10">
                              <path d="M1,5 L11,5"></path>
                              <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
          </AnimatePresence>
          {searchResult !== true ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "14%",
              }}
            >
              <img style={{ width: "400px" }} src={nothing} />
            </div>
          ) : (
            ""
          )}
        </ul>
      </div>
      {/* more */}
      <div className="row">
        <div className="col-12 m-sm-t0 m-t30">
          <div className="contain-paginate">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCountMember}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MenberMasonry;
