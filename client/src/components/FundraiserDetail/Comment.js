import React, { useState, useEffect } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ReactPaginate from "react-paginate";

const comments = [
  {
    star: "5",
    author: "Hương",
    time: "15/2/2024",
    comment:
      "Tôi rất cảm thông cho hoàn cảnh này, tôi mong muốn có thể đóng góp nhiều hơn nữa.",
    img: "T",
    color: "#166d96",
  },
  {
    star: "4",
    author: "Hoàng",
    time: "15/3/2024",
    comment:
      "Thật hạnh phúc khi trong thấy người có hoàn cảnh khó khăn được giúp đỡ, thật cảm ơn cộng đồng biết bao!",
    img: "H",
    color: "#FA3511",
  },
  {
    star: "4",
    author: "Quốc",
    time: "15/3/2024",
    comment:
      "Những điều tốt đẹp đến từ tâm, và hy vọng, mong sao cộng đồng ngày càng tốt đẹp và phát triển hơn, những hoàn cảnh khốn khó cũng càng ít đi để xã hội tốt đẹp hơn",
    img: "Q",
    color: "#166D96",
  },
];

const ItemComments = ({ currentItemsComment, itemStyles }) => {
  return (
    <div className="cf-section cf-section--collapse-top">
      {currentItemsComment &&
        currentItemsComment.map((item) => (
          <article
            className="cf-well"
            data-well="plain"
            data-well-spacing="bottom-padded"
          >
            <div className="cf-well__content">
              <div className="cf-media">
                <div className="cf-media__content cf-media__content--push">
                  <a href="#" previewlistener="true">
                    <div className="cf-thumb ">
                      <div
                        className="cf-thumb__img cf-thumb__img--proxy"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.img}{" "}
                      </div>
                    </div>{" "}
                  </a>
                </div>
                <div className="cf-media__content cf-media__content--main">
                  <div
                    className="cf-well cf-well--rounded"
                    data-well="plain"
                    data-background="light"
                    data-well-spacing="thin-card"
                  >
                    <div>
                      <div className="cf-layout" data-layout="justify">
                        <h5
                          className="cf-text cf-text-break-word"
                          data-strip-element="bottom"
                        >
                          {item.author}
                        </h5>
                        <span className="cf-text cf-text--small">
                          {item.time}
                        </span>
                      </div>
                    </div>
                    <div className="cf-well__content cf-well__content--sm">
                      <Rating
                        style={{ maxWidth: 90 }}
                        value={parseInt(item.star)}
                        itemStyles={itemStyles}
                        readOnly
                      />
                    </div>
                    <blockquote className="cf-well__content cf-well__content--sm">
                      <p className="cf-text cf-text--quote cf-text--dark cf-text--body cf-text--wrap-normal">
                        {item.comment}
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
    </div>
  );
};

const Comment = () => {
  const [rating, setRating] = useState(5);

  const itemStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#FE8D4D",
    inactiveFillColor: "#CDC8C8",
  };
  const itemsCommentPage = 3;
  const [currentItemsComment, setCurrentItemsComment] = useState(null);
  const [pageCountComment, setPageCountComment] = useState(0);

  const [itemCommentOffset, setItemCommentOffset] = useState(0);

  useEffect(() => {
    console.log()
    const endOffset = itemCommentOffset + itemsCommentPage;
    console.log(`Loading items from ${itemCommentOffset} to ${endOffset}`);
    setCurrentItemsComment(comments.slice(itemCommentOffset, endOffset));
    setPageCountComment(Math.ceil(comments.length / itemsCommentPage));
  }, [itemCommentOffset, itemsCommentPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsCommentPage) % comments.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemCommentOffset(newOffset);
  };
  return (
    <div className="cf-layout__main">
      <ItemComments
        currentItemsComment={currentItemsComment}
        itemStyles={itemStyles}
      />
      <div className="contain-paginate">
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCountComment}
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
      <form className="comment-form" id="commentform">
        <p className="comment-form-author">
          <div className="rating-content">
            <Rating
              style={{ maxWidth: 120 }}
              value={rating}
              onChange={setRating}
              itemStyles={itemStyles}
            />
          </div>
        </p>
        <p className="comment-form-comment">
          <div class="mb-3">
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Bình luận"
            ></textarea>
          </div>
        </p>
        <p className="form-submit">
          <button
            type="submit"
            className="btn btn-primary custom-btn"
            id="submit"
          >
            Bình luận
          </button>
        </p>
      </form>
    </div>
  );
};

export default Comment;
