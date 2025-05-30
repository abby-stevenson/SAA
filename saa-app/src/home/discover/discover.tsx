import React, {useState} from 'react';
import SideBar from "../../components/sideBar";
import "./discover.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import UniversityThumbnail from "../../components/universityThumbnail/universityThumbnail";

function Discover() {
    // Example university data
    const universities = [
        {
            name: "University of Technology Sydney",
            location: "Sydney, Australia",
            description: "UTS is a leading public university known for its practice-based teaching and research excellence in technology and innovation.",
            image: "Image.png",
            country: "Australia",
            region: "Oceania"
        },
        {
            name: "University of Sydney",
            location: "Sydney, Australia",
            description: "Australia's first university, renowned for its research output and beautiful campus.",
            image: "Image.png",
            country: "Australia",
            region: "Oceania"
        },
        {
            name: "University of New South Wales",
            location: "Sydney, Australia",
            description: "A global leader in research and teaching with strong industry connections.",
            image: "Image.png",
            country: "Australia",
            region: "Oceania"
        },
        {
            name: "Australian National University",
            location: "Canberra, Australia",
            description: "Ranked #1 in Australia, ANU is known for its research-intensive programs.",
            image: "Image.png",
            country: "Australia",
            region: "Oceania"
        },
        {
            name: "University of Melbourne",
            location: "Melbourne, Australia",
            description: "Consistently ranked as Australia's top comprehensive research university.",
            image: "Image.png",
            country: "Australia",
            region: "Oceania"
        },
        {
            name: "Monash University",
            location: "Melbourne, Australia",
            description: "Australia's largest university with a strong international presence.",
            image: "Image.png",
            country: "Australia",
            region: "Oceania"
        },
        {
            name: "Northeastern University",
            location: "Boston, USA",
            description: "northeastern uni",
            image: "Image.png",
            country: "USA",
            region: "North America"
        }
    ];

    const [activeDropdown, setActiveDropdown] = useState<"region" | "country" | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    // Filter universities based on selected filters
    const filteredUniversities = universities.filter(uni => {
        // If no filters are selected, show all universities
        if (!selectedRegion && !selectedCountry) return true;

        // Check region filter if selected
        const regionMatch = selectedRegion ? uni.region === selectedRegion : true;

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
                        <button
                            className="dropbtn"
                            onClick={() => {
                                const newValue = activeDropdown === 'region' ? null : 'region';
                                setActiveDropdown(newValue);
                            }}>
                            <span>Region {selectedRegion && `(${selectedRegion})`}</span>
                            <FontAwesomeIcon icon={faCaretDown} />
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
                            <span>Country {selectedCountry && `(${selectedCountry})`}</span>
                            <FontAwesomeIcon icon={faCaretDown} />
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
                    {filteredUniversities.map((uni, index) => (
                        <UniversityThumbnail
                            key={index}
                            name={uni.name}
                            location={uni.location}
                            description={uni.description}
                            image={uni.image}
                        />
                    ))}

                    {filteredUniversities.length === 0 && (
                        <div className="no-results">
                            No universities match your filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Discover;