import React, {useEffect, useState} from 'react';
import SideBar from "../../components/sideBar";
import "./profile.css";
import SimpleCourseCard from "../../components/simpleCourseCard/simpleCourseCard";
import SavedUniversity from "../../components/savedUniversity/savedUniversity";
import {StudyAbroadCourse} from "../search/search";
import {useUser} from "../../context/UserContext";
import {University} from "../discover/discover";



type GroupedCourses = {
    [universityDescription: string]: StudyAbroadCourse[];
};
function Profile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savedCoursesMap, setSavedCoursesMap] = useState<GroupedCourses>()

    const { email } = useUser();


    function convertToJson(str: string): University | null {
        try {
            // Convert the format to proper JSON
            let jsonStr = str
                .replace(/^University\{/, '{')
                .replace(/(\w+)=/g, '"$1":')
                .replace(/'([^']*)'/g, '"$1"');

            return JSON.parse(jsonStr) as University;
        } catch (error) {
            console.error('Failed to parse university string:', error);
            return null;
        }
    }


    useEffect(() => {
        fetch(`http://localhost:8080/user/favorites/grouped?email=${email}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch saved courses");
                return res.json();
            })
            .then((data) => {
                console.log("Data" + data.toString());
                setSavedCoursesMap(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [email]);


// Separate useEffect to watch savedCoursesMap changes
    useEffect(() => {
        if (savedCoursesMap && Object.keys(savedCoursesMap).length > 0) {
            console.log("Saved Courses Map:", savedCoursesMap);

            Object.entries(savedCoursesMap).forEach(([key, value]) => {
                console.log(`${key}:`, value);
            });
        }
    }, [savedCoursesMap]);

    // Data for recently viewed courses
    const recentCourses = ['CS3500', 'CS3000', 'CS3800'];

    return (
        <div className="side-by-side">
            <div className="side-bar">
                <SideBar />
            </div>
            <div className="rest-of-page">
                <div>
                    <span className="section-title">My Universities</span>
                    <div className="university-div">
                        {Object.entries(savedCoursesMap || {}).map(([universityDescription, courses]) => (
                            <SavedUniversity
                                key={universityDescription}
                                universityName={convertToJson(universityDescription)?.name || ""}
                                numCoursesSaved={courses.length}
                                loc={convertToJson(universityDescription)?.city + ", " + convertToJson(universityDescription)?.country}
                                coursesSaved={courses}
                            />
                        ))}
                    </div>
                </div>
                <div className="all-courses">
                    <span className="section-title">Recently Viewed Courses</span>
                    <div className="course-grid">
                        {recentCourses.map((course, index) => (
                            <SimpleCourseCard
                                key={index}
                                courseNumber={course}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
/*
                        {savedUniversities.map((uni, index) => (
                            <SavedUniversity
                                key={index}
                                universityName={uni.universityName}
                                numCoursesSaved={uni.coursesSaved}
                                loc={uni.location}
                             coursesSaved={[]}/>
                        ))}

                                                {Object.entries(savedCoursesMap as { [key: string]: StudyAbroadCourse[]})
                            .flatMap(([universityKey, courses]) =>
                            courses.map((course, index) => (
                                <SimpleCourseCard
                                    key={`${universityKey}-${index}`} // ensure unique key
                                    courseNumber={course.courseNumber}
                                />
                            ))
                        )}
 */