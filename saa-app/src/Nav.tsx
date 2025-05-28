import React from 'react';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import './Nav.css';
import Home from "./home";
import Profile from "./home/profile";
import UniversityThumbnail from './components/universityThumbnail';
import Discover from "./home/discover";
import Search from "./home/search";
import MyPlan from "./home/profile/myuniversity/myplan";
import SavedUniversity from "./components/savedUniversity";

function Nav() {
  return (
      <HashRouter>
        <div>
          <Routes>
              <Route path="/"         element={<Navigate to="/SAA/Home"/>}/>
              <Route path="/SAA/Home/*"   element={<Home/>}/>
              <Route path="/SAA/Profile/*"   element={<Profile/>}/>
              <Route path="/SAA/UniversityThumbnail/*"  element={<UniversityThumbnail location={"sydney"} name={"test"}/>}/>
              <Route path="/SAA/Discover/*"  element={<Discover/>}/>
              <Route path="/SAA/Search/*"  element={<Search/>}/>
              <Route path="/SAA/Plan/*"  element={<MyPlan/>}/>
              <Route path="/SAA/SavedUniversity/*"  element={<SavedUniversity loc = {"Sydney, AU"} coursesSaved={4} universityName={"University of Technology Sydney"}/>}/>
          </Routes>
        </div>
      </HashRouter>


  );
}

export default Nav;
