import React from 'react';
import './universityThumbnail.css';
import { Link } from "react-router-dom";

interface UniversityThumbnailProps {
  name: string;
  location: string;
  description: string;
  image: string;
  size: 'small' | 'large';
}

function UniversityThumbnail({ name, location, description, image, size}: UniversityThumbnailProps) {

  const toRoutePath = (name: string): string => {
  return name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
};

  return (
    <div className="card-container">
      <img className={`image-thumbnail ${size}`}  src={image} />
      <div>
        <Link to={`/SAA/${toRoutePath(name)}`} className="link-no-style">
          <h3>{name}</h3>
        </Link>
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

