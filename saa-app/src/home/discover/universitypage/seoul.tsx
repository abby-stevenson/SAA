import React from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SimpleCourseCard from '../../../components/simpleCourseCard/simpleCourseCard';


function Seoul() {
    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar accountName="John Doe"
                    accountMajor="Computer Science" />
            </div>
            <div className = "rest-of-page">
                <div className = "photo-side-by-side">
                    <div className = "photo">
                        <img src="TEANSeoul.png" alt="TEAN Seoul" className = "university-image" />

                    </div>
                    <div className = "text">
                        <span className = "uni-name">Korea University</span>
                        <div className = "link-and-location">
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                Seoul, South Korea
                            </p>
                            <p className = "link">
                                <a href="https://goglobal.northeastern.edu/_portal/tds-program-brochure?programid=10574" target="_blank" rel="noopener noreferrer">
                                    https://goglobal.northeastern.edu/_portal/
                                </a>
                            </p>
                        </div>

                    </div>
                
                </div>
                <div className = "bio">
                     <span className = "section-title">About</span>
                     <p> Study in Seoul at one of Korea’s leading private universities that’s
                        known for its stunning urban campus and on par with the Ivy League schools
                        in the U.S. Here students will have the opportunity to live in a vibrant 
                        capital city that blends high-tech modernity with ancient culture like no
                        other. While studying a range of courses in English, students will also 
                        discover more about life in Korea by pairing up with a Korean student over 
                        the course of the semester for an even more immersive and local experience.</p>
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
export default Seoul;