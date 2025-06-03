import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './courseCard.css'; 

interface CourseCardPopupProps {
    courseNumber: string;
    courseDescription: string;
    onClose: () => void;
}


const CourseCardPopup = ({courseNumber, courseDescription, onClose}: CourseCardPopupProps) => {
    return (
        <div className="course-card">
            <span className="course-title">Course - {courseNumber}</span>
            <p className="course-description">{courseDescription}</p>
            <button className="button-course">
                <FontAwesomeIcon icon={faStar} />
                Favorite Course
            </button>
            <button className="button-course close-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default CourseCardPopup;

