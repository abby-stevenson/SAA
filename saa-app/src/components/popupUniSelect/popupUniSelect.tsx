import './popupUniSelect.css';
import React, {useState} from 'react';
import {RiCheckboxBlankFill, RiCheckboxFill} from "react-icons/ri";

interface UniPopupProps {
    courseName: string;
    uniName: string;
    location: string;
    creditAmount: string;
    nuCourse: string;
}

const PopupUniSelect = ({ courseName, uniName, location, creditAmount, nuCourse }: UniPopupProps) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    return (
        <div className="uni-card-select">
            <div className="uni-card-row-select">
                <img src="uni.png" alt="University" className="uni-image-select" />

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
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default PopupUniSelect;