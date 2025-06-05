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

function Madrid() {

    const [courses, setCourses] = useState<Course[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
                fetch("http://localhost:8080/university/courses/003")
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
                     <p className='bio-text'> Your Engineering, Technology + Sciences program in Madrid lasts a full semester
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
                        <SimpleCourseCard courseNumber='CS4150' />
                        <SimpleCourseCard courseNumber='CS4300' />
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
export default Madrid;