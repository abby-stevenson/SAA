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

function Barcelona() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
            fetch("http://localhost:8080/university/courses/005")
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
                        <img src="IESBarcelona.png" alt="IES Barcelona" className="university-image" />

                    </div>
                    <div className = "text">
                        <span className = "uni-name">IES Barcelona</span>
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
                     <p className='bio-text'> Our Barcelona Engineering program allows you to construct your
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
                         <SimpleCourseCard
                             courseNumber='CS4300'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS4300',
                                 courseTitle: '3D Computer Graphics',
                                 credits: '3'
                             })}
                         />
                         <SimpleCourseCard
                             courseNumber='CS1990'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS1990',
                                 courseTitle: 'Computer Programming',
                                 credits: '3'
                             })}
                         />
                         <SimpleCourseCard
                             courseNumber='CS4400'
                             onClick={() => handleCourseClick({
                                 courseNumber: 'CS4400',
                                 courseTitle: 'Programming Languages',
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
export default Barcelona;