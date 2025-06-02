import React, {useEffect, useState} from 'react';
import SideBar from "../../components/sideBar";
import UniCardPopup from "../../../src/components/university-card/unicard";
import './search.css';
import SearchBar from '../../components/searchBar/searchbar';
import {University} from "../discover/discover";

type StudyAbroadCourse = {
    universityId: string;
    hostCourseNumber: string;
    hostCourseDescription: string;
    term: string;
    credits: string;
    taken: string;
    courseTitle: string;
    courseNumber: string;
    universityName: string;
    universityCity: string;
    universityCountry: string;
};

function Search() {
    const [courses, setCourses] = useState<StudyAbroadCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [universities, setUniversities] = useState<Record<string, University>>({});

    useEffect(() => {
        fetch("http://localhost:8080/course/sa/all")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch courses");
                return res.json();
            })
            .then((data) => {
                setCourses(data);
                setLoading(false);
                console.log("Received data:", data);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);


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
                            <UniCardPopup
                                courseName={course.courseTitle}
                                uniName={course.universityName}
                                location={course.universityCity + ", "
                                    + course.universityCountry}
                                creditAmount={course.credits}
                                nuCourse={course.courseNumber}
                            />
                            {/* Add HR except after last item */}
                            {index < courses.length - 1 && <hr className="custom-hr" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Search;



