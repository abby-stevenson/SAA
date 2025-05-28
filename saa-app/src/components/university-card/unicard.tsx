import './unicard.css'; 
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface UniPopupProps {
    courseName: string;
    uniName: string;
    location: string;
    creditAmount: string;
    nuCourse: string;
  }
  
  const UniCardPopup = ({ courseName, uniName, location, creditAmount, nuCourse }: UniPopupProps) => {
    return (
        <div className="uni-card">
        <div className="uni-card-row">
      
      {/* Image on the left */}
      <img src="uni.png" alt="University" className="uni-image" />

      {/* Text on the right */}
      <div className="uni-card-text">
        <div className="uni-course">{uniName} - {courseName}</div>
        <div className="secondLine">{location} • {nuCourse} • {creditAmount}</div>
      </div>

      {/* Star Button */}
      <div className="button-wrapper">
        <button className="favorite-button">
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>
    </div>
  </div>
      );
  };
  
  export default UniCardPopup;