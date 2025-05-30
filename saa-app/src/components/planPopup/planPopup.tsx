import React, {useState} from 'react';
import './planPopup.css';
import CourseCard from "../courseCard/courseCard";
import Unicard from "../university-card/unicard";

interface SavedCoursesInfo {
    universityName: string;
    credits: number
    /*savedCourses: Array;*/
}

function PlanPopup({credits, universityName}: SavedCoursesInfo) {
    return (
        <div className={"saved-courses-popup"}>
            <h3 className={"university-header"}>{universityName}</h3>
            <p> "Credits per semester: " {credits}</p>
            <Unicard courseName={"Object Oriented Design"} creditAmount={"4"} location={"yes"} nuCourse={"so true"} uniName={"uni"}/>
        </div>
)
}
//<img src={"/UTS.jpg"} alt="University Photo" />;
export default PlanPopup;