import React from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SimpleCourseCard from '../../../components/simpleCourseCard/simpleCourseCard';


function Barcelona() {
    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar accountName="John Doe"
                    accountMajor="Computer Science" />
            </div>
            <div className = "rest-of-page">
                <div className = "photo-side-by-side">
                    <div className = "photo">
                        <img src="IESBarcelona.png" alt="IES Barcelona" className="uni-image" />

                    </div>
                    <div className = "text">
                        <span className = "uni-name">Universitat Ramon Llull</span>
                        <div className = "link-and-location">
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                Barcelona, Spain
                            </p>
                            <p className = "link">
                                <a href="https://www.iesabroad.org/programs/barcelona-engineering?gad_source=1&gclid=Cj0KCQiA8fW9BhC8ARIsACwHqYo8sDuFEVldoB1bKp0GeTs9o8MVYMJ4Lp-iShN9AE-LI-_a5z3MwjsaAsU2EALw_wcB#academics" target="_blank" rel="noopener noreferrer">
                                    https://www.iesabroad.org/programs/barcelona-engineering
                                </a>
                            </p>
                        </div>

                    </div>
                
                </div>
                <div className = "bio">
                     <span className = "section-title">About</span>
                     <p> Our Barcelona Engineering program allows you to construct your
                        expertise with an engaging program for Engineering and STEM students.
                        Compiled with a partnership with the Universitat Ramon Llull's (URL)
                        schools, the Chemical Institute of Sarrià (IQS) and La Salle Digital
                        Engineering, this program enables Engineering students to study abroad 
                        and maintain course progression in their field, becoming global leaders 
                        and learners in the process! Meet your academic requirements and participate 
                        in cultural events, city tours, cooking courses, and more.</p>
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
export default Barcelona;