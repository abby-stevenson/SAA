import React from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SimpleCourseCard from '../../../components/simpleCourseCard/simpleCourseCard';


function UniPage() {
    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar accountName="John Doe"
                    accountMajor="Computer Science" />
            </div>
            <div className = "rest-of-page">
                <div className = "photo-side-by-side">
                    <div className = "photo">
                        <img src="USyd-photo.jpg" alt="University of Sydney" className="uni-image" />

                    </div>
                    <div className = "text">
                        <span className = "uni-name">University of Sydney</span>
                        <div className = "link-and-location">
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                Sydney, Australia
                            </p>
                            <p className = "link">
                                <a href="https://www.sydney.edu.au/" target="_blank" rel="noopener noreferrer">
                                    https://www.sydney.edu.au/
                                </a>
                            </p>
                        </div>

                    </div>
                
                </div>
                <div className = "bio">
                     <span className = "section-title">Bio</span>
                     <p> The University of Sydney is a public research university located in Sydney, Australia. Founded in 
                        1850 as Australia's first university, it is regarded as one of the world's leading universities. 
                        The university is one of Australia's six sandstone universities.</p>
                </div>
                <div className = "popular-courses">
                     <span className = "section-title">Popular Courses</span>
                     <div className="course-grid">
                        <SimpleCourseCard courseNumber='CS3500' />
                        <SimpleCourseCard courseNumber='CS3000' />
                        <SimpleCourseCard courseNumber='CS3800' />
                    </div>
                </div>
                 <div className = "all-courses">
                     <span className = "section-title">Available Courses</span>
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
export default UniPage;