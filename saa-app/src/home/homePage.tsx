import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import SideBar from '../components/sideBar/sideBar';
import StudentTestimonials from '../components/studentTestimonials/studentTestimonials';
import './homePage.css'
import UniCard from '../components/universityThumbnail/universityThumbnail';

function Home() {

     const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 2); // 2 slides
        }, 20000); // 5 sec interval

        return () => clearInterval(interval);
    }, []);


    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar />
            </div>
            <div className = "rest-of-page">
                <div className="banner-card">
                    <img src="leuven.jpg" alt="Banner" className="banner-image" />
                    <div className="banner-content">
                        <h1 className="banner-title">Data & Software in International Governance</h1>
                        <p className="banner-subtitle">Discover our new Dialogue of Civilizations in Leuven, Belgium learning about global cultures and data policies.</p>
                        <button className="banner-button" onClick={() => window.open('https://goglobal.northeastern.edu/_portal/tds-program-brochure?programid=10592', '_blank')}>
                            <img src="icon.png" alt="" className="button-icon" />Learn More
                        </button>
                    </div>
                </div>
                <h2 className="spotlight-heading">Spotlight Universities</h2>
                    <div className = "uni-card-list">
                        <UniCard 
                            name = "University of Sydney"
                            location='Sydney, Australia'
                            description=''
                            image='USydney.png'
                            size="small"/>
                        <UniCard
                            name = "Newcastle"
                            location='Newcastle, Australia'
                            description=''
                            image='Newcastle.png'
                            size="small"/>
                        <UniCard
                            name = "IES Barcelona"
                            location='Barcelona, Spain'
                            description=''
                            image='IESBarcelona.png'
                            size="small"/>
                        <UniCard
                            name = "TEAN Seoul"
                            location='Seoul, South Korea'
                            description=''
                            image='TEANSeoul.png'
                            size="small"/>
                    </div>
                <h2 className="testimonial-heading">Student Testimonials</h2>
                <div className = "photo-slideshow">
                    <div className={`slide ${currentSlide === 0 ? "active" : ""}`}>
                        <StudentTestimonials
                            name = "Maddy"
                            story = "For Maddy Engle, a semester abroad in Sydney became a turning point in both her academic journey and personal growth. Originally drawn to the city for its tech innovation and vibrant culture, she found unexpected inspiration in the global perspectives shared by classmates from around the world. Majoring in computer science and business, Maddy used her time in Sydney to explore international entrepreneurship and user-centered design. Now back on campus, she's channeling her expanded worldview into new collaborative projects and future co-op plans."
                            mainImage = "maddy.jpg"
                            image1='opera.jpg'
                            image2='Sydney2Photo.JPG'
                            image3='bondi.JPG'
                            image4='Sydney4Photo.jpeg'
                            image6='Sydney5Photo.jpeg'
                            image5='aqua.JPG'/>
                    </div>
                     <div className={`slide ${currentSlide === 1 ? "active" : ""}`}>
                        <StudentTestimonials 
                        name = "Max"
                            story = "For Max Coleman, London felt like a natural extension of his curiosity about media, AI, and human connection. A computer science and media studies major, Max spent a semester immersed in the city’s fast-paced creative scene—studying at a world-renowned university and interning with a local PR firm. Whether navigating YouTube or attending live productions on the West End, he found herself constantly inspired by the stories around him. His time in London didn’t just broaden his résumé—it expanded his worldview."
                            mainImage = "max.jpg"
                            image1='london.jpg'
                            image2='christmas.jpg'
                            image3='castle.jpg'
                            image4='scotland.jpg'
                            image5='building.jpg'
                            image6='Sydney1Photo.jpg'/>
                    </div>
                </div>    
            </div>
        </div>
    );
}
export default Home;