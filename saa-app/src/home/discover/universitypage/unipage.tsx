import React, {useState, useEffect} from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar'
import ServerError from '../../../components/serverError/severError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SimpleCourseCard from '../../../components/simpleCourseCard/simpleCourseCard';

export type Course = {
    courseNumber: string;
    courseName: string;
};


function Sydney() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            fetch("http://localhost:8080/university/courses/007")
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
                        <img src="USyd-photo.jpg" alt="University of Sydney" className="university-image" />

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
                     <span className = "section-title">About</span>
                     <p className='bio-text'> The University of Sydney is a public research university located in Sydney, Australia. Founded in 
                        1850 as Australia's first university, it is regarded as one of the world's leading universities. 
                        The university is one of Australia's six sandstone universities.</p>
                </div>
                <div className = "popular-courses">
                     <span className = "section-title">Popular Courses</span>
                     <div className="course-grid">
                        <SimpleCourseCard courseNumber='CS3200' />
                        <SimpleCourseCard courseNumber='CS3000' />
                        <SimpleCourseCard courseNumber='CS3650' />
                    </div>
                </div>
                 <div className = "all-courses">
                     <span className = "section-title">Available Courses</span>
                     <div className="course-grid">
                        {loading && <p>Loading courses...</p>}
                        {error && <ServerError/>}
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
export default Sydney;