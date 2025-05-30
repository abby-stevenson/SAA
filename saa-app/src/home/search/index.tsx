import React from 'react';
import SideBar from "../../components/sideBar";
import UniCardPopup from "../../../src/components/university-card/unicard";
import './search.css'; 
import SearchBar from '../../components/searchBar/searchbar';




function Search() {
    return (
        <div className = "side-by-side"> 
            <div className = "sidebar">
                <SideBar accountName="John Doe"
                    accountMajor="Computer Science" />
            </div>

            <div className = "rest-of-page"> 
                <SearchBar />
                <UniCardPopup courseName = "ood"
                      uniName='Northeastern University'
                      location='Boston, MA'
                      creditAmount='4'
                      nuCourse='cs3500' /> 

                <UniCardPopup courseName = "algo"
                      uniName='DIS Copenhagen'
                      location='Copenhagen, Denmark'
                      creditAmount='4'
                      nuCourse='cs3000' /> 
                <UniCardPopup courseName = "fundies1"
                      uniName='DIS Stockholm'
                      location='Stockholm, Sweden'
                      creditAmount='5'
                      nuCourse='cs2500' /> 
                <UniCardPopup courseName = "fundies2"
                      uniName='CIEE Madrid'
                      location='Madrid, Spain'
                      creditAmount='5'
                      nuCourse='cs2510' /> 
                <UniCardPopup courseName = "software engineering"
                      uniName='TEAN Seoul'
                      location='Seoul, South Korea'
                      creditAmount='4'
                      nuCourse='cs4530' />
                <UniCardPopup courseName = "ood"
                      uniName='IES Barcelona'
                      location='Barcelona, Spain'
                      creditAmount='4'
                      nuCourse='cs3500' />
                <UniCardPopup courseName = "math of data models"
                      uniName='CIEE Capetown'
                      location='Capetown, South Africa'
                      creditAmount='2'
                      nuCourse='cs1200' /> 
                <UniCardPopup courseName = "intro to college"
                      uniName='USydney'
                      location='Sydney, Australia'
                      creditAmount='4'
                      nuCourse='cs1100' /> 
                <UniCardPopup courseName = "fundamentals of cs"
                      uniName='Newcastle'
                      location='Newcastle, Australia'
                      creditAmount='4'
                      nuCourse='cs2500' /> 
                <UniCardPopup courseName = "fundamentals of cs 2"
                      uniName='AIT-Budapest'
                      location='Budapest, Hungary'
                      creditAmount='4'
                      nuCourse='cs2510' /> 
            </div> 
        </div> 
    );
}
export default Search;



