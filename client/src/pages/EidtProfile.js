import React, { useEffect } from "react";
import "../css/profile.css";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { upLoadImage, delImage } from "../redux/api/uploadAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setUpdateInfoAction,
  getUserInfoAction,
  updateImage,
} from "../redux/actions/userAction";

const schemaUser = yup.object().shape({
  username: yup.string().default(""),
  email: yup.string().default(""),
  avatar: yup.mixed(),
  phone: yup
    .string()
    .default("")
    .matches(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b|^$/,
      "Không đúng định dạng số điện thoại"
    ),
  gender: yup.string().default(""),
  birthday: yup
    .string()
    .default("")
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^$/,
      "không đúng định dạng (dd/mm/yyyy)"
    ),
  youtubeUrl: yup
    .string()
    .default("")
    .matches(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)|^(?:)$/gi,
      "Không đúng dịnh dạng link"
    ),
  facebookUrl: yup
    .string()
    .default("")
    .matches(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)|^(?:)$/gi,
      "Không đúng dịnh dạng link"
    ),
  tiktokUrl: yup
    .string()
    .default("")
    .matches(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)|^(?:)$/gi,
      "Không đúng dịnh dạng link"
    ),
  intro: yup.string().default(""),
});

const EidtProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUserInfoAction(authData.userData._id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const username = useSelector((state) => state.user.username);
  const authData = useSelector((state) => state.auth);
  const email = useSelector((state) => state.user.email);
  const avatar = useSelector((state) => state.user.avatar);
  const phone = useSelector((state) => state.user.phone);
  const gender = useSelector((state) => state.user.gender);
  const birthday = useSelector((state) => state.user.birthday);
  const youtubeUrl = useSelector((state) => state.user.youtubeUrl);
  const facebookUrl = useSelector((state) => state.user.facebookUrl);
  const tiktokUrl = useSelector((state) => state.user.tiktokUrl);
  const intro = useSelector((state) => state.user.intro);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(schemaUser) });
  return (
    <section className="profile">
      <div className="container-xl">
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Ảnh đại diện</div>
              <div className="card-body text-center">
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                  className="img-account-profile rounded-circle mb-2"
                  src={avatar}
                  alt=""
                />

                <div className="small font-italic text-muted mb-4">
                  JPG hoặc PNG và không lớn hơn 2 MB
                </div>

                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    {...register("avatar")}
                    id="avatar"
                    name="avatar"
                  />
                </div>
                {errors.avatar && (
                  <small className="text-danger m-1 p-0">
                    {errors.avatar.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Thông tin cá nhân</div>
              <div className="card-body">
                <form
                  onSubmit={handleSubmit(async (data) => {
                    const formData = new FormData();
                    formData.append(
                      "username",
                      data.username === "" ? username : data.username
                    );
                    formData.append(
                      "phone",
                      data.phone === "" ? phone : data.phone
                    );
                    formData.append(
                      "gender",
                      data.gender === "" ? gender : data.gender
                    );
                    formData.append(
                      "birthday",
                      data.birthday === "" ? birthday : data.birthday
                    );
                    formData.append(
                      "youtubeUrl",
                      data.youtubeUrl === "" ? youtubeUrl : data.youtubeUrl
                    );
                    formData.append(
                      "facebookUrl",
                      data.facebookUrl === "" ? facebookUrl : data.facebookUrl
                    );
                    formData.append(
                      "tiktokUrl",
                      data.tiktokUrl === "" ? tiktokUrl : data.tiktokUrl
                    );
                    formData.append(
                      "info",
                      data.intro === "" ? intro : data.intro
                    );
                    // for (const pair of formData) {
                    //   const key = pair[0];
                    //   const value = pair[1];
                    //   console.log(`Key: ${key}, Value: ${value}`);
                    // }
                    // console.log(data.avatar.length !== 0)
                    if (data.avatar.length !== 0) {
                      if (
                        avatar !==
                        "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
                      ) {
                        const filename = avatar.split("/").pop();
                        delImage("avatar", filename);
                      }
                      const formImage = new FormData();
                      formImage.append("file", data.avatar[0]);
                      upLoadImage("avatar", formImage).then((image) => {
                        dispatch(updateImage(image.imageURL));
                        formData.append("avatar", image.imageURL);
                        const storedData = JSON.parse(
                          localStorage.getItem("profile")
                        );
                        storedData.user.avatar = image.imageURL;
                        localStorage.setItem(
                          "profile",
                          JSON.stringify(storedData)
                        );
                        dispatch(setUpdateInfoAction(formData));
                      });
                    } else {
                      formData.append("avatar", avatar);
                      dispatch(setUpdateInfoAction(formData));
                    }
                    reset();
                  })}
                >
                  <div className="mb-3">
                    <label className="small mb-1" for="inputUsername">
                      Họ và tên
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="username"
                      name="username"
                      defaultValue={username}
                      {...register("username")}
                    />
                    {errors.username && (
                      <small className="text-danger m-1 p-0">
                        {errors.username.message}
                      </small>
                    )}
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputFirstName">
                        Giới tính
                      </label>
                      <select
                        className="form-control"
                        name="gender"
                        id="gender"
                        {...register("gender")}
                        defaultValue={gender}
                      >
                        <option
                          value="1"
                          selected={gender === "1" ? true : false}
                        >
                          Nam
                        </option>
                        <option
                          value="0"
                          selected={gender === "0" ? true : false}
                        >
                          Nữ
                        </option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLastName">
                        Ngày sinh
                      </label>
                      <input
                        className="form-control"
                        defaultValue={birthday}
                        type="text"
                        name="birthday"
                        id="birthday"
                        {...register("birthday")}
                      />
                      {errors.birthday && (
                        <small className="text-danger m-1 p-0">
                          {errors.birthday.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputOrgName">
                        Số điện thoại
                      </label>
                      <input
                        defaultValue={phone}
                        className="form-control"
                        type="text"
                        name="phone"
                        id="phone"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <small className="text-danger m-1 p-0">
                          {errors.phone.message}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLocation">
                        Email liên hệ
                      </label>
                      <Form.Control
                        type="text"
                        aria-label="Disabled input example"
                        disabled
                        readOnly
                        value={email}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="small mb-1" for="inputEmailAddress">
                      Link FaceBook
                    </label>
                    <input
                      defaultValue={facebookUrl}
                      className="form-control"
                      type="text"
                      name="facebookUrl"
                      id="facebookUrl"
                      {...register("facebookUrl")}
                    />
                    {errors.facebookUrl && (
                      <small className="text-danger m-1 p-0">
                        {errors.facebookUrl.message}
                      </small>
                    )}
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputPhone">
                        Link Youtube
                      </label>
                      <input
                        defaultValue={youtubeUrl}
                        className="form-control"
                        type="text"
                        name="youtubeUrl"
                        id="youtubeUrl"
                        {...register("youtubeUrl")}
                      />
                      {errors.youtubeUrl && (
                        <small className="text-danger m-1 p-0">
                          {errors.youtubeUrl.message}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" for="inputBirthday">
                        Link Tiktok
                      </label>
                      <input
                        defaultValue={tiktokUrl}
                        className="form-control"
                        type="text"
                        name="tiktokUrl"
                        id="tiktokUrl"
                        {...register("tiktokUrl")}
                      />
                      {errors.tiktokUrl && (
                        <small className="text-danger m-1 p-0">
                          {errors.tiktokUrl.message}
                        </small>
                      )}
                    </div>
                    <div className="mt-3 col-md-12">
                      <label className="small mb-1" for="inputBirthday">
                        Giới Thiệu
                      </label>
                      <textarea
                        defaultValue={intro}
                        className="form-control"
                        name="intro"
                        id="intro"
                        {...register("intro")}
                        rows="5"
                        // Set the readOnly attribute to make it read-only
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Cập nhật
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EidtProfile;
