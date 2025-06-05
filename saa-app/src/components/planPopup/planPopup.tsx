import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './planPopup.css';
import PopupUniSelect from "../popupUniSelect/popupUniSelect";
import React, {useState} from "react";

interface Course {
    courseName: string;
    creditAmount: string;
    location: string;
    nuCourse: string;
    uniName: string;
}

interface SavedCoursesInfo {
    credits: number;
    universityName: string;
    savedCourses: Course[];
    onClose: () => void;
}

function PlanPopup({ credits, universityName, savedCourses, onClose }: SavedCoursesInfo) {
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);


    const handleClose = () => {
        console.log('Delete button clicked, calling onClose');
        if (typeof onClose === 'function') {
            onClose();
        } else {
            console.error('onClose is not a function!');
        }
    };


    const openEmail = () => {
        const recipient = "pascarelli.l@northeastern.edu";
        const subject = encodeURIComponent("User's plan for study abroad");
        const body = encodeURIComponent(
            "Below are all courses I am interested in taking at " + universityName + "\n" +
            selectedCourses.join('\n')
        );

        // Check if default email client exists (mailto)
        try {
            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        } catch (e) {
            // Fallback to Outlook Web App
            window.open(
                `https://outlook.office.com/mail/deeplink/compose?to=${recipient}&subject=${subject}&body=${body}`,
                '_blank'
            );
        }
    };

    const handleCheck = (course: string, isAdded: boolean) => {
        if (isAdded) {
            setSelectedCourses(selectedCourses.concat(course))
        }
        else {
            setSelectedCourses(selectedCourses.filter((item) => item !== course));
        }
        console.log("selected courses " + selectedCourses.length)
    }

    function handleSubmit() {

    }

    return (
        <div className="saved-courses-popup">
            <div>
                <button
                    className="delete-button"
                    onClick={handleClose}
                    aria-label="Close popup"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>

            <h3 className="university-header-popup">{universityName}</h3>
            <div className="max-credits">Max Credits: {credits}</div>
            <div className="include-in-plan">Included in Plan</div>
            <div className="courses-list" style={{ maxHeight: '330px', overflowY: 'auto' }}>
                {savedCourses.map((course, index) => (
                    <div key={index}>
                        <PopupUniSelect
                            courseName={course.courseName}
                            creditAmount={course.creditAmount}
                            location={course.location}
                            nuCourse={course.nuCourse}
                            uniName={course.uniName}
                            checkedCallback={handleCheck}
                        />
                        {index < savedCourses.length - 1 && <hr className="course-divider" />}
                    </div>
                ))}
            </div>

            <button className="email-button" onClick={openEmail}>Send Email</button>
        </div>
    );
}

export default PlanPopup;