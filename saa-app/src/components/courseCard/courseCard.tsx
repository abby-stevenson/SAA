import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './courseCard.css'; 
import { useUser } from "../../context/UserContext"; 

interface CourseCardPopupProps {
    courseNumber: string;
    courseDescription: string;
    uniId: string;
    hostCourseNumber: string
    onClose: () => void;
}

const CourseCardPopup = ({courseNumber, courseDescription, uniId, hostCourseNumber, onClose}: CourseCardPopupProps) => {
    const { user } = useUser();
    const email = user?.email;
    const [isFavorited, setIsFavorited] = useState(false);

     useEffect(() => {
        // Check if the course is already favorited
        fetch(`http://localhost:8080/user/isFavorite?email=${email}&hostCourseNumber=${courseNumber}`)
        .then(res => res.json())
        .then(data => {
            setIsFavorited(data.isFavorited);
        })
        .catch(error => {
            console.error('Failed to fetch favorite status:', error);
        });
    }, [email, courseNumber]);

    const handleFavorite = () => {
        fetch("http://localhost:8080/user/favorite", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                email: email, 
                courseDescription: courseDescription, 
                universityId: uniId,
                courseNumber: hostCourseNumber,
                nuCourseNumber: courseNumber}),
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to favorite course");
            return res.json(); 
        })
        .then((data) => {
            alert("Course has been added to favorites!");
            setIsFavorited(true);
        })
        .catch((error) => {
            alert("Failed to favorite course.");
        });
    };

    const handleUnfavorite = async () => {
        try {
            const response = await fetch("http://localhost:8080/user/unfavorite", {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    courseNumber: hostCourseNumber,
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Failed to unfavorite the course");
            }

            setIsFavorited(false);
            console.log("Course unfavorited successfully!");
        } catch (error) {
            console.error("Error unfavoriting course:", error);
        }
    };

    const handleToggleFavorite = () => {
        if (isFavorited) {
            handleUnfavorite();
        } else {
            handleFavorite();
        }
    };

    return (
        <div className="course-card">
            <span className="course-title">Course - {courseNumber}</span>
            <p className="course-description">{courseDescription}</p>
            <button className="button-course" onClick={handleToggleFavorite}>
                <FontAwesomeIcon icon={faStar} />
                 {isFavorited ? "Unfavorite Course" : "Favorite Course"}
            </button>
            <button className="button-course close-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default CourseCardPopup;