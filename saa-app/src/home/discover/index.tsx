import React, {useEffect, useRef, useState} from 'react';
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
            image: "Image.png"
        },
        {
            name: "University of Sydney",
            location: "Sydney, Australia",
            description: "Australia's first university, renowned for its research output and beautiful campus.",
            image: "Image.png"
        },
        {
            name: "University of New South Wales",
            location: "Sydney, Australia",
            description: "A global leader in research and teaching with strong industry connections.",
            image: "Image.png"
        },
        {
            name: "Australian National University",
            location: "Canberra, Australia",
            description: "Ranked #1 in Australia, ANU is known for its research-intensive programs.",
            image: "Image.png"
        },
        {
            name: "University of Melbourne",
            location: "Melbourne, Australia",
            description: "Consistently ranked as Australia's top comprehensive research university.",
            image: "Image.png"
        },
        {
            name: "Monash University",
            location: "Melbourne, Australia",
            description: "Australia's largest university with a strong international presence.",
            image: "Image.png"
        }
        ,
        {
            name: "Northeastern University",
            location: "Boston, USA",
            description: "northeastern uni",
            image: "Image.png"
        }
    ];

    const [activeDropdown, setActiveDropdown] = useState<"region" | "country" | null>(null);

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
                            <span>Region </span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        <div className={`dropdown-content ${activeDropdown === 'region' ? 'show' : ''}`}>
                            <a href="#">North America</a>
                            <a href="#">South America</a>
                            <a href="#">Asia</a>
                            <a href="#">Europe</a>
                            <a href="#">Oceania</a>
                            <a href="#">Africa</a>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button
                            className="dropbtn"
                            onClick={() => {
                                const newValue = activeDropdown === 'country' ? null : 'country';
                                setActiveDropdown(newValue);
                            }}>
                            <span>Country </span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        <div className={`dropdown-content ${activeDropdown === 'country' ? 'show' : ''}`}>
                            <a href="#">United States of America</a>
                            <a href="#">United Kingdom</a>
                            <a href="#">Denmark</a>
                            <a href="#">Sweden</a>
                            <a href="#">Spain</a>
                            <a href="#">South Korea</a>
                            <a href="#">Australia</a>
                            <a href="#">South Africa</a>
                            <a href="#">Hungary</a>
                        </div>
                    </div>
                </div>


                <div className="universities-grid">
                    {universities.map((uni, index) => (
                        <UniversityThumbnail
                            key={index}
                            name={uni.name}
                            location={uni.location}
                            description={uni.description}
                            image={uni.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Discover;