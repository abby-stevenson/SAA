import React from 'react';
import './universityThumbnail.css';

interface UniversityThumbnailProps {
  name: string;
  location: string;
  description: string;
  image: string;
}

function UniversityThumbnail({ name, location, description, image}: UniversityThumbnailProps) {
  return (
    <div className="card-container">
      <img className="image" src={image} />
      <div>
        <h3>{name}</h3>
        <div className="location-container">
          <img src="Leading icon.png" />
          <span>{location}</span>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default UniversityThumbnail;

