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

function Budapest() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/university/courses/009")
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
                        <img src="AITBudapest.png" alt="AIT Budapest" className="university-image" />
                    </div>
                    <div className = "text">
                        <span className = "uni-name">Aquincum Institute of Technology (AIT) Budapest</span>
                        <div className = "link-and-location">
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                Budapest, Hungary
                            </p>
                            <p className = "link">
                                <a href="https://www.ait-budapest.com" target="_blank" rel="noopener noreferrer">
                                    https://www.ait-budapest.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className = "bio">
                    <span className = "section-title">About</span>
                    <p className='bio-text'> Aquincum Institute of Technology (AIT) offers semester-long English language programs
                        tailored to the needs of North American computer science, data science, and software
                        engineering undergraduates in their sophomore through senior years. Classes are taught
                        by eminent Hungarian professors, many of whom have teaching experience in North American
                        universities.</p>
                </div>
                <div className = "popular-courses">
                    <span className = "section-title">Popular Courses</span>
                    <div className="course-grid">
                        <SimpleCourseCard
                            courseNumber='CS2990'
                            onClick={() => handleCourseClick({
                                courseNumber: 'CS2990',
                                courseTitle: 'Deep Learning',
                                credits: '3'
                            })}
                        />
                        <SimpleCourseCard
                            courseNumber='CS4300'
                            onClick={() => handleCourseClick({
                                courseNumber: 'CS4300',
                                courseTitle: 'Computer Graphics',
                                credits: '3'
                            })}
                        />
                        <SimpleCourseCard
                            courseNumber='CS4520'
                            onClick={() => handleCourseClick({
                                courseNumber: 'CS4520',
                                courseTitle: 'Mobile Software Development',
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
                        uniId="009" // Assuming Budapest's ID is 009
                        hostCourseNumber={selectedCourse.courseNumber}
                        onClose={handleClosePopup}
                    />
                )}
            </div>
        </div>
    );
}

export default Budapest;