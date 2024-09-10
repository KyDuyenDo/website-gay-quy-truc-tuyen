import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import ShowMap from "../components/Map/ShowMap";
import {
  faSearch,
  faBullseye,
  faStopwatch,
  faLocationDot,
  faFileCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { getArticlesByLocation } from "../redux/api/articleAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setDataProjects } from "../redux/actions/articleAction";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import iconImage from "../assets/icon.svg";
import LocationiconImage from "../assets/locationIcon.svg";
import "../css/cluster.css";
import { Link } from "react-router-dom";

function ResetCenterView(props) {
  const { position } = props;
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(L.latLng(position[0], position[1]), map.getZoom(), {
        animate: true,
      });
    }
  }, [position]);

  return null;
}

const Map = () => {
  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
  const project = useSelector((state) => state.project.projects);
  const [isSearch, setIsSearch] = useState(true);
  const [isShrink, setIsShrink] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [selectProject, setSelectProject] = useState([9.9265804, 105.7256381]);
  const [detailProject, setDetailProject] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(setDataProjects(""));
        setSearchList([]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const createQuerySearch = (title) => {
    return new Promise((resolve, reject) => {
      try {
        const encodedTitle = title.replace(/ /g, "%20");
        const query = `?q=${encodedTitle}`;
        resolve(query);
      } catch (error) {
        reject(error); // Handle potential errors
      }
    });
  };
  const handleSearchSubmit = async (search) => {
    createQuerySearch(search).then((query) => {
      dispatch(setDataProjects(query));
    });
    if (search != "") {
      const params = {
        q: search,
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
              setLocationList(JSON.parse(result));
            });
          } else {
            throw new Error("Bad request");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    const combinedList = [...project, ...locationList];
    setSearchList(combinedList);
  }, [project, locationList]);

  useEffect(() => {
    if (!selectProject || selectProject.length !== 2) {
      return; // Do nothing if selectProject is undefined or not an array of length 2
    }
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("lon", selectProject[1]);
      formData.append("lat", selectProject[0]);
      try {
        const res = await getArticlesByLocation(formData);
        setDetailProject(res);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchData();
  }, [selectProject]);

  const deadline = (createdAt, expireDate) => {
    const createdDate = new Date(createdAt);
    const deadline = new Date(
      createdDate.setDate(createdDate.getDate() + expireDate + 2)
    ); // Thêm expireDate + 2 ngày
    const today = new Date();
    const daysLeft = Math.floor((deadline - today) / (1000 * 3600 * 24)); // Chuyển đổi mili giây sang ngày

    return daysLeft;
  };

  function toDecimal(number) {
    if (typeof number !== "number") {
      return 0;
    }
    let formattedNumber = number.toLocaleString("en").replace(/,/g, ".");
    return formattedNumber;
  }

  const API_MAPBOX =
    "https://api.mapbox.com/styles/v1/keva2133/clu3sx8ok006h01qr1oxzbd6i/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2V2YTIxMzMiLCJhIjoiY2x1M3NyNjd3MTlzNDJrbnlqenRxeXdqbSJ9.zWd3NeTbrQ_waGdE47ovLA";
  // useEffect to fetch data
  return (
    <div className="contain-map">
      <div className={"campaign " + (isShrink === true ? "shrink" : "")}>
        <div
          onClick={() => {
            setIsShrink(!isShrink);
          }}
          className="shrink-btn"
        >
          <img
            src="//maps.gstatic.com/tactile/pane/arrow_left_2x.png"
            alt="arrow-down"
          />
        </div>
        <div className={"search " + (isShrink === true ? "d-none" : "")}>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên chiến dịch, địa điểm"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (event.target.value !== "") {
                  handleSearchSubmit(event.target.value);
                } else {
                  setSearchList([]);
                }
                setIsSearch(true);
              }
            }}
          />
          <FontAwesomeIcon icon={faSearch} />{" "}
        </div>
        {isSearch === true ? (
          <>
            <span
              className={
                "header-campaign-detail " + (isShrink === true ? "d-none" : "")
              }
            >
              Kết quả tìm kiếm
            </span>
            <div className={"results " + (isShrink === true ? "d-none" : "")}>
              {searchList.length === 0 ? (
                <div className="no-result">
                  <FontAwesomeIcon size="1x" icon={faFileCircleXmark} />
                  <div>Không tìm thấy kết quả phù hợp</div>
                  <p>Hãy thử tìm kiếm nội dung khác hoặc tìm 1 khu vực khác</p>
                </div>
              ) : (
                <div className="results-content">
                  {searchList?.map((item) => {
                    if (item.licence) {
                      return (
                        <div key={item.osm_id} className="result-item">
                          <div className="image">
                            <img src={LocationiconImage} />
                          </div>
                          <div>
                            <p
                              onClick={() => {
                                setIsSearch(false);
                                setSelectProject([
                                  parseFloat(item.lat),
                                  parseFloat(item.lon),
                                ]);
                              }}
                              className="name"
                            >
                              {item.display_name}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={item._id} className="result-item">
                        <div className="image">
                          <img src={iconImage} />
                        </div>
                        <div>
                          <p
                            onClick={() => {
                              setIsSearch(false);
                              setSelectProject([
                                parseFloat(item.address[0].lat),
                                parseFloat(item.address[0].lon),
                              ]);
                            }}
                            className="name"
                          >
                            {item.articletitle}
                          </p>
                          <p className="address">{item.address[0].detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <span
              className={
                "header-campaign-detail " + (isShrink === true ? "d-none" : "")
              }
            >
              Chi tiết chiến dịch
            </span>
            <div
              className={
                "campaign-detail-content " + (isShrink === true ? "d-none" : "")
              }
            >
              {detailProject?.map((project) => {
                return (
                  <div key={project._id}>
                    <div className="image">
                      <img alt="" src={project.image[0]} />
                      <div className="categoryName">
                        <span>{project.category[0].title}</span>
                      </div>
                    </div>
                    <Link to={`/article-detail/${project._id}`}>
                      <h3>{project.articletitle}</h3>
                    </Link>
                    <div className="address">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>{project.address[0].detail}</span>
                    </div>
                    <div className="create-by">
                      Tạo bởi <span>{project.groupName}</span>{" "}
                    </div>
                    <div className="row donate-target">
                      <div className="col-6 donate-target-item">
                        <FontAwesomeIcon icon={faBullseye} />
                        <div>
                          <div>Mục tiêu chiến dịch</div>
                          <div className="number">
                            <span>{toDecimal(project.amountRaised)} VND</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 donate-target-item">
                        <FontAwesomeIcon icon={faStopwatch} />
                        <div>
                          <div>Thời gian còn lại</div>
                          <span className="remain-time">
                            {deadline(project.createdAt, project.expireDate)}{" "}
                            ngày
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr className="horizontalLines" />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <MapContainer
        center={selectProject}
        zoom={13}
        style={{ height: "100vh" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={API_MAPBOX}
        />
        <ShowMap
          selectProject={selectProject}
          setSelectProject={setSelectProject}
        />
        <ResetCenterView position={selectProject} />
      </MapContainer>
    </div>
  );
};

export default Map;
