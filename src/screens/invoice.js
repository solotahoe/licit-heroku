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
import ProductList from "./fields.json";
import { useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function Invoice(props) {
  const location = useLocation();
  //console.log("hfghfhfhfhfhfh");
  //console.log(location.state);
  const { from } = location.state;
  const { amount } = location.state;
  //console.log(from);
  // const BankName = props.match.params.name;
  // const currency = props.match.params.currency;
  // const Quantity = props.match.params.quantity;
  const [Bank, setBank] = useState("INVOICE");
  const [reducedWidth, setreducedWidth] = useState(true);
  const [Opacity, setOpacity] = useState(0);

  const [showLogout, setshowLogout] = useState(false);
  const [shownotification, setshownotification] = useState(false);
  const { products } = ProductList; //destructuring

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
    <div className="invoceSpecial">
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
                    src="/chime.jpg"
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
                    src="/woodforest.jpg"
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
                    src="/barclays.jpg"
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
                    src="/chase.jpg"
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
                    src="/bbva.jpg"
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
            <Link to="/Dashboard" className="SidebarLink">
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
          <div className="confirmationPopUp" style={{ opacity: Opacity }}>
            <span>
              {" "}
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </span>
            No bitcoin Confirmation Detected
            <div className="border-animation"></div>
          </div>
          <div className="bothDivs row">
            <div className="amountNameButton col-md-5">
              <h3 className="priceInvoicePage">
                {/* <i className="fa fa-usd" aria-hidden="true"></i> */}
                {amount}
              </h3>
              <p className="barclaysandCurrency">
                {from} {from == "woodforest" && "[CHECKING ACCOUNT]"}{" "}
                {from == "citibank" && "[CHECKING ACCOUNT]"}{" "}
                {from == "chasebank" &&
                  "BB&T Truist Financial Corporation [Chase Logs (Email + number + password )]"}{" "}
                {from == "cashapp" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "paypal" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "chime" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "wellsfargo" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "zelle" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "venmo" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "skrill" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "huntington" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "barclays" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "bbandt" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "bbva" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "nfcu" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "rbc" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "pnc" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "bbandt" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
                {from == "scotia" &&
                  "Barclays [Current Account (PINsentry disabled)]"}
              </p>
              <button
                className="PrintLogsDetails"
                onClick={() => {
                  setOpacity(!Opacity);
                }}
              >
                {" "}
                <i className="fa fa-print" aria-hidden="true"></i>
                Print Log Details
              </button>
            </div>
            <div className="awaitingPayment col-md-5">
              <div className="awatingPayment">
                <p>
                  <div className="spinnerBorder"></div>Awatingng btc Payment{" "}
                </p>
              </div>
              <div className="addressInvoice">
                38WrfrZ36ENBhfjbBNPKYmNw5UCcodeY4j
              </div>
              <div className="imgqrcode">
                <img
                  src="/qrcode.jpeg"
                  alt="qrcode"
                  className="QrcodeInvoicePage"
                />
              </div>
            </div>
          </div>

          <div className="join">
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
          <div className="footer">
            copyright &copy; 2022 Licitshop.vip All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
