import React, {useState, useEffect} from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SimpleCourseCard from '../../../components/simpleCourseCard/simpleCourseCard';

export type Course = {
    courseNumber: string;
    courseName: string;
};

function Capetown() {

    const [courses, setCourses] = useState<Course[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
                fetch("http://localhost:8080/university/courses/006")
                    .then((res) => {
                        if (!res.ok) throw new Error("Failed to fetch courses");
                        return res.json();
                    })
                    .then((data) => {
                        setCourses(data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        setError(err.message);
                        setLoading(false);
                    });
            }, []);
            

    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar accountName="John Doe"
                    accountMajor="Computer Science" />
            </div>
            <div className = "rest-of-page">
                <div className = "photo-side-by-side">
                    <div className = "photo">
                        <img src="CIEECapetown.png" alt="CIEE Capetown" className="university-image" />

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
                     <p className='bio-text'> When you study abroad in Cape Town, South Africa, you'll discover 
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
                        <SimpleCourseCard courseNumber='CS4100' />
                        <SimpleCourseCard courseNumber='CS3700' />
                        <SimpleCourseCard courseNumber='CS2990' />
                    </div>
                </div>
                 <div className = "all-courses">
                     <span className = "section-title">Available Courses</span>
                     <div className="course-grid">
                        {loading && <p>Loading courses...</p>}
                        {error && <p>Error: {error}</p>}
                        {!loading && !error &&
                            Array.from(
                                new Map(courses.map((course) => [course.courseNumber, course])).values()).map((course) => (
                                    <SimpleCourseCard
                                        key={course.courseNumber}
                                        courseNumber={course.courseNumber}/>
                                    ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Capetown;