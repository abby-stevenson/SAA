import React, {useState, useEffect} from 'react';
import './unipage.css'; 
import SideBar from '../../../components/sideBar'
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
function Seoul() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
            fetch("http://localhost:8080/university/courses/004")
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
                        <img src="TEANSeoul.png" alt="TEAN Seoul" className = "university-image" />

                    </div>
                    <div className = "text">
                        <span className = "uni-name">TEAN Seoul</span>
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
                     <p className='bio-text'> Study in Seoul at one of Korea’s leading private universities that’s
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
                         <SimpleCourseCard
                             courseNumber='CS3990'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS3990',
                                 courseTitle: 'COMPUTER ARCHITECTURE(English)',
                                 credits: '3'
                             })}
                         />
                         <SimpleCourseCard
                             courseNumber='CS1800'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS1800',
                                 courseTitle: 'DISCRETE MATHEMATICS(English)',
                                 credits: '3'
                             })}
                         />
                         <SimpleCourseCard
                             courseNumber='CS4973'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS4973',
                                 courseTitle: 'COMPUTER SCIENCE COLLOQUIUM(English)',
                                 credits: '3'
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
export default Seoul;