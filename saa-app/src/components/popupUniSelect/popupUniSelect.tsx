import './popupUniSelect.css';
import React, {useState} from 'react';

interface UniPopupProps {
    courseName: string;
    uniName: string;
    location: string;
    creditAmount: string;
    nuCourse: string;
    checkedCallback: (course: string, isAdded: boolean) => void;
}

const PopupUniSelect = ({ courseName, uniName, location, creditAmount, nuCourse, checkedCallback }: UniPopupProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const urlPath = uniName.replace(/ /g, "") + ".png";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        checkedCallback(`- ${courseName} (${nuCourse}) at ${uniName} in ${location} for ${creditAmount} credits.`, checked);
    };

    return (
        <div className="uni-card-select">
            <div className="uni-card-row-select">
                <img src={urlPath} alt="University" className="uni-image-select" />

                {/* Text on the right */}
                <div className="uni-card-text-select">
                    <div className="uni-course-select">{uniName} - {courseName}</div>
                    <div className="secondLine-select">{location} • {nuCourse} • {creditAmount}</div>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            className="checkbox"
                            onChange={(e) => checkedCallback(nuCourse, e.target.checked)}

                        />
                    </label>
                </div>
            </div>
        </div>

    );
};

export default PopupUniSelect;