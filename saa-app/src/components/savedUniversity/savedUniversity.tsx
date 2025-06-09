import { useState } from 'react';
import Popup from 'reactjs-popup';
import PlanPopup from "../planPopup/planPopup";
import './savedUniversity.css';
import {StudyAbroadCourse} from "../../home/search/search";
import {Course} from "../planPopup/planPopup";

interface UniversityInfo {
    universityName: string;
    numCoursesSaved: number;
    loc: string;
    coursesSaved: StudyAbroadCourse[];
}

function SavedUniversity({ loc, universityName, numCoursesSaved, coursesSaved }: UniversityInfo) {
    const [isOpen, setIsOpen] = useState(false);
    const urlPath = universityName.replace(/ /g, "") + ".png";

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
    };


    return (
        <>
            <div className="saved-university-card" onClick={openModal}>
                <img className="circle-crop" src={urlPath} alt="University" />
                <h3 className="university-header">{universityName}</h3>
                <div className="location-container">
                    <img src="Leading icon.png" alt="Location" />
                    <span>{loc}</span>
                </div>
                <p className="courses-saved-text">{numCoursesSaved} Courses Saved</p>
            </div>

            <Popup
                open={isOpen}
                onClose={closeModal}
                modal
                nested
                overlayStyle={{
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(2px)'
                }}
            >
                <PlanPopup
                    credits={20}
                    universityName={universityName}
                    savedCourses={coursesSaved.map(
                        (course): Course => ({
                            nuCourse: course.courseNumber,
                            courseName: course.courseTitle,
                            creditAmount: course.credits,
                            location: course.universityCity + ", " + course.universityCountry,
                            uniName: course.universityName
                        })
                    )}
                    onClose={closeModal}
                />
            </Popup>
        </>
    );
}

export default SavedUniversity;