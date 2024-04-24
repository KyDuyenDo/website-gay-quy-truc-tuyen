import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
import BecomeFundraiser from "./BecomeFundraiser";
import ProjectCategories from "./ProjectCategories";
import Project from "./Project";
import Member from "./Member";
import ArticleDetail from "./ArticleDetail";
import MemberDetail from "./MemberDetail";
import Payment from "./Payment";
import Map from "./Map";
// import Management from "./Management";
import "../css/management.css";
import {
  faChartLine,
  faBell,
  faClockRotateLeft,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashBoard from "../components/DashBroad/DashBoard";
import Notify from "../components/DashBroad/Notify";
import ProjectHistory from "../components/DashBroad/ProjectHistory";
import ManagementProject from "../components/DashBroad/ManagementProject";
import ProjectEdit from "../components/DashBroad/ProjectEdit";
import VerifyEmail from "./VerifyEmail";
import EmailVerifiedMessage from "./EmailVerifiedMessage";
import ProjectCreate from "./ProjectCreate";
import AdminDashBoard from "./Admin/AdminDashBoard";
import EidtProfile from "./EidtProfile";
import AdDashBoard from "../components/Admin/AdDashBoard";
import AdRequest from "../components/Admin/AdRequest";
import AdProject from "../components/Admin/AdProject";
import AdUsers from "../components/Admin/AdUsers";

function Index() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/verify" exact element={<VerifyEmail />} />
          <Route path="/admin" exact element={<AdminDashBoard />}>
            <Route path="/admin/dashboar" element={<AdDashBoard />} />
            <Route path="/admin/request" element={<AdRequest />} />
            <Route path="/admin/project" element={<AdProject />} />
            <Route path="/admin/user" element={<AdUsers />} />
          </Route>
          <Route
            path="/email-verified"
            exact
            element={<EmailVerifiedMessage />}
          />
          <Route element={<MainLayout />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/payment/:id" exact element={<Payment />} />
            <Route
              path="/become-a-fundraiser"
              exact
              element={<BecomeFundraiser />}
            />
            <Route path="/create-project" exact element={<ProjectCreate />} />
            <Route
              path="/article-detail/:id"
              exact
              element={<ArticleDetail />}
            />
            <Route path="/project" exact element={<Project />} />
            <Route path="/member" exact element={<Member />} />
            <Route
              path="/project-categories"
              exact
              element={<ProjectCategories />}
            />
            <Route path="/member-detail/:id" exact element={<MemberDetail />} />
            <Route path="/profile" exact element={<EidtProfile />} />
            <Route path="/map" exact element={<Map />} />
            <Route path="/management" exact element={<Management />}>
              <Route path="/management" exact element={<DashBoard />} />
              <Route path="/management/notify" exact element={<Notify />} />
              <Route
                path="/management/history"
                exact
                element={<ProjectHistory />}
              />
              <Route
                path="/management/management_project"
                exact
                element={<ManagementProject />}
              />
              <Route
                path="/management/management_project/:id"
                exact
                element={<ProjectEdit />}
              />
            </Route>
          </Route>
        </Routes>
        <ScrollToTop />
      </Router>
    </>
  );
}

function Management() {
  return (
    <div className="contain-bg">
      <div className="container-fluid contain-main">
        <div className="row">
          <div className="col-md-12 col-xl-3">
            <div className="card-menu">
              <ul className="contain-item-menu">
                <li className="item-menu">
                  <Link to="/management">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faChartLine}
                    ></FontAwesomeIcon>{" "}
                    <span>Tổng quan</span>
                  </Link>
                </li>
                <li className="item-menu">
                  <Link to="/management/notify">
                    <FontAwesomeIcon size="lg" icon={faBell}></FontAwesomeIcon>
                    <span>Thông báo</span>
                  </Link>
                </li>
                <li className="item-menu">
                  <Link to="/management/history">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faClockRotateLeft}
                    ></FontAwesomeIcon>
                    <span>Lịch sử quyên góp</span>
                  </Link>
                </li>
                <li className="item-menu">
                  <Link to="/management/management_project">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faListCheck}
                    ></FontAwesomeIcon>{" "}
                    <span>Quản lý chiến dịch</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12 col-xl-9">
            <div className="board-main">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="page-wraper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Index;
