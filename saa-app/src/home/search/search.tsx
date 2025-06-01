import React from 'react';
import SideBar from "../../components/sideBar";
import UniCardPopup from "../../../src/components/university-card/unicard";
import './search.css';
import SearchBar from '../../components/searchBar/searchbar';

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
                                courseName={course.courseName}
                                uniName={course.uniName}
                                location={course.location}
                                creditAmount={course.creditAmount}
                                nuCourse={course.nuCourse}
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



