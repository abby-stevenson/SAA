import React, {useEffect, useState} from 'react';
import SideBar from "../../components/sideBar";
import UniCardPopup from "../../../src/components/university-card/unicard";
import './search.css';
import SearchBar from '../../components/searchBar/searchbar';
import {University} from "../discover/discover";
import CourseCardPopup from "../../components/courseCard/courseCard";
import {Console} from "inspector";

export type StudyAbroadCourse = {
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
    const [activeDropdown, setActiveDropdown] = useState<"city" | "country" | null>(null);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedDepartments, setSelectedDepartments] = useState<String[]>([]);
    const [searchType, setSearchType] = useState<string>("NU Course Code");
    const [cities, setCities] = useState<string[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const countryCity = new Set<string>();


    const filterCourses = (courses: StudyAbroadCourse[], query: string) => {
        return courses.filter((course) => {
            const courseCode = course.courseNumber.toLowerCase().replace(" ", '');
            const searchTermMatches = (query == '') || (searchType == "NU Course Code" && courseCode.startsWith(query.toLowerCase()))
                || (searchType == "University" && course.universityName.toLowerCase().includes(query.toLowerCase())) ||
                (searchType == "Host Course Name" && course.courseTitle.toLowerCase().includes(query.toLowerCase()))
            return searchTermMatches
                && (selectedCity === course.universityCity || selectedCity === '')
                && (selectedCountry === course.universityCountry || selectedCountry === '')
                && (selectedDepartments.length == 0 || selectedDepartments.some(d => courseCode.startsWith(d.toLowerCase())));
        })

    }


    const [searchQuery, setSearchQuery] = useState('');
    const filteredCourses = filterCourses(courses, searchQuery);

    // Handle region selection
    const handleCitySelect = (city: string) => {
        setSelectedCity(city)
        setActiveDropdown(null)
    };

    // Handle country selection
    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country)
        setActiveDropdown(null)
    };

    const handleDepartmentSelect = (departments: String[]) => {
        setSelectedDepartments(departments)
        console.log("Department selected " + departments)
        setActiveDropdown(null)
    }

    // Handle what kind of search it is
    const handleSearchTypeSelect = (searchType: string) => {
        setSearchType(searchType)
        setActiveDropdown(null)
    };


    useEffect(() => {
        fetch("http://localhost:8080/course/sa/all")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch courses");
                return res.json();
            })
            .then((data) => {          setCourses(data);

                const countryCity = new Set<string>();
                const citiesArray: string[] = [];
                const countriesArray: string[] = [];

                // Collect unique country-city combinations
                data.forEach((course: { universityCountry: string; universityCity: string; }) => {
                    countryCity.add(`${course.universityCountry}|${course.universityCity}`);
                });

                // Parse the combinations correctly
                Array.from(countryCity).forEach((s) => {
                    const delimiterIndex = s.indexOf("|");
                    const country = s.substring(0, delimiterIndex); // Country comes first
                    const city = s.substring(delimiterIndex + 1); // City comes after, skip the "|"

                    if (!countriesArray.includes(country)) {
                        countriesArray.push(country);
                    }
                    if (!citiesArray.includes(city)) {
                        citiesArray.push(city);
                    }

                    console.log("Country:", country);
                    console.log("City:", city);
                    console.log("\n");
                });

                // Update state with the parsed arrays
                setCountries(countriesArray.sort());
                setCities(citiesArray.sort());

                console.log("Cities length:", citiesArray.length);
                console.log("Countries length:", countriesArray.length);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const [selectedCourse, setSelectedCourse] = useState<StudyAbroadCourse | null>(null);

    const handleCourseClick = (course: StudyAbroadCourse) => {
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
                    <SearchBar  countries = {countries}
                                cities = {cities}
                                handleSearchChange={setSearchQuery} query={searchQuery}
                                handleCountrySelect={handleCountrySelect}
                                handleRegionSelect={handleCitySelect}
                                handleDepartmentSelect={handleDepartmentSelect}
                    handleSearchTypeSelect={handleSearchTypeSelect}/>
                </div>
                <div className="university-rows">
                    {filteredCourses.map((course, index) => (
                        <React.Fragment key={index}>
                            <div onClick={() => handleCourseClick(course)}>
                                <UniCardPopup
                                    courseName={course.courseTitle}
                                    uniName={course.universityName}
                                    location={course.universityCity + ", "
                                        + course.universityCountry}
                                    creditAmount={course.credits}
                                    nuCourse={course.courseNumber}
                                />
                            </div>
                            {/* Add HR except after last item */}
                            {index < courses.length - 1 && <hr className="custom-hr" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            {selectedCourse && (
                <CourseCardPopup
                    courseNumber={selectedCourse.courseNumber}
                    courseDescription={`${selectedCourse.courseTitle} at ${selectedCourse.universityName} (${selectedCourse.universityCountry}) - ${selectedCourse.credits} credits`}
                    onClose={handleClosePopup}
                    uniId = {selectedCourse.universityId}
                    hostCourseNumber = {selectedCourse.hostCourseNumber}
                />
            )}
        </div>
    );
}

export default Search;



