import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import ShowMap from "../components/Map/ShowMap";
import {
  faSearch,
  faBullseye,
  faStopwatch,
  faLocation,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setDataProjects } from "../redux/actions/articleAction";
import { useDispatch } from "react-redux";
import "leaflet/dist/leaflet.css";
import iconImage from "../assets/icon.svg";
import { useQuery } from "react-query";

import "../css/cluster.css";

const Map = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isShrink, setIsShrink] = useState(false);
  const [selectProject, setSelectProject] = useState({
    lon: "",
    lat: "",
  });
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await dispatch(setDataProjects(""));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const data = [
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.633318",
        street: {
          id: 1738276,
          name: "On or near Nightclub",
        },
        longitude: "-1.134798",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117052825,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.632743",
        street: {
          id: 1737208,
          name: "On or near Stretton Road",
        },
        longitude: "-1.153471",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053169,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.631302",
        street: {
          id: 1738955,
          name: "On or near Lincoln Street",
        },
        longitude: "-1.120978",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053170,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.635488",
        street: {
          id: 1738121,
          name: "On or near Carts Lane",
        },
        longitude: "-1.136395",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053171,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.635401",
        street: {
          id: 1738659,
          name: "On or near Parking Area",
        },
        longitude: "-1.128314",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053187,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.631409",
        street: {
          id: 1738709,
          name: "On or near East Street",
        },
        longitude: "-1.127034",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053188,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.635399",
        street: {
          id: 1738303,
          name: "On or near Shopping Area",
        },
        longitude: "-1.134107",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053191,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.636857",
        street: {
          id: 1738642,
          name: "On or near St James Street",
        },
        longitude: "-1.128211",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053197,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.634787",
        street: {
          id: 1737952,
          name: "On or near Parking Area",
        },
        longitude: "-1.139010",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053205,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.633897",
        street: {
          id: 1738339,
          name: "On or near Shopping Area",
        },
        longitude: "-1.133974",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117052565,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.631154",
        street: {
          id: 1738689,
          name: "On or near Parking Area",
        },
        longitude: "-1.127689",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053206,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.617006",
        street: {
          id: 1739022,
          name: "On or near Hartopp Road",
        },
        longitude: "-1.120777",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053209,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.636623",
        street: {
          id: 1737784,
          name: "On or near Ruding Street",
        },
        longitude: "-1.142978",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053211,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.617006",
        street: {
          id: 1739022,
          name: "On or near Hartopp Road",
        },
        longitude: "-1.120777",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053212,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.628421",
        street: {
          id: 1739436,
          name: "On or near Chandos Street",
        },
        longitude: "-1.111994",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117052763,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.624479",
        street: {
          id: 1737381,
          name: "On or near Stuart Street",
        },
        longitude: "-1.150676",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117053223,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.618158",
        street: {
          id: 1738119,
          name: "On or near Putney Road West",
        },
        longitude: "-1.135525",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117052877,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.642049",
        street: {
          id: 1738480,
          name: "On or near Navigation Street",
        },
        longitude: "-1.131256",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117052760,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.635528",
        street: {
          id: 1738700,
          name: "On or near Theatre/concert Hall",
        },
        longitude: "-1.127553",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117052843,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.636557",
        street: {
          id: 1737701,
          name: "On or near All Saints Road",
        },
        longitude: "-1.143748",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117052759,
      location_subtype: "",
      month: "2024-02",
    },
    {
      category: "anti-social-behaviour",
      location_type: "Force",
      location: {
        latitude: "52.637627",
        street: {
          id: 1738668,
          name: "On or near Eldon Street",
        },
        longitude: "-1.127782",
      },
      context: "",
      outcome_status: null,
      persistent_id: "",
      id: 117052808,
      location_subtype: "",
      month: "2024-02",
    },
  ];

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
                // dispatch tim kiem o day
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
              <div className="results-content">
                <div className="result-item">
                  <div className="image">
                    <img src={iconImage} />
                  </div>
                  <div>
                    <p className="name">Vận động 1000 tấm Bản Đồ Việt Nam</p>
                    <p className="address">
                      Làng Trẻ Em Sos Bến Tre,Phường 6,Thành phố Bến Tre,Tỉnh
                      Bến Tre
                    </p>
                  </div>
                </div>
                <div className="result-item">
                  <div className="image">
                    <img src={iconImage} />
                  </div>
                  <div>
                    <p className="name">Vận động 1000 tấm Bản Đồ Việt Nam</p>
                    <p className="address">
                      Làng Trẻ Em Sos Bến Tre,Phường 6,Thành phố Bến Tre,Tỉnh
                      Bến Tre
                    </p>
                  </div>
                </div>
                <div className="result-item">
                  <div className="image">
                    <img src={iconImage} />
                  </div>
                  <div>
                    <p className="name">Vận động 1000 tấm Bản Đồ Việt Nam</p>
                    <p className="address">
                      Làng Trẻ Em Sos Bến Tre,Phường 6,Thành phố Bến Tre,Tỉnh
                      Bến Tre
                    </p>
                  </div>
                </div>
                <div className="result-item">
                  <div className="image">
                    <img src={iconImage} />
                  </div>
                  <div>
                    <p className="name">Vận động 1000 tấm Bản Đồ Việt Nam</p>
                    <p className="address">
                      Làng Trẻ Em Sos Bến Tre,Phường 6,Thành phố Bến Tre,Tỉnh
                      Bến Tre
                    </p>
                  </div>
                </div>
              </div>
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
              <div>
                <div className="image">
                  <img
                    alt=""
                    src="https://static.thiennguyen.app/public/donate-target/photo/2024/2/26/d929e302-313e-483d-9ac4-c084f6965f01.jpg"
                  />
                  <div className="categoryName">
                    <span>Người nghèo</span>
                  </div>
                </div>
                <h3>XUÂN YÊU THƯƠNG - 100 CẢ MỔ TÌM LẠI ÁNH SÁNG</h3>
                <div className="address">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>
                    190 Lê Cơ,Phường An Lạc,Quận Bình Tân,Thành phố Hồ Chí Minh
                  </span>
                </div>
                <div className="create-by">
                  Tạo bởi <span>Nguyen Huy Phat</span>{" "}
                </div>
                <div className="row donate-target">
                  <div className="col-6 donate-target-item">
                    <FontAwesomeIcon icon={faBullseye} />
                    <div>
                      <div>Mục tiêu chiến dịch</div>
                      <div className="number">
                        <span>100.000.000 VND</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 donate-target-item">
                    <FontAwesomeIcon icon={faStopwatch} />
                    <div>
                      <div>Thời gian còn lại</div>
                      <span className="remain-time">Đã kết thúc</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="horizontalLines" />
            </div>
          </>
        )}
      </div>
      <MapContainer
        center={[52.629729, -1.131592]}
        zoom={13}
        style={{ height: "100vh" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={API_MAPBOX}
        />
        <ShowMap data={data} setSelectProject={setSelectProject} />
      </MapContainer>
    </div>
  );
};

export default Map;
