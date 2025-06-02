import React, {useState} from 'react';
import SideBar from "../../components/sideBar";
import UniCardPopup from "../../../src/components/university-card/unicard";
import './search.css';
import SearchBar from '../../components/searchBar/searchbar';
import CourseCardPopup from "../../components/courseCard/courseCard";


interface Course {
    courseName: string;
    uniName: string;
    location: string;
    creditAmount: string;
    nuCourse: string;
}

function Search() {

    const courses = [
        {
            courseName: "ood",
            uniName: 'Northeastern University',
            location: 'Boston, MA',
            creditAmount: '4',
            nuCourse: 'cs3500'
        },
        {
            courseName: "algo",
            uniName: 'DIS Copenhagen',
            location: 'Copenhagen, Denmark',
            creditAmount: '4',
            nuCourse: 'cs3000'
        },
        {
            courseName: "fundies1",
            uniName: 'DIS Stockholm',
            location: 'Stockholm, Sweden',
            creditAmount: '5',
            nuCourse: 'cs2500'
        },
        {
            courseName: "fundies1",
            uniName: 'DIS Stockholm',
            location: 'Stockholm, Sweden',
            creditAmount: '5',
            nuCourse: 'cs2500'
        },
        {
            courseName: "fundies1",
            uniName: 'DIS Stockholm',
            location: 'Stockholm, Sweden',
            creditAmount: '5',
            nuCourse: 'cs2500'
        },
        {
            courseName: "fundies1",
            uniName: 'DIS Stockholm',
            location: 'Stockholm, Sweden',
            creditAmount: '5',
            nuCourse: 'cs2500'
        },
        {
            courseName: "fundies1",
            uniName: 'DIS Stockholm',
            location: 'Stockholm, Sweden',
            creditAmount: '5',
            nuCourse: 'cs2500'
        },
        {
            courseName: "fundies1",
            uniName: 'DIS Stockholm',
            location: 'Stockholm, Sweden',
            creditAmount: '5',
            nuCourse: 'cs2500'
        },
        {
            courseName: "fundamentals of cs 2",
            uniName: 'AIT-Budapest',
            location: 'Budapest, Hungary',
            creditAmount: '4',
            nuCourse: 'cs2510'
        }
    ];

    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const handleCourseClick = (course: Course) => {
        setSelectedCourse(course);
    };

    const handleClosePopup = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="side-by-side">
            <div className="side-bar">
                <SideBar
                    accountName="John Doe"
                    accountMajor="Computer Science"
                />
            </div>

            <div className="rest-of-page">
                <div className="search-bar">
                    <SearchBar />
                </div>
                <div className="university-rows">
                    {courses.map((course, index) => (
                        <React.Fragment key={index}>
                            <div onClick={() => handleCourseClick(course)}>
                                <UniCardPopup
                                    courseName={course.courseName}
                                    uniName={course.uniName}
                                    location={course.location}
                                    creditAmount={course.creditAmount}
                                    nuCourse={course.nuCourse}
                                />
                            </div>
                            {index < courses.length - 1 && <hr className="custom-hr" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            {selectedCourse && (
                <CourseCardPopup
                    courseNumber={selectedCourse.nuCourse}
                    courseDescription={`${selectedCourse.courseName} at ${selectedCourse.uniName} (${selectedCourse.location}) - ${selectedCourse.creditAmount} credits`}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}

export default Search;



