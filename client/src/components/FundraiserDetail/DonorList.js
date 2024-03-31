import React, { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

const donors = [
  { name: "", money: "10.000 VND", time: "14:01:21 - 15/02/2024" },
  { name: "", money: "11.000 VND", time: "14:02:21 - 15/02/2024" },
  {
    name: "NGUYEN DU THUONG",
    money: "12.000 VND",
    time: "14:03:21 - 15/02/2024",
  },
  { name: "", money: "13.000 VND", time: "14:04:21 - 15/02/2024" },
  {
    name: "PHAM PHUONG LINH",
    money: "14.000 VND",
    time: "14:05:21 - 15/02/2024",
  },
  { name: "", money: "15.000 VND", time: "14:06:21 - 15/02/2024" },
  {
    name: "TONG THANH BINH",
    money: "16.000 VND",
    time: "14:07:21 - 15/02/2024",
  },
  { name: "", money: "17.000 VND", time: "14:08:21 - 15/02/2024" },
  { name: "", money: "18.000 VND", time: "14:09:21 - 15/02/2024" },
  { name: "HOANG HOA", money: "19.000 VND", time: "14:10:21 - 15/02/2024" },
  { name: "", money: "20.000 VND", time: "14:11:21 - 15/02/2024" },
  { name: "", money: "21.000 VND", time: "14:12:21 - 15/02/2024" },
  { name: "", money: "22.000 VND", time: "14:13:21 - 15/02/2024" },
  { name: "", money: "23.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "24.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "25.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "21.000 VND", time: "14:12:21 - 15/02/2024" },
  { name: "", money: "22.000 VND", time: "14:13:21 - 15/02/2024" },
  { name: "", money: "23.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "24.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "25.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "21.000 VND", time: "14:12:21 - 15/02/2024" },
  { name: "", money: "22.000 VND", time: "14:13:21 - 15/02/2024" },
  { name: "", money: "23.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "24.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "25.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "21.000 VND", time: "14:12:21 - 15/02/2024" },
  { name: "", money: "22.000 VND", time: "14:13:21 - 15/02/2024" },
  { name: "", money: "23.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "24.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "25.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "21.000 VND", time: "14:12:21 - 15/02/2024" },
  { name: "", money: "22.000 VND", time: "14:13:21 - 15/02/2024" },
  { name: "", money: "23.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "24.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "25.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "21.000 VND", time: "14:12:21 - 15/02/2024" },
  { name: "", money: "22.000 VND", time: "14:13:21 - 15/02/2024" },
  { name: "", money: "23.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "24.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "25.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "21.000 VND", time: "14:12:21 - 15/02/2024" },
  { name: "", money: "22.000 VND", time: "14:13:21 - 15/02/2024" },
  { name: "", money: "23.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "24.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "25.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "21.000 VND", time: "14:12:21 - 15/02/2024" },
  { name: "", money: "22.000 VND", time: "14:13:21 - 15/02/2024" },
  { name: "", money: "23.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "24.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "25.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "21.000 VND", time: "14:12:21 - 15/02/2024" },
  { name: "", money: "22.000 VND", time: "14:13:21 - 15/02/2024" },
  { name: "", money: "23.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "24.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "25.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "26.000 VND", time: "14:14:21 - 15/02/2024" },
  { name: "", money: "27.000 VND", time: "14:14:21 - 15/02/2024" },
];

function ItemDonors({ currentItems }) {
  return (
    <div className="table-responsive">
      <table class="table-list-donate-container table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Người ủng hộ</th>
            <th>Số tiền ủng hộ</th>
            <th>Thời gian ủng hộ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>
                  <span>{item.money}</span> VND
                </td>
                <td>{item.time} </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

const DonorList = ({ itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(donors.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(donors.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % donors.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="MuiBox-root css-16k4iv4">
      <div className="list-donate-container">
        <div class="input-icons">
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
              placeholder="Nhập tên người ủng hộ"
              aria-label="Search"
            />
          </div>
        </div>
        <ItemDonors currentItems={currentItems} />
      </div>
      <div className="contain-paginate">
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
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
  );
};

export default DonorList;
