import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./Authenticate";
import Dashboard from "./Dashboard";
import About from "./About";


import Home from "./Home";

const App = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    localStorage.setItem("user", auth);
  }, [auth]);

  return (
    <div className="landing"style={{zIndex:0, margin:"0px", position:"fixed"}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />


        {!auth && (
          <Route
            path="/auth"
            element={
              <Auth authenticate={(val) => setAuth(val === 1 ? true : false)} />
            }
          />
        )}

        {auth && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={auth ? "/dashboard" : "/auth"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
