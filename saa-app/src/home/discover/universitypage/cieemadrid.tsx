import React from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SimpleCourseCard from '../../../components/simpleCourseCard/simpleCourseCard';


function Madrid() {
    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar accountName="John Doe"
                    accountMajor="Computer Science" />
            </div>
            <div className = "rest-of-page">
                <div className = "photo-side-by-side">
                    <div className = "photo">
                        <img src="CIEEMadrid.png" alt="CIEE Madrid" className="university-image"/>

                    </div>
                    <div className = "text">
                        <span className = "uni-name">Universidad Carlos III de Madrid</span>
                        <div className = "link-and-location">
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                Madrid, Spain
                            </p>
                            <p className = "link">
                                <a href="http://ciee.org/go-abroad/college-study-abroad/programs/spain/madrid/engineering-technology-sciences" target="_blank" rel="noopener noreferrer">
                                    http://ciee.org/go-abroad/college-study-abroad/programs/
                                </a>
                            </p>
                        </div>

                    </div>
                
                </div>
                <div className = "bio">
                     <span className = "section-title">About</span>
                     <p> Your Engineering, Technology + Sciences program in Madrid lasts a full semester
                        and offers you an integrated global learning experience that connects your coursework
                        with real-world applications. You will enroll in a combination of CIEE courses, host 
                        institution courses, and courses taught online through CIEE's global academic partner,
                        ASU, that focus on science, technology, engineering, or math. Enhance your experience
                        with co-curricular and extracurricular activities related to engineering, technology,
                        and science. Live and learn in Madrid!</p>
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
export default Madrid;