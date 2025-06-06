import React, {useEffect, useState} from 'react';
import SideBar from "../../components/sideBar";
import "./profile.css";
import SimpleCourseCard from "../../components/simpleCourseCard/simpleCourseCard";
import SavedUniversity from "../../components/savedUniversity/savedUniversity";
import {StudyAbroadCourse} from "../search/search";
import {useUser} from "../../context/UserContext";

function Profile() {
    // Data for saved universities
    const savedUniversities = [
        {
            universityName: "University of Technology Sydney",
            coursesSaved: 4,
            location: "Sydney, AU"
        },
        {
            universityName: "IES Barcelona",
            coursesSaved: 2,
            location: "Barcelona, ES"
        },
        {
            universityName: "DIS Copenhagen",
            coursesSaved: 2,
            location: "Copenhagen, DK"
        },
        {
            universityName: "University of Melbourne",
            coursesSaved: 3,
            location: "Melbourne, AU"
        },
        {
            universityName: "DIS Copenhagen",
            coursesSaved: 2,
            location: "Copenhagen, DK"
        }
    ];

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/user/favorites/grouped")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch courses");
                console.log("Grouped stuff " + res.json())
                return res.json();
            })
            .then((data) => {
                //setCourses(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

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
                        {savedUniversities.map((uni, index) => (
                            <SavedUniversity
                                key={index}
                                universityName={uni.universityName}
                                numCoursesSaved={uni.coursesSaved}
                                loc={uni.location}
                             coursesSaved={[]}/>
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