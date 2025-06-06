import React, {useState, useEffect} from 'react';
import SideBar from "../../components/sideBar";
import "./discover.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import UniversityThumbnail from "../../components/universityThumbnail/universityThumbnail";
import NoMatchesFound from "../../components/noMatches/noMatches";
import ServerError from "../../components/serverError/serverError";

export type University = {
    universityId: string;
    name: string;
    city: string;
    country: string;
    continent: string;
    description: string;
};

function Discover() {

    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState<"region" | "country" | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/university")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch universities");
                return res.json();
            })
            .then((data) => {
                const filteredData = data.filter(
                    (uni: any) => uni.name !== "Northeastern University"
                );
                setUniversities(filteredData);
                setLoading(false);
                console.log("Received data:", data);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);


    // Filter universities based on selected filters
    const filteredUniversities = universities.filter(uni => {
        // If no filters are selected, show all universities
        if (!selectedRegion && !selectedCountry) return true;

        // Check region filter if selected
        const regionMatch = selectedRegion ? uni.continent === selectedRegion : true;

        // Check country filter if selected
        const countryMatch = selectedCountry ? uni.country === selectedCountry : true;

        return regionMatch && countryMatch;
    });

    // Handle region selection
    const handleRegionSelect = (region: string) => {
        setSelectedRegion(region === selectedRegion ? null : region);
        setActiveDropdown(null);
    };

    // Handle country selection
    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country === selectedCountry ? null : country);
        setActiveDropdown(null);
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
                <div className="filters">
                    <div className="dropdown">
                        <button className="dropbtn"
                                onClick={() => {
                                    const newValue = activeDropdown === 'region' ? null : 'region';
                                    setActiveDropdown(newValue);
                                }}>
                            <span>
                              {selectedRegion
                                  ? selectedRegion
                                  : "Region"}
                            </span>

                            <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: "8px" }}/>
                        </button>

                        <div className={`dropdown-content ${activeDropdown === 'region' ? 'show' : ''}`}>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleRegionSelect("North America"); }}>North America</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleRegionSelect("South America"); }}>South America</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleRegionSelect("Asia"); }}>Asia</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleRegionSelect("Europe"); }}>Europe</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleRegionSelect("Oceania"); }}>Oceania</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleRegionSelect("Africa"); }}>Africa</a>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button
                            className="dropbtn"
                            onClick={() => {
                                const newValue = activeDropdown === 'country' ? null : 'country';
                                setActiveDropdown(newValue);
                            }}>
                            <span>{selectedCountry || "Country"}</span>

                            <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: "8px" }}/>
                        </button>
                        <div className={`dropdown-content ${activeDropdown === 'country' ? 'show' : ''}`}>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCountrySelect("United States of America"); }}>United States of America</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCountrySelect("United Kingdom"); }}>United Kingdom</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCountrySelect("Denmark"); }}>Denmark</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCountrySelect("Sweden"); }}>Sweden</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCountrySelect("Spain"); }}>Spain</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCountrySelect("South Korea"); }}>South Korea</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCountrySelect("Australia"); }}>Australia</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCountrySelect("South Africa"); }}>South Africa</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCountrySelect("Hungary"); }}>Hungary</a>
                        </div>
                    </div>

                    {(selectedRegion || selectedCountry) && (
                        <div className="dropdown">
                            <button
                                className="clear-filters"
                                onClick={() => {
                                    setSelectedRegion(null);
                                    setSelectedCountry(null);
                                }}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                <div className="universities-grid">

                {/* Show server error if fetch failed */}
                {error && <ServerError/>}

                {/* Show loading message if still loading */}
                {!error && loading && <p>Loading universities...</p>}

                {/* Show universities if loaded and no error */}
                {!error && !loading && filteredUniversities.length > 0 && (
                    filteredUniversities.map((uni, index) => (
                        <UniversityThumbnail
                            key={index}
                            name={uni.name}
                            location={uni.city + ", " + uni.country}
                            description={uni.description}
                            image={uni.name.replace(/ /g, "") + ".png"}
                            size="large"
                        />
                    ))
                )}
            </div>

                {/* Show no matches found if loaded, no error, but no filtered results */}
                {!error && !loading && filteredUniversities.length === 0 && <NoMatchesFound />}
            </div>
        </div>
    );
}
export default Discover;