import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/home";
import Login from "./screens/login";
import Bars from "./screens/bars";
import Chime from "./screens/chime";
import Cashapplogs from "./screens/Cashapplogs";
import Paypal from "./screens/Paypal";
import WellsFargo from "./screens/WellsFargo";
import Zelle from "./screens/Zelle";
import Venmo from "./screens/Venmo";
import Skrill from "./screens/Skrill";
import Huntingtonbank from "./screens/Huntingtonbank";
import Woodforestbank from "./screens/Woodforestbank";
import Barclaysbank from "./screens/Barclaysbank";
import Citibank from "./screens/Citibank";
import Bbandtbank from "./screens/Bbandtbank";
import Bbvabank from "./screens/Bbvabank";
import chasebank from "./screens/chasebank";
import Nfcubank from "./screens/Nfcubank";
import Chasebank from "./screens/chasebank";
import Rbcbank from "./screens/Rbcbank";
import Pncbank from "./screens/Pncbank";
import Scotiabank from "./screens/Scotiabank";
import Invoice from "./screens/invoice";
import Dashboard from "./screens/dashboad";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Login />} />
        <Route path="/register" exact={true} element={<Home />} />
        <Route path="/bars" exact={true} element={<Bars />} />
        <Route path="/chime" exact={true} element={<Chime />} />
        <Route path="/cashapplogs" exact={true} element={<Cashapplogs />} />
        <Route path="/paypal" exact={true} element={<Paypal />} />
        <Route path="/wellsfargo" exact={true} element={<WellsFargo />} />
        <Route path="/zelle" exact={true} element={<Zelle />} />
        <Route path="/venmo" exact={true} element={<Venmo />} />
        <Route path="/skrill" exact={true} element={<Skrill />} />
        <Route path="/barclaysbank" exact={true} element={<Barclaysbank />} />
        <Route path="/citbank" exact={true} element={<Citibank />} />
        <Route path="/bbandt" exact={true} element={<Bbandtbank />} />
        <Route path="/bbvabank" exact={true} element={<Bbvabank />} />
        <Route path="/chasebank" exact={true} element={<Chasebank />} />
        <Route path="/nfcubank" exact={true} element={<Nfcubank />} />
        <Route path="/rbcbank" exact={true} element={<Rbcbank />} />
        <Route path="/pncbank" exact={true} element={<Pncbank />} />
        <Route path="/scotiabank" exact={true} element={<Scotiabank />} />
        <Route
          path="/invoice/:bankname/:amount"
          exact={true}
          element={<Invoice />}
        />
        <Route
          path="/
        "
          exact={true}
          element={<Dashboard />}
        />
        <Route
          path="/woodforestbank"
          exact={true}
          element={<Woodforestbank />}
        />
        <Route
          path="/huntingtonbank"
          exact={true}
          element={<Huntingtonbank />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
