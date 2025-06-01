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
                    <div className="banner-content">
                        <h1 className="banner-title">Title</h1>
                        <p className="banner-subtitle">Subtitle</p>
                        <button className="banner-button">
                        <img src="icon.png" alt="" className="button-icon" />
                        Learn More
                        </button>
                    </div>
                    <div className="banner-image-placeholder">
                        <img src="placeholder-icon.png" alt="placeholder" />
                    </div>
                </div>
                <h2 className="spotlight-heading">Spotlight Universities</h2>
                    <div className = "uni-card-list">
                        <UniCard 
                            name = "University of Sydney"
                            location='Sydney, Australia'
                            description='Hello ello'
                            image='USyd-photo.jpg' />
                        <UniCard 
                            name = "Newcastle University"
                            location='Newcastle, Australia'
                            description='Hello ello'
                            image='Newcastle.png' />
                        <UniCard 
                            name = "University of Barcelona"
                            location='Barcelona, Spain'
                            description='Hello ello'
                            image='IESBarcelona.png' />
                        <UniCard 
                            name = "University of Seoul"
                            location='Seoul, South Korea'
                            description='Hello ello'
                            image='TEANSeoul.png' />
                    </div>
                <h2 className="testimonial-heading">Student Testimonials</h2>
                <div className = "photo-slideshow">
                    <div className={`slide ${currentSlide === 0 ? "active" : ""}`}>
                        <StudentTestimonials
                            name = "Timmy"
                            story = "I loved my time in Sydney so much. We were there whilst Vivid was on which was amazing. We went to the blue mountains and went on lots of hikes" 
                            mainImage = "SydneyMainPhoto.jpeg"
                            image1='Sydney1Photo.jpg'
                            image2='Sydney2Photo.JPG'
                            image3='Sydney3Photo.jpeg'
                            image4='Sydney4Photo.jpeg'
                            image5='Sydney5Photo.jpeg'
                            image6='Sydney1Photo.jpg'
                            />
                    </div>
                     <div className={`slide ${currentSlide === 1 ? "active" : ""}`}>
                        <StudentTestimonials 
                        name = "John"
                            story = "I loved my time in Sydney so much. We were there whilst Vivid was on which was amazing. We went to the blue mountains and went on lots of hikes" 
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