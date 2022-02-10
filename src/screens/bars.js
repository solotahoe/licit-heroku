import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Bars() {
  const [Bank, setBank] = useState("CHIME");
  const [reducedWidth, setreducedWidth] = useState(false);
  return (
    <div>
      <div className="bar">
        <div className="logoBox">{Bank}</div>
        <div className="barsDiv">
          <i
            onClick={() => setreducedWidth(!reducedWidth)}
            className="fa fa-bars"
            aria-hidden="true"
          ></i>
          <i className="fa fa-arrows-alt" aria-hidden="true"></i>
        </div>

        <div className="barimagearrow">
          <i className="fa fa-bell-o" aria-hidden="true"></i>{" "}
          <span>
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </span>
        </div>
        <div className="avartarimg barimagearrow">
          <img src="/avartar.jpg" alt="avartarimage" />
          <i className="fa fa-caret-down" aria-hidden="true"></i>
        </div>
      </div>
      {/* sidebar start */}
      <div
        className="sidebar"
        style={{ width: reducedWidth ? "0px" : "240px" }}
      >
        <div className="ulsDiv">
          <Link to="/" className="SidebarLink">
            <p className="homeSidebar">
              {" "}
              <i
                className={
                  reducedWidth
                    ? "fa fa-home expand expandHovered"
                    : "fa fa-home"
                }
                aria-hidden="true"
                title="Home page"
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
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/cashapp.png"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                <span className={reducedWidth ? "toBeHidden" : "show"}>
                  {" "}
                  Cash app logs{" "}
                </span>
              </li>
            </Link>

            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/pay.png"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                Paypal
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/chime.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                Chime
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/wells.png"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                WellsFargo
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/zelle.png"
                    alt="cashaplogs"
                    className="sidebarLogs2"
                  />
                </span>
                Zelle
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/ven.png"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                Venmo
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/skrill.png"
                    alt="cashaplogs"
                    className="sidebarLogs2"
                  />
                </span>
                SKRILL
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/huntington.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                Huntington Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/woodforest.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                Woodforest Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/barclays.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                Barclays Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/citi.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                Citi Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/bbt.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                BB&T Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/bbva.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                BBVA Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/chase.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                Chase Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/nfcu.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                NFCU Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/rbc.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                RBC Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/pnc.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                PNC Bank
              </li>
            </Link>
            <Link to="/" className="SidebarLink">
              <li>
                {" "}
                <span>
                  <img
                    src="/scotia.jpg"
                    alt="cashaplogs"
                    className="sidebarLogs"
                  />
                </span>
                Scotia Bank
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* sidebar end*/}
    </div>
  );
}
