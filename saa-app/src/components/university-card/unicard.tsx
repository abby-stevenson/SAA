import './unicard.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface UniPopupProps {
    courseName: string;
    uniName: string;
    location: string;
    creditAmount: string;
    nuCourse: string;
}

const UniCardPopup = ({ courseName, uniName, location, creditAmount, nuCourse }: UniPopupProps) => {
    const urlPath = uniName.replace(/ /g, "") + ".png"
    return (
        <div className="uni-card">
            <div className="uni-card-row">
                <img src={urlPath} alt="University" className="uni-image" />
                {/* Text on the right */}
                <div className="uni-card-text">
                    <div className="uni-course">{uniName} - {courseName}</div>
                    <div className="secondLine">{location} • {nuCourse} • {creditAmount}</div>
                </div>

                {/* Star Button */}
                <div className="button-wrapper">
                    <button className="favorite-button">
                        <FontAwesomeIcon icon={faStar} />
                    </button>
              </div>
            </div>
      </div>
    );
};

export default UniCardPopup;