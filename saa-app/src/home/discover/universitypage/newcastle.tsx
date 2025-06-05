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

function Newcastle() {

    const [courses, setCourses] = useState<Course[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
                fetch("http://localhost:8080/university/courses/008")
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
                        <img src="Newcastle.png" alt="University of Newcastle" className="university-image" />

                    </div>
                    <div className = "text">
                        <span className = "uni-name">University of Newcastle</span>
                        <div className = "link-and-location">
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                Newcastle, Australia
                            </p>
                            <p className = "link">
                                <a href="https://www.newcastle.edu.au" target="_blank" rel="noopener noreferrer">
                                    https://www.newcastle.edu.au
                                </a>
                            </p>
                        </div>

                    </div>
                
                </div>
                <div className = "bio">
                     <span className = "section-title">About</span>
                     <p className='bio-text'> The University of Newcastle offers a wide variety of interesting, 
                        exciting and relevant courses to our visiting Study Abroad and 
                        Exchange students.</p>
                </div>
                <div className = "popular-courses">
                     <span className = "section-title">Popular Courses</span>
                     <div className="course-grid">
                        <SimpleCourseCard courseNumber='CS4535' />
                        <SimpleCourseCard courseNumber='CS4550' />
                        <SimpleCourseCard courseNumber='CS4500' />
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
export default Newcastle;