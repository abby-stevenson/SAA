import React from 'react';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import './Nav.css';
import Home from "./home/homePage"
import Profile from "./home/profile/profile";
import Discover from "./home/discover/discover";
import Newcastle from './home/discover/universitypage/newcastle';
import SavedUniversity from "./components/savedUniversity/savedUniversity";
import Budapest from './home/discover/universitypage/aitbudapest';
import Madrid from './home/discover/universitypage/cieemadrid';
import Seoul from './home/discover/universitypage/seoul';
import Stockholm from './home/discover/universitypage/disstockholm';
import Barcelona from './home/discover/universitypage/iesbarcelona';
import Capetown from './home/discover/universitypage/cieecapetown';
import Copenhagen from './home/discover/universitypage/discopenhagen';
import Sydney from './home/discover/universitypage/unipage';
import Search from "./home/search/search";

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
                    <Route path="/SAA/Sydney" element={<Sydney/>}/>
                    <Route path="/SAA/Newcastle" element={<Newcastle/>}/>
                    <Route path="/SAA/AITBudapest" element={<Budapest/>}/>
                    <Route path="/SAA/CIEEMadrid" element={<Madrid/>}/>
                    <Route path="/SAA/TEANSeoul" element={<Seoul/>}/>
                    <Route path="/SAA/DISStockholm" element={<Stockholm/>}/>
                    <Route path="/SAA/IESBarcelona" element={<Barcelona/>}/>
                    <Route path="/SAA/CIEECapetown" element={<Capetown/>}/>\
                    <Route path="/SAA/DISCopenhagen" element={<Copenhagen/>}/>
                    <Route path="/SAA/SavedUniversity/*"  element={<SavedUniversity loc = {"Sydney, AU"} coursesSaved={4} universityName={"University of Technology Sydney"}/>}/>
                </Routes>
            </div>
        </HashRouter>


    );
}

export default Nav;
