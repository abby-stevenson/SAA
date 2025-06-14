import React from 'react';
import {useUser} from './context/UserContext'
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import './Nav.css';
import Home from "./home/homePage"
import Profile from "./home/profile/profile";
import Discover from "./home/discover/discover";
import Newcastle from './home/discover/universitypage/newcastle';
import Budapest from './home/discover/universitypage/aitbudapest';
import Madrid from './home/discover/universitypage/cieemadrid';
import Seoul from './home/discover/universitypage/seoul';
import Stockholm from './home/discover/universitypage/disstockholm';
import Barcelona from './home/discover/universitypage/iesbarcelona';
import Capetown from './home/discover/universitypage/cieecapetown';
import Copenhagen from './home/discover/universitypage/discopenhagen';
import Sydney from './home/discover/universitypage/unipage';
import Search from "./home/search/search";
import LoginPage from "./login/loginPage";
import LoggedOut from './components/loggedOut/loggedOut';

function Nav() {

    const { logoutMessage, setLogoutMessage } = useUser();

    return (
        <HashRouter>
            <div>
                {logoutMessage && (
                    <div onClick={() => setLogoutMessage(false)}>
                        <LoggedOut />
                    </div>
                )}
                <Routes>
                    <Route path="/"         element={<Navigate to="/SAA/Login"/>}/>
                    <Route path="/SAA/Home/*"   element={<Home/>}/>
                    <Route path="/SAA/Profile/*"   element={<Profile/>}/>
                    <Route path="/SAA/Discover/*"  element={<Discover/>}/>
                    <Route path="/SAA/Search/*"  element={<Search/>}/>
                    <Route path="/SAA/Login/*"  element={<LoginPage/>}/>
                    <Route path="/SAA/USydney" element={<Sydney/>}/>
                    <Route path="/SAA/UniversityofSydney" element={<Sydney/>}/>
                    <Route path="/SAA/Newcastle" element={<Newcastle/>}/>
                    <Route path="/SAA/AITBudapest" element={<Budapest/>}/>
                    <Route path="/SAA/CIEEMadrid" element={<Madrid/>}/>
                    <Route path="/SAA/TEANSeoul" element={<Seoul/>}/>
                    <Route path="/SAA/DISStockholm" element={<Stockholm/>}/>
                    <Route path="/SAA/IESBarcelona" element={<Barcelona/>}/>
                    <Route path="/SAA/CIEECapetown" element={<Capetown/>}/>\
                    <Route path="/SAA/DISCopenhagen" element={<Copenhagen/>}/>
                </Routes>
            </div>
        </HashRouter>


    );
}

export default Nav;
