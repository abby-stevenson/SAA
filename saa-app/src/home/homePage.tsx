import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import SideBar from '../components/sideBar';
import StudentTestimonials from '../components/studentTestimonials/studentTestimonials';
import './homePage.css'
import UniCard from '../components/universityThumbnail/universityThumbnail';

function Home() {

     const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 2); // 2 slides
        }, 5000); // 5 sec interval

        return () => clearInterval(interval);
    }, []);



    return (
        <div className = "side-by-side">
            <div className = "side-bar">
                <SideBar accountName="John Doe"
                        accountMajor="Computer Science" />
            </div>
            <div className = "rest-of-page">
                <div className="banner-card">
                    <img src="leuven.jpg" alt="Banner" className="banner-image" />
                    <div className="banner-content">
                        <h1 className="banner-title">Data & Software in International Governance</h1>
                        <p className="banner-subtitle">Discover our new Dialogue of Civilizations in Leuven, Belgium learning about global cultures and data policies.</p>
                        <button className="banner-button">
                        <img src="icon.png" alt="" className="button-icon" />
                        Learn More
                        </button>
                    </div>
                </div>
                <h2 className="spotlight-heading">Spotlight Universities</h2>
                    <div className = "uni-card-list">
                        <UniCard 
                            name = "University of Sydney"
                            location='Sydney, Australia'
                            description=''
                            image='USyd-photo.jpg'
                            size="small"/>
                        <UniCard 
                            name = "Newcastle University"
                            location='Newcastle, Australia'
                            description=''
                            image='Newcastle.png'
                            size="small"/>
                        <UniCard 
                            name = "University of Barcelona"
                            location='Barcelona, Spain'
                            description=''
                            image='IESBarcelona.png'
                            size="small"/>
                        <UniCard 
                            name = "University of Seoul"
                            location='Seoul, South Korea'
                            description=''
                            image='TEANSeoul.png'
                            size="small"/>
                    </div>
                <h2 className="testimonial-heading">Student Testimonials</h2>
                <div className = "photo-slideshow">
                    <div className={`slide ${currentSlide === 0 ? "active" : ""}`}>
                        <StudentTestimonials
                            name = "Max"
                            story = "For Max Coleman, a semester abroad in Sydney became a turning point in both his academic journey and personal growth. Originally drawn to the city for its tech innovation and vibrant culture, he found unexpected inspiration in the global perspectives shared by classmates from around the world. Majoring in computer science and business, Max used his time in Sydney to explore international entrepreneurship and user-centered design. Now back on campus, he's channeling his expanded worldview into new collaborative projects and future co-op plans."
                            mainImage = "SydneyMainPhoto.jpeg"
                            image1='Sydney1Photo.jpg'
                            image2='Sydney2Photo.JPG'
                            image3='Sydney3Photo.jpeg'
                            image4='Sydney4Photo.jpeg'
                            image5='Sydney5Photo.jpeg'
                            image6='Sydney1Photo.jpg'/>
                    </div>
                     <div className={`slide ${currentSlide === 1 ? "active" : ""}`}>
                        <StudentTestimonials 
                        name = "John"
                            story = "For Jasmine Donahue, London felt like a natural extension of her curiosity about media, culture, and connection. A communications and media studies major, Jasmine spent a semester immersed in the city’s fast-paced creative scene—studying at a world-renowned university and interning with a local PR firm. Whether navigating the Tube or attending live productions on the West End, she found herself constantly inspired by the stories around her. Her time in London didn’t just broaden her résumé—it expanded her worldview." 
                            mainImage = "SydneyMainPhoto.jpeg"
                            image1='Sydney1Photo.jpg'
                            image2='Sydney2Photo.JPG'
                            image3='Sydney3Photo.jpeg'
                            image4='Sydney4Photo.jpeg'
                            image5='Sydney5Photo.jpeg'
                            image6='Sydney1Photo.jpg'/>
                    </div>
                </div>    
            </div>
        </div>
    );
}
export default Home;