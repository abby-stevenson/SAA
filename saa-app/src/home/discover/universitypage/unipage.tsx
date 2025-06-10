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

function Sydney() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showPopup, setShowPopup] = useState(false);

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
                         <SimpleCourseCard
                             courseNumber='CS3200'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS3200',
                                 courseTitle: 'Database Management Systems',
                                 credits: '3'
                             })}
                         />
                         <SimpleCourseCard
                             courseNumber='CS3000'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS3000',
                                 courseTitle: 'COMP3027: Algorithm Design',
                                 credits: '3'
                             })}
                         />
                         <SimpleCourseCard
                             courseNumber='CS3650'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS3650',
                                 courseTitle: 'Systems Programming',
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
export default Sydney;