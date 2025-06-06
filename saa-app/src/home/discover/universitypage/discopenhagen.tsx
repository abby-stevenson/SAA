import React, {useState, useEffect} from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SimpleCourseCard from '../../../components/simpleCourseCard/simpleCourseCard';
import ServerError from '../../../components/serverError/serverError';

export type Course = {
    courseNumber: string;
    courseName: string;
};

function Copenhagen() {

    const [courses, setCourses] = useState<Course[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
                fetch("http://localhost:8080/university/courses/001")
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
                        <img src="DISCopenhagen.png" alt="DIS Copenhagen" className="university-image" />

                    </div>
                    <div className = "text">
                        <span className = "uni-name">University of Copenhagen</span>
                        <div className = "link-and-location">
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                Copenhagen, Denmark
                            </p>
                            <p className = "link">
                                <a href="https://disabroad.org/copenhagen/" target="_blank" rel="noopener noreferrer">
                                    https://disabroad.org/copenhagen/
                                </a>
                            </p>
                        </div>

                    </div>
                
                </div>
                <div className = "bio">
                     <span className = "section-title">About</span>
                     <p className='bio-text'> We’re proud to have built a high-quality, innovative, 
                        study abroad experience that combines high-level classroom 
                        academics with learning in the field and hands-on development 
                        of transferable skills.</p>
                </div>
                <div className = "popular-courses">
                     <span className = "section-title">Popular Courses</span>
                     <div className="course-grid">
                        <SimpleCourseCard courseNumber='CS4990' />
                        <SimpleCourseCard courseNumber='CS4300' />
                        <SimpleCourseCard courseNumber='CS4100' />
                    </div>
                </div>
                 <div className = "all-courses">
                     <span className = "section-title">Available Courses</span>
                     <div className="course-grid">
                        {loading && <p>Loading courses...</p>}
                        {error && <ServerError />}
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
export default Copenhagen;