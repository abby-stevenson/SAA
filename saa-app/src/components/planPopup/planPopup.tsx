import React, {useState} from 'react';
import './planPopup.css';
import CourseCard from "../courseCard/courseCard";
import Unicard from "../university-card/unicard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

interface Course {
    courseName: string;
    creditAmount: string;
    location: string;
    nuCourse: string;
    uniName: string;
}

interface SavedCoursesInfo {
    credits: number;
    universityName: string;
    savedCourses: Course[];
}

function PlanPopup({ credits, universityName, savedCourses }: SavedCoursesInfo) {
    return (
        <div className="saved-courses-popup">
            <div className="delete-button">
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <h3 className="university-header">{universityName}</h3>
            <div className="max-credits">Max Credits per Semester: {credits}</div>
            <div className="courses-list">
                {savedCourses.map((course, index) => (
                    <>
                        <Unicard
                            key={index}
                            courseName={course.courseName}
                            creditAmount={course.creditAmount}
                            location={course.location}
                            nuCourse={course.nuCourse}
                            uniName={course.uniName}/>
                        <hr/>
                    </>
                ))}
            </div>
        </div>
    );
}

//<img src={"/UTS.jpg"} alt="University Photo" />;
export default PlanPopup;