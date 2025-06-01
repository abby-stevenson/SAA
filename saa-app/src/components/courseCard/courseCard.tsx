import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './courseCard.css'; 

interface CourseCardPopupProps {
  courseNumber: string;
  courseDescription: string;
}

const CourseCardPopup = ({ courseNumber, courseDescription }: CourseCardPopupProps) => {
  return (
    <div className="course-card">
      <span className="course-title">Course - {courseNumber}</span>
      <p className="course-description">{courseDescription}</p>
      <button className="favorite-button">
        <FontAwesomeIcon icon={faStar} />
        Favorite Course
      </button>
    </div>
  );
};

export default CourseCardPopup;

