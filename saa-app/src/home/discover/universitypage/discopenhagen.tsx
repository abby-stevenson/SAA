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

function Copenhagen() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showPopup, setShowPopup] = useState(false);

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

    const handleCourseClick = (course: Course) => {
        setSelectedCourse(course);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedCourse(null);
    };

    return (
        <div className="side-by-side">
            <div className="side-bar">
                <SideBar />
            </div>
            <div className="rest-of-page">
                <div className="photo-side-by-side">
                    <div className="photo">
                        <img src="DISCopenhagen.png" alt="DIS Copenhagen" className="university-image" />
                    </div>
                    <div className="text">
                        <span className="uni-name">University of Copenhagen</span>
                        <div className="link-and-location">
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                Copenhagen, Denmark
                            </p>
                            <p className="link">
                                <a href="https://disabroad.org/copenhagen/" target="_blank" rel="noopener noreferrer">
                                    https://disabroad.org/copenhagen/
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bio">
                    <span className="section-title">About</span>
                    <p className='bio-text'>We're proud to have built a high-quality, innovative,
                        study abroad experience that combines high-level classroom
                        academics with learning in the field and hands-on development
                        of transferable skills.</p>
                </div>
                <div className="popular-courses">
                    <span className="section-title">Popular Courses</span>
                    <div className="course-grid">
                        <SimpleCourseCard
                            courseNumber='CS4990'
                            onClick={() => handleCourseClick({
                                courseNumber: 'CS4990',
                                courseTitle: 'Development and Programming of Serious Games',
                                credits: '3'
                            })}
                        />
                        <SimpleCourseCard
                            courseNumber='CS4300'
                            onClick={() => handleCourseClick({
                                courseNumber: 'CS4300',
                                courseTitle: 'Computer Graphics: Programming 3D Applications',
                                credits: '3'
                            })}
                        />
                        <SimpleCourseCard
                            courseNumber='CS4100'
                            onClick={() => handleCourseClick({
                                courseNumber: 'CS4100',
                                courseTitle: 'Artificial Intelligence',
                                credits: '3'
                            })}
                        />
                    </div>
                </div>
                <div className="all-courses">
                    <span className="section-title">Available Courses</span>
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
                        courseDescription={`${selectedCourse.courseTitle} - ${selectedCourse.credits} credits`} // You might need to fetch this
                        uniId="001" // Assuming Copenhagen's ID is 001
                        hostCourseNumber={selectedCourse.courseNumber}
                        onClose={handleClosePopup}
                    />
                )}
            </div>
        </div>
    );
}

export default Copenhagen;