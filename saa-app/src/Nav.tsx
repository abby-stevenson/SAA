import React from 'react';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import './Nav.css';
import Home from "./home";
import Profile from "./home/profile";
import UniversityThumbnail from './components/universityThumbnail';

function Nav() {
  return (
      <HashRouter>
        <div>
          <Routes>
            <Route path="/"         element={<Navigate to="/Home"/>}/>
            <Route path="/Home/*"   element={<Home/>}/>
              <Route path="/Profile/*"   element={<Profile/>}/>
              <Route path="/UniversityThumbnail/*"  element={<UniversityThumbnail name={""} location={""} />}/>
          </Routes>
        </div>
      </HashRouter>


  );
}

export default Nav;
