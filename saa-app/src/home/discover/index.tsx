import React from 'react';
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
                        <button className="dropbtn"><span>Country </span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Australia</a>
                            <a href="#">France</a>
                            <a href="#">Spain</a>
                            <a href="#">United States of America</a>
                            <a href="#">United Kingdom</a>
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