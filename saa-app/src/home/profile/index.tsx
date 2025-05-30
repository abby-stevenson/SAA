import React from 'react';
import {Link} from "react-router-dom";
import SideBar from "../../components/sideBar";
import "./profile.css";
import SimpleCourseCard from "../../components/simpleCourseCard/simpleCourseCard";
import SavedUniversity from "../../components/savedUniversity";

function Profile() {
    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar accountName="John Doe"
                         accountMajor="Computer Science" />
            </div>
            <div className = "rest-of-page">
                <div>
                    <span className="section-title">My Universities</span>
                    <div className = "university-div">
                            <SavedUniversity universityName={"University of Technology Sydney"}
                                             coursesSaved={4} loc={"Sydney, AU"}/>
                            <SavedUniversity universityName={"IES Barcelona"}
                                             coursesSaved={2} loc={"Barcelona, ES"}/>
                            <SavedUniversity universityName={"DIS Cophenhagen"}
                                             coursesSaved={2} loc={"Cophenhagen, DE"}/>
                            <SavedUniversity universityName={"DIS Cophenhagen"}
                                             coursesSaved={2} loc={"Cophenhagen, DE"}/>
                            <SavedUniversity universityName={"IES Barcelona"}
                                             coursesSaved={2} loc={"Barcelona, ES"}/>
                    </div>
                </div>
                <div className = "all-courses">
                    <span className = "section-title">Recently Viewed Courses</span>
                    <div className="course-grid">
                        <SimpleCourseCard courseNumber='CS3500' />
                        <SimpleCourseCard courseNumber='CS3000' />
                        <SimpleCourseCard courseNumber='CS3800' />
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Profile;

/*
*/
