import React from 'react';
import './incorrectPassword.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

interface IncorrectPasswordPopupProps {
    onClose: () => void;
}


const IncorrectPasswordPopup = ({ onClose }: IncorrectPasswordPopupProps) => {
    return (
        <div className="incorrectpasswrapper">
            <div className="iptext">
                Incorrect password
            </div>
            <button
                className="close-button-incorrect"
                onClick={onClose}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
};

export default IncorrectPasswordPopup;