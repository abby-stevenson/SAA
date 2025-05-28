import React from 'react';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import './Nav.css';
import Home from "./home";
import Profile from "./home/profile";
import Discover from "./home/discover";
import Search from "./home/search";
import MyPlan from "./home/profile/myuniversity/myplan";
import UniPage from './home/discover/universitypage/unipage';
import SavedUniversity from "./components/savedUniversity";
import UniversityThumbnail from "./components/universityThumbnail/universityThumbnail";

function Nav() {
  return (
      <HashRouter>
        <div>
          <Routes>
              <Route path="/"         element={<Navigate to="/SAA/Home"/>}/>
              <Route path="/SAA/Home/*"   element={<Home/>}/>
              <Route path="/SAA/Profile/*"   element={<Profile/>}/>
              <Route path="/SAA/Discover/*"  element={<Discover/>}/>
              <Route path="/SAA/Search/*"  element={<Search/>}/>
              <Route path="/SAA/Plan/*"  element={<MyPlan/>}/>
              <Route path="/SAA/University" element={<UniPage/>}/>
              <Route path="/SAA/SavedUniversity/*"  element={<SavedUniversity loc = {"Sydney, AU"} coursesSaved={4} universityName={"University of Technology Sydney"}/>}/>
          </Routes>
        </div>
      </HashRouter>


  );
}

export default Nav;
