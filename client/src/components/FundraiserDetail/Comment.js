import React, { useState, useEffect } from "react";
import { Rating, Heart } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ReactPaginate from "react-paginate";
import { Modal } from "react-bootstrap";
import { isProtected } from "../../redux/api/userAPI";
import { addComment } from "../../redux/api/articleAPI";
import { setComment } from "../../redux/actions/detailAction";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

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

const schemaComment = yup.object().shape({
  comment: yup
    .string()
    .required("Bình luận trống")
    .min(20, "Quá ngắn, tối thiểu 20 từ"),
});

const Comment = ({ articleId }) => {
  const comments = useSelector((state) => state.detail.detail.comments);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(schemaComment) });
  const [rating, setRating] = useState(5);
  const [notifyAdd, setNotifyAdd] = useState(false);
  const [notifyText, setNotifyText] = useState("");
  const dispatch = useDispatch();
  const itemStyles = {
    itemShapes: Heart,
    activeFillColor: "#F63B3B",
    inactiveFillColor: "#CDC8C8",
  };
  const color = {
    A: "rgb(140, 46, 150)",
    B: "rgb(12, 25, 58)",
    C: "rgb(42, 44, 76)",
    D: "rgb(59, 161, 151)",
    E: "rgb(133, 50, 192)",
    F: "rgb(158, 147, 61)",
    G: "rgb(238, 124, 50)",
    H: "rgb(152, 73, 14)",
    I: "rgb(239, 243, 43)",
    J: "rgb(189, 105, 30)",
    K: "rgb(139, 135, 66)",
    L: "rgb(171, 160, 82)",
    M: "rgb(17, 239, 230)",
    N: "rgb(235, 146, 28)",
    O: "rgb(68, 129, 97)",
    P: "rgb(233, 164, 25)",
    Q: "rgb(94, 7, 4)",
    R: "rgb(236, 60, 155)",
    S: "rgb(240, 192, 86)",
    T: "rgb(170, 238, 208)",
    U: "rgb(227, 180, 202)",
    V: "rgb(42, 138, 25)",
    W: "rgb(2, 215, 213)",
    X: "rgb(105, 39, 123)",
    Y: "rgb(71, 226, 208)",
    Z: "rgb(43, 153, 199)",
    Đ: "rgb(122, 147, 220)",
  };
  const itemsCommentPage = 3;
  const [currentItemsComment, setCurrentItemsComment] = useState(null);
  const [pageCountComment, setPageCountComment] = useState(0);

  const [itemCommentOffset, setItemCommentOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemCommentOffset + itemsCommentPage;
    setCurrentItemsComment(comments.slice(itemCommentOffset, endOffset));
    setPageCountComment(Math.ceil(comments.length / itemsCommentPage));
  }, [itemCommentOffset, itemsCommentPage, comments]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsCommentPage) % comments.length;
    setItemCommentOffset(newOffset);
  };
  return (
    <>
      <div className="cf-layout__main">
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
                            style={{
                              backgroundColor:
                                color[
                                  item.reviewerId.username
                                    .charAt(0)
                                    .toUpperCase()
                                ],
                            }}
                          >
                            {item.reviewerId.username.charAt(0).toUpperCase()}{" "}
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
                              {item.reviewerId.username}
                            </h5>
                            <span className="cf-text cf-text--small">
                              {item.createdAt}
                            </span>
                          </div>
                        </div>
                        <div className="cf-well__content cf-well__content--sm">
                          <Rating
                            style={{ maxWidth: 90 }}
                            value={parseInt(item.rating)}
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
        <form
          onSubmit={handleSubmit((data) => {
            isProtected().then((res) => {
              if (res !== true) {
                setNotifyText("Bạn cần đăng nhập để bình luận");
                setNotifyAdd(true);
              } else {
                // rating, content, postId
                const formData = new FormData();
                formData.append("rating", rating);
                formData.append("content", data.comment);
                formData.append("postId", articleId);
                addComment(formData).then((res) => {
                  dispatch(setComment(articleId));
                  setNotifyText("Thêm thành công");
                  setNotifyAdd(true);
                });
              }
            });
          })}
          className="comment-form"
          id="commentform"
        >
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
            <div className="mb-3">
              <textarea
                className="form-control"
                id="comment"
                name="comment"
                rows="3"
                placeholder="Bình luận"
                {...register("comment")}
              ></textarea>
              {errors.comment && (
                <small className="text-danger m-1 p-0">
                  {errors.comment.message}
                </small>
              )}
            </div>
          </p>
          <p className="form-submit">
            <button type="submit" className="btn btn-primary custom-btn">
              Bình luận
            </button>
          </p>
        </form>
      </div>
      <Modal
        className="modal fade modal-wrapper auth-modal"
        show={notifyAdd}
        onHide={setNotifyAdd}
        centered
      >
        <div style={{ textAlign: "center" }}>
          <h2
            className="title"
            style={{
              backgroundColor:
                notifyText === "Bạn cần đăng nhập để bình luận"
                  ? "#F79E00"
                  : "#1B8271",
            }}
          >
            Cảnh báo
          </h2>
          <h6 className="m-0">{notifyText}</h6>
          <a
            className="sign-text d-block"
            data-bs-toggle="collapse"
            onClick={async () => {
              setNotifyAdd(false);
            }}
          >
            Trở lại
          </a>
        </div>
      </Modal>
    </>
  );
};

export default Comment;
