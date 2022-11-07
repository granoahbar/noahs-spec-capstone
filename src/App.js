import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthContext from "./store/authContext";
import React, { useContext } from "react";

import Header from "./Header/Header";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Badges from "./components/Badges/Badges";
import NationalParkDetails from "./components/NationalParkDetails/NationalParkDetails";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={!authCtx.token ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/badges"
          element={authCtx.token ? <Badges /> : <Navigate to="/badges" />}
        />
        <Route path="park/:parkCode" element={<NationalParkDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
