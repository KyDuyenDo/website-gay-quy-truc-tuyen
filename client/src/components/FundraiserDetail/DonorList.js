import React, { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { setDataDetailDonation } from "../../redux/actions/donorsAction";
import { useSelector, useDispatch } from "react-redux";

const DonorList = ({ itemsPerPage, articleId }) => {
  const donations = useSelector((state) => state.donation.donations);
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(donations.formatDonation.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(donations.formatDonation.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % donations.formatDonation.length;
    setItemOffset(newOffset);
  };
  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }
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
              onChange={(event) => {
                const queryString = `?name=${event.target.value.replace(
                  / /g,
                  "%20"
                )}`;
                const formData = new FormData();
                formData.append("articleId", articleId);
                dispatch(setDataDetailDonation(formData, queryString));
              }}
            />
          </div>
        </div>
        {/* <ItemDonors currentItems={currentItems} /> */}
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
              {donations.formatDonation &&
                donations.formatDonation.map((item) => (
                  <tr>
                    <td>{item.anonymous === true ? "" : item.fullnameDonor}</td>
                    <td>
                      <span>{toDecimal(item.donationAmount)}</span> VND
                    </td>
                    <td>{item.donationDate} </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
