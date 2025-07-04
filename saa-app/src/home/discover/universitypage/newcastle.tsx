import React, {useState, useEffect} from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar/sideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SimpleCourseCard from '../../../components/simpleCourseCard/simpleCourseCard';
import ServerError from '../../../components/serverError/serverError';
import CourseCardPopup from "../../../components/courseCard/courseCard";

export type Course = {
    courseNumber: string;
    courseTitle: string;
    credits: string;
};
function Newcastle() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    
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

    const handleCourseClick = (course: Course) => {
        setSelectedCourse(course);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedCourse(null);
    };



    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar />
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
                         <SimpleCourseCard
                             courseNumber='CS4535'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS4535',
                                 courseTitle: 'Computer Science Work Integrated Learning',
                                 credits: '10'
                             })}
                         />
                         <SimpleCourseCard
                             courseNumber='CS4550'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS4550',
                                 courseTitle: 'Cloud Computing',
                                 credits: '10'
                             })}
                         />
                         <SimpleCourseCard
                             courseNumber='CS4500'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS4500',
                                 courseTitle: 'Enterprise Software Architectures',
                                 credits: '10'
                             })}
                         />
                    </div>
                </div>
                <div className = "all-courses">
                     <span className = "section-title">Available Courses</span>
                     <div className="course-grid">
                        {loading && <p>Loading courses...</p>}
                        {error && <ServerError />}
                         {!loading && !error &&
                             Array.from(
                                 new Map(courses.map((course) => [course.courseNumber, course])).values()
                             ).map((course) => (
                                 <SimpleCourseCard
                                     key={course.courseNumber}
                                     courseNumber={course.courseNumber}
                                     onClick={() => handleCourseClick(course)}
                                 />
                             ))}
                    </div>
                </div>
                {showPopup && selectedCourse && (
                    <CourseCardPopup
                        courseNumber={selectedCourse.courseNumber}
                        courseTitle={selectedCourse.courseTitle}
                        courseDescription={`${selectedCourse.courseTitle} - ${selectedCourse.credits} credits`}
                        uniId="005"
                        hostCourseNumber={selectedCourse.courseNumber}
                        onClose={handleClosePopup}
                    />
                )}
            </div>
        </div>
    );
}
export default Newcastle;