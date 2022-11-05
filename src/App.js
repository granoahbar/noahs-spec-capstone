import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthContext from "./store/authContext";
import React, { useContext } from "react";

import Header from "./Header/Header";
import Home from "./components/Home/Home";
import Auth from "./components/Auth";
import Form from "./components/Form";
import Badges from "./components/Badges";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          // basically saying you can only route to these pages if there is a authCtx token that exists
          element={!authCtx.token ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/form"
          element={authCtx.token ? <Form /> : <Navigate to="/auth" />}
        />
        <Route
          path="/badges"
          element={authCtx.token ? <Badges /> : <Navigate to="/badges" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
