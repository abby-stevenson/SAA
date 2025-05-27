import React from 'react';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import './Nav.css';
import Home from "./home";
import Profile from "./home/profile";

function Nav() {
  return (
      <HashRouter>
        <div>
          <Routes>
            <Route path="/"         element={<Navigate to="/Home"/>}/>
            <Route path="/Home/*"   element={<Home/>}/>
              <Route path="/Profile/*"   element={<Profile/>}/>
          </Routes>
        </div>
      </HashRouter>


  );
}

export default Nav;
