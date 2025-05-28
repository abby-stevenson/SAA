import React from 'react';
import { Link } from "react-router-dom";

interface UniversityThumbnailProps {
  name: string;
  location: string;
}

function UniversityThumbnail({ name, location }: UniversityThumbnailProps) {
  return (
    <div className="card">
      <img className="image" src="Image.png" alt={`${name} campus`} />
      <div className="card-body">
        <h3 className="card-title">{name} University of Texas</h3>

        {/* Properly aligned icon + location */}
        <div className="flex items-center gap-2 mb-2">
          <img src="Leading icon.png" alt="Location icon" className="w-4 h-50 inline-block" />
          <span className="text-muted text-sm">{location} Austin, Texas </span>
        </div>
        <p className="card-text">Short description of the university.</p>
      </div>
    </div>
  );
}

export default UniversityThumbnail;

