import React, { useState } from "react";
import Bars from "./bars";
import { auth } from "../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import _ from "lodash";
import { Pie, defaults, Line } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Chart as chartjs } from "chart.js/auto";
import ProductList from "./fields.json";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Button } from "bootstrap";

export default function Dashboard() {
  Chart.register(ArcElement);
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  // const data = [
  //   { name: "Geeksforgeeks", students: 400 },
  //   { name: "Technical scripter", students: 700 },
  //   { name: "Geek-i-knack", students: 200 },
  //   { name: "Geek-o-mania", students: 1000 },
  // ];
  const [Bank, setBank] = useState("HOME");
  const [reducedWidth, setreducedWidth] = useState(true);
  const [Opacity, setOpacity] = useState(0);

  const [showLogout, setshowLogout] = useState(false);
  const [shownotification, setshownotification] = useState(false);
  const { products } = ProductList;

  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const navigate = useNavigate();
  const updateWidthAndHeight = () => {
    // console.log(window.innerWidth);
    // console.log(window.innerHeight);
    // setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  };

  const logout = async () => {
    // console.log("haiweaha");
    await signOut(auth);
    navigate("/");
  };

  //console.log(products);

  const pageSize = 10;
  const pageCount = products ? Math.ceil(products.length / pageSize) : 0;
  const [paginatedPost, setPaginatedPost] = useState(
    _(products).slice(0).take(pageSize).value()
  );
  const [currentPage, setCurrentPage] = useState(1);

  // if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(products).slice(startIndex).take(pageSize).value();
    setPaginatedPost(paginatedPost);
  };

  // closing the main menu when a user cliks outside the menu begins here

  window.onmouseup = function (event) {
    //console.log(event.target);
    if (
      event.target !== document.querySelector(".logoutDIV") &&
      event.target !== document.querySelector(".notification") &&
      event.target !== document.querySelector(".fa-caret-down")
    ) {
      setshowLogout(false);
      setshownotification(false);
      //document.querySelector(".sidebar").classList.remove("showSideBar");
    }
  };
  //   if (document.querySelector(".border-animation").style.width == "0px") {
  //     document.querySelector(".border-animation").style.opacity == 1;
  //   } else {
  //     document.querySelector(".border-animation").style.opacity == 0;
  //   }

  //  closing the modal when a user cliks outside the menu ends here
  return (
    <div>
      <div className="bar">
        <div className="logoBox">{Bank}</div>
        <div className={reducedWidth ? "barsDiv2" : "barsDiv"}>
          <i
            onClick={() => setreducedWidth(!reducedWidth)}
            className="fa fa-bars"
            aria-hidden="true"
          ></i>
          <i
            className="fa fa-arrows-alt"
            aria-hidden="true"
            onClick={() => updateWidthAndHeight()}
          ></i>
        </div>

        <div className="barimagearrow">
          <i className="fa fa-bell-o" aria-hidden="true"></i>{" "}
          <span>
            <i
              className="fa fa-caret-down"
              aria-hidden="true"
              onClick={() => {
                setshownotification(!shownotification);
              }}
            ></i>
          </span>
          <div
            className={
              shownotification ? "show notification" : "toBeHidden notification"
            }
          >
            <div className="notification_header">
              Notifications{" "}
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
            <ul>
              <Link to="/chime" className="notificationsLink">
                <li>
                  <img
                    className="notification_imgicon"
                    src="chime.jpg"
                    alt="chimebankimg"
                  />
                  Added 3 New <b>Hungtington logs </b>{" "}
                  <small className="notification-date">20:00 </small>
                </li>
              </Link>
              <Link to="/chime" className="notificationsLink">
                <li>
                  <img
                    className="notification_imgicon"
                    src="woodforest.jpg"
                    alt="chimebankimg"
                  />
                  <b>Sold </b> woodforest logs balance $6,700{" "}
                  <small className="notification-date">06:07 </small>
                </li>
              </Link>
              <Link to="/chime" className="notificationsLink">
                <li>
                  <img
                    className="notification_imgicon"
                    src="barclays.jpg"
                    alt="chimebankimg"
                  />
                  <b>Sold </b> Barclays logs balance $8,150{" "}
                  <small className="notification-date">Yesterday </small>
                </li>
              </Link>
              <Link to="/chime" className="notificationsLink">
                <li>
                  <img
                    className="notification_imgicon"
                    src="chase.jpg"
                    alt="chimebankimg"
                  />
                  <b>Sold </b> BBVA logs balance $6,980{" "}
                  <small className="notification-date">Yesterday </small>
                </li>
              </Link>
              <Link to="/chime" className="notificationsLink">
                <li>
                  <img
                    className="notification_imgicon"
                    src="bbva.jpg"
                    alt="chimebankimg"
                  />
                  <b>Sold </b> woodforest logs balance $6,700{" "}
                  <small className="notification-date">06:07 </small>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="avartarimg barimagearrow">
          <img src="/avartar.jpg" alt="avartarimage" />
          <i
            className="fa fa-caret-down"
            aria-hidden="true"
            onClick={() => {
              setshowLogout(!showLogout);
            }}
          ></i>
          <div
            className={showLogout ? "show logoutDIV" : "toBeHidden logoutDIV"}
            onClick={logout}
          >
            <button> Log Out </button>
          </div>
        </div>
      </div>
      {/* sidebar start */}
      <div>
        <div
          className="sidebar"
          style={{ width: reducedWidth ? "0px" : "240px" }}
        >
          <div className="ulsDiv">
            <Link to="/chime" className="SidebarLink">
              <p className="homeSidebar">
                {" "}
                <i
                  className={
                    reducedWidth
                      ? "fa fa-home expand expandHovered"
                      : "fa fa-home"
                  }
                  aria-hidden="true"
                  title="HOME PAGE "
                ></i>
                <span className={reducedWidth ? "toBeHidden" : "show"}>
                  {" "}
                  Home Page{" "}
                </span>
                {/* <div
                className={
                  reducedWidth ? "show expandhiddendiv" : "toBeHidden "
                }
              >
                {" "}
                Home Page
              </div> */}
              </p>
            </Link>

            <ul>
              <Link to="/cashapplogs" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/cashapp.png"
                      alt="cashaplogs"
                      title="CASHAPP LOGS"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    <span className={reducedWidth ? "toBeHidden" : "show"}>
                      {" "}
                      Cash App Logs{" "}
                    </span>
                  </span>
                </li>
              </Link>

              <Link to="/paypal" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/pay.png"
                      alt="cashaplogs"
                      title="PAYPAL"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Paypal{" "}
                  </span>
                </li>
              </Link>
              <Link to="/chime" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/chime.jpg"
                      alt="cashaplogs"
                      title="CHIME"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Chime{" "}
                  </span>
                </li>
              </Link>
              <Link to="/wellsfargo" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/wells.png"
                      alt="cashaplogs"
                      title="WELLSFARGO"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    WellsFargo{" "}
                  </span>
                </li>
              </Link>
              <Link to="/zelle" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/zelle.png"
                      alt="cashaplogs"
                      title="ZELLE"
                      className={
                        reducedWidth
                          ? "sidebarLogs2 expand expandHovered"
                          : "sidebarLogs2"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Zelle{" "}
                  </span>
                </li>
              </Link>
              <Link to="/venmo" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/ven.png"
                      alt="cashaplogs"
                      title="VENMO"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Venmo{" "}
                  </span>
                </li>
              </Link>
              <Link to="/skrill" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/skrill.png"
                      alt="cashaplogs"
                      title="SKRILL"
                      className={
                        reducedWidth
                          ? "sidebarLogs2 expand expandHovered"
                          : "sidebarLogs2"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    SKRILL{" "}
                  </span>
                </li>
              </Link>
              <Link to="/huntingtonbank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/huntington.jpg"
                      alt="cashaplogs"
                      title="HUNTINGTON BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Huntington Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/woodforestbank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/woodforest.jpg"
                      alt="cashaplogs"
                      title="WOODFOREST BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Woodforest Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/barclaysbank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/barclays.jpg"
                      alt="cashaplogs"
                      title="BARCLAYS BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Barclays Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/citbank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/citi.jpg"
                      alt="cashaplogs"
                      title="CITI BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Citi Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/bbandt" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/bbt.jpg"
                      alt="cashaplogs"
                      title="BBT&T BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    BB&T Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/bbvabank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/bbva.jpg"
                      alt="cashaplogs"
                      title="BBVA BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    BBVA Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/chasebank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/chase.jpg"
                      alt="cashaplogs"
                      title="CHASE BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Chase Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/nfcubank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/nfcu.jpg"
                      alt="cashaplogs"
                      title="NFCU BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    NFCU Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/rbcbank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/rbc.jpg"
                      alt="cashaplogs"
                      title="RBC BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    RBC Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/pncbank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/pnc.jpg"
                      alt="cashaplogs"
                      title="PNC BANK"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    PNC Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/scotiabank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/scotia.jpg"
                      alt="cashaplogs"
                      title="scotia"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Scotia Bank{" "}
                  </span>
                </li>
              </Link>
              <Link to="/scotiabank" className="SidebarLink">
                <li>
                  {" "}
                  <span>
                    <img
                      src="/scotia.jpg"
                      alt="cashaplogs"
                      title="scotia"
                      className={
                        reducedWidth
                          ? "sidebarLogs expand expandHovered"
                          : "sidebarLogs"
                      }
                    />
                  </span>
                  <span className={reducedWidth ? "toBeHidden" : "show"}>
                    {" "}
                    Scotia Bank{" "}
                  </span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        {/* sidebar end*/}
        <div
          className={
            reducedWidth ? "pamela2 invoicepage" : "pamela invoicepage"
          }
        >
          <div className="dashboardContainer row">
            <div className="col-md-2 card cardi">
              <span className="smart-figure">
                <i className="fa fa-usd dashboradpage" aria-hidden="true"></i>
                815,233{" "}
              </span>
              <p className="stats-info">Net Sales</p>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-info progress-bar-animated"
                  role="progressbar"
                  style={{ width: "81%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <i className="fa fa-usd toBeAbsolute" aria-hidden="true"></i>
            </div>
            <div className="col-md-3 card cardi">
              <span className="smart-figure">+258</span>
              <p className="stats-info">New Cashapp Logs</p>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-danger progress-bar-animated"
                  role="progressbar"
                  style={{ width: "81%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <i
                className="fa fa-download toBeAbsolute cc2"
                aria-hidden="true"
              ></i>
            </div>
            <div className="col-md-2 card cardi">
              <span className="smart-figure">+952</span>
              <p className="stats-info">New Users</p>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-warning progress-bar-animated"
                  role="progressbar"
                  style={{ width: "81%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <i
                className="fa fa-user-plus toBeAbsolute cc3"
                aria-hidden="true"
              ></i>
            </div>
            <div className="col-md-2 card cardi">
              <span className="smart-figure">58%</span>
              <p className="stats-info">New Logins</p>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-success progress-bar-animated"
                  role="progressbar"
                  style={{ width: "81%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <i
                className="fa fa-tasks toBeAbsolute cc4"
                aria-hidden="true"
              ></i>
            </div>
          </div>

          <div className="row dashboardTables">
            <div className="col-md-3 card card-white card-white2">
              <h4 className="dashbitcoinPrice">BITCOIN PRICE</h4>
              <p className="priceDash">$ 35,779.0</p>
              <p className="priceDash">0</p>
              <p className="priceDash toddahs">Today</p>
            </div>
            <div className="col-md-3 card card-white">
              <h4 className="dashbitcoinPrice">BITCOIN PRICE</h4>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>$6,543</td>
                    <td>Woodforest</td>
                    <td>
                      <span className="label_success">Sold</span>
                    </td>
                    <td>kingsafari728@gmail.com</td>
                  </tr>
                  <tr>
                    <td>$7,114</td>
                    <td>Huntington</td>
                    <td>
                      <span className="label_success">Sold</span>
                    </td>
                    <td>meylingchang5@gmai.com</td>
                  </tr>
                  <tr>
                    <td>$2,685</td>
                    <td>Chase Bank</td>
                    <td>
                      <span className="label_success2">Denied</span>
                    </td>
                    <td>silveriom266@gmail.com</td>
                  </tr>
                  <tr>
                    <td>$5,900</td>
                    <td>Huntington</td>
                    <td>
                      <span className="label_success">Sold</span>
                    </td>
                    <td>tonymccage55@gmail.com</td>
                  </tr>
                  <tr>
                    <td>$17,410</td>
                    <td>PNC Bank</td>
                    <td>
                      <span className="label_success">Sold</span>
                    </td>
                    <td>philltravis87@gmail.com</td>
                  </tr>
                  <tr>
                    <td>$16,280</td>
                    <td>Barclays</td>
                    <td>
                      <span className="label_success3">Sold</span>
                    </td>
                    <td>sharonrizz21@gmail.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-3 card card-white card-white2">
              <h4 className="dashbitcoinPrice">BROWSERS</h4>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>
                      <i className="fa fa-chrome krome" aria-hidden="true"></i>
                      Google Chrome
                    </td>
                    <td className="level-up">
                      29%{" "}
                      <i
                        className="fa fa-level-up krome"
                        aria-hidden="true"
                      ></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fa fa-firefox krome" aria-hidden="true"></i>
                      Firefox
                    </td>
                    <td className="level-up">
                      28% <i className="fa fa-level-up" aria-hidden="true"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i
                        className="fa fa-internet-explorer krome"
                        aria-hidden="true"
                      ></i>
                      Internet Explorer
                    </td>
                    <td className="level-up">
                      18% <i className="fa fa-level-up" aria-hidden="true"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fa fa-safari krome" aria-hidden="true"></i>
                      Safari
                    </td>
                    <td className="level-down">
                      11%{" "}
                      <i className="fa fa-level-down" aria-hidden="true"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fa fa-opera krome" aria-hidden="true"></i>
                      Opera
                    </td>
                    <td className="level-down">
                      6% <i className="fa fa-level-down" aria-hidden="true"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fa fa-tablet krome" aria-hidden="true"></i>
                      Mobile & tablet
                    </td>
                    <td className="level-up">
                      5% <i className="fa fa-level-up" aria-hidden="true"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="fa fa-hashtag krome" aria-hidden="true"></i>
                      Others
                    </td>
                    <td className="level-up">
                      18% <i className="fa fa-level-up" aria-hidden="true"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row graphs">
            <div className="col-md-5">
              <input
                type="text"
                placeholder="Add Review"
                className="addReview form-control"
              />
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    href="#pills-home"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    All
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    href="#pills-profile"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    positive
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-contact-tab"
                    data-toggle="pill"
                    href="#pills-contact"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Critical
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <ul className="tabConttent">
                    <li>
                      <input type="checkbox" className="tabConttentChek" />
                      <span>Huntington log worked</span>
                    </li>
                    <li>
                      <input type="checkbox" className="tabConttentChek" />
                      <span>That was fast</span>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="tabConttentChek"
                        checked
                      />
                      <span className="toBeStrikeThur">
                        Had to wait almost 30 mins to get my log &#128557;
                      </span>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="tabConttentChek"
                        checked
                      />
                      <span className="toBeStrikeThur">
                        Why is there no high balances above 50k
                      </span>
                    </li>
                    <li>
                      <input type="checkbox" className="tabConttentChek" />
                      <span>Wish I found this site Years ago</span>
                    </li>
                    <li>
                      <input type="checkbox" className="tabConttentChek" />
                      <span>Mark all as read</span>
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <ul className="tabConttent">
                    <li>
                      <input type="checkbox" className="tabConttentChek" />
                      <span>Huntington log worked</span>
                    </li>
                    <li>
                      <input type="checkbox" className="tabConttentChek" />
                      <span>That was fast</span>
                    </li>

                    <li>
                      <input type="checkbox" className="tabConttentChek" />
                      <span>Wish I found this site Years ago</span>
                    </li>
                    <li>
                      <input type="checkbox" className="tabConttentChek" />
                      <span>Mark all as read</span>
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <ul className="tabConttent">
                    <li>
                      <input
                        type="checkbox"
                        className="tabConttentChek"
                        checked
                      />
                      <span className="toBeStrikeThur">
                        Had to wait almost 30 mins to get my log &#128557;
                      </span>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="tabConttentChek"
                        checked
                      />
                      <span className="toBeStrikeThur">
                        Why is there no high balances above 50k
                      </span>
                    </li>
                    <li>
                      <input type="checkbox" className="tabConttentChek" />
                      <span>Mark all as read</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4  Graphs">
              <h3>CASHAPP LOGS DISTRIBUTION</h3>
              <div style={{ width: "100%" }}>
                <Pie
                  data={{
                    labels: [
                      "Huntington",
                      "Woodforest",
                      "Barclays",
                      "BB&T",
                      "BBVA",
                      "Chase",
                      "NFCU",
                      "RBC",
                      "PNC",
                      "Scotia",
                    ],
                    datasets: [
                      {
                        label: "# of votes",
                        data: [24, 19, 22, 27, 12, 27, 21, 26, 22, 18],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.5)",
                          "rgba(54, 162, 235, 0.5)",
                          "rgba(150, 86, 34,0.5)",
                          "rgba(75, 192, 192, 0.5)",
                          "rgb(47, 160, 16)",
                          "rgba(25, 40, 224, 0.48)",
                          "rgba(204, 150, 211,0.5)",
                          "#2c13ba",
                          "rgba(255, 2, 184, 0.92)",
                          "rgba(17, 21, 7, 0.52)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(150, 86, 34,0.1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(47, 160, 16,0.1)",
                          "rgba(25, 40, 224, 0.1)",
                          "rgba(204, 150, 211,0.1)",
                          "rgba(53, 48, 47,0.1)",
                          "rgba(255, 2, 184, 0.12)",
                          "rgba(17, 21, 7, 0.12)",
                        ],
                        borderWidth: 1,
                      },
                      // {
                      //   label: 'Quantity',
                      //   data: [47, 52, 67, 58, 9, 50],
                      //   backgroundColor: 'orange',
                      //   borderColor: 'red',
                      // },
                    ],
                  }}
                  height={400}
                  width={600}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                    legend: {
                      labels: {
                        fontSize: 25,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="join Fashboard">
              <img
                className="telegramIcon"
                src="/telegram.png"
                alt="telegram icon"
              />{" "}
              <a
                href="https://t.me/gracefidel"
                target="_blank"
                className="joinLinkhref"
              >
                {" "}
                <span className="joinChartSpan">Join Chart</span>
              </a>
            </div>
            <div className="footer Fashboard">
              copyright &copy; 2022 Licitshop.vip All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
