import React from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SimpleCourseCard from '../../../components/simpleCourseCard/simpleCourseCard';


function Capetown() {
    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar accountName="John Doe"
                    accountMajor="Computer Science" />
            </div>
            <div className = "rest-of-page">
                <div className = "photo-side-by-side">
                    <div className = "photo">
                        <img src="CIEECapetown.png" alt="CIEE Capetown" className="uni-image" />

                    </div>
                    <div className = "text">
                        <span className = "uni-name">University Of Cape Town</span>
                        <div className = "link-and-location">
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                Capetown, South Africa
                            </p>
                            <p className = "link">
                                <a href="https://www.iesabroad.org/programs/cape-town-university-cape-town?gad_source=1&gclid=Cj0KCQiA8fW9BhC8ARIsACwHqYpqz0PUBu8W6nhpTWmjXWu9nwZlhCvacLdFbFjqw4R-ntlMJqNKm2YaAvAgEALw_wcB" target="_blank" rel="noopener noreferrer">
                                    https://www.iesabroad.org/programs/cape-town-university
                                </a>
                            </p>
                        </div>

                    </div>
                
                </div>
                <div className = "bio">
                     <span className = "section-title">About</span>
                     <p> When you study abroad in Cape Town, South Africa, you'll discover 
                        a breathtaking city steeped in history and natural beauty. Experience 
                        the vibrant culture, diverse communities, and rich heritage as you 
                        explore landmarks like Robben Island and the District Six Museum. 
                        Immerse yourself in academic pursuits such as environmental science 
                        and social justice while embracing the city's multicultural atmosphere. 
                        With its picturesque coastline and access to world-class attractions, 
                        studying abroad in Cape Town on a CIEE program promises a life-changing 
                        experience. It's easy to see that Cape Town will create lasting memories!</p>
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
export default Capetown;