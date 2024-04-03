import React, { useState } from "react";
import Map from "./Map";
import ScrollToTop from "../ScrollToTop";
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const ThirdStep = ({ register, lackAddMess, getValues, setValue }) => {
  const [listPlace, setListPlace] = useState([]);
  const [position, setPosition] = useState([9.9265804, 105.7256381]);
  return (
    <>
      <div>
        <span className="header-title">Địa chỉ chiến dịch</span>
        <p style={{ margin: "0px" }}>
          Cung cấp thông tin địa chỉ của chiến dịch và tìm kiếm các địa điểm
          theo mô tả, sau đó chọn địa điểm chính xác của bạn.
        </p>
        <div className="custom-form">
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example1"
                >
                  Tỉnh/thành phố
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="cf-form__input "
                  aria-label="Disabled input example"
                  {...register("city")}
                />
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example2"
                >
                  Quận/huyện
                </label>
                <input
                  id="county"
                  name="county"
                  type="text"
                  className="cf-form__input "
                  aria-label="Disabled input example"
                  {...register("county")}
                />
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example1"
                >
                  Xã/phường/thị trấn
                </label>
                <input
                  id="town"
                  name="town"
                  type="text"
                  className="cf-form__input "
                  aria-label="Disabled input example"
                  {...register("town")}
                />
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label
                  className="cf-form__section-subttitle"
                  for="form6Example2"
                >
                  Tên cơ sở/tên đường
                </label>
                <input
                  name="street"
                  id="street"
                  type="text"
                  className="cf-form__input "
                  aria-label="Disabled input example"
                  {...register("street")}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div data-mdb-input-init className="form-outline">
              <label className="cf-form__section-subttitle" for="form6Example1">
                Hẻm/ngõ/số nhà
              </label>
              <input
                type="text"
                name="detail"
                id="detail"
                className="cf-form__input "
                aria-label="Disabled input example"
                {...register("detail")}
              />
            </div>
          </div>
          <a
            onClick={() => {
              setListPlace([]);
              const searchText =
                getValues("city") +
                " " +
                getValues("county") +
                " " +
                getValues("town") +
                " " +
                getValues("street");
              if (searchText != "") {
                const params = {
                  q: searchText,
                  format: "json",
                  addressdetails: 1,
                  polygon_geojson: 0,
                };
                const queryString = new URLSearchParams(params).toString();
                const requestOptions = {
                  method: "GET",
                  redirect: "follow",
                };
                fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                  .then((res) => {
                    if (res.status !== 400) {
                      return res.text().then((result) => {
                        console.log(JSON.parse(result));
                        setListPlace(JSON.parse(result));
                      });
                    } else {
                      throw new Error("Bad request");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
            className="btn btn-outline-primary cusbtn"
          >
            Tìm kiếm
          </a>
          {lackAddMess !== "" ? (
            <small className="text-danger m-1 p-0">{lackAddMess}</small>
          ) : (
            ""
          )}
        </div>
        <ul
          className="list-group"
          style={{ padding: "12px 0px", paddingTop: "0px" }}
        >
          {listPlace.length !== 0 ? (
            listPlace?.map((item) => {
              return (
                <li
                  style={{ cursor: "pointer" }}
                  key={item?.osm_id}
                  className="list-group-item"
                  onClick={() => {
                    setPosition([item?.lat, item?.lon]);
                    setListPlace([item]);
                    setValue("lat", item?.lat);
                    setValue("lon", item?.lon);
                    const detail =
                      item.display_name +
                      (getValues("detail") === ""
                        ? ""
                        : `, ${getValues("detail")}`);
                    setValue("address", detail);
                    setValue("total", item.display_name);
                    console.log(getValues("total"));
                    setListPlace([]);
                  }}
                >
                  {item?.display_name}
                </li>
              );
            })
          ) : (
            <li className="list-group-item">{getValues("address")}</li>
          )}
        </ul>
        <Map positionSelect={position} />
      </div>
      <ScrollToTop />
    </>
  );
};

export default ThirdStep;
