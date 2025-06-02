import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './planPopup.css';
import PopupUniSelect from "../popupUniSelect/popupUniSelect";

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
    const handleClose = () => {
        console.log('Delete button clicked, calling onClose');
        if (typeof onClose === 'function') {
            onClose();
        } else {
            console.error('onClose is not a function!');
        }
    };

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
                            uniName={course.uniName}/>
                        {index < savedCourses.length - 1 && <hr className="course-divider" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlanPopup;