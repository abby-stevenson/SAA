import { useState } from 'react';
import Popup from 'reactjs-popup';
import PlanPopup from "../planPopup/planPopup";
import './savedUniversity.css';

interface UniversityInfo {
    universityName: string;
    coursesSaved: number;
    loc: string;
}

function SavedUniversity({ loc, universityName, coursesSaved }: UniversityInfo) {
    const [isOpen, setIsOpen] = useState(false);
    const urlPath = universityName.replace(/ /g, "") + ".png";

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        console.log('Closing modal');
        setIsOpen(false);
    };

    return (
        <>
            <div className="saved-university-card" onClick={openModal}>
                <img className="circle-crop" src={urlPath} alt="University" />
                <h3 className="university-header">{universityName}</h3>
                <div className="location-container">
                    <img src="Leading icon.png" alt="Location" />
                    <span>{loc}</span>
                </div>
                <p className="courses-saved-text">{coursesSaved} Courses Saved</p>
            </div>

            <Popup
                open={isOpen}
                onClose={closeModal}
                modal
                nested
                overlayStyle={{
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(2px)' // Optional: adds a slight blur to the background
                }}
            >
                <PlanPopup
                    credits={20}
                    universityName={universityName}
                    savedCourses={[
                        {
                            courseName: "Object Oriented Design",
                            creditAmount: "4",
                            location: "yes",
                            nuCourse: "so true",
                            uniName: "uni"
                        },

                        {
                            courseName: "Object Oriented Programming",
                            creditAmount: "4",
                            location: "yes",
                            nuCourse: "so true",
                            uniName: "uni"
                        },
                        {
                            courseName: "Algo",
                            creditAmount: "4",
                            location: "yes",
                            nuCourse: "so true",
                            uniName: "uni"
                        },
                        {
                            courseName: "Algo",
                            creditAmount: "4",
                            location: "yes",
                            nuCourse: "so true",
                            uniName: "uni"
                        },
                        {
                            courseName: "Algo",
                            creditAmount: "4",
                            location: "yes",
                            nuCourse: "so true",
                            uniName: "uni"
                        },
                        {
                            courseName: "Algo",
                            creditAmount: "4",
                            location: "yes",
                            nuCourse: "so true",
                            uniName: "uni"
                        }
                    ]}
                    onClose={closeModal}
                />
            </Popup>
        </>
    );
}

export default SavedUniversity;




